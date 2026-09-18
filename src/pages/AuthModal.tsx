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
  UserPlus,
  Loader2,
  RefreshCw,
  Edit3,
  Check
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { OtpInput } from '../components/auth/OtpInput';
import { UserRole, AuthUser } from '../types';
import { authService } from '../services/authService';

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
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  
  // Phone and Profile inputs
  const [mobileNumber, setMobileNumber] = useState('9849201842');
  const [fullName, setFullName] = useState('');
  
  // OTP Verification state
  const [otpCode, setOtpCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [cooldown, setCooldown] = useState(0);
  
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
      setSessionId('');
      setErrorMessage(null);
      setSuccessUser(null);
      setIsLoading(false);

      if (activeRole === 'farmer') {
        setMobileNumber('9849201842');
      } else if (activeRole === 'buyer') {
        setMobileNumber('9876543210');
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

  // Quick Demo Auto-fill
  const handleQuickDemoFill = (role: UserRole) => {
    onRoleChange(role);
    setErrorMessage(null);
    setStep('phone');
    if (role === 'farmer') {
      setMobileNumber('9849201842');
    } else if (role === 'buyer') {
      setMobileNumber('9876543210');
    } else {
      setMobileNumber('9988776655');
    }
  };

  // Step 1: Send OTP Handler
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = authService.normalizeMobile(mobileNumber);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.sendOtp({
        mobileNumber: validation.national,
        role: activeRole,
        name: fullName.trim() || undefined,
        flow: authMode === 'signin' ? 'login' : 'signup',
      });

      setIsLoading(false);

      if (!response.success || !response.sessionId) {
        setErrorMessage(response.error || 'Failed to dispatch verification SMS. Please try again.');
        return;
      }

      setSessionId(response.sessionId);
      setCooldown(response.cooldownSeconds || 30);
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

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await authService.verifyOtp({
        mobileNumber,
        otp: code,
        sessionId,
        role: activeRole,
        name: fullName.trim() || undefined,
      });

      setIsLoading(false);

      if (!response.success || !response.user) {
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
      const response = await authService.sendOtp({
        mobileNumber,
        role: activeRole,
        name: fullName.trim() || undefined,
        flow: authMode === 'signin' ? 'login' : 'signup',
      });

      setIsLoading(false);

      if (!response.success || !response.sessionId) {
        setErrorMessage(response.error || 'Could not resend OTP. Please wait before trying again.');
        return;
      }

      setSessionId(response.sessionId);
      setCooldown(response.cooldownSeconds || 30);
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
      subtitle={step === 'otp' ? 'Enter 6-digit SMS verification code' : 'Instant OTP verification • Role-based access control'}
      maxWidth="md"
    >
      <div className="space-y-5 text-dark-text">
        
        {/* Protected Action Context Alert */}
        {promptMessage && (
          <div className="p-4 rounded-2xl bg-paper-bg border border-dark-text/10 text-dark-text space-y-1">
            <span className="font-semibold text-terracotta uppercase flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Authentication Required:
            </span>
            <p className="text-xs text-dark-text/80 font-sans">
              {promptMessage}
            </p>
          </div>
        )}

        {/* Tab Switcher: LOGIN vs SIGN UP (only on phone step) */}
        {step === 'phone' && (
          <div className="grid grid-cols-2 rounded-2xl bg-paper-bg/80 p-1 border border-dark-text/10">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage(null);
              }}
              className={`py-2 px-3 text-center text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-pure-white text-dark-text shadow-soft-sm'
                  : 'text-dark-text/60 hover:text-dark-text'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
              }}
              className={`py-2 px-3 text-center text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-pure-white text-dark-text shadow-soft-sm'
                  : 'text-dark-text/60 hover:text-dark-text'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>
        )}

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs flex items-start gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Selector (shown in phone step) */}
        {step === 'phone' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-mono uppercase font-semibold text-dark-text/60 text-[10px]">
                {authMode === 'signup' ? 'Select Participant Role *' : 'Select Active Desk'}
              </label>
              <span className="text-dark-text/40 text-[10px]">
                {activeRole === 'farmer' ? 'Smallholder / FPO' : activeRole === 'buyer' ? 'Commercial Buyer' : 'Reefer Transporter'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onRoleChange('farmer')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeRole === 'farmer' 
                    ? 'border-farm-green bg-pure-white text-dark-text shadow-soft-sm ring-2 ring-farm-green/15' 
                    : 'border-dark-text/10 bg-paper-bg/60 text-dark-text/70 hover:bg-pure-white'
                }`}
              >
                <Sprout className="w-4 h-4 mx-auto mb-1 text-farm-green" />
                <span className="text-xs font-semibold block">Farmer</span>
              </button>

              <button
                type="button"
                onClick={() => onRoleChange('buyer')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeRole === 'buyer' 
                    ? 'border-farm-green bg-pure-white text-dark-text shadow-soft-sm ring-2 ring-farm-green/15' 
                    : 'border-dark-text/10 bg-paper-bg/60 text-dark-text/70 hover:bg-pure-white'
                }`}
              >
                <Building2 className="w-4 h-4 mx-auto mb-1 text-farm-green" />
                <span className="text-xs font-semibold block">Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => onRoleChange('logistics')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeRole === 'logistics' 
                    ? 'border-farm-green bg-pure-white text-dark-text shadow-soft-sm ring-2 ring-farm-green/15' 
                    : 'border-dark-text/10 bg-paper-bg/60 text-dark-text/70 hover:bg-pure-white'
                }`}
              >
                <Truck className="w-4 h-4 mx-auto mb-1 text-farm-green" />
                <span className="text-xs font-semibold block">Logistics</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: ENTER MOBILE NUMBER */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
                Mobile Number (Indian +91) *
              </label>
              <div className="flex rounded-2xl border border-dark-text/15 bg-pure-white overflow-hidden shadow-soft-sm focus-within:border-farm-green focus-within:ring-2 focus-within:ring-farm-green/10 transition-all">
                <span className="px-3.5 py-3 bg-paper-bg/60 text-dark-text/60 font-mono text-xs flex items-center gap-1.5 select-none border-r border-dark-text/10">
                  <Phone className="w-3.5 h-3.5 text-farm-green" />
                  <span>+91</span>
                </span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={13}
                  className="flex-1 px-4 py-3 bg-transparent text-dark-text font-serif font-bold text-base focus:outline-none placeholder:text-dark-text/30"
                  required
                  autoFocus
                />
              </div>
              <span className="text-[11px] text-dark-text/50 block">
                Standard 10-digit Indian mobile. A 6-digit SMS OTP will be generated.
              </span>
            </div>

            {/* Optional Name / Business for Sign-up */}
            {authMode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
                  Full Name / Legal Entity (Optional)
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
                  className="w-full px-4 py-3 rounded-2xl border border-dark-text/15 bg-pure-white text-dark-text text-sm focus:outline-none focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 shadow-soft-sm"
                />
              </div>
            )}

            <Button 
              variant="clay"
              fullWidth 
              size="lg" 
              type="submit"
              disabled={isLoading}
              className="mt-3 shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold"
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

            {/* Quick 1-Click Demo Accounts Bar */}
            <div className="pt-3 border-t border-dark-text/10">
              <span className="block text-[10px] font-mono font-semibold uppercase text-dark-text/50 mb-2">
                One-Click Demo Test Numbers:
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('farmer')}
                  className="p-2 rounded-xl bg-paper-bg border border-dark-text/10 hover:bg-pure-white text-left truncate transition-colors"
                >
                  Farmer (98492)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('buyer')}
                  className="p-2 rounded-xl bg-paper-bg border border-dark-text/10 hover:bg-pure-white text-left truncate transition-colors"
                >
                  Buyer (98765)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('logistics')}
                  className="p-2 rounded-xl bg-paper-bg border border-dark-text/10 hover:bg-pure-white text-left truncate transition-colors"
                >
                  Logistics (99887)
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 'otp' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Phone Display with Edit Button */}
            <div className="p-4 rounded-2xl bg-paper-bg/70 border border-dark-text/10 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono uppercase text-dark-text/50 font-semibold">
                  OTP SENT TO NUMBER:
                </span>
                <span className="font-serif font-bold text-base text-dark-text">
                  {normalizedPhone.formatted || mobileNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setErrorMessage(null);
                }}
                className="text-xs font-semibold text-farm-green hover:underline flex items-center gap-1 px-3 py-1.5 rounded-full bg-pure-white border border-dark-text/10 shadow-soft-sm"
              >
                <Edit3 className="w-3 h-3" />
                <span>Change</span>
              </button>
            </div>

            {/* 6-Digit OTP Input */}
            <div className="py-2">
              <label className="block text-center text-[10px] font-mono font-semibold uppercase text-dark-text/60 mb-3">
                Enter 6-digit verification code
              </label>
              
              <OtpInput
                value={otpCode}
                onChange={(code) => {
                  setOtpCode(code);
                  if (errorMessage) setErrorMessage(null);
                }}
                onComplete={(completedCode) => {
                  handleVerifyOtp(completedCode);
                }}
                disabled={isLoading}
                hasError={Boolean(errorMessage)}
              />
            </div>

            {/* Resend OTP & Countdown */}
            <div className="text-center">
              {cooldown > 0 ? (
                <div className="text-dark-text/60 font-mono text-xs">
                  Resend code in <strong className="text-dark-text">{cooldown}s</strong>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="font-semibold text-xs text-terracotta hover:underline inline-flex items-center gap-1 font-mono uppercase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>

            {/* Verify CTA */}
            <Button
              variant="clay"
              fullWidth
              size="lg"
              type="button"
              disabled={isLoading || otpCode.length !== 6}
              onClick={() => handleVerifyOtp()}
              className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold"
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
          <div className="p-6 rounded-3xl bg-farm-green/10 border border-farm-green/20 text-center space-y-3 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-12 h-12 text-farm-green mx-auto" />
            <h4 className="font-serif font-bold text-xl text-dark-text">
              Authentication Verified
            </h4>
            <div className="text-xs text-dark-text/70">
              Welcome, <strong className="text-farm-green">{successUser.name}</strong>
            </div>
            <div className="inline-block bg-pure-white text-dark-text px-3 py-1 rounded-full font-mono text-xs font-bold border border-dark-text/10 shadow-soft-sm">
              {successUser.identifier}
            </div>
            <p className="text-[11px] text-dark-text/50 pt-1">
              Establishing secure session...
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
