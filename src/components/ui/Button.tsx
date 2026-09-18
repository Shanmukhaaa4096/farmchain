import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'yellow' | 'white' | 'dark' | 'outline' | 'danger' | 'blue' | 'red' | 'green' | 'lettuce' | 'orange' | 'clay';
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
  const baseStyles = "group relative inline-flex items-center justify-center font-sans font-semibold uppercase tracking-[0.12em] select-none rounded-full transition-all duration-250 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:translate-x-0.5";
  
  const sizeStyles = {
    sm: "px-4 py-1.5 text-[11px] shadow-soft-sm hover:-translate-y-0.5 hover:shadow-soft",
    md: "px-6 py-2.5 text-xs shadow-soft hover:-translate-y-0.5 hover:shadow-soft-md",
    lg: "px-8 py-3.5 text-xs sm:text-sm shadow-soft hover:-translate-y-0.5 hover:shadow-soft-lg",
  };

  const variantStyles = {
    primary: "bg-primary-green text-pure-white border border-primary-green/30 hover:bg-dark-text",
    blue: "bg-primary-green text-pure-white border border-primary-green/30 hover:bg-dark-text",
    yellow: "bg-accent-yellow text-dark-text border border-dark-text/15 hover:bg-[#D4A738]",
    orange: "bg-terracotta text-pure-white border border-terracotta/30 hover:bg-[#B55A35] shadow-soft-terracotta",
    clay: "bg-terracotta text-pure-white border border-terracotta/30 hover:bg-[#B55A35] shadow-soft-terracotta",
    white: "bg-pure-white text-dark-text border border-dark-text/15 hover:bg-paper-bg hover:border-dark-text/30",
    dark: "bg-dark-text text-pure-white border border-dark-text hover:bg-primary-green",
    outline: "bg-transparent text-dark-text border border-dark-text/25 hover:bg-pure-white hover:border-dark-text",
    danger: "bg-terracotta text-pure-white border border-terracotta hover:bg-red-800",
    red: "bg-terracotta text-pure-white border border-terracotta hover:bg-red-800",
    green: "bg-primary-green text-pure-white border border-primary-green hover:bg-dark-text",
    lettuce: "bg-soft-green/30 text-primary-green border border-soft-green/50 hover:bg-soft-green/50",
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

