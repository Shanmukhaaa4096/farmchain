import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Button } from '../ui/Button';
import { ShieldAlert, FileText, Lock, ArrowRight, RefreshCw } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireVerified?: boolean;
  onNavigate?: (view: string) => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireVerified = false,
  onNavigate,
  onOpenAuth,
}) => {
  const { currentUser, isAuthenticated, isLoading, activeRole, setActiveRole } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-16 px-4">
        <div className="w-10 h-10 border-3 border-[#C77B58]/30 border-t-[#C77B58] rounded-full animate-spin mb-4" />
        <p className="text-sm font-serif italic text-[#536458]">Verifying FarmChain session...</p>
      </div>
    );
  }

  // Not signed in
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-[28px] p-8 text-center shadow-soft-lg">
          <div className="w-14 h-14 rounded-2xl bg-[#C77B58]/10 text-[#C77B58] flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2F4A3A] mb-2">
            Sign In Required
          </h2>
          <p className="text-sm text-[#536458] mb-6 leading-relaxed">
            Please verify your mobile number to access direct farm trading and safe payments in your bank.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => onOpenAuth ? onOpenAuth('signin') : undefined}
            >
              Sign In via Mobile OTP
            </Button>
            {onNavigate && (
              <Button
                variant="ghost"
                size="md"
                onClick={() => onNavigate('landing')}
              >
                Return to Home
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Verification status check
  if (requireVerified && currentUser.verificationStatus !== 'verified') {
    const isPending = currentUser.verificationStatus === 'pending';
    const isRejected = currentUser.verificationStatus === 'rejected';

    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-[28px] p-8 text-center shadow-soft-lg">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
            isPending ? 'bg-amber-100 text-amber-700' : isRejected ? 'bg-red-100 text-red-700' : 'bg-[#C77B58]/10 text-[#C77B58]'
          }`}>
            <FileText className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#2F4A3A] mb-2">
            {isPending ? 'Verified Tick Under Review' : isRejected ? 'Document Review Needed' : 'Get Verified Tick to Continue'}
          </h2>

          <p className="text-sm text-[#536458] mb-6 leading-relaxed">
            {isPending
              ? 'Your Kisan ID / business documentation is being reviewed. Verified ticks usually take less than 2 hours.'
              : isRejected
              ? 'Your earlier documentation could not be verified. Please re-upload a clear copy of your Kisan Card, land record, or business license.'
              : 'To keep transactions safe with 0% broker fee, all sellers and buyers get a verified tick before trading.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onNavigate && (
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('onboarding')}
              >
                {isPending ? 'View Status / Update Docs' : 'Get Verified Tick'}
              </Button>
            )}
            {onNavigate && (
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('marketplace')}
              >
                Buy Fresh Crops
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Role check
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-[28px] p-8 text-center shadow-soft-lg">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-5">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#2F4A3A] mb-2">
            Access Restricted
          </h2>

          <p className="text-sm text-[#536458] mb-6 leading-relaxed">
            This workspace is configured exclusively for <strong>{allowedRoles.join(' / ').toUpperCase()}</strong> roles. You are currently authenticated as <strong>{currentUser.role.toUpperCase()}</strong>.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => {
                const targetRole = allowedRoles[0];
                setActiveRole(targetRole);
                if (onNavigate) {
                  onNavigate(targetRole === 'farmer' ? 'farmer' : targetRole === 'buyer' ? 'buyer' : 'marketplace');
                }
              }}
            >
              Switch Role to {allowedRoles[0].toUpperCase()}
            </Button>
            {onNavigate && (
              <Button
                variant="ghost"
                size="md"
                onClick={() => onNavigate('marketplace')}
              >
                Return to Marketplace
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
