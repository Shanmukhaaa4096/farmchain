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
  const baseStyles = "inline-flex items-center gap-1.5 font-mono uppercase font-bold tracking-wider border-2 border-ink-black select-none";
  
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs"
  };

  const variantStyles = {
    green: "bg-green-beans text-paper-white",
    blue: "bg-blue-crate text-paper-white",
    yellow: "bg-citrus-yellow text-ink-black",
    lettuce: "bg-lettuce-green text-ink-black",
    orange: "bg-orange-accent text-paper-white",
    white: "bg-paper-white text-ink-black",
    dark: "bg-ink-black text-paper-white",
    red: "bg-tomato-red text-paper-white",
    outline: "bg-transparent text-ink-black"
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
