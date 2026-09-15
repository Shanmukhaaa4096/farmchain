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

      // Seed initial demo mobile according to role
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

  // Handle Quick Demo Auto-fill
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
          ? 'VERIFY YOUR NUMBER'
          : authMode === 'signin'
          ? 'FARMCHAIN SECURE SIGN IN'
          : 'NEW PARTICIPANT REGISTRATION'
      }
      subtitle={step === 'otp' ? 'SMS OTP VERIFICATION' : 'MOBILE-NUMBER AUTHENTICATION // RBAC'}
      maxWidth="md"
    >
      <div className="space-y-4 font-mono text-xs">
        
        {/* Protected Action Context Alert */}
        {promptMessage && (
          <div className="p-3.5 bg-yellow-50 border-2 border-citrus-yellow text-ink-black space-y-1">
            <span className="font-bold text-tomato-red uppercase flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Please log in to continue:
            </span>
            <p className="text-[11px] text-gray-800 font-sans font-medium">
              {promptMessage}
            </p>
          </div>
        )}

        {/* Tab Switcher: LOGIN vs SIGN UP (only on phone step) */}
        {step === 'phone' && (
          <div className="grid grid-cols-2 border-2 border-ink-black bg-warm-cream p-1 gap-1">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage(null);
              }}
              className={`py-2 px-3 text-center font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-blue-crate text-paper-white shadow-brutal-sm'
                  : 'text-ink-black hover:bg-paper-white/60'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>LOGIN</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
              }}
              className={`py-2 px-3 text-center font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-citrus-yellow text-ink-black shadow-brutal-sm'
                  : 'text-ink-black hover:bg-paper-white/60'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>SIGN UP</span>
            </button>
          </div>
        )}

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border-2 border-tomato-red text-tomato-red font-mono text-[11px] flex items-start gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Selector (shown in phone step) */}
        {step === 'phone' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] font-bold text-gray-700 uppercase">
                {authMode === 'signup' ? 'SELECT YOUR REGISTERED ROLE *' : 'SELECT ACTIVE ROLE DESK'}
              </label>
              <span className="text-[10px] text-gray-500">
                {activeRole === 'farmer' ? '🌾 Cultivator / FPO' : activeRole === 'buyer' ? '🏢 Direct Buyer' : '🚚 Transporter'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onRoleChange('farmer')}
                className={`p-2.5 border-2 border-ink-black text-center font-heading font-black transition-all ${
                  activeRole === 'farmer' 
                    ? 'bg-green-beans text-paper-white shadow-brutal-sm -translate-y-0.5' 
                    : 'bg-paper-cream text-ink-black hover:bg-white'
                }`}
              >
                <Sprout className="w-4 h-4 mx-auto mb-1 text-citrus-yellow" />
                <span className="text-[11px] uppercase block tracking-tight">FARMER / FPO</span>
              </button>

              <button
                type="button"
                onClick={() => onRoleChange('buyer')}
                className={`p-2.5 border-2 border-ink-black text-center font-heading font-black transition-all ${
                  activeRole === 'buyer' 
                    ? 'bg-citrus-yellow text-ink-black shadow-brutal-sm -translate-y-0.5' 
                    : 'bg-paper-cream text-ink-black hover:bg-white'
                }`}
              >
                <Building2 className="w-4 h-4 mx-auto mb-1 text-blue-crate" />
                <span className="text-[11px] uppercase block tracking-tight">BUYER</span>
              </button>

              <button
                type="button"
                onClick={() => onRoleChange('logistics')}
                className={`p-2.5 border-2 border-ink-black text-center font-heading font-black transition-all ${
                  activeRole === 'logistics' 
                    ? 'bg-blue-crate text-paper-white shadow-brutal-sm -translate-y-0.5' 
                    : 'bg-paper-cream text-ink-black hover:bg-white'
                }`}
              >
                <Truck className="w-4 h-4 mx-auto mb-1 text-citrus-yellow" />
                <span className="text-[11px] uppercase block tracking-tight">LOGISTICS</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 1: ENTER MOBILE NUMBER ==================== */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                MOBILE NUMBER (INDIAN +91) *
              </label>
              <div className="flex">
                <span className="p-2.5 bg-gray-200 border-2 border-r-0 border-ink-black font-bold text-xs flex items-center gap-1.5 select-none text-ink-black">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91</span>
                </span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={13}
                  className="flex-1 p-2.5 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs font-mono"
                  required
                  autoFocus
                />
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">
                Standard 10-digit number (e.g. 98492 01842). We will send a 6-digit SMS OTP.
              </span>
            </div>

            {/* Optional Name / Business for Sign-up */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                  FULL NAME / ENTERPRISE ENTITY (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={
                    activeRole === 'farmer' 
                      ? 'e.g. Ramesh Reddy / Chevella FPO' 
                      : activeRole === 'buyer' 
                      ? 'e.g. UrbanFork Kitchens / Retail Desk' 
                      : 'e.g. Kisan Cold Reefer Fleet'
                  }
                  className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs"
                />
              </div>
            )}

            {/* Auto ID Provisioning Banner */}
            <div className="p-2.5 bg-blue-crate/10 border border-blue-crate text-ink-black text-[11px] space-y-0.5">
              <span className="font-bold uppercase text-blue-crate flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> SECURE OTP AUTHENTICATION:
              </span>
              <p className="text-gray-700 text-[10px]">
                Authentication uses standard SMS delivery. Validates your mobile identity directly with verified {activeRole.toUpperCase()} credentials.
              </p>
            </div>

            <Button 
              variant={authMode === 'signup' ? 'yellow' : 'primary'}
              fullWidth 
              size="md" 
              type="submit"
              disabled={isLoading}
              className="mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SENDING SECURE OTP...</span>
                </>
              ) : (
                <>
                  <span>SEND OTP →</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            {/* Quick 1-Click Demo Accounts Bar */}
            <div className="pt-2 border-t border-ink-black/20">
              <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">
                ONE-CLICK PRESET TEST PHONES:
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('farmer')}
                  className="p-1.5 bg-warm-cream border border-ink-black hover:bg-citrus-yellow font-bold text-left truncate"
                  title="Auto-fill 9849201842 (Farmer: Ramesh Reddy)"
                >
                  🌾 Farmer (+91 98492)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('buyer')}
                  className="p-1.5 bg-warm-cream border border-ink-black hover:bg-citrus-yellow font-bold text-left truncate"
                  title="Auto-fill 9876543210 (Buyer: UrbanFork)"
                >
                  🏢 Buyer (+91 98765)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('logistics')}
                  className="p-1.5 bg-warm-cream border border-ink-black hover:bg-citrus-yellow font-bold text-left truncate"
                  title="Auto-fill 9988776655 (Logistics: Kisan Cold)"
                >
                  🚚 Fleet (+91 99887)
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ==================== STEP 2: VERIFY YOUR NUMBER (6-DIGIT OTP) ==================== */}
        {step === 'otp' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Phone Display with Edit Button */}
            <div className="p-3 bg-warm-cream border-2 border-ink-black flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-bold text-gray-500 uppercase">
                  ENTER 6-DIGIT OTP SENT TO:
                </span>
                <span className="font-mono font-black text-sm text-ink-black">
                  {normalizedPhone.formatted || mobileNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setErrorMessage(null);
                }}
                className="text-[11px] font-bold text-blue-crate hover:underline flex items-center gap-1 p-1 bg-white border border-ink-black shadow-brutal-sm"
              >
                <Edit3 className="w-3 h-3" />
                <span>Change</span>
              </button>
            </div>

            {/* 6-Digit OTP Input */}
            <div className="py-2">
              <label className="block text-center text-[10px] font-bold text-gray-700 uppercase mb-3">
                ENTER 6-DIGIT OTP VERIFICATION CODE
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
            <div className="text-center space-y-1">
              {cooldown > 0 ? (
                <div className="text-gray-600 font-mono text-[11px]">
                  Didn&apos;t receive it? Resend OTP in{' '}
                  <strong className="text-ink-black font-black">{cooldown}s</strong>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="font-bold text-xs text-tomato-red hover:underline inline-flex items-center gap-1 font-mono uppercase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Resend OTP Now</span>
                </button>
              )}
            </div>

            {/* Verify CTA */}
            <Button
              variant="yellow"
              fullWidth
              size="md"
              type="button"
              disabled={isLoading || otpCode.length !== 6}
              onClick={() => handleVerifyOtp()}
              className="flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>VERIFYING OTP...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>VERIFY & CONTINUE →</span>
                </>
              )}
            </Button>

            <p className="text-[10px] text-gray-500 text-center font-mono">
              OTP expires in 5 minutes • Rate limited to prevent unauthorized attempts
            </p>
          </div>
        )}

        {/* ==================== STEP 3: SUCCESS SPLASH ==================== */}
        {step === 'success' && successUser && (
          <div className="p-6 bg-warm-cream border-2 border-ink-black text-center space-y-2.5 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-12 h-12 text-farm-green mx-auto" />
            <h4 className="font-heading font-black text-xl uppercase text-ink-black">
              VERIFICATION SUCCESSFUL
            </h4>
            <div className="font-mono text-xs text-gray-700">
              Authenticated: <strong className="text-farm-green">{successUser.name}</strong>
            </div>
            <div className="inline-block bg-blue-crate text-citrus-yellow px-3 py-1 font-mono text-xs font-bold border border-ink-black">
              {successUser.identifier}
            </div>
            <div className="text-[11px] text-gray-600 font-mono">
              +91 {successUser.mobileNumber} • {successUser.role.toUpperCase()}
            </div>
            <p className="text-[11px] text-gray-500 pt-1">
              Establishing session and returning to your action...
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
