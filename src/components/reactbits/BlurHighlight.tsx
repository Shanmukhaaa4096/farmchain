import React from 'react';

interface BlurHighlightProps {
  children: React.ReactNode;
  highlightText?: string;
  glowColor?: string;
  className?: string;
}

export const BlurHighlight: React.FC<BlurHighlightProps> = ({
  children,
  highlightText,
  glowColor = 'rgba(229, 185, 74, 0.25)', // Accent yellow subtle glow
  className = ''
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Background soft blur spotlight */}
      <span
        className="absolute -inset-1 sm:-inset-2 rounded-sm -z-10 pointer-events-none transform -rotate-0.5 filter blur-[10px] sm:blur-[14px] opacity-80"
        style={{ backgroundColor: glowColor }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
};
