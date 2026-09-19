import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/site';

const supabaseUrl = SUPABASE_URL || '';
const supabaseAnonKey = SUPABASE_ANON_KEY || '';

// Determine whether real Supabase configuration is present
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('https://')
);

// Demo OTP mode: Enabled explicitly or when Supabase keys are not yet configured
export const isDemoOtpMode = import.meta.env.VITE_DEMO_OTP === 'true' || !isSupabaseConfigured;

// Initialize Supabase client (using a fallback dummy URL if not configured to prevent startup crashes)
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://dummy-project.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'dummy-anon-key'
);

export interface OtpSendResult {
  success: boolean;
  isDemo: boolean;
  message: string;
  error?: string;
}

export interface OtpVerifyResult {
  success: boolean;
  isDemo: boolean;
  user?: {
    id: string;
    phone: string;
  };
  error?: string;
}

/**
 * Send OTP via Supabase SMS or Demo Adapter
 */
export async function sendOtpToPhone(phone: string): Promise<OtpSendResult> {
  // If demo mode is active, simulate instant dispatch
  if (isDemoOtpMode) {
    return {
      success: true,
      isDemo: true,
      message: 'Demo mode active: Use code 123456 to verify instantly.'
    };
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      return {
        success: false,
        isDemo: false,
        message: error.message,
        error: error.message,
      };
    }

    return {
      success: true,
      isDemo: false,
      message: `Verification code sent to ${phone}`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send OTP';
    return {
      success: false,
      isDemo: false,
      message,
      error: message,
    };
  }
}

/**
 * Verify OTP via Supabase Auth or Demo Adapter
 * NOTE: Demo mode NEVER grants admin access automatically.
 */
export async function verifyPhoneOtp(phone: string, token: string): Promise<OtpVerifyResult> {
  const cleanToken = token.trim();

  if (isDemoOtpMode) {
    if (cleanToken === '123456') {
      return {
        success: true,
        isDemo: true,
        user: {
          id: `usr_demo_${phone.replace(/\D/g, '').slice(-6)}`,
          phone,
        },
      };
    }
    return {
      success: false,
      isDemo: true,
      error: 'Invalid OTP. In demo mode, enter 123456.',
    };
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: cleanToken,
      type: 'sms',
    });

    if (error || !data.user) {
      return {
        success: false,
        isDemo: false,
        error: error?.message || 'Verification failed. Please check the code.',
      };
    }

    return {
      success: true,
      isDemo: false,
      user: {
        id: data.user.id,
        phone: data.user.phone || phone,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Verification error occurred';
    return {
      success: false,
      isDemo: false,
      error: message,
    };
  }
}
