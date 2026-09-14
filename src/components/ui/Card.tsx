import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'cream' | 'green' | 'yellow';
  shadow?: 'default' | 'sm' | 'lg' | 'none';
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
    white: "bg-paper-white text-ink-black",
    cream: "bg-warm-cream text-ink-black",
    green: "bg-farm-green text-paper-white",
    yellow: "bg-harvest-yellow text-ink-black",
  };

  const shadowStyles = {
    default: "shadow-brutal",
    sm: "shadow-brutal-sm",
    lg: "shadow-brutal-lg",
    none: "shadow-none",
  };

  const interactiveStyles = interactive 
    ? "transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg cursor-pointer" 
    : "";

  return (
    <div
      className={`border-brutal ${bgStyles[variant]} ${shadowStyles[shadow]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
