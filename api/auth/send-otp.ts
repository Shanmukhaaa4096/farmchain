import type { IncomingMessage, ServerResponse } from 'http';
import { normalizeIndianMobile, createOtpSession } from './_utils.ts';

export default async function handler(
  req: IncomingMessage & { body?: any; query?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  // Helper for JSON responses across Vercel & Node server
  const sendJson = (statusCode: number, data: Record<string, unknown>) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.end(JSON.stringify(data));
  };

  if (req.method === 'OPTIONS') {
    return sendJson(200, { ok: true });
  }

  if (req.method !== 'POST') {
    return sendJson(405, { success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (!body) {
      // Read raw stream if not parsed
      const buffers: Uint8Array[] = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawText = Buffer.concat(buffers).toString('utf8');
      try {
        body = JSON.parse(rawText);
      } catch {
        body = {};
      }
    }

    const { mobileNumber, role, name } = body || {};

    // Validate and normalize Indian mobile
    const phoneValidation = normalizeIndianMobile(mobileNumber);
    if (!phoneValidation.valid) {
      return sendJson(400, {
        success: false,
        error: phoneValidation.error || 'Please enter a valid 10-digit Indian mobile number.'
      });
    }

    // Create session and send SMS
    const result = await createOtpSession({
      phone: phoneValidation.normalized,
      nationalPhone: phoneValidation.national,
      role: role || 'farmer',
      name: name?.trim(),
    });

    if (!result.success) {
      return sendJson(429, {
        success: false,
        error: result.error,
        cooldownSeconds: result.cooldownSeconds
      });
    }

    // Success: Return session metadata. Never expose the OTP!
    return sendJson(200, {
      success: true,
      message: `OTP sent successfully to ${phoneValidation.normalized.replace(/(\+\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}`,
      sessionId: result.sessionId,
      cooldownSeconds: result.cooldownSeconds,
      provider: result.provider,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return sendJson(500, {
      success: false,
      error: message || 'Failed to dispatch verification code. Please try again.'
    });
  }
}
