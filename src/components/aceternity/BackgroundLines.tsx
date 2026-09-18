import React from 'react';

interface BackgroundLinesProps {
  children?: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}

export const BackgroundLines: React.FC<BackgroundLinesProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full stroke-farm-green/[0.08] dark:stroke-sage/[0.08]"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 150 C 300 80, 600 240, 1540 120"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <path
          d="M-100 280 C 450 320, 800 160, 1540 310"
          strokeWidth="1"
        />
        <path
          d="M-100 420 C 350 380, 950 500, 1540 430"
          strokeWidth="1.4"
        />
        <path
          d="M-100 580 C 500 620, 820 480, 1540 600"
          strokeWidth="1"
          strokeDasharray="8 8"
        />
        <path
          d="M-100 720 C 400 680, 1000 820, 1540 730"
          strokeWidth="1.2"
        />
        <path
          d="M-100 860 C 600 780, 1100 900, 1540 850"
          strokeWidth="1"
        />
      </svg>
      {children}
    </div>
  );
};
