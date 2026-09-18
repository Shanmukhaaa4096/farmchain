import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'yellow' | 'white' | 'dark' | 'red' | 'outline' | 'blue' | 'lettuce' | 'orange';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'white',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 font-mono uppercase font-semibold tracking-wider border select-none rounded-full";
  
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs"
  };

  const variantStyles = {
    green: "bg-primary-green/15 text-primary-green border-primary-green/30",
    blue: "bg-primary-green/15 text-primary-green border-primary-green/30",
    yellow: "bg-accent-yellow/20 text-dark-text border-accent-yellow/40",
    lettuce: "bg-soft-green/25 text-primary-green border-soft-green/40",
    orange: "bg-terracotta/15 text-terracotta border-terracotta/30",
    white: "bg-pure-white text-dark-text border-dark-text/15 shadow-soft-sm",
    dark: "bg-dark-text text-pure-white border-dark-text",
    red: "bg-terracotta/15 text-terracotta border-terracotta/30",
    outline: "bg-transparent text-dark-text border-dark-text/25"
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};
