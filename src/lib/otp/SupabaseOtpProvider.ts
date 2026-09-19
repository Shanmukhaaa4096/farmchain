import { OtpProvider, OtpSendResult, OtpVerifyResult } from './types';
import { supabase } from '../supabase';

export class SupabaseOtpProvider implements OtpProvider {
  readonly mode = 'supabase' as const;

  async sendCode(phone: string): Promise<OtpSendResult> {
    try {
      // Normalize to E.164 with +91 if not present
      const clean = phone.replace(/\D/g, '');
      const e164 = clean.startsWith('91') && clean.length === 12 
        ? `+${clean}` 
        : `+91${clean.slice(-10)}`;

      const { error } = await supabase.auth.signInWithOtp({
        phone: e164,
      });

      if (error) {
        return {
          success: false,
          message: error.message || 'Failed to send SMS OTP.',
          error: error.message,
          isDemo: false,
        };
      }

      return {
        success: true,
        message: `OTP sent to ${e164} via Supabase Auth.`,
        isDemo: false,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Error communicating with Supabase SMS.',
        error: err.message,
        isDemo: false,
      };
    }
  }

  async verifyCode(phone: string, code: string): Promise<OtpVerifyResult> {
    try {
      const clean = phone.replace(/\D/g, '');
      const e164 = clean.startsWith('91') && clean.length === 12 
        ? `+${clean}` 
        : `+91${clean.slice(-10)}`;

      const { data, error } = await supabase.auth.verifyOtp({
        phone: e164,
        token: code.trim(),
        type: 'sms',
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Wrong code. Try again.',
          message: 'Wrong code. Try again.',
          isDemo: false,
        };
      }

      const user = data.user;
      return {
        success: true,
        isDemo: false,
        message: 'Phone verified successfully.',
        user: user ? {
          id: user.id,
          phone: user.phone || phone,
          email: user.email,
        } : undefined,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Error verifying OTP with Supabase.',
        isDemo: false,
      };
    }
  }
}
