import React from 'react';
import { Sprout } from 'lucide-react';

export interface RotatingBadgeProps {
  text?: string;
  size?: number;
  className?: string;
  icon?: React.ReactNode;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text = "DIRECT FROM FARM • ZERO MIDDLEMEN • 100% MONEY IN YOUR BANK • ",
  size = 140,
  className = "",
  icon = <Sprout className="w-7 h-7 text-[#2F4A3A]" />
}) => {
  const center = size / 2;
  const radius = (size / 2) - 18;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Central tactile circular pill badge */}
      <div 
        className="absolute rounded-full bg-[#FBF8F2] border border-[#2F4A3A]/20 shadow-soft flex items-center justify-center z-10"
        style={{ width: size * 0.52, height: size * 0.52 }}
      >
        {icon}
      </div>

      {/* Rotating SVG text track */}
      <svg
        className="w-full h-full animate-spin-slow origin-center"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <path
            id={`rotating-text-path-${size}`}
            d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text className="font-mono text-[9.5px] font-bold uppercase tracking-[0.24em] fill-[#2F4A3A]">
          <textPath href={`#rotating-text-path-${size}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};
