import React from 'react';
import { Sprout, CheckCircle2, CloudRain, Sun, Wind } from 'lucide-react';

/**
 * Wind-Swaying Crop & Wheat Sheaf Stalks
 * Graceful SVG illustration with subtle wind sway animation
 */
export const WindSwayWheat: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full fill-none animate-wind-sway"
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Soil Base Line */}
        <path d="M 10 115 Q 50 112 90 115" stroke="#4A3525" strokeWidth="3" strokeLinecap="round" />
        <path d="M 25 118 Q 50 117 75 118" stroke="#4A3525" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Central Main Wheat Stem */}
        <path d="M 50 115 Q 48 60 52 20" stroke="#173B2B" strokeWidth="2.8" strokeLinecap="round" />
        
        {/* Wheat Kernels / Seed Grains */}
        <path d="M 52 20 Q 58 14 62 18 Q 56 24 52 20" fill="#F4C542" stroke="#111111" strokeWidth="1.2" />
        <path d="M 51 28 Q 43 24 41 30 Q 47 34 51 28" fill="#F4C542" stroke="#111111" strokeWidth="1.2" />
        <path d="M 51 36 Q 60 30 63 36 Q 56 42 51 36" fill="#F4C542" stroke="#111111" strokeWidth="1.2" />
        <path d="M 50 44 Q 41 40 40 46 Q 47 50 50 44" fill="#F4C542" stroke="#111111" strokeWidth="1.2" />
        <path d="M 50 52 Q 60 48 62 54 Q 55 58 50 52" fill="#F4C542" stroke="#111111" strokeWidth="1.2" />
        <path d="M 49 60 Q 40 56 39 62 Q 46 66 49 60" fill="#F4C542" stroke="#111111" strokeWidth="1.2" />

        {/* Organic Green Leaves Swaying */}
        <path d="M 49 70 Q 30 60 22 75 Q 36 78 49 75" fill="#2E6B4F" stroke="#111111" strokeWidth="1.2" />
        <path d="M 50 82 Q 70 72 78 86 Q 64 88 50 85" fill="#173B2B" stroke="#111111" strokeWidth="1.2" />
      </svg>
    </div>
  );
};

/**
 * Modern Tractor on Farmland Furrows
 */
export const TractorInFieldIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 240 100" className="w-full h-full fill-none">
        {/* Farmland Contour Furrows */}
        <path d="M 0 85 Q 60 78, 120 84 T 240 82" stroke="#4A3525" strokeWidth="2.5" strokeDasharray="6 3" />
        <path d="M 0 92 Q 60 86, 120 91 T 240 89" stroke="#6A4E38" strokeWidth="2" />
        <path d="M 0 98 Q 60 94, 120 98 T 240 96" stroke="#4A3525" strokeWidth="1.5" />

        {/* Small Crop Sprout Rows along the field */}
        {[20, 50, 80, 190, 220].map((x) => (
          <g key={x} transform={`translate(${x}, 75)`}>
            <path d="M 0 8 Q -3 2 -6 4 Q -3 8 0 8" fill="#2E6B4F" />
            <path d="M 0 8 Q 3 2 6 4 Q 3 8 0 8" fill="#F4C542" />
            <line x1="0" y1="8" x2="0" y2="12" stroke="#173B2B" strokeWidth="1.5" />
          </g>
        ))}

        {/* Tractor Silhouette in Farm Green & Harvest Yellow */}
        <g transform="translate(115, 45)">
          {/* Exhaust Pipe with subtle emission dot */}
          <line x1="42" y1="2" x2="42" y2="14" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="43" cy="-1" r="1.5" fill="#888888" opacity="0.6" />

          {/* Engine Hood */}
          <rect x="28" y="14" width="26" height="14" fill="#173B2B" stroke="#111111" strokeWidth="2" />
          <rect x="50" y="18" width="4" height="6" fill="#F4C542" stroke="#111111" strokeWidth="1" />

          {/* Cabin Frame */}
          <path d="M 12 6 L 28 6 L 28 28 L 12 28 Z" fill="#F5F0E6" stroke="#111111" strokeWidth="2" />
          <rect x="15" y="9" width="10" height="10" fill="#E9F0EC" stroke="#111111" strokeWidth="1.2" />

          {/* Chassis Base */}
          <rect x="8" y="24" width="48" height="6" fill="#4A3525" stroke="#111111" strokeWidth="2" />

          {/* Big Rear Wheel */}
          <circle cx="16" cy="32" r="13" fill="#111111" />
          <circle cx="16" cy="32" r="9" fill="#F4C542" stroke="#111111" strokeWidth="2" />
          <circle cx="16" cy="32" r="3.5" fill="#111111" />

          {/* Small Front Wheel */}
          <circle cx="48" cy="36" r="8" fill="#111111" />
          <circle cx="48" cy="36" r="5" fill="#F4C542" stroke="#111111" strokeWidth="1.5" />
          <circle cx="48" cy="36" r="2" fill="#111111" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Crop Growth Stage Indicator
 * Shows 4 structured stages from seed in soil to harvest crate
 */
export const CropGrowthStageIndicator: React.FC<{ activeStage?: number; cropName?: string }> = ({
  activeStage = 4,
  cropName = 'Tomatoes (Grade A)'
}) => {
  const stages = [
    { num: '01', title: 'SOWING & SEED', days: 'Days 0-14', tag: 'SOW', desc: 'Certified non-GMO hybrid seeds sown' },
    { num: '02', title: 'VEGETATIVE', days: 'Days 15-40', tag: 'VEG', desc: 'Canopy & foliar growth monitored' },
    { num: '03', title: 'FLOWERING', days: 'Days 41-65', tag: 'FLWR', desc: 'Fruit setting with drip fertigation' },
    { num: '04', title: 'HARVEST READY', days: 'Days 66-75', tag: 'HARV', desc: 'Direct buyer dispatch window' },
  ];

  return (
    <div className="bg-paper-white border-brutal p-5 shadow-brutal space-y-4 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-ink-black">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-farm-green" />
          <span className="font-heading font-black text-sm uppercase text-ink-black">
            CROP PHENOLOGY TELEMETRY // {cropName}
          </span>
        </div>
        <span className="px-2 py-0.5 bg-farm-green text-harvest-yellow text-[10px] font-bold border border-ink-black">
          STAGE 04: HARVEST WINDOW ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {stages.map((st, idx) => {
          const isCurrent = idx + 1 === activeStage;
          const isPast = idx + 1 < activeStage;

          return (
            <div
              key={st.num}
              className={`p-3 border-2 border-ink-black transition-all ${
                isCurrent 
                  ? 'bg-harvest-yellow text-ink-black shadow-brutal-sm -translate-y-0.5' 
                  : isPast 
                    ? 'bg-warm-cream text-ink-black opacity-90' 
                    : 'bg-gray-100 text-gray-500 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                <span>{st.num} // {st.days}</span>
                <span className="bg-ink-black text-paper-white px-1.5 py-0.2 text-[9px] font-bold">{st.tag}</span>
              </div>
              <strong className="font-heading font-black text-xs block uppercase">
                {st.title}
              </strong>
              <p className="text-[10px] text-gray-700 mt-1 leading-tight">
                {st.desc}
              </p>
              {isCurrent && (
                <div className="mt-2 pt-1 border-t border-ink-black text-[9px] font-bold text-farm-green flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> PLEDGEABLE FOR CONTRACTS
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Agricultural Produce Crate
 * High-quality slatted produce crate with grade stamp
 */
export const ProduceCrateIllustration: React.FC<{ 
  crop?: string; 
  quantity?: string; 
  grade?: string;
  className?: string; 
}> = ({
  crop = 'Tomatoes',
  quantity = '25 KG',
  grade = 'Grade A',
  className = ''
}) => {
  return (
    <div className={`p-4 bg-warm-cream border-2 border-ink-black shadow-brutal-sm font-mono text-xs ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-ink-black">
        <span className="font-bold text-[10px] text-gray-600 uppercase">VENTILATED FIELD CRATE</span>
        <span className="bg-farm-green text-harvest-yellow px-1.5 py-0.2 text-[9px] font-bold border border-ink-black">
          {grade}
        </span>
      </div>

      <div className="py-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-paper-white border border-ink-black flex items-center justify-center">
          <Sprout className="w-5 h-5 text-farm-green" />
        </div>
        <div>
          <strong className="font-heading font-black text-sm uppercase text-ink-black block">
            {crop}
          </strong>
          <span className="text-[11px] text-gray-600">{quantity} Standard Net Wt.</span>
        </div>
      </div>

      <div className="pt-2 border-t border-ink-black/20 flex justify-between text-[10px] text-gray-500">
        <span>RFID TRACE: #CRATE-884</span>
        <span className="text-farm-green font-bold">QC VERIFIED</span>
      </div>
    </div>
  );
};

/**
 * Topographic Farmland Background Contours
 */
export const TopographicContourLines: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={`w-full h-full pointer-events-none ${className}`} 
      viewBox="0 0 800 400" 
      preserveAspectRatio="none"
      fill="none"
    >
      <path d="M -50 120 Q 200 40, 450 140 T 900 80" stroke="#173B2B" strokeWidth="1.2" opacity="0.08" />
      <path d="M -50 180 Q 220 100, 470 200 T 900 140" stroke="#173B2B" strokeWidth="1.2" opacity="0.08" />
      <path d="M -50 240 Q 240 160, 490 260 T 900 200" stroke="#4A3525" strokeWidth="1.2" opacity="0.07" />
      <path d="M -50 300 Q 260 220, 510 320 T 900 260" stroke="#4A3525" strokeWidth="1.2" opacity="0.06" />
      <path d="M -50 360 Q 280 280, 530 380 T 900 320" stroke="#F4C542" strokeWidth="1.2" opacity="0.08" />
    </svg>
  );
};
