import { OtpProvider } from './types';
import { SupabaseOtpProvider } from './SupabaseOtpProvider';
import { DemoOtpProvider } from './DemoOtpProvider';

const envMode = (import.meta.env.VITE_OTP_MODE || 'demo').toLowerCase();

export class OffOtpProvider implements OtpProvider {
  readonly mode = 'off' as const;

  async sendCode(): Promise<{ success: boolean; message: string; isDemo: boolean }> {
    return {
      success: false,
      message: 'Phone OTP login is disabled. Please use email or Google.',
      isDemo: false,
    };
  }

  async verifyCode(): Promise<{ success: boolean; error: string; isDemo: boolean }> {
    return {
      success: false,
      error: 'Phone OTP login is disabled.',
      isDemo: false,
    };
  }
}

export const otpProvider: OtpProvider = (() => {
  if (envMode === 'supabase') {
    return new SupabaseOtpProvider();
  }
  if (envMode === 'off') {
    return new OffOtpProvider();
  }
  return new DemoOtpProvider();
})();

export const isDemoOtpMode = otpProvider.mode === 'demo';
export const isOtpDisabled = otpProvider.mode === 'off';

export * from './types';
export { SupabaseOtpProvider } from './SupabaseOtpProvider';
export { DemoOtpProvider } from './DemoOtpProvider';
