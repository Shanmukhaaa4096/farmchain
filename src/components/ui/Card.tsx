import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'bg' | 'white' | 'paper' | 'cream' | 'tint' | 'green' | 'yellow' | 'band' | 'highlight' | 'orange';
  shadow?: 'default' | 'sm' | 'lg' | 'terracotta' | 'none';
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  variant = 'surface',
  shadow = 'default',
  interactive = false,
  className = '',
  children,
  ...props
}, ref) => {
  const bgStyles = {
    surface: "bg-[#FBF8F2] text-[#2F4A3A] border border-[#2F4A3A]/10",
    bg: "bg-[#F4EFE6] text-[#2F4A3A] border border-[#2F4A3A]/10",
    white: "bg-[#FBF8F2] text-[#2F4A3A] border border-[#2F4A3A]/10",
    paper: "bg-[#FBF8F2] text-[#2F4A3A] border border-[#2F4A3A]/10",
    cream: "bg-[#F4EFE6] text-[#2F4A3A] border border-[#2F4A3A]/10",
    tint: "bg-[#EAE5D8] text-[#2F4A3A] border border-[#2F4A3A]/10",
    green: "bg-[#2F4A3A] text-[#FBF8F2] border border-[#2F4A3A]/30",
    yellow: "bg-[#FBF6EA] text-[#2F4A3A] border border-[#E5B94A]/30",
    band: "bg-[#A8B89A]/30 text-[#163323] border border-[#A8B89A]/40",
    highlight: "bg-[#F1C9B8]/40 text-[#2F4A3A] border border-[#C77B58]/30",
    orange: "bg-[#C77B58] text-[#FBF8F2] border border-[#C77B58]/30 shadow-soft-terracotta",
  };

  const shadowStyles = {
    default: "shadow-soft",
    sm: "shadow-soft-sm",
    lg: "shadow-soft-lg",
    terracotta: "shadow-soft-terracotta",
    none: "shadow-none",
  };

  const interactiveStyles = interactive 
    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg cursor-pointer" 
    : "";

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[28px]",
        bgStyles[variant] || bgStyles.surface,
        shadowStyles[shadow] || shadowStyles.default,
        interactiveStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
