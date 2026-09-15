import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  UserCheck,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  KeyRound,
  UserPlus
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
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
  
  // Sign In State
  const [loginIdentifier, setLoginIdentifier] = useState('ramesh_farmer');
  const [loginPassword, setLoginPassword] = useState('password123');
  
  // Sign Up State (Username, Password, Mobile Number as required by user)
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupName, setSignupName] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<AuthUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode if initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setSuccessUser(null);
      setIsSubmitting(false);
      setShowPassword(false);
      
      // Seed initial login identifier based on activeRole
      if (activeRole === 'farmer') {
        setLoginIdentifier('ramesh_farmer');
      } else if (activeRole === 'buyer') {
        setLoginIdentifier('urbanfork_buyer');
      } else {
        setLoginIdentifier('kisan_logistics');
      }
      setLoginPassword('password123');
    }
  }, [isOpen, activeRole]);

  // Handle Quick Demo Auto-fill
  const handleQuickDemoFill = (role: UserRole) => {
    onRoleChange(role);
    setAuthMode('signin');
    setErrorMessage(null);
    if (role === 'farmer') {
      setLoginIdentifier('ramesh_farmer');
      setLoginPassword('password123');
    } else if (role === 'buyer') {
      setLoginIdentifier('urbanfork_buyer');
      setLoginPassword('password123');
    } else {
      setLoginIdentifier('kisan_logistics');
      setLoginPassword('password123');
    }
  };

  // Sign In Handler
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = authService.login({
      identifier: loginIdentifier,
      password: loginPassword,
      role: activeRole,
    });

    setIsSubmitting(false);

    if (!result.success || !result.user) {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
      return;
    }

    setSuccessUser(result.user);
    setTimeout(() => {
      if (onLoginSuccess && result.user) {
        onLoginSuccess(result.user);
      }
      onClose();
    }, 700);
  };

  // Sign Up Handler
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = authService.signUp({
      username: signupUsername,
      password: signupPassword,
      mobileNumber: signupMobile,
      role: activeRole,
      name: signupName.trim() || undefined,
    });

    setIsSubmitting(false);

    if (!result.success || !result.user) {
      setErrorMessage(result.error || 'Sign-up failed. Please check form inputs.');
      return;
    }

    setSuccessUser(result.user);
    setTimeout(() => {
      if (onLoginSuccess && result.user) {
        onLoginSuccess(result.user);
      }
      onClose();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={authMode === 'signin' ? 'FARMCHAIN VERIFIED SIGN IN' : 'NEW PARTICIPANT REGISTRATION'}
      subtitle="IDENTITY // ROLE-BASED ACCESS CONTROL (RBAC)"
      maxWidth="md"
    >
      <div className="space-y-5 font-mono text-xs">
        
        {/* Protected Action Context Alert (Shown when user is gated from action) */}
        {promptMessage && (
          <div className="p-3.5 bg-yellow-50 border-2 border-citrus-yellow text-ink-black space-y-1">
            <span className="font-bold text-tomato-red uppercase flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-4 h-4 shrink-0" /> AUTHENTICATION REQUIRED TO PROCEED:
            </span>
            <p className="text-[11px] text-gray-800 font-sans font-medium">
              {promptMessage}
            </p>
          </div>
        )}

        {/* Tab Switcher: SIGN IN vs CREATE ACCOUNT */}
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
            <span>SIGN IN</span>
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
            <span>SIGN UP / REGISTER</span>
          </button>
        </div>

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border-2 border-tomato-red text-tomato-red font-mono text-[11px] flex items-start gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Selector Grid */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[10px] font-bold text-gray-700 uppercase">
              SELECT PARTICIPANT ROLE
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

        {/* Dynamic Role Capability Callout */}
        <div className="p-2.5 bg-blue-crate text-paper-white border-2 border-ink-black space-y-1">
          <div className="flex items-center justify-between font-bold text-[11px]">
            <span className="flex items-center gap-1.5 text-citrus-yellow">
              <ShieldCheck className="w-3.5 h-3.5" /> ROLE PRIVILEGES:
            </span>
            <span className="text-lettuce-green text-[10px]">VERIFIED PIPELINE ✓</span>
          </div>
          {activeRole === 'farmer' && (
            <p className="text-[11px] text-gray-300">
              Pledge harvest produce, join digital FPO pools, and track direct escrow payouts.
            </p>
          )}
          {activeRole === 'buyer' && (
            <p className="text-[11px] text-gray-300">
              Post verified commercial purchase orders, negotiate directly, and inspect farm-gate telemetry.
            </p>
          )}
          {activeRole === 'logistics' && (
            <p className="text-[11px] text-gray-300">
              Access optimized multi-stop village pickup loops and check off waypoints digitally.
            </p>
          )}
        </div>

        {/* ==================== SIGN IN MODE ==================== */}
        {authMode === 'signin' && !successUser && (
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                USERNAME OR REGISTERED MOBILE NUMBER *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. ramesh_farmer or 9849201842"
                  className="w-full pl-9 pr-3 py-2 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] font-bold text-gray-700 uppercase">
                  PASSWORD *
                </label>
                <span className="text-[10px] text-gray-500">Demo password: password123</span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-2 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 hover:text-ink-black"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              variant="primary" 
              fullWidth 
              size="md" 
              type="submit"
              disabled={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? 'VERIFYING...' : `SIGN IN AS ${activeRole.toUpperCase()} →`}
            </Button>

            {/* Quick 1-Click Demo Accounts Bar */}
            <div className="pt-2 border-t border-ink-black/20">
              <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">
                ONE-CLICK DEMO TEST ACCOUNTS:
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('farmer')}
                  className="p-1.5 bg-warm-cream border border-ink-black hover:bg-citrus-yellow font-bold text-left truncate"
                  title="Auto-fill Ramesh Reddy (Farmer)"
                >
                  🌾 Farmer Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('buyer')}
                  className="p-1.5 bg-warm-cream border border-ink-black hover:bg-citrus-yellow font-bold text-left truncate"
                  title="Auto-fill UrbanFork (Buyer)"
                >
                  🏢 Buyer Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('logistics')}
                  className="p-1.5 bg-warm-cream border border-ink-black hover:bg-citrus-yellow font-bold text-left truncate"
                  title="Auto-fill Kisan Fleet (Logistics)"
                >
                  🚚 Fleet Demo
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ==================== SIGN UP MODE ==================== */}
        {/* User Request: "if for sign up then ask for username, password and mobile number" */}
        {authMode === 'signup' && !successUser && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            {/* Username Input */}
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                CHOOSE USERNAME *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  placeholder="e.g. kisan_suresh or deccan_agro"
                  className="w-full pl-9 pr-3 py-2 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs"
                  required
                />
              </div>
              <span className="text-[10px] text-gray-500 mt-0.5 block">
                Minimum 3 characters (letters, numbers, underscores)
              </span>
            </div>

            {/* Mobile Number Input */}
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                MOBILE NUMBER (10-DIGIT SMS / OTP VERIFIED) *
              </label>
              <div className="flex">
                <span className="p-2 bg-gray-200 border-2 border-r-0 border-ink-black font-bold text-xs flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> +91
                </span>
                <input
                  type="tel"
                  value={signupMobile}
                  onChange={(e) => setSignupMobile(e.target.value)}
                  placeholder="Enter 10-digit mobile"
                  maxLength={10}
                  className="flex-1 p-2 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                CREATE PASSWORD *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Minimum 4 characters"
                  className="w-full pl-9 pr-10 py-2 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 hover:text-ink-black"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Optional Full Name / Business Name */}
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                FULL NAME / ENTERPRISE ENTITY (OPTIONAL)
              </label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder={activeRole === 'farmer' ? 'e.g. Suresh Gowda' : activeRole === 'buyer' ? 'e.g. FreshBowl Kitchens' : 'e.g. Deccan Express Fleet'}
                className="w-full p-2 bg-warm-cream border-2 border-ink-black font-bold text-ink-black focus:outline-hidden focus:bg-white text-xs"
              />
            </div>

            {/* Automatic Credential Identifier Generation Notice */}
            <div className="p-2.5 bg-yellow-50 border border-citrus-yellow text-gray-800 text-[11px] space-y-0.5">
              <span className="font-bold uppercase text-ink-black block">
                AUTOMATED ONBOARDING ID PROVISIONING:
              </span>
              <p>
                Signing up creates your verified FarmChain {activeRole === 'farmer' ? 'Kisan ID (PM-Kisan linked)' : activeRole === 'buyer' ? 'GSTIN Procurement Entity' : 'National Fleet Permit'} credential automatically.
              </p>
            </div>

            <Button 
              variant="yellow" 
              fullWidth 
              size="md" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'CREATING CREDENTIAL...' : `REGISTER AS VERIFIED ${activeRole.toUpperCase()} ✓`}
            </Button>
          </form>
        )}

        {/* Success Splash */}
        {successUser && (
          <div className="p-6 bg-warm-cream border-2 border-ink-black text-center space-y-2 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-12 h-12 text-farm-green mx-auto" />
            <h4 className="font-heading font-black text-xl uppercase text-ink-black">
              AUTHENTICATION SUCCESSFUL
            </h4>
            <div className="font-mono text-xs text-gray-700">
              Welcome, <strong className="text-farm-green">{successUser.name}</strong> ({successUser.role.toUpperCase()})
            </div>
            <div className="inline-block bg-blue-crate text-citrus-yellow px-2.5 py-1 font-mono text-xs font-bold border border-ink-black">
              {successUser.identifier}
            </div>
            <p className="text-[11px] text-gray-500 pt-1">
              Establishing verified session & redirecting...
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
