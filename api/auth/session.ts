import type { IncomingMessage, ServerResponse } from 'http';
import { verifySessionToken } from './_utils.js';

export default async function handler(
  req: IncomingMessage & { body?: any; query?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  const sendJson = (statusCode: number, data: Record<string, unknown>) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.end(JSON.stringify(data));
  };

  if (req.method === 'OPTIONS') {
    return sendJson(200, { ok: true });
  }

  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    return sendJson(401, { success: false, authenticated: false, error: 'No session token provided' });
  }

  const verified = verifySessionToken(token);
  if (!verified.valid || !verified.payload) {
    return sendJson(401, { success: false, authenticated: false, error: 'Session expired or invalid' });
  }

  return sendJson(200, {
    success: true,
    authenticated: true,
    user: verified.payload,
  });
}
