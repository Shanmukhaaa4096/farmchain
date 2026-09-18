import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'paper' | 'cream' | 'tint' | 'green' | 'yellow' | 'blue' | 'red' | 'lettuce' | 'orange';
  shadow?: 'default' | 'sm' | 'lg' | 'none' | 'blue' | 'yellow' | 'red';
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'white',
  shadow = 'default',
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  const bgStyles = {
    white: "bg-pure-white text-dark-text border border-dark-text/10",
    paper: "bg-pure-white text-dark-text border border-dark-text/10",
    cream: "bg-paper-bg text-dark-text border border-dark-text/10",
    tint: "bg-[#EAE5D8] text-dark-text border border-dark-text/10",
    blue: "bg-primary-green text-pure-white border border-primary-green/30",
    green: "bg-primary-green text-pure-white border border-primary-green/30",
    yellow: "bg-[#FBF6EA] text-dark-text border border-accent-yellow/30",
    red: "bg-[#F8ECE6] text-dark-text border border-terracotta/30",
    lettuce: "bg-soft-green/20 text-dark-text border border-soft-green/40",
    orange: "bg-terracotta text-pure-white border border-terracotta/30 shadow-soft-terracotta",
  };

  const shadowStyles = {
    default: "shadow-soft",
    sm: "shadow-soft-sm",
    lg: "shadow-soft-lg",
    blue: "shadow-soft",
    yellow: "shadow-soft",
    red: "shadow-soft-terracotta",
    none: "shadow-none",
  };

  const interactiveStyles = interactive 
    ? "card-soft-lift cursor-pointer" 
    : "";

  return (
    <div
      className={`rounded-3xl ${bgStyles[variant]} ${shadowStyles[shadow]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

