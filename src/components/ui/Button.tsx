import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'yellow' | 'white' | 'dark' | 'outline' | 'danger' | 'blue' | 'red' | 'green' | 'lettuce' | 'orange';
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
    md: "px-5 py-2.5 text-sm shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    lg: "px-7 py-3.5 text-base shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  };

  const variantStyles = {
    primary: "bg-blue-crate text-paper-white hover:bg-farm-green-dark shadow-brutal",
    blue: "bg-blue-crate text-paper-white hover:bg-farm-green-dark shadow-brutal",
    yellow: "bg-citrus-yellow text-ink-black hover:bg-harvest-yellow-hover shadow-brutal",
    white: "bg-paper-white text-ink-black hover:bg-paper-cream shadow-brutal",
    dark: "bg-ink-black text-paper-white hover:bg-gray-900 shadow-brutal",
    outline: "bg-transparent text-ink-black hover:bg-paper-cream shadow-brutal-sm",
    danger: "bg-tomato-red text-paper-white hover:bg-red-800 shadow-brutal",
    red: "bg-tomato-red text-paper-white hover:bg-red-800 shadow-brutal",
    green: "bg-green-beans text-paper-white hover:bg-green-900 shadow-brutal",
    lettuce: "bg-lettuce-green text-ink-black hover:bg-lime-700 shadow-brutal",
    orange: "bg-orange-accent text-paper-white hover:bg-orange-700 shadow-brutal",
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
