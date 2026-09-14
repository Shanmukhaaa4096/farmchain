import React, { useState } from 'react';
import { 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  activeRole,
  onRoleChange
}) => {
  const [phone, setPhone] = useState('98492 01842');
  const [otp, setOtp] = useState('4096');
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('phone');
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="FARMCHAIN ACCESS & VERIFICATION"
      subtitle="IDENTITY // ROLE-BASED ACCESS PROTOCOL"
      maxWidth="md"
    >
      <div className="space-y-6 font-mono text-xs">
        
        {/* Role Selector Grid */}
        <div>
          <label className="block text-[10px] font-bold text-gray-600 uppercase mb-2">
            SELECT ACTIVE PARTICIPANT ROLE
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onRoleChange('farmer')}
              className={`p-3 border-2 border-ink-black text-center font-heading font-black transition-all ${
                activeRole === 'farmer' 
                  ? 'bg-farm-green text-paper-white shadow-brutal-sm' 
                  : 'bg-warm-cream text-ink-black hover:bg-white'
              }`}
            >
              <Sprout className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs uppercase block">FARMER / FPO</span>
            </button>

            <button
              onClick={() => onRoleChange('buyer')}
              className={`p-3 border-2 border-ink-black text-center font-heading font-black transition-all ${
                activeRole === 'buyer' 
                  ? 'bg-harvest-yellow text-ink-black shadow-brutal-sm' 
                  : 'bg-warm-cream text-ink-black hover:bg-white'
              }`}
            >
              <Building2 className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs uppercase block">ENTERPRISE BUYER</span>
            </button>

            <button
              onClick={() => onRoleChange('logistics')}
              className={`p-3 border-2 border-ink-black text-center font-heading font-black transition-all ${
                activeRole === 'logistics' 
                  ? 'bg-ink-black text-paper-white shadow-brutal-sm' 
                  : 'bg-warm-cream text-ink-black hover:bg-white'
              }`}
            >
              <Truck className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs uppercase block">LOGISTICS FLEET</span>
            </button>
          </div>
        </div>

        {/* Verification Status Pill */}
        <div className="p-3 bg-farm-green text-paper-white border-brutal space-y-1">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-harvest-yellow">
              <ShieldCheck className="w-4 h-4" /> CREDENTIAL STATUS:
            </span>
            <span className="text-terminal-green">VERIFIED ACTIVE ✓</span>
          </div>
          {activeRole === 'farmer' && (
            <p className="text-[11px] text-gray-300">
              Kisan Credit Card ID: <strong>TS-RR-902184</strong> • Chevella Farmers Producer Co-op
            </p>
          )}
          {activeRole === 'buyer' && (
            <p className="text-[11px] text-gray-300">
              GSTIN: <strong>36AAACU9120K1ZX</strong> • FSSAI Lic: <strong>13622014000492</strong>
            </p>
          )}
          {activeRole === 'logistics' && (
            <p className="text-[11px] text-gray-300">
              National Carrier Permit: <strong>TS-08-NP-2026</strong> • Reefer Fleet Verified
            </p>
          )}
        </div>

        {/* Step 1: Phone */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                REGISTERED MOBILE NUMBER (SMS / WHATSAPP OTP)
              </label>
              <div className="flex">
                <span className="p-2.5 bg-gray-200 border-2 border-r-0 border-ink-black font-bold">
                  +91
                </span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile"
                  className="flex-1 p-2.5 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <Button variant="yellow" fullWidth size="md" type="submit">
              SEND ONE-TIME PASSCODE →
            </Button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                ENTER 4-DIGIT VERIFICATION CODE (DEFAULT: 4096)
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold text-center tracking-widest text-lg focus:outline-hidden"
                required
              />
            </div>

            <Button variant="primary" fullWidth size="md" type="submit">
              VERIFY & ACCESS DASHBOARD ✓
            </Button>
          </form>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="p-6 bg-warm-cream border-2 border-ink-black text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-farm-green mx-auto" />
            <h4 className="font-heading font-black text-xl uppercase">
              AUTHENTICATION SUCCESSFUL
            </h4>
            <p className="text-gray-600">
              Switching to verified {activeRole.toUpperCase()} session...
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
