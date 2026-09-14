import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'cream' | 'green' | 'yellow' | 'blue' | 'red' | 'lettuce' | 'orange';
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
    white: "bg-paper-white text-ink-black",
    cream: "bg-paper-cream text-ink-black",
    blue: "bg-blue-crate text-paper-white",
    green: "bg-green-beans text-paper-white",
    yellow: "bg-citrus-yellow text-ink-black",
    red: "bg-tomato-red text-paper-white",
    lettuce: "bg-lettuce-green text-ink-black",
    orange: "bg-orange-accent text-paper-white",
  };

  const shadowStyles = {
    default: "shadow-brutal",
    sm: "shadow-brutal-sm",
    lg: "shadow-brutal-lg",
    blue: "shadow-brutal-blue",
    yellow: "shadow-brutal-yellow",
    red: "shadow-brutal-red",
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
