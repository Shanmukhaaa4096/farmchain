import React from 'react';

interface GrainWaveProps {
  className?: string;
  opacity?: number;
}

export const GrainWave: React.FC<GrainWaveProps> = ({
  className = '',
  opacity = 0.05
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* SVG noise texture pattern */}
      <svg className="w-full h-full opacity-60 mix-blend-multiply" style={{ opacity }}>
        <filter id="farmchain-grain">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.75" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix 
            type="colorMatrix" 
            values="0 0 0 0 0.09   0 0 0 0 0.14   0 0 0 0 0.10   0 0 0 0.85 0" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#farmchain-grain)" />
      </svg>
    </div>
  );
};
