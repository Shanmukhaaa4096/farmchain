import React from 'react';

export interface WaveDividerProps {
  fillColor?: string;
  bgColor?: string;
  height?: number;
  inverted?: boolean;
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fillColor = '#F4EFE6',
  bgColor = '#FBF8F2',
  height = 48,
  inverted = false,
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full"
        style={{
          height: `${height}px`,
          transform: inverted ? 'rotate(180deg)' : 'none',
        }}
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
