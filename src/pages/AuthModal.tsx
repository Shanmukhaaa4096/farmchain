import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  AlertCircle,
  KeyRound,
  Loader2,
  RefreshCw,
  Edit3,
  Check,
  Sparkles
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { OtpInput } from '../components/auth/OtpInput';
import { UserRole, AuthUser } from '../types';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { z } from 'zod';

const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');

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
  const { isDemoMode, sendOtp, verifyOtp, quickLoginAs } = useAuth();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  
  // Phone and Profile inputs
  const [mobileNumber, setMobileNumber] = useState('9849201842');
  const [fullName, setFullName] = useState('');
  
  // OTP Verification state
  const [otpCode, setOtpCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  
  // UI & status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<AuthUser | null>(null);

  // Initialize or reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setStep('phone');
      setOtpCode('');
      setErrorMessage(null);
      setSuccessUser(null);
      setIsLoading(false);
      setAttemptCount(0);

      if (activeRole === 'farmer') {
        setMobileNumber('9849201842');
      } else if (activeRole === 'buyer') {
        setMobileNumber('9876543210');
      } else if (activeRole === 'admin') {
        setMobileNumber('9999999999');
      } else {
        setMobileNumber('9988776655');
      }
      setFullName('');
    }
  }, [isOpen, initialMode, activeRole]);

  // Resend Countdown Timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Quick Demo Auto-fill & Instant Login
  const handleQuickDemoFill = (role: UserRole) => {
    onRoleChange(role);
    setErrorMessage(null);
    setStep('phone');
    if (role === 'farmer') {
      setMobileNumber('9849201842');
    } else if (role === 'buyer') {
      setMobileNumber('9876543210');
    } else if (role === 'admin') {
      setMobileNumber('9999999999');
    } else {
      setMobileNumber('9988776655');
    }
  };

  const handleInstantQuickLogin = (role: UserRole) => {
    quickLoginAs(role);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const session = authService.getCurrentSession();
      if (session) {
        setSuccessUser(session);
        setStep('success');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(session);
          onClose();
        }, 600);
      }
    }, 200);
  };

  // Step 1: Send OTP Handler with Zod Validation
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanNumber = mobileNumber.replace(/\D/g, '').slice(-10);
    const parseResult = phoneSchema.safeParse(cleanNumber);

    if (!parseResult.success) {
      setErrorMessage(parseResult.error.issues[0]?.message || 'Invalid Indian mobile number.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendOtp(cleanNumber);
      setIsLoading(false);

      if (!response.success) {
        setErrorMessage(response.error || response.message || 'Failed to dispatch verification SMS.');
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

  // Step 2: Verify OTP Handler
  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = (codeToVerify || otpCode).trim();
    if (code.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    if (attemptCount >= 5) {
      setErrorMessage('Too many failed attempts. Please wait 60 seconds before trying again.');
      setCooldown(60);
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const cleanNumber = mobileNumber.replace(/\D/g, '').slice(-10);
      const response = await verifyOtp({
        phone: cleanNumber,
        otp: code,
        role: activeRole,
        name: fullName.trim() || undefined,
      });

      setIsLoading(false);

      if (!response.success || !response.user) {
        setAttemptCount(prev => prev + 1);
        setErrorMessage(response.error || 'Invalid OTP code. Please verify and try again.');
        return;
      }

      setSuccessUser(response.user);
      setStep('success');

      setTimeout(() => {
        if (onLoginSuccess && response.user) {
          onLoginSuccess(response.user);
        }
        onClose();
      }, 700);
    } catch {
      setIsLoading(false);
      setErrorMessage('Verification failed due to a network issue. Please retry.');
    }
  };

  // Resend OTP Action
  const handleResendOtp = async () => {
    if (cooldown > 0 || isLoading) return;
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const cleanNumber = mobileNumber.replace(/\D/g, '').slice(-10);
      const response = await sendOtp(cleanNumber);
      setIsLoading(false);

      if (!response.success) {
        setErrorMessage(response.error || 'Could not resend OTP. Please wait before trying again.');
        return;
      }

      setCooldown(30);
      setOtpCode('');
    } catch {
      setIsLoading(false);
      setErrorMessage('Failed to resend OTP. Please check your connection.');
    }
  };

  const normalizedPhone = authService.normalizeMobile(mobileNumber);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        step === 'otp'
          ? 'Verify Phone Number'
          : authMode === 'signin'
          ? 'Secure Account Sign In'
          : 'Create FarmChain Account'
      }
      subtitle={step === 'otp' ? 'Enter 6-digit SMS verification code' : 'Instant OTP verification • Zero broker fee guarantee'}
      maxWidth="md"
    >
      <div className="space-y-5 text-[#2F4A3A]">
        
        {/* Hackathon Demo OTP Banner */}
        {isDemoMode && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C77B58] shrink-0" />
              <span>
                <strong>Demo Mode Active:</strong> Enter fixed OTP code <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-300 text-amber-950">123456</strong>
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-amber-200/60 px-2 py-0.5 rounded font-bold">
              SIH Testing
            </span>
          </div>
        )}

        {/* Protected Action Context Alert */}
        {promptMessage && (
          <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 text-[#2F4A3A] space-y-1">
            <span className="font-semibold text-[#C77B58] uppercase flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Authentication Required:
            </span>
            <p className="text-xs text-[#536458] font-sans">
              {promptMessage}
            </p>
          </div>
        )}

        {/* Tab Switcher: LOGIN vs SIGN UP (only on phone step) */}
        {step === 'phone' && (
          <div className="grid grid-cols-2 rounded-2xl bg-[#F4EFE6]/80 p-1 border border-[#2F4A3A]/10">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage(null);
              }}
              className={`py-2 text-xs font-serif font-bold rounded-xl transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-[#2F4A3A] shadow-soft-sm'
                  : 'text-[#536458] hover:text-[#2F4A3A]'
              }`}
            >
              Sign In with Mobile
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
              }}
              className={`py-2 text-xs font-serif font-bold rounded-xl transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-[#2F4A3A] shadow-soft-sm'
                  : 'text-[#536458] hover:text-[#2F4A3A]'
              }`}
            >
              New Registration
            </button>
          </div>
        )}

        {/* Role Selector Tabs (Farmer / Buyer / Logistics) */}
        {step === 'phone' && (
          <div className="space-y-2">
            <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
              Select Account Persona:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('farmer')}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all text-center ${
                  activeRole === 'farmer'
                    ? 'border-[#C77B58] bg-[#C77B58]/10 text-[#2F4A3A] ring-2 ring-[#C77B58]/20 font-bold'
                    : 'border-[#2F4A3A]/10 bg-white hover:bg-[#F4EFE6]/40 text-[#536458]'
                }`}
              >
                <Sprout className={`w-5 h-5 mb-1 ${activeRole === 'farmer' ? 'text-[#C77B58]' : 'text-[#536458]'}`} />
                <span className="text-xs font-serif">Farmer</span>
                <span className="text-[10px] font-mono text-[#536458]">Kisan Desk</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoFill('buyer')}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all text-center ${
                  activeRole === 'buyer'
                    ? 'border-[#C77B58] bg-[#C77B58]/10 text-[#2F4A3A] ring-2 ring-[#C77B58]/20 font-bold'
                    : 'border-[#2F4A3A]/10 bg-white hover:bg-[#F4EFE6]/40 text-[#536458]'
                }`}
              >
                <Building2 className={`w-5 h-5 mb-1 ${activeRole === 'buyer' ? 'text-[#C77B58]' : 'text-[#536458]'}`} />
                <span className="text-xs font-serif">Buyer</span>
                <span className="text-[10px] font-mono text-[#536458]">Wholesale</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoFill('logistics')}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all text-center ${
                  activeRole === 'logistics'
                    ? 'border-[#C77B58] bg-[#C77B58]/10 text-[#2F4A3A] ring-2 ring-[#C77B58]/20 font-bold'
                    : 'border-[#2F4A3A]/10 bg-white hover:bg-[#F4EFE6]/40 text-[#536458]'
                }`}
              >
                <Truck className={`w-5 h-5 mb-1 ${activeRole === 'logistics' ? 'text-[#C77B58]' : 'text-[#536458]'}`} />
                <span className="text-xs font-serif">Fleet</span>
                <span className="text-[10px] font-mono text-[#536458]">Cold Chain</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: PHONE FORM */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                Mobile Number (Indian +91) *
              </label>
              <div className="flex rounded-2xl border border-[#2F4A3A]/15 bg-white overflow-hidden shadow-soft-sm focus-within:border-[#C77B58] focus-within:ring-2 focus-within:ring-[#C77B58]/10 transition-all">
                <span className="px-3.5 py-3 bg-[#F4EFE6]/60 text-[#536458] font-mono text-xs flex items-center gap-1.5 select-none border-r border-[#2F4A3A]/10">
                  <Phone className="w-3.5 h-3.5 text-[#2F4A3A]" />
                  <span>+91</span>
                </span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={13}
                  className="flex-1 px-4 py-3 bg-transparent text-[#2F4A3A] font-serif font-bold text-base focus:outline-none placeholder:text-[#536458]/40"
                  required
                  autoFocus
                />
              </div>
              <span className="text-[11px] text-[#536458] block">
                Standard 10-digit Indian mobile. A 6-digit SMS OTP will be generated.
              </span>
            </div>

            {/* Optional Name / Business for Sign-up */}
            {authMode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-semibold uppercase text-[#536458]">
                  Full Name / Legal Entity
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={
                    activeRole === 'farmer' 
                      ? 'e.g. Ramesh Reddy / Chevella FPO' 
                      : activeRole === 'buyer' 
                      ? 'e.g. UrbanFork Kitchens' 
                      : 'e.g. Kisan Cold Fleet'
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-[#2F4A3A]/15 bg-white text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10 shadow-soft-sm"
                />
              </div>
            )}

            <Button 
              variant="primary"
              size="lg" 
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 shadow-soft-sm text-xs tracking-wider uppercase font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>

            {/* Instant 1-Click Evaluation Profiles */}
            <div className="pt-3 border-t border-[#2F4A3A]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold uppercase text-[#536458]">
                  Instant 1-Click Test Personas:
                </span>
                <span className="text-[10px] font-mono text-[#C77B58] font-bold">
                  Bypasses SMS
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => handleInstantQuickLogin('farmer')}
                  className="p-2 rounded-xl bg-white border border-[#2F4A3A]/10 hover:border-[#C77B58] text-left truncate transition-colors"
                >
                  <span className="block font-bold text-[#2F4A3A]">Ramesh (Farmer)</span>
                  <span className="text-[10px] text-[#536458]">9849201842</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInstantQuickLogin('buyer')}
                  className="p-2 rounded-xl bg-white border border-[#2F4A3A]/10 hover:border-[#C77B58] text-left truncate transition-colors"
                >
                  <span className="block font-bold text-[#2F4A3A]">UrbanFork (Buyer)</span>
                  <span className="text-[10px] text-[#536458]">9876543210</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInstantQuickLogin('logistics')}
                  className="p-2 rounded-xl bg-white border border-[#2F4A3A]/10 hover:border-[#C77B58] text-left truncate transition-colors"
                >
                  <span className="block font-bold text-[#2F4A3A]">Cold Fleet</span>
                  <span className="text-[10px] text-[#536458]">9988776655</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInstantQuickLogin('admin')}
                  className="p-2 rounded-xl bg-white border border-[#2F4A3A]/10 hover:border-[#C77B58] text-left truncate transition-colors"
                >
                  <span className="block font-bold text-[#C77B58]">Admin Desk</span>
                  <span className="text-[10px] text-[#536458]">Security KYC</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 'otp' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Phone Display with Edit Button */}
            <div className="p-4 rounded-2xl bg-[#F4EFE6]/70 border border-[#2F4A3A]/10 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono uppercase text-[#536458] font-semibold">
                  OTP SENT TO NUMBER:
                </span>
                <span className="font-serif font-bold text-base text-[#2F4A3A]">
                  {normalizedPhone.formatted || mobileNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setErrorMessage(null);
                }}
                className="text-xs font-semibold text-[#2F4A3A] hover:underline flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#2F4A3A]/10 shadow-soft-sm"
              >
                <Edit3 className="w-3 h-3" />
                <span>Change</span>
              </button>
            </div>

            {/* 6-Digit OTP Input */}
            <div className="py-2">
              <label className="block text-center text-[10px] font-mono font-semibold uppercase text-[#536458] mb-3">
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
                disabled={isLoading}
              />
            </div>

            {/* Resend OTP & Countdown */}
            <div className="text-center">
              {cooldown > 0 ? (
                <div className="text-[#536458] font-mono text-xs">
                  Resend code in <strong className="text-[#2F4A3A]">{cooldown}s</strong>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="font-semibold text-xs text-[#C77B58] hover:underline inline-flex items-center gap-1 font-mono uppercase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>

            {/* Verify CTA */}
            <Button
              variant="primary"
              size="lg"
              type="button"
              disabled={isLoading || otpCode.length !== 6}
              onClick={() => handleVerifyOtp()}
              className="w-full shadow-soft-sm text-xs tracking-wider uppercase font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  <span>Verify &amp; Continue</span>
                </>
              )}
            </Button>
          </div>
        )}

        {/* STEP 3: SUCCESS SPLASH */}
        {step === 'success' && successUser && (
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-serif font-bold text-xl text-[#2F4A3A]">
              Authentication Verified
            </h4>
            <div className="text-xs text-[#536458]">
              Welcome, <strong className="text-[#2F4A3A]">{successUser.name}</strong>
            </div>
            <div className="inline-block bg-white text-[#2F4A3A] px-3 py-1 rounded-full font-mono text-xs font-bold border border-[#2F4A3A]/10 shadow-soft-sm">
              {successUser.identifier}
            </div>
            <p className="text-[11px] text-[#536458] pt-1">
              Establishing secure session...
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
