import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Mail,
  AlertCircle,
  Loader2,
  RefreshCw,
  Edit3,
  Check,
  Sparkles,
  Lock,
  User,
  MapPin
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { OtpInput } from '../components/auth/OtpInput';
import { UserRole, AuthUser } from '../types';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { z } from 'zod';

const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
const emailSchema = z.string().email('Please enter a valid email address.');

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  promptMessage?: string;
  onLoginSuccess?: (user: AuthUser) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  activeRole,
  onRoleChange,
  promptMessage,
  onLoginSuccess,
  initialMode = 'signin'
}) => {
  const { isDemoMode, sendOtp, verifyOtp, quickLoginAs, updateProfile } = useAuth();

  // Tab: 'phone' | 'email' | 'google'
  const [activeTab, setActiveTab] = useState<'phone' | 'email' | 'google'>('phone');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);
  
  // Step: 'credentials' | 'otp' | 'setup' | 'success'
  const [step, setStep] = useState<'credentials' | 'otp' | 'setup' | 'success'>('credentials');
  
  // Phone inputs
  const [mobileNumber, setMobileNumber] = useState('9849201842');
  
  // Email inputs
  const [emailAddress, setEmailAddress] = useState('');
  const [emailPassword, setEmailPassword] = useState('');

  // Account Setup inputs (run after first login)
  const [setupRole, setSetupRole] = useState<'farmer' | 'buyer'>(activeRole === 'buyer' ? 'buyer' : 'farmer');
  const [setupName, setSetupName] = useState('');
  const [setupVillageCity, setSetupVillageCity] = useState('');
  const [setupDistrict, setSetupDistrict] = useState('');
  const [setupState, setSetupState] = useState('');
  const [setupBusiness, setSetupBusiness] = useState('');

  // OTP Verification state
  const [otpCode, setOtpCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  
  // UI & status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<AuthUser | null>(null);

  // Initialize or reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setStep('credentials');
      setActiveTab('phone');
      setOtpCode('');
      setErrorMessage(null);
      setSuccessUser(null);
      setIsLoading(false);
      setAttemptCount(0);
      setLockoutTimer(0);

      if (activeRole === 'buyer') {
        setMobileNumber('9876543210');
        setSetupRole('buyer');
      } else {
        setMobileNumber('9849201842');
        setSetupRole('farmer');
      }
    }
  }, [isOpen, initialMode, activeRole]);

  // Resend countdown timer (30s)
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Lockout countdown timer (60s after 5 wrong attempts)
  useEffect(() => {
    if (lockoutTimer <= 0) return;
    const interval = setInterval(() => {
      setLockoutTimer(prev => {
        if (prev <= 1) {
          setAttemptCount(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  // 1-Click Demo Login (Farmer or Buyer ONLY — Never Admin)
  const handleDemoLogin = (role: 'farmer' | 'buyer') => {
    onRoleChange(role);
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      quickLoginAs(role);
      setIsLoading(false);
      const session = authService.getCurrentSession();
      if (session) {
        setSuccessUser(session);
        setStep('success');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(session);
          onClose();
        }, 700);
      }
    }, 300);
  };

  // Step 1: Send OTP Handler with +91 and 10-digit validation
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (lockoutTimer > 0) {
      setErrorMessage(`Account locked due to too many attempts. Please wait ${lockoutTimer} seconds.`);
      return;
    }

    const cleanNumber = mobileNumber.replace(/\D/g, '').slice(-10);
    const parseResult = phoneSchema.safeParse(cleanNumber);

    if (!parseResult.success) {
      setErrorMessage(parseResult.error.issues[0]?.message || 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendOtp(cleanNumber);
      setIsLoading(false);

      if (!response.success) {
        setErrorMessage(response.error || response.message || 'SMS login is not switched on in this demo. Please use email or Google.');
        return;
      }

      setCooldown(30);
      setStep('otp');
      setOtpCode('');
    } catch {
      setIsLoading(false);
      setErrorMessage('Connection error while sending OTP. Please try again.');
    }
  };

  // Step 2: Verify OTP Handler with max 5 attempts lockout
  const handleVerifyOtp = async (codeToVerify?: string) => {
    if (lockoutTimer > 0) {
      setErrorMessage(`Too many wrong attempts. Locked for ${lockoutTimer}s.`);
      return;
    }

    const code = (codeToVerify || otpCode).trim();
    if (code.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the code.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const cleanNumber = mobileNumber.replace(/\D/g, '').slice(-10);
      const response = await verifyOtp({
        phone: cleanNumber,
        otp: code,
        role: setupRole,
      });

      setIsLoading(false);

      if (!response.success || !response.user) {
        const nextAttempts = attemptCount + 1;
        setAttemptCount(nextAttempts);

        if (nextAttempts >= 5) {
          setLockoutTimer(60);
          setErrorMessage('Too many wrong attempts. Account locked for 60 seconds.');
        } else {
          setErrorMessage('Wrong code. Try again.');
        }
        return;
      }

      // Check if user requires account setup
      const isNew = !response.user.location || response.user.location.includes('National Highway') || response.user.name === 'Kisan Producer';
      if (isNew) {
        setSuccessUser(response.user);
        setStep('setup');
      } else {
        setSuccessUser(response.user);
        setStep('success');
        setTimeout(() => {
          if (onLoginSuccess && response.user) {
            onLoginSuccess(response.user);
          }
          onClose();
        }, 700);
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Verification failed due to a network issue. Please retry.');
    }
  };

  // Resend OTP Action
  const handleResendOtp = async () => {
    if (cooldown > 0 || isLoading || lockoutTimer > 0) return;
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const cleanNumber = mobileNumber.replace(/\D/g, '').slice(-10);
      const response = await sendOtp(cleanNumber);
      setIsLoading(false);

      if (!response.success) {
        setErrorMessage(response.error || 'Could not resend code. Please wait.');
        return;
      }

      setCooldown(30);
      setOtpCode('');
    } catch {
      setIsLoading(false);
      setErrorMessage('Failed to resend code. Please check your connection.');
    }
  };

  // Handle Email Login / Sign-up
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailCheck = emailSchema.safeParse(emailAddress);
    if (!emailCheck.success) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!emailPassword || emailPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const mockEmailUser: AuthUser = {
        id: `usr-email-${emailAddress.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}`,
        username: emailAddress.split('@')[0],
        email: emailAddress,
        mobileNumber: '9849201842',
        role: setupRole,
        name: emailAddress.split('@')[0],
        identifier: setupRole === 'farmer' ? 'KISAN: DIRECT' : 'BUYER: DIRECT',
        organization: setupRole === 'farmer' ? 'Individual Farm' : 'Direct Consumer',
        location: 'Telangana',
        verificationStatus: 'unverified',
        createdAt: new Date().toISOString(),
      };

      authService.setSession(mockEmailUser);
      setSuccessUser(mockEmailUser);
      setStep('setup');
    }, 600);
  };

  // Handle Google Login Simulation
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const googleUser: AuthUser = {
        id: 'usr-google-8819',
        username: 'google_user',
        email: 'user@gmail.com',
        mobileNumber: '9849201842',
        role: setupRole,
        name: 'Google Verified User',
        identifier: setupRole === 'farmer' ? 'KISAN: GOOGLE' : 'BUYER: GOOGLE',
        organization: 'Direct Account',
        location: 'Hyderabad, Telangana',
        verificationStatus: 'unverified',
        createdAt: new Date().toISOString(),
      };

      authService.setSession(googleUser);
      setSuccessUser(googleUser);
      setStep('setup');
    }, 600);
  };

  // Handle Account Setup Completion
  const handleCompleteSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsLoading(true);
    try {
      const locationStr = [setupVillageCity, setupDistrict, setupState].filter(Boolean).join(', ') || 'Local Village';
      const updated = await updateProfile({
        name: setupName.trim(),
        role: setupRole,
        location: locationStr,
        organization: setupBusiness.trim() || (setupRole === 'farmer' ? 'Independent Smallholder Farm' : 'Direct Consumer'),
      });

      setIsLoading(false);
      setSuccessUser(updated);
      setStep('success');

      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(updated);
        onClose();
      }, 700);
    } catch {
      setIsLoading(false);
      setErrorMessage('Could not update profile. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        step === 'otp'
          ? 'Verify Phone Number'
          : step === 'setup'
          ? 'Set Up Your Account'
          : 'Log In to FarmChain'
      }
      subtitle={
        step === 'otp'
          ? 'Enter 6-digit SMS verification code'
          : step === 'setup'
          ? 'Quick 1-minute profile setup to buy or sell'
          : 'Direct farm-to-buyer marketplace with zero broker fees'
      }
      maxWidth="md"
    >
      <div className="space-y-5 text-[#2F4A3A]">
        
        {/* Visible Demo Mode Banner (Required by Part B #1) */}
        {isDemoMode && (
          <div className="p-3.5 rounded-2xl bg-[#E5B94A]/20 border border-[#E5B94A]/40 text-[#2F4A3A] text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C77B58] shrink-0" />
              <span>
                <strong>Demo mode active:</strong> SMS login is configured with code <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#2F4A3A]/20 font-bold">123456</strong>
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#2F4A3A] text-white px-2 py-0.5 rounded font-bold">
              Demo
            </span>
          </div>
        )}

        {/* Protected Action Context Alert */}
        {promptMessage && (
          <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 text-[#2F4A3A] space-y-1">
            <span className="font-semibold text-[#C77B58] uppercase flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Login Required:
            </span>
            <p className="text-xs text-[#536458] font-sans">
              {promptMessage}
            </p>
          </div>
        )}

        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Lockout Notification Banner */}
        {lockoutTimer > 0 && (
          <div className="p-3.5 rounded-2xl bg-red-100 border border-red-300 text-red-900 text-xs font-mono font-bold flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-600" />
            <span>Too many wrong attempts. Locked for {lockoutTimer}s.</span>
          </div>
        )}

        {/* STEP 1: CREDENTIALS TABS (Phone / Email / Google) */}
        {step === 'credentials' && (
          <div className="space-y-4">
            {/* 3 Tabs: Phone, Email, Google */}
            <div className="grid grid-cols-3 rounded-2xl bg-[#F4EFE6] p-1 border border-[#2F4A3A]/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('phone');
                  setErrorMessage(null);
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
                  activeTab === 'phone'
                    ? 'bg-white text-[#2F4A3A] shadow-soft-sm font-bold'
                    : 'text-[#536458] hover:text-[#2F4A3A]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone OTP</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('email');
                  setErrorMessage(null);
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
                  activeTab === 'email'
                    ? 'bg-white text-[#2F4A3A] shadow-soft-sm font-bold'
                    : 'text-[#536458] hover:text-[#2F4A3A]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('google');
                  setErrorMessage(null);
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
                  activeTab === 'google'
                    ? 'bg-white text-[#2F4A3A] shadow-soft-sm font-bold'
                    : 'text-[#536458] hover:text-[#2F4A3A]'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google</span>
              </button>
            </div>

            {/* TAB CONTENT: PHONE */}
            {activeTab === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono font-semibold uppercase text-[#536458]">
                    Enter Indian Mobile Number *
                  </label>
                  <div className="flex rounded-2xl border border-[#2F4A3A]/15 bg-white overflow-hidden shadow-soft-sm focus-within:border-[#C77B58] focus-within:ring-2 focus-within:ring-[#C77B58]/10 transition-all">
                    <span className="px-3.5 py-3 bg-[#F4EFE6]/60 text-[#536458] font-mono text-sm flex items-center gap-1.5 select-none border-r border-[#2F4A3A]/10 font-bold">
                      <Phone className="w-3.5 h-3.5 text-[#2F4A3A]" />
                      <span>+91</span>
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit number (e.g. 9849201842)"
                      maxLength={10}
                      className="flex-1 px-4 py-3 bg-transparent text-[#2F4A3A] font-serif font-bold text-base sm:text-lg focus:outline-none placeholder:text-[#536458]/40"
                      required
                      autoFocus
                    />
                  </div>
                  <span className="text-[11px] text-[#536458] block">
                    Must start with 6, 7, 8, or 9. We will send a 6-digit code.
                  </span>
                </div>

                <Button 
                  variant="clay"
                  size="lg" 
                  type="submit"
                  disabled={isLoading || lockoutTimer > 0}
                  className="w-full mt-2 shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[48px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send 6-Digit Code</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* TAB CONTENT: EMAIL */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono font-semibold uppercase text-[#536458]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-2xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-base focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10 shadow-soft-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono font-semibold uppercase text-[#536458]">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-base focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10 shadow-soft-sm"
                    required
                  />
                </div>

                <Button 
                  variant="clay"
                  size="lg" 
                  type="submit"
                  disabled={isLoading}
                  className="w-full shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[48px]"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <span>Sign In with Email</span>
                  )}
                </Button>
              </form>
            )}

            {/* TAB CONTENT: GOOGLE */}
            {activeTab === 'google' && (
              <div className="space-y-4 pt-2 text-center">
                <p className="text-xs text-[#536458]">
                  Sign in instantly using your verified Google account.
                </p>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white border border-[#2F4A3A]/20 hover:bg-[#F4EFE6]/50 transition-all flex items-center justify-center gap-3 font-semibold text-sm text-[#2F4A3A] shadow-soft-sm min-h-[48px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            )}

            {/* TWO DEMO BUTTONS (Strictly NO demo admin button, per Part B #2) */}
            <div className="pt-4 border-t border-[#2F4A3A]/10">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono font-semibold uppercase text-[#536458]">
                  Demo Quick Testing (No password needed):
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('farmer')}
                  disabled={isLoading}
                  className="p-3 rounded-2xl bg-white border border-[#2F4A3A]/15 hover:border-[#2F4A3A] text-left transition-all shadow-soft-sm flex items-center gap-2.5 min-h-[44px]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2F4A3A]/10 flex items-center justify-center text-[#2F4A3A] shrink-0">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-xs text-[#2F4A3A]">Try as demo Farmer</span>
                    <span className="text-[10px] text-[#536458]">Ramesh Reddy (Chevella)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('buyer')}
                  disabled={isLoading}
                  className="p-3 rounded-2xl bg-white border border-[#2F4A3A]/15 hover:border-[#C77B58] text-left transition-all shadow-soft-sm flex items-center gap-2.5 min-h-[44px]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C77B58]/10 flex items-center justify-center text-[#C77B58] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-xs text-[#2F4A3A]">Try as demo Buyer</span>
                    <span className="text-[10px] text-[#536458]">Priya / UrbanFork</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: VERIFY OTP (shadcn 6-digit Input OTP with auto-advance & paste) */}
        {step === 'otp' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Phone Display with "Change number" link (Part B #3) */}
            <div className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono uppercase text-[#536458] font-semibold">
                  CODE SENT TO:
                </span>
                <span className="font-serif font-bold text-base text-[#2F4A3A]">
                  +91 {mobileNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setErrorMessage(null);
                }}
                className="text-xs font-semibold text-[#2F4A3A] hover:underline flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#2F4A3A]/10 shadow-soft-sm min-h-[44px]"
              >
                <Edit3 className="w-3 h-3" />
                <span>Change number</span>
              </button>
            </div>

            {/* 6-Digit OTP Input */}
            <div className="py-2">
              <label className="block text-center text-[11px] font-mono font-semibold uppercase text-[#536458] mb-3">
                Enter 6-digit verification code
              </label>
              
              <OtpInput
                value={otpCode}
                onChange={(code) => {
                  setOtpCode(code);
                  if (errorMessage) setErrorMessage(null);
                  if (code.length === 6) {
                    handleVerifyOtp(code);
                  }
                }}
                disabled={isLoading || lockoutTimer > 0}
              />
            </div>

            {/* 30s Resend Timer with Countdown (Part B #3) */}
            <div className="text-center">
              {cooldown > 0 ? (
                <div className="text-[#536458] font-mono text-xs">
                  Resend code in <strong className="text-[#2F4A3A]">{cooldown}s</strong>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading || lockoutTimer > 0}
                  className="font-semibold text-xs text-[#C77B58] hover:underline inline-flex items-center gap-1 font-mono uppercase min-h-[44px]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Resend code</span>
                </button>
              )}
            </div>

            {/* Verify CTA */}
            <Button
              variant="clay"
              size="lg"
              type="button"
              disabled={isLoading || otpCode.length !== 6 || lockoutTimer > 0}
              onClick={() => handleVerifyOtp()}
              className="w-full shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[48px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  <span>Verify and Continue</span>
                </>
              )}
            </Button>
          </div>
        )}

        {/* STEP 3: ACCOUNT SETUP (Part B #4) */}
        {step === 'setup' && (
          <form onSubmit={handleCompleteSetup} className="space-y-4 animate-in fade-in">
            <div className="p-3.5 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 text-xs text-[#536458]">
              Welcome! Please fill in your basic details to set up your account.
            </div>

            {/* Role Selection */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                I want to *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSetupRole('farmer')}
                  className={`p-3 rounded-2xl border text-center transition-all min-h-[44px] ${
                    setupRole === 'farmer'
                      ? 'border-[#2F4A3A] bg-[#2F4A3A] text-white font-bold'
                      : 'border-[#2F4A3A]/15 bg-white text-[#2F4A3A]'
                  }`}
                >
                  Sell My Crops (Farmer)
                </button>
                <button
                  type="button"
                  onClick={() => setSetupRole('buyer')}
                  className={`p-3 rounded-2xl border text-center transition-all min-h-[44px] ${
                    setupRole === 'buyer'
                      ? 'border-[#2F4A3A] bg-[#2F4A3A] text-white font-bold'
                      : 'border-[#2F4A3A]/15 bg-white text-[#2F4A3A]'
                  }`}
                >
                  Buy Fresh Crops (Buyer)
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                Full Name *
              </label>
              <input
                type="text"
                value={setupName}
                onChange={(e) => setSetupName(e.target.value)}
                placeholder={setupRole === 'farmer' ? 'e.g. Ramesh Reddy' : 'e.g. Priya Sharma'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-sm focus:outline-none focus:border-[#2F4A3A]"
                required
              />
            </div>

            {/* Village / City & District */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                  {setupRole === 'farmer' ? 'Village' : 'City'} *
                </label>
                <input
                  type="text"
                  value={setupVillageCity}
                  onChange={(e) => setSetupVillageCity(e.target.value)}
                  placeholder="e.g. Chevella"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-sm focus:outline-none focus:border-[#2F4A3A]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                  District *
                </label>
                <input
                  type="text"
                  value={setupDistrict}
                  onChange={(e) => setSetupDistrict(e.target.value)}
                  placeholder="e.g. Ranga Reddy"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-sm focus:outline-none focus:border-[#2F4A3A]"
                  required
                />
              </div>
            </div>

            {/* State & Business / Farm Group */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                  State *
                </label>
                <input
                  type="text"
                  value={setupState}
                  onChange={(e) => setSetupState(e.target.value)}
                  placeholder="e.g. Telangana"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-sm focus:outline-none focus:border-[#2F4A3A]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                  {setupRole === 'farmer' ? 'Producer Group (Optional)' : 'Shop / Kitchen Name'}
                </label>
                <input
                  type="text"
                  value={setupBusiness}
                  onChange={(e) => setSetupBusiness(e.target.value)}
                  placeholder="Optional"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-sm focus:outline-none focus:border-[#2F4A3A]"
                />
              </div>
            </div>

            <Button
              variant="clay"
              size="lg"
              type="submit"
              disabled={isLoading}
              className="w-full shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[48px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <span>Complete Account Setup →</span>
              )}
            </Button>
          </form>
        )}

        {/* STEP 4: SUCCESS SPLASH */}
        {step === 'success' && successUser && (
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-serif font-bold text-xl text-[#2F4A3A]">
              Welcome to FarmChain
            </h4>
            <div className="text-xs text-[#536458]">
              Signed in as <strong className="text-[#2F4A3A]">{successUser.name}</strong> ({successUser.role.toUpperCase()})
            </div>
            <p className="text-[11px] text-[#536458] pt-1">
              Opening your personalized dashboard...
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
