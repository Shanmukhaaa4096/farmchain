import React from 'react';

interface BendingMarqueeProps {
  items?: string[];
  className?: string;
  speed?: number; // duration in seconds
}

const DEFAULT_ITEMS = [
  'HYD-METRO: 4,200 KG TOMATO LOCK @ ₹32/KG',
  'CHEVELLA CLUSTER: 120 CRATES ASSEMBLED',
  'MAHARASHTRA AGRI-CORRIDOR: REEFER FLEET ACTIVE',
  'LOCAL MANDI COMPARISON: 0% BROKER COMMISSION DEDUCTIONS',
  'SAFE PAYMENT IN BANK: 100% DIRECT SETTLEMENT IN 2 HOURS',
  'NASHIK-HYD ROUTE: 14.2°C COLD CHAIN MAINTAINED',
  'GRAIN CORRIDOR: 6,500 KG WHEAT PURCHASE ORDERS MATCHED'
];

export const BendingMarquee: React.FC<BendingMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  className = '',
  speed = 32
}) => {
  return (
    <div className={`relative w-full overflow-hidden bg-primary-green text-pure-white py-2.5 border-y border-dark-text select-none shadow-tactile-sm ${className}`}>
      
      {/* Subtle perspective bend illusion using gentle scale/gradient masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-primary-green to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-primary-green to-transparent z-10 pointer-events-none" />

      <div 
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `farmchain-marquee ${speed}s linear infinite`
        }}
      >
        {/* First track */}
        <div className="flex items-center gap-8 font-mono text-xs tracking-wider shrink-0 uppercase">
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow shrink-0 animate-pulse" />
              <span>{item}</span>
              <span className="text-pure-white/40">/</span>
            </span>
          ))}
        </div>

        {/* Duplicate track for seamless infinite loop */}
        <div className="flex items-center gap-8 font-mono text-xs tracking-wider shrink-0 uppercase ml-8" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow shrink-0 animate-pulse" />
              <span>{item}</span>
              <span className="text-pure-white/40">/</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes farmchain-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
