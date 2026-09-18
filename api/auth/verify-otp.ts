import type { IncomingMessage, ServerResponse } from 'http';
import { normalizeIndianMobile, verifyUserOtp, signSessionToken } from './_utils.js';

function generateRoleIdentifier(role: string): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const suffix = Math.floor(10 + Math.random() * 90);
  switch (role) {
    case 'buyer':
      return `GSTIN: 36AAACU${randomDigits}K1Z${suffix}`;
    case 'logistics':
      return `FLEET: TS-08-NP-${randomDigits}`;
    case 'farmer':
    default:
      return `KISAN: TS-RR-${randomDigits}${suffix}`;
  }
}

function getDefaultName(role: string, phone: string, providedName?: string): string {
  if (providedName && providedName.trim()) {
    return providedName.trim();
  }
  const lastFour = phone.slice(-4);
  switch (role) {
    case 'buyer':
      return `Buyer Partner (${lastFour})`;
    case 'logistics':
      return `Fleet Operator (${lastFour})`;
    case 'farmer':
    default:
      return `Kisan Cultivator (${lastFour})`;
  }
}

export default async function handler(
  req: IncomingMessage & { body?: any; query?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
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

    const { mobileNumber, otp, sessionId, role, name } = body || {};

    const phoneValidation = normalizeIndianMobile(mobileNumber);
    if (!phoneValidation.valid) {
      return sendJson(400, {
        success: false,
        error: phoneValidation.error || 'Invalid mobile number.'
      });
    }

    // Verify OTP against session
    const verification = await verifyUserOtp({
      sessionId,
      mobileNumber: phoneValidation.normalized,
      otp: String(otp || '').trim(),
    });

    if (!verification.success) {
      return sendJson(400, {
        success: false,
        error: verification.error || 'Verification failed.'
      });
    }

    const assignedRole = role || verification.role || 'farmer';
    const nationalNumber = phoneValidation.national;
    const finalName = getDefaultName(assignedRole, nationalNumber, name || verification.name);
    const identifier = generateRoleIdentifier(assignedRole);
    const userId = `usr_${assignedRole}_${nationalNumber}`;

    // Generate signed 30-day session token
    const token = signSessionToken({
      uid: userId,
      mobileNumber: nationalNumber,
      role: assignedRole,
      name: finalName,
      identifier,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });

    const authUser = {
      id: userId,
      username: `kisan_${nationalNumber.slice(-4)}`,
      mobileNumber: nationalNumber,
      role: assignedRole,
      name: finalName,
      identifier,
      organization: assignedRole === 'farmer' ? 'Chevella Village FPO' : assignedRole === 'buyer' ? 'Direct Procurement Desk' : 'Verified Reefer Carrier',
      location: assignedRole === 'farmer' ? 'Chevella, Telangana' : assignedRole === 'buyer' ? 'Hyderabad Central Terminal' : 'Telangana Transit Fleet',
      createdAt: new Date().toISOString(),
    };

    return sendJson(200, {
      success: true,
      message: 'Mobile number verified successfully.',
      token,
      user: authUser,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal verification error';
    return sendJson(500, {
      success: false,
      error: message || 'Verification failed. Please try again.'
    });
  }
}
