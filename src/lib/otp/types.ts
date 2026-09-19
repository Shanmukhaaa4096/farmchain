export interface OtpSendResult {
  success: boolean;
  message: string;
  error?: string;
  isDemo?: boolean;
}

export interface OtpVerifyResult {
  success: boolean;
  message?: string;
  error?: string;
  isDemo?: boolean;
  user?: {
    id: string;
    phone: string;
    email?: string;
    role?: string;
    name?: string;
  };
}

export interface OtpProvider {
  readonly mode: 'supabase' | 'demo' | 'off';
  sendCode(phone: string): Promise<OtpSendResult>;
  verifyCode(phone: string, code: string): Promise<OtpVerifyResult>;
}
