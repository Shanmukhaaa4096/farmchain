import React, { useState } from 'react';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface CropForecast {
  name: string;
  unitPrice: string;
  projectedVolume: string;
  confidence: string;
  points: { day: string; demandIndex: number; price: number }[];
}

const FORECAST_DATA: Record<string, CropForecast> = {
  Tomato: {
    name: 'Tomato (Hybrid Desi)',
    unitPrice: '₹32 - ₹36 / KG',
    projectedVolume: '14.2 MT Projected Peak',
    confidence: '88.4% Mandi Price Accuracy',
    points: [
      { day: 'Day 1', demandIndex: 40, price: 28 },
      { day: 'Day 3', demandIndex: 55, price: 30 },
      { day: 'Day 5', demandIndex: 85, price: 34 },
      { day: 'Day 7', demandIndex: 100, price: 36 },
      { day: 'Day 9', demandIndex: 78, price: 33 },
      { day: 'Day 12', demandIndex: 65, price: 31 },
      { day: 'Day 14', demandIndex: 50, price: 29 },
    ]
  },
  Onion: {
    name: 'Onion (Medium Pink)',
    unitPrice: '₹26 - ₹30 / KG',
    projectedVolume: '19.8 MT Projected Peak',
    confidence: '91.2% Mandi Price Accuracy',
    points: [
      { day: 'Day 1', demandIndex: 60, price: 26 },
      { day: 'Day 3', demandIndex: 65, price: 27 },
      { day: 'Day 5', demandIndex: 72, price: 28 },
      { day: 'Day 7', demandIndex: 88, price: 29 },
      { day: 'Day 9', demandIndex: 95, price: 30 },
      { day: 'Day 12', demandIndex: 82, price: 28 },
      { day: 'Day 14', demandIndex: 70, price: 27 },
    ]
  },
  Potato: {
    name: 'Potato (Jyoti Fresh)',
    unitPrice: '₹21 - ₹24 / KG',
    projectedVolume: '11.5 MT Projected Peak',
    confidence: '86.7% Mandi Price Accuracy',
    points: [
      { day: 'Day 1', demandIndex: 50, price: 21 },
      { day: 'Day 3', demandIndex: 54, price: 22 },
      { day: 'Day 5', demandIndex: 68, price: 23 },
      { day: 'Day 7', demandIndex: 75, price: 24 },
      { day: 'Day 9', demandIndex: 70, price: 23 },
      { day: 'Day 12', demandIndex: 60, price: 22 },
      { day: 'Day 14', demandIndex: 52, price: 21 },
    ]
  }
};

export const SimpleGraph: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [activePointIndex, setActivePointIndex] = useState<number>(3); // peak default

  const current = FORECAST_DATA[selectedCrop];
  const points = current.points;

  // Graph SVG coordinates calculation
  const width = 600;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;
  
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const maxDemand = 100;
  const minDemand = 20;

  const coordinates = points.map((p, i) => {
    const x = paddingX + (i / (points.length - 1)) * innerWidth;
    const y = height - paddingY - ((p.demandIndex - minDemand) / (maxDemand - minDemand)) * innerHeight;
    return { x, y, ...p };
  });

  const pathD = coordinates.reduce((acc, curr, i) => {
    return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${coordinates[coordinates.length - 1].x} ${height - paddingY} L ${coordinates[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft-lg p-6 sm:p-8 space-y-6">
      
      {/* Top Header & Crop Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-text/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-green">
              AI DEMAND FORECASTING
            </span>
            <span className="text-[11px] font-sans text-terracotta font-medium tracking-wide">
              • MANDI RECORDS CALIBRATED
            </span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-dark-text mt-1">
            {current.name} Demand Trajectory
          </h3>
        </div>

        {/* Tab Buttons (Pill shaped) */}
        <div className="flex items-center gap-1.5 p-1 bg-paper-bg rounded-full border border-dark-text/10 self-start sm:self-auto">
          {Object.keys(FORECAST_DATA).map((crop) => (
            <button
              key={crop}
              onClick={() => {
                setSelectedCrop(crop);
                setActivePointIndex(3);
              }}
              className={`px-4 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider rounded-full transition-all ${
                selectedCrop === crop
                  ? 'bg-primary-green text-pure-white shadow-soft'
                  : 'text-dark-text/80 hover:text-dark-text hover:bg-pure-white/60'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Simple Graph Chart */}
      <div className="relative w-full overflow-x-auto select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 sm:h-56 overflow-visible">
          {/* Subtle horizontal gridlines */}
          {[0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = height - paddingY - pct * innerHeight;
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#D8D1BF"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="#A9C29A" fillOpacity="0.22" />

          {/* Forecast Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#315C3A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Coordinates Markers */}
          {coordinates.map((pt, idx) => {
            const isActive = idx === activePointIndex;
            return (
              <g 
                key={idx} 
                onClick={() => setActivePointIndex(idx)}
                className="cursor-pointer group"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 6 : 4}
                  fill={isActive ? '#C96B45' : '#FFFDF7'}
                  stroke={isActive ? '#17231A' : '#315C3A'}
                  strokeWidth="2.5"
                  className="transition-all duration-150 group-hover:scale-125"
                />

                {/* Day label */}
                <text
                  x={pt.x}
                  y={height - 8}
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fill="#4F6153"
                  fontWeight={isActive ? 'bold' : 'normal'}
                >
                  {pt.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Point Inspector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 bg-paper-bg/60 rounded-2xl border border-dark-text/10 font-sans text-xs">
        <div>
          <span className="text-[10px] font-semibold text-mandi-charcoal-muted uppercase tracking-wider block">SELECTED DAY</span>
          <strong className="text-dark-text text-base font-editorial mt-0.5 block">{coordinates[activePointIndex].day}</strong>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-mandi-charcoal-muted uppercase tracking-wider block">INDEX VALUE</span>
          <strong className="text-primary-green text-base font-editorial mt-0.5 block">{coordinates[activePointIndex].demandIndex} / 100</strong>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-mandi-charcoal-muted uppercase tracking-wider block">ESTIMATED PRICE</span>
          <strong className="text-terracotta text-base font-editorial mt-0.5 block">₹{coordinates[activePointIndex].price} / KG</strong>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-mandi-charcoal-muted uppercase tracking-wider block">ALGO CONFIDENCE</span>
          <span className="text-dark-text font-bold text-xs mt-1 block">{current.confidence}</span>
        </div>
      </div>

      {/* Bottom explanation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans text-mandi-charcoal-muted pt-2 border-t border-dark-text/10">
        <span>Historical mandi seasonal arrivals combined with institutional forward purchase curves.</span>
        {onNavigate && (
          <button
            onClick={() => onNavigate('forecast')}
            className="text-xs font-sans font-semibold uppercase tracking-wider text-primary-green hover:underline shrink-0 flex items-center gap-1.5"
          >
            <span>OPEN COMPLETE FORECAST ENGINE</span>
            <span className="text-sm">→</span>
          </button>
        )}
      </div>

    </div>
  );
};
