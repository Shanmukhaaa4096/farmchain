import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' 
    | 'secondary' 
    | 'ink' 
    | 'ink-deep' 
    | 'band' 
    | 'outline' 
    | 'ghost' 
    | 'clay' 
    | 'yellow' 
    | 'white' 
    | 'dark' 
    | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  withArrow = false,
  className = '',
  children,
  ...props
}, ref) => {
  const baseStyles = cn(
    "group relative inline-flex items-center justify-center font-sans font-semibold uppercase tracking-[0.14em] select-none",
    "rounded-full transition-all duration-200 ease-out cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C77B58] focus-visible:ring-offset-2",
    "[&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:translate-x-1"
  );
  
  const sizeStyles = {
    sm: "min-h-[40px] px-4 py-1.5 text-[11px] shadow-soft-sm hover:-translate-y-0.5 hover:shadow-soft",
    md: "min-h-[44px] px-6 py-2.5 text-xs shadow-soft hover:-translate-y-0.5 hover:shadow-soft-md",
    lg: "min-h-[50px] px-8 py-3.5 text-xs sm:text-sm shadow-soft hover:-translate-y-0.5 hover:shadow-soft-lg",
  };

  const variantStyles = {
    primary: "bg-[#C77B58] text-[#FBF8F2] border border-[#C77B58] hover:bg-[#B26A49] shadow-soft-terracotta",
    clay: "bg-[#C77B58] text-[#FBF8F2] border border-[#C77B58] hover:bg-[#B26A49] shadow-soft-terracotta",
    secondary: "bg-[#A8B89A] text-[#163323] border border-[#A8B89A] hover:bg-[#96A887]",
    band: "bg-[#A8B89A] text-[#163323] border border-[#A8B89A] hover:bg-[#96A887]",
    ink: "bg-[#2F4A3A] text-[#FBF8F2] border border-[#2F4A3A] hover:bg-[#163323]",
    'ink-deep': "bg-[#163323] text-[#FBF8F2] border border-[#163323] hover:bg-[#0D1E15]",
    dark: "bg-[#163323] text-[#FBF8F2] border border-[#163323] hover:bg-[#2F4A3A]",
    yellow: "bg-[#E5B94A] text-[#17231A] border border-[#E5B94A] hover:bg-[#D4A738]",
    white: "bg-[#FBF8F2] text-[#2F4A3A] border border-[#2F4A3A]/15 hover:bg-[#F4EFE6] hover:border-[#2F4A3A]/30",
    outline: "bg-transparent text-[#2F4A3A] border border-[#2F4A3A]/25 hover:bg-[#FBF8F2] hover:border-[#2F4A3A]",
    ghost: "bg-transparent text-[#2F4A3A] hover:bg-[#FBF8F2]",
    danger: "bg-[#C77B58] text-[#FBF8F2] border border-red-700 hover:bg-red-800",
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
    </button>
  );
});

Button.displayName = 'Button';
