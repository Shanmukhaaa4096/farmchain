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
}> = ({ d, color = '#293379', dashed = true, className = '' }) => {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray={dashed ? '6 5' : undefined}
      className={className}
    />
  );
};
