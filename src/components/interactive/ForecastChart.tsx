import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Layers, 
  Calendar, 
  BrainCircuit, 
  HelpCircle,
  Activity,
  CloudRain,
  Sun,
  Droplets
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { MOCK_FORECAST_DATA } from '../../data/mockData';

export const ForecastChart: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<'Tomatoes' | 'Onions' | 'Potatoes' | 'Chillies'>('Tomatoes');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4); // Default Friday

  // Multi-crop factor modifiers
  const cropMultipliers = {
    Tomatoes: { base: 1, surge: '+29%', conf: 82, trend: 'SURGING', unit: 'KG' },
    Onions: { base: 1.8, surge: '+14%', conf: 89, trend: 'HIGH', unit: 'KG' },
    Potatoes: { base: 4.2, surge: '+6%', conf: 91, trend: 'STABLE', unit: 'KG' },
    Chillies: { base: 0.6, surge: '+34%', conf: 78, trend: 'SURGING', unit: 'KG' },
  };

  const currentCropInfo = cropMultipliers[selectedCrop];

  const data = MOCK_FORECAST_DATA.map(d => ({
    ...d,
    predictedDemandKg: Math.round(d.predictedDemandKg * currentCropInfo.base),
    lowerBandKg: Math.round(d.lowerBandKg * currentCropInfo.base),
    upperBandKg: Math.round(d.upperBandKg * currentCropInfo.base),
    historicalDemandKg: d.historicalDemandKg ? Math.round(d.historicalDemandKg * currentCropInfo.base) : undefined,
  }));

  const maxVal = Math.max(...data.map(d => d.upperBandKg));
  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : data[4];

  // Calculate SVG polyline path for smooth growing predictive curve
  const pointsString = data.map((d, i) => {
    const x = 7 + i * 14.28;
    const y = 90 - (d.predictedDemandKg / maxVal) * 75;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8">
      
      {/* Crop Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-pure-white rounded-full border border-dark-text/10 shadow-soft-sm">
          {(['Tomatoes', 'Onions', 'Potatoes', 'Chillies'] as const).map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-2 text-xs font-sans font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                selectedCrop === crop 
                  ? 'bg-farm-green text-pure-white shadow-soft-sm' 
                  : 'text-dark-text/70 hover:text-dark-text hover:bg-paper-bg'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-dark-text/75 bg-pure-white border border-dark-text/10 px-3.5 py-2 rounded-full shadow-soft-sm">
          <BrainCircuit className="w-4 h-4 text-farm-green" />
          <span>7-DAY PRICE FORECAST // 10-YEAR MANDI MARKET RECORDS</span>
        </div>
      </div>

      {/* Main Predictive Chart Card */}
      <div className="p-6 md:p-10 bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft space-y-8">
        
        {/* Top Prediction Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-dark-text/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-harvest-yellow fill-harvest-yellow" />
              <span className="font-mono text-xs font-bold text-farm-green uppercase tracking-wider">
                7-DAY PREDICTIVE HORIZON // {selectedCrop.toUpperCase()}
              </span>
            </div>
            <h3 className="font-serif font-bold text-2xl md:text-4xl tracking-tight text-dark-text">
              EXPECTED DEMAND: <AnimatedCounter value={activePoint.predictedDemandKg} suffix=" KG" />
            </h3>
            <p className="font-mono text-xs text-dark-text/60 mt-1.5">
              PROJECTION FOR {activePoint.day.toUpperCase()} ({activePoint.date}) • HYDERABAD & TELANGANA REGION
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <div className="p-3.5 bg-paper-bg rounded-2xl border border-dark-text/10 text-center shadow-soft-sm min-w-[100px]">
              <span className="text-[10px] text-dark-text/60 block font-semibold">7-DAY TREND</span>
              <strong className="text-lg font-serif font-bold text-farm-green block mt-0.5">{currentCropInfo.surge}</strong>
            </div>
            <div className="p-3.5 bg-harvest-yellow/20 rounded-2xl border border-accent-yellow/30 text-center shadow-soft-sm min-w-[100px]">
              <span className="text-[10px] text-dark-text/70 block font-semibold">CONFIDENCE</span>
              <strong className="text-lg font-serif font-bold text-dark-text block mt-0.5">{currentCropInfo.conf}%</strong>
            </div>
          </div>
        </div>

        {/* Interactive SVG Bar & Growing Line Curve Canvas */}
        <div className="relative pt-4">
          
          {/* Chart SVG Visualization */}
          <div className="w-full h-72 relative flex items-end">
            
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15">
              <div className="border-b border-dark-text border-dashed w-full"></div>
              <div className="border-b border-dark-text border-dashed w-full"></div>
              <div className="border-b border-dark-text border-dashed w-full"></div>
              <div className="border-b border-dark-text w-full"></div>
            </div>

            {/* SVG Growing Predictive Trend Line */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#315C3A"
                strokeWidth="2.5"
                points={pointsString}
                className="animate-chart-grow"
              />
              {data.map((d, i) => {
                const cx = 7 + i * 14.28;
                const cy = 90 - (d.predictedDemandKg / maxVal) * 75;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="2.8"
                    fill="#E5B94A"
                    stroke="#17231A"
                    strokeWidth="1.2"
                  />
                );
              })}
            </svg>

            {/* Bars & Interactive Nodes */}
            <div className="w-full h-full grid grid-cols-7 gap-2 sm:gap-4 items-end relative z-10">
              {data.map((point, idx) => {
                const isHovered = hoveredIndex === idx;
                const isProjected = idx >= 3;
                const heightPercent = Math.round((point.predictedDemandKg / maxVal) * 85);
                const lowerPercent = Math.round((point.lowerBandKg / maxVal) * 85);
                const upperPercent = Math.round((point.upperBandKg / maxVal) * 85);

                return (
                  <div
                    key={point.day}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    className="flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Confidence Range Whisker */}
                    <div 
                      className="w-1.5 bg-dark-text/10 rounded-full absolute transition-all"
                      style={{ 
                        bottom: `${lowerPercent}%`, 
                        height: `${upperPercent - lowerPercent}%` 
                      }}
                    ></div>

                    {/* Data Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[54px] rounded-t-xl transition-all duration-200 relative ${
                        isHovered 
                          ? 'bg-harvest-yellow shadow-soft -translate-y-1' 
                          : isProjected 
                            ? 'bg-soft-green hover:bg-soft-green/80' 
                            : 'bg-farm-green'
                      }`}
                    >
                      {/* Top Cap */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-dark-text whitespace-nowrap">
                        {Math.round(point.predictedDemandKg / 100) / 10}k
                      </div>
                    </div>

                    {/* Day label */}
                    <div className="mt-3 text-center">
                      <span className={`font-mono text-xs font-bold block ${isHovered ? 'text-farm-green font-extrabold' : 'text-dark-text'}`}>
                        {point.day}
                      </span>
                      <span className="font-mono text-[10px] text-dark-text/50 block">
                        {point.date.split(' ')[0]}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Legend */}
          <div className="mt-8 pt-4 border-t border-dark-text/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-dark-text/75">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-farm-green"></span>
                <span>HISTORICAL REALISED DEMAND</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-soft-green"></span>
                <span>AI PREDICTIVE DEMAND</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 bg-farm-green"></span>
                <span>GROWING TREND LINE</span>
              </div>
            </div>

            <div className="text-dark-text/60 text-[11px]">
              HOVER COLUMNS TO INSPECT TARGET VOLUME
            </div>
          </div>

        </div>

        {/* Signals Driver Breakdown with Agri Weather Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-dark-text/10 font-mono text-xs">
          <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 space-y-1.5 shadow-soft-sm">
            <div className="flex items-center gap-1.5 font-bold text-farm-green uppercase">
              <Sun className="w-4 h-4 text-harvest-yellow" /> SIGNAL 01: FESTIVAL SURGE
            </div>
            <p className="text-[11px] text-dark-text/70 leading-relaxed font-sans">
              Navratri/Dussehra preparations in Telangana metropolitan markets driving +24% wholesale tomato demand for catering chains.
            </p>
          </div>

          <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 space-y-1.5 shadow-soft-sm">
            <div className="flex items-center gap-1.5 font-bold text-farm-green uppercase">
              <CloudRain className="w-4 h-4 text-primary-green" /> SIGNAL 02: UPSTREAM RAINFALL
            </div>
            <p className="text-[11px] text-dark-text/70 leading-relaxed font-sans">
              Belgaum & Kolar excessive rainfall delayed local picking, shifting buyer demand to Ranga Reddy and Medak greenhouse clusters.
            </p>
          </div>

          <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 space-y-1.5 shadow-soft-sm">
            <div className="flex items-center gap-1.5 font-bold text-farm-green uppercase">
              <Droplets className="w-4 h-4 text-terracotta" /> SIGNAL 03: PRICE HEADROOM
            </div>
            <p className="text-[11px] text-dark-text/70 leading-relaxed font-sans">
              Forecast indicates stable wholesale realization at ₹24-₹26/kg for the next 10 days before northern winter arrivals begin.
            </p>
          </div>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="p-4 bg-harvest-yellow/15 border border-accent-yellow/30 rounded-2xl text-dark-text font-mono text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-harvest-yellow shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">OFFICIAL PLATFORM DISCLAIMER:</strong>
            <p className="mt-0.5 text-dark-text/80 font-sans">
              Forecasts are algorithmic market signals and recommendations, not guaranteed transaction prices or purchase commitments. Actual fulfillment prices are decided directly between buyers and farmers during trade confirmation.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
