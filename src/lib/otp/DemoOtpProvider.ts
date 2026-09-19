import { OtpProvider, OtpSendResult, OtpVerifyResult } from './types';

// Pre-created non-admin demo users mapping
const DEMO_ACCOUNTS: Record<string, { role: 'farmer' | 'buyer'; name: string; id: string }> = {
  '9849201842': {
    role: 'farmer',
    name: 'Ramesh Reddy',
    id: 'usr-farmer-demo-01',
  },
  '9876543210': {
    role: 'buyer',
    name: 'Priya Sharma',
    id: 'usr-buyer-demo-02',
  },
};

export class DemoOtpProvider implements OtpProvider {
  readonly mode = 'demo' as const;

  private getAllowedPhones(): string[] {
    const envPhones = import.meta.env.VITE_DEMO_PHONES as string | undefined;
    if (envPhones && envPhones.trim().length > 0) {
      return envPhones.split(',').map(p => p.trim().replace(/\D/g, '').slice(-10));
    }
    // Default pre-approved demo phones for Hackathon demo
    return ['9849201842', '9876543210'];
  }

  private cleanPhone(phone: string): string {
    return phone.replace(/\D/g, '').slice(-10);
  }

  async sendCode(phone: string): Promise<OtpSendResult> {
    const national = this.cleanPhone(phone);
    const allowed = this.getAllowedPhones();

    if (!allowed.includes(national)) {
      return {
        success: false,
        message: 'SMS login is not switched on in this demo. Please use email or Google.',
        error: 'SMS login is not switched on in this demo. Please use email or Google.',
        isDemo: true,
      };
    }

    // Prohibit admin numbers in demo OTP mode
    if (national === '9999999999') {
      return {
        success: false,
        message: 'Admin access is strictly disabled in demo OTP mode.',
        error: 'Admin access disabled in demo mode.',
        isDemo: true,
      };
    }

    return {
      success: true,
      message: 'Demo mode: Enter verification code 123456.',
      isDemo: true,
    };
  }

  async verifyCode(phone: string, code: string): Promise<OtpVerifyResult> {
    const national = this.cleanPhone(phone);
    const allowed = this.getAllowedPhones();

    if (!allowed.includes(national)) {
      return {
        success: false,
        message: 'SMS login is not switched on in this demo. Please use email or Google.',
        error: 'SMS login is not switched on in this demo. Please use email or Google.',
        isDemo: true,
      };
    }

    // Never create admin sessions in demo mode
    if (national === '9999999999') {
      return {
        success: false,
        error: 'Admin access cannot be granted via Demo OTP.',
        isDemo: true,
      };
    }

    const cleanCode = code.trim();
    if (cleanCode !== '123456') {
      return {
        success: false,
        message: 'Wrong code. Try again.',
        error: 'Wrong code. Try again.',
        isDemo: true,
      };
    }

    const demoMeta = DEMO_ACCOUNTS[national] || {
      role: 'farmer',
      name: `Demo User (${national.slice(-4)})`,
      id: `usr-demo-${national}`,
    };

    return {
      success: true,
      isDemo: true,
      message: 'Demo phone verified successfully.',
      user: {
        id: demoMeta.id,
        phone: national,
        role: demoMeta.role, // Strictly 'farmer' | 'buyer'
        name: demoMeta.name,
      },
    };
  }
}
