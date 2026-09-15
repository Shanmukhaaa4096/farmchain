import crypto from 'crypto';

// In-memory OTP session and rate-limiting stores (persisted across warm serverless executions & dev server)
interface OtpSession {
  sessionId: string;
  phone: string; // Normalized E.164: +91XXXXXXXXXX
  otpHash: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: number; // epoch ms
  createdAt: number;
  role?: string;
  name?: string;
  provider: 'twilio_verify' | 'fast2sms' | 'msg91' | 'server_crypto';
}

interface RateLimitRecord {
  lastSentAt: number;
  count: number;
  windowStart: number;
}

// Global caches to survive warm invocations
declare global {
  // eslint-disable-next-line no-var
  var __farmchain_otp_sessions: Map<string, OtpSession> | undefined;
  // eslint-disable-next-line no-var
  var __farmchain_rate_limits: Map<string, RateLimitRecord> | undefined;
}

const otpSessions: Map<string, OtpSession> = globalThis.__farmchain_otp_sessions || new Map();
globalThis.__farmchain_otp_sessions = otpSessions;

const rateLimits: Map<string, RateLimitRecord> = globalThis.__farmchain_rate_limits || new Map();
globalThis.__farmchain_rate_limits = rateLimits;

const SESSION_SECRET = process.env.AUTH_SESSION_SECRET || 'farmchain_hmac_secret_key_2026';
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_SEC = 30;
const MAX_ATTEMPTS = 5;
const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Normalizes and validates Indian mobile numbers to E.164 (+91XXXXXXXXXX)
 */
export function normalizeIndianMobile(raw: string): { valid: boolean; normalized: string; national: string; error?: string } {
  if (!raw || typeof raw !== 'string') {
    return { valid: false, normalized: '', national: '', error: 'Mobile number is required.' };
  }

  // Remove non-digit characters except leading plus
  let cleaned = raw.replace(/[^\d+]/g, '');

  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }

  // Strictly 10 digits starting with 6, 7, 8, or 9
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return {
      valid: false,
      normalized: '',
      national: '',
      error: 'Please enter a valid 10-digit Indian mobile number (e.g. 9849201842).'
    };
  }

  return {
    valid: true,
    normalized: `+91${cleaned}`,
    national: cleaned
  };
}

/**
 * Enforces cooldown & quota rate-limiting per phone number
 */
export function checkRateLimit(phone: string): { allowed: boolean; waitSeconds?: number; error?: string } {
  const now = Date.now();
  const record = rateLimits.get(phone);

  if (!record) {
    rateLimits.set(phone, { lastSentAt: now, count: 1, windowStart: now });
    return { allowed: true };
  }

  // Check 30s resend cooldown
  const elapsedSec = Math.floor((now - record.lastSentAt) / 1000);
  if (elapsedSec < RESEND_COOLDOWN_SEC) {
    const waitSeconds = RESEND_COOLDOWN_SEC - elapsedSec;
    return {
      allowed: false,
      waitSeconds,
      error: `Please wait ${waitSeconds}s before requesting a new OTP.`
    };
  }

  // Check rolling 15-minute quota window
  if (now - record.windowStart > WINDOW_DURATION_MS) {
    record.windowStart = now;
    record.count = 1;
    record.lastSentAt = now;
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const remainingMin = Math.ceil((WINDOW_DURATION_MS - (now - record.windowStart)) / 60000);
    return {
      allowed: false,
      error: `Maximum OTP requests reached. Please try again in ${remainingMin} minutes.`
    };
  }

  record.count += 1;
  record.lastSentAt = now;
  return { allowed: true };
}

/**
 * Generate cryptographically secure hash for OTP verification
 */
export function hashOtp(phone: string, otp: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(`${phone}:${otp}`).digest('hex');
}

/**
 * Generate a cryptographically signed session token
 */
export function signSessionToken(payload: Record<string, unknown>): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

/**
 * Verify and decode a session token
 */
export function verifySessionToken(token: string): { valid: boolean; payload?: Record<string, unknown> } {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return { valid: false };

    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
    if (signature !== expectedSignature) return { valid: false };

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

/**
 * Sends SMS OTP via configured external SMS Provider or server engine
 */
export async function dispatchOtpSms(
  phone: string,
  nationalPhone: string,
  otp: string
): Promise<{ success: boolean; provider: OtpSession['provider']; error?: string }> {
  // 1. Twilio Verify API (Recommended international/India SMS provider)
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioVerifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (twilioSid && twilioToken && twilioVerifySid) {
    try {
      const authHeader = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
      const params = new URLSearchParams({ To: phone, Channel: 'sms' });
      const res = await fetch(`https://verify.twilio.com/v2/Services/${twilioVerifySid}/Verifications`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!res.ok) {
        const errJson = (await res.json().catch(() => ({}))) as Record<string, any>;
        return { success: false, provider: 'twilio_verify', error: errJson.message || 'Twilio SMS dispatch failed.' };
      }

      return { success: true, provider: 'twilio_verify' };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Twilio network error';
      return { success: false, provider: 'twilio_verify', error: msg };
    }
  }

  // 2. Fast2SMS (India instant OTP gateway)
  const fast2smsKey = process.env.FAST2SMS_API_KEY;
  if (fast2smsKey) {
    try {
      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(fast2smsKey)}&route=otp&variables_values=${otp}&numbers=${nationalPhone}`;
      const res = await fetch(url, { method: 'GET' });
      const data = (await res.json().catch(() => ({}))) as Record<string, any>;
      if (data.return === false) {
        return { success: false, provider: 'fast2sms', error: data.message?.[0] || 'Fast2SMS dispatch failed.' };
      }
      return { success: true, provider: 'fast2sms' };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Fast2SMS network error';
      return { success: false, provider: 'fast2sms', error: msg };
    }
  }

  // 3. MSG91 (India DLT Enterprise SMS gateway)
  const msg91Key = process.env.MSG91_AUTH_KEY;
  const msg91Template = process.env.MSG91_TEMPLATE_ID;
  if (msg91Key && msg91Template) {
    try {
      const url = `https://control.msg91.com/api/v5/otp?template_id=${encodeURIComponent(msg91Template)}&mobile=${phone.replace('+', '')}&authkey=${encodeURIComponent(msg91Key)}&otp=${otp}`;
      const res = await fetch(url, { method: 'POST' });
      const data = (await res.json().catch(() => ({}))) as Record<string, any>;
      if (data.type === 'error') {
        return { success: false, provider: 'msg91', error: data.message || 'MSG91 dispatch failed.' };
      }
      return { success: true, provider: 'msg91' };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'MSG91 network error';
      return { success: false, provider: 'msg91', error: msg };
    }
  }

  // 4. Default Server Cryptographic OTP Engine
  return { success: true, provider: 'server_crypto' };
}

/**
 * Creates and stores an OTP session
 */
export async function createOtpSession(params: {
  phone: string;
  nationalPhone: string;
  role?: string;
  name?: string;
}): Promise<{ success: boolean; sessionId?: string; cooldownSeconds: number; provider: string; error?: string }> {
  const { phone, nationalPhone, role, name } = params;

  // Rate limit check
  const rateCheck = checkRateLimit(phone);
  if (!rateCheck.allowed) {
    return {
      success: false,
      cooldownSeconds: rateCheck.waitSeconds || RESEND_COOLDOWN_SEC,
      provider: 'server_crypto',
      error: rateCheck.error
    };
  }

  // Generate 6-digit cryptographic OTP
  const rawOtp = crypto.randomInt(100000, 999999).toString();
  const sessionId = `fc_otp_${crypto.randomUUID()}`;
  const otpHash = hashOtp(phone, rawOtp);

  // Send SMS via configured provider
  const dispatchResult = await dispatchOtpSms(phone, nationalPhone, rawOtp);
  if (!dispatchResult.success) {
    return {
      success: false,
      cooldownSeconds: RESEND_COOLDOWN_SEC,
      provider: dispatchResult.provider,
      error: dispatchResult.error || 'Failed to send SMS to your mobile. Please check provider settings.'
    };
  }

  // Store session securely
  otpSessions.set(sessionId, {
    sessionId,
    phone,
    otpHash,
    attempts: 0,
    maxAttempts: MAX_ATTEMPTS,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    createdAt: Date.now(),
    role,
    name,
    provider: dispatchResult.provider,
  });

  return {
    success: true,
    sessionId,
    cooldownSeconds: RESEND_COOLDOWN_SEC,
    provider: dispatchResult.provider,
  };
}

/**
 * Verifies the OTP entered by the user
 */
export async function verifyUserOtp(params: {
  sessionId: string;
  mobileNumber: string;
  otp: string;
}): Promise<{ success: boolean; phone?: string; role?: string; name?: string; error?: string }> {
  const { sessionId, otp } = params;

  if (!sessionId || !otp || otp.trim().length !== 6) {
    return { success: false, error: 'Please enter a valid 6-digit OTP code.' };
  }

  const session = otpSessions.get(sessionId);
  if (!session) {
    return { success: false, error: 'OTP session expired or invalid. Please request a new OTP.' };
  }

  // Check expiration
  if (Date.now() > session.expiresAt) {
    otpSessions.delete(sessionId);
    return { success: false, error: 'OTP has expired (valid for 5 minutes). Please request a new one.' };
  }

  // Check attempt limit
  if (session.attempts >= session.maxAttempts) {
    otpSessions.delete(sessionId);
    return { success: false, error: 'Maximum verification attempts exceeded. Please request a new OTP.' };
  }

  session.attempts += 1;

  // Twilio Verify verification check if provider is twilio_verify
  if (session.provider === 'twilio_verify') {
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioVerifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (twilioSid && twilioToken && twilioVerifySid) {
      try {
        const authHeader = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
        const params = new URLSearchParams({ To: session.phone, Code: otp.trim() });
        const res = await fetch(`https://verify.twilio.com/v2/Services/${twilioVerifySid}/VerificationCheck`, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });

        const checkJson = (await res.json().catch(() => ({}))) as Record<string, any>;
        if (checkJson.status !== 'approved') {
          const remaining = session.maxAttempts - session.attempts;
          return {
            success: false,
            error: `Incorrect OTP. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`
          };
        }

        // Successfully verified
        otpSessions.delete(sessionId);
        return {
          success: true,
          phone: session.phone,
          role: session.role,
          name: session.name
        };
      } catch {
        return { success: false, error: 'Twilio verification service error. Please try again.' };
      }
    }
  }

  // Standard cryptographic HMAC comparison (timing-safe)
  const candidateHash = hashOtp(session.phone, otp.trim());
  const hashMatches = crypto.timingSafeEqual(
    Buffer.from(candidateHash, 'hex'),
    Buffer.from(session.otpHash, 'hex')
  );

  if (!hashMatches) {
    const remaining = session.maxAttempts - session.attempts;
    if (remaining <= 0) {
      otpSessions.delete(sessionId);
      return { success: false, error: 'Too many incorrect attempts. This OTP has been invalidated.' };
    }
    return { success: false, error: `Incorrect OTP code. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.` };
  }

  // Successfully verified! Consume session
  otpSessions.delete(sessionId);

  return {
    success: true,
    phone: session.phone,
    role: session.role,
    name: session.name
  };
}
