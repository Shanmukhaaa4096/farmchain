import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VerifiedBadgeProps {
  label?: string;
  type?: 'farmer' | 'buyer' | 'lot' | 'general';
  size?: 'sm' | 'md';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  label,
  type = 'general',
  size = 'sm',
  className = '',
}) => {
  const defaultLabels = {
    farmer: 'Verified Farmer',
    buyer: 'Verified Buyer',
    lot: 'QC Verified Lot',
    general: 'Verified',
  };

  const text = label || defaultLabels[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-sans font-semibold tracking-wide uppercase select-none rounded-full",
        "bg-[#A8B89A]/30 text-[#163323] border border-[#A8B89A]/50 shadow-soft-sm",
        size === 'sm' ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        className
      )}
      title="Verified by FarmChain Onboarding & Land Record Audit"
    >
      <ShieldCheck className={cn(size === 'sm' ? "w-3.5 h-3.5" : "w-4 h-4", "text-[#2F4A3A] stroke-[2.2]")} />
      <span>{text}</span>
    </span>
  );
};
