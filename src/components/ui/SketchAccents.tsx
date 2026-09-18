import React from 'react';

/**
 * SketchArrow: Subtle hand-drawn vector doodle arrow.
 */
export const SketchArrow: React.FC<{
  direction?: 'right' | 'down' | 'curve-down' | 'curve-right';
  className?: string;
  color?: string;
}> = ({ direction = 'right', className = 'w-10 h-6', color = '#EE7302' }) => {
  if (direction === 'curve-down') {
    return (
      <svg viewBox="0 0 60 70" fill="none" className={`inline-block overflow-visible ${className}`}>
        <path
          d="M 12 8 C 36 6, 52 28, 40 52 M 40 52 L 48 44 M 40 52 L 32 46"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'curve-right') {
    return (
      <svg viewBox="0 0 80 40" fill="none" className={`inline-block overflow-visible ${className}`}>
        <path
          d="M 6 28 C 24 10, 48 8, 70 20 M 70 20 L 60 14 M 70 20 L 62 28"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'down') {
    return (
      <svg viewBox="0 0 30 60" fill="none" className={`inline-block overflow-visible ${className}`}>
        <path
          d="M 15 6 L 15 50 M 15 50 L 7 40 M 15 50 L 23 40"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // default: right
  return (
    <svg viewBox="0 0 70 30" fill="none" className={`inline-block overflow-visible ${className}`}>
      <path
        d="M 6 15 C 24 13, 44 16, 60 15 M 60 15 L 50 8 M 60 15 L 50 22"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * SketchCircle: Hand-drawn oval highlight loop that wraps around stats or keywords.
 */
export const SketchCircle: React.FC<{
  className?: string;
  color?: string;
  children?: React.ReactNode;
}> = ({ className = 'text-tomato-red', color = 'currentColor', children }) => {
  return (
    <span className="relative inline-block">
      <svg
        viewBox="0 0 160 60"
        fill="none"
        preserveAspectRatio="none"
        className="absolute -inset-x-3 -inset-y-1.5 w-[calc(100%+1.5rem)] h-[calc(100%+0.75rem)] pointer-events-none overflow-visible"
      >
        <path
          d="M 18 32 C 14 16, 42 6, 92 6 C 138 6, 154 18, 150 34 C 146 48, 112 56, 62 56 C 22 56, 4 44, 12 28 C 16 20, 36 10, 84 8"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="180 3"
          className={className}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
};

/**
 * SketchAnnotation: Handwritten notebook annotation with tilt.
 */
export const SketchAnnotation: React.FC<{
  text: string;
  color?: 'red' | 'yellow' | 'blue' | 'green' | 'orange' | 'white';
  rotation?: string;
  className?: string;
}> = ({
  text,
  color = 'orange',
  rotation = '-rotate-2',
  className = ''
}) => {
  const colorMap = {
    red: 'text-tomato-red',
    yellow: 'text-citrus-yellow',
    blue: 'text-blue-crate',
    green: 'text-green-beans',
    orange: 'text-orange-accent',
    white: 'text-paper-white',
  };

  return (
    <span
      className={`font-sketch text-base md:text-lg font-bold tracking-wide select-none inline-block ${colorMap[color]} ${rotation} ${className}`}
    >
      {text}
    </span>
  );
};

/**
 * WashiTape: Scrapbook translucent paper tape strip pinned over card corners or headers.
 */
export const WashiTape: React.FC<{
  color?: 'yellow' | 'blue' | 'red' | 'green' | 'white';
  className?: string;
}> = ({ color = 'yellow', className = '-top-3 left-6 -rotate-2' }) => {
  const colorStyles = {
    yellow: 'washi-tape-yellow',
    blue: 'washi-tape-blue',
    red: 'washi-tape-red',
    green: 'washi-tape-green',
    white: 'washi-tape-white',
  };

  return (
    <div
      className={`washi-tape ${colorStyles[color]} ${className}`}
      aria-hidden="true"
    />
  );
};

/**
 * RubberStamp: Official agricultural dispatch / inspection stamp badge.
 */
export const RubberStamp: React.FC<{
  text: string;
  variant?: 'red' | 'green' | 'blue' | 'yellow';
  className?: string;
  rotation?: string;
}> = ({
  text,
  variant = 'red',
  className = '',
  rotation = '-rotate-2'
}) => {
  const variantStyles = {
    red: 'rubber-stamp-red',
    green: 'rubber-stamp-green',
    blue: 'rubber-stamp-blue',
    yellow: 'rubber-stamp-yellow',
  };

  return (
    <div
      className={`rubber-stamp ${variantStyles[variant]} ${rotation} ${className}`}
    >
      {text}
    </div>
  );
};

/**
 * HandDrawnRouteLine: Curved sketch line between coordinates.
 */
export const HandDrawnRouteLine: React.FC<{
  d: string;
  color?: string;
  dashed?: boolean;
  className?: string;
}> = ({ d, color = '#163323', dashed = true, className = '' }) => {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray={dashed ? '6 5' : undefined}
      className={className}
    />
  );
};

/**
 * CrateDataTag: Authentic agricultural packaging & crate data tag
 * Inspired by Indian APMC mandi slips, wooden crate stencils, and jute sack tags.
 */
export const CrateDataTag: React.FC<{
  lotId: string;
  crop: string;
  grade?: string;
  weightKg?: number | string;
  mandiRate?: string | number;
  className?: string;
}> = ({
  lotId,
  crop,
  grade = 'GRADE A',
  weightKg,
  mandiRate,
  className = ''
}) => {
  return (
    <div className={`inline-block border border-dashed border-mandi-charcoal/40 bg-mandi-paper p-2 font-mono text-xs select-none ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-mandi-charcoal/20 pb-1 mb-1 text-[9px] text-mandi-charcoal-muted tracking-wider">
        <span>LOT: {lotId}</span>
        <span className="text-harvest-orange font-bold font-sans uppercase px-1 bg-harvest-orange-light">{grade}</span>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-serif font-bold text-sm text-mandi-charcoal uppercase">{crop}</span>
        {weightKg && <span className="font-mono text-[11px] font-semibold text-mandi-leaf">{weightKg} KG</span>}
      </div>
      {mandiRate && (
        <div className="mt-1 pt-1 border-t border-dotted border-mandi-charcoal/20 flex items-center justify-between text-[10px]">
          <span className="text-mandi-charcoal-muted">FARM-GATE:</span>
          <span className="font-bold text-mandi-green">₹{mandiRate}/KG</span>
        </div>
      )}
    </div>
  );
};

/**
 * WavySquiggle: Hand-drawn undulating SVG underline for retro editorial headlines.
 */
export const WavySquiggle: React.FC<{
  color?: string;
  className?: string;
  width?: number | string;
}> = ({ color = '#C96B45', className = 'w-24 sm:w-36 h-3 sm:h-4.5', width }) => (
  <svg
    viewBox="0 0 140 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
    style={width ? { width } : undefined}
  >
    <path
      d="M 4 9 Q 20 2, 36 9 T 68 9 T 100 9 T 134 9"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * CircularRotatingBadge: Signature circular sticker badge with rotating textPath and slow 20s animation.
 * Direct visual homage to the Wash House "MADE BY HAND • WITH LOVE •" sticker badge.
 */
export const CircularRotatingBadge: React.FC<{
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: number;
  bg?: string;
  textColor?: string;
}> = ({
  text = 'FROM FARM TO MARKET • DIRECT TRADE • ',
  icon,
  className = '',
  size = 112,
  bg = 'bg-accent-yellow',
  textColor = '#17231A'
}) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full shadow-soft select-none border border-dark-text/10 ${bg} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin-slow"
        style={{ overflow: 'visible' }}
      >
        <path
          id="badgeCirclePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text
          fill={textColor}
          fontSize="9.2"
          fontWeight="bold"
          letterSpacing="0.18em"
          className="uppercase font-mono"
        >
          <textPath href="#badgeCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-dark-text">
        {icon || (
          <svg className="w-6 h-6 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 20h10" />
            <path d="M10 20c0-4.5 1-8 2-12" />
            <path d="M12 8c2.5-3 5-3 7-2-1 4-3.5 5.5-7 5.5" />
            <path d="M12 11.5c-2.5-2.5-5-2-6.5-.5.5 3.5 3 4.5 6.5 4.5" />
          </svg>
        )}
      </div>
    </div>
  );
};

/**
 * WavySectionDivider: Smooth organic wavy seam between alternating full-bleed color sections.
 */
export const WavySectionDivider: React.FC<{
  fillColor?: string;
  bgColor?: string;
  flip?: boolean;
  className?: string;
}> = ({
  fillColor = 'var(--color-paper-bg, #F4F0E6)',
  bgColor = 'transparent',
  flip = false,
  className = ''
}) => (
  <div className={`w-full overflow-hidden leading-none ${className}`} style={{ backgroundColor: bgColor }}>
    <svg
      viewBox="0 0 1440 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full block h-7 sm:h-11 md:h-14 ${flip ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 28C240 50 480 58 720 42C960 26 1200 6 1440 28V60H0V28Z"
        fill={fillColor}
      />
    </svg>
  </div>
);

