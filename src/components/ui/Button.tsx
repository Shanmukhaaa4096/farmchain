import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'yellow' | 'white' | 'dark' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider select-none border-brutal transition-all duration-100 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    md: "px-5 py-2.5 text-sm shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[5px] active:translate-y-[5px] active:shadow-none",
    lg: "px-7 py-3.5 text-base shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[5px] active:translate-y-[5px] active:shadow-none",
  };

  const variantStyles = {
    primary: "bg-farm-green text-paper-white hover:bg-farm-green-dark",
    yellow: "bg-harvest-yellow text-ink-black hover:bg-harvest-yellow-hover",
    white: "bg-paper-white text-ink-black hover:bg-warm-cream",
    dark: "bg-ink-black text-paper-white hover:bg-gray-900",
    outline: "bg-transparent text-ink-black hover:bg-warm-cream",
    danger: "bg-rust-red text-paper-white hover:bg-red-700",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
