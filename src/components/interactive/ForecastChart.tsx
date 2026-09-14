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
        <div className="flex items-center gap-2">
          {(['Tomatoes', 'Onions', 'Potatoes', 'Chillies'] as const).map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`btn-brutal px-4 py-2 text-xs font-heading uppercase ${
                selectedCrop === crop 
                  ? 'bg-harvest-yellow text-ink-black' 
                  : 'bg-paper-white text-ink-black'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 bg-paper-white border-2 border-ink-black px-3 py-1.5 shadow-brutal-sm">
          <BrainCircuit className="w-4 h-4 text-farm-green" />
          <span>MODEL: AGRI-LSTM-7D // 10-YEAR MANDI TELEMETRY</span>
        </div>
      </div>

      {/* Main Predictive Chart Card */}
      <Card variant="white" shadow="lg" className="p-6 md:p-8 border-brutal-thick space-y-6">
        
        {/* Top Prediction Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b-2 border-ink-black">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-harvest-yellow fill-harvest-yellow stroke-ink-black" />
              <span className="font-mono text-xs font-bold text-farm-green uppercase tracking-wider">
                7-DAY PREDICTIVE HORIZON // {selectedCrop.toUpperCase()}
              </span>
            </div>
            <h3 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-ink-black">
              EXPECTED DEMAND: <AnimatedCounter value={activePoint.predictedDemandKg} suffix=" KG" />
            </h3>
            <p className="font-mono text-xs text-gray-600 mt-1">
              PROJECTION FOR {activePoint.day.toUpperCase()} ({activePoint.date}) • HYDERABAD & TELANGANA REGION
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <div className="p-3 bg-warm-cream border-2 border-ink-black text-center shadow-brutal-sm">
              <span className="text-[10px] text-gray-600 block">7-DAY TREND</span>
              <strong className="text-lg font-black text-farm-green">{currentCropInfo.surge}</strong>
            </div>
            <div className="p-3 bg-harvest-yellow border-2 border-ink-black text-center shadow-brutal-sm">
              <span className="text-[10px] text-ink-black block">CONFIDENCE</span>
              <strong className="text-lg font-black text-ink-black">{currentCropInfo.conf}%</strong>
            </div>
          </div>
        </div>

        {/* Interactive SVG Bar & Growing Line Curve Canvas */}
        <div className="relative pt-6">
          
          {/* Chart SVG Visualization */}
          <div className="w-full h-72 relative flex items-end">
            
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-ink-black border-dashed w-full"></div>
              <div className="border-b border-ink-black border-dashed w-full"></div>
              <div className="border-b border-ink-black border-dashed w-full"></div>
              <div className="border-b border-ink-black w-full"></div>
            </div>

            {/* SVG Growing Predictive Trend Line */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#4A3525"
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
                    r="2.2"
                    fill="#F4C542"
                    stroke="#111111"
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
                      className="w-1.5 bg-gray-300 absolute transition-all"
                      style={{ 
                        bottom: `${lowerPercent}%`, 
                        height: `${upperPercent - lowerPercent}%` 
                      }}
                    ></div>

                    {/* Data Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[54px] border-2 border-ink-black transition-all duration-150 relative ${
                        isHovered 
                          ? 'bg-harvest-yellow shadow-brutal -translate-y-1' 
                          : isProjected 
                            ? 'bg-farm-green-light/80 hover:bg-farm-green-light' 
                            : 'bg-farm-green'
                      }`}
                    >
                      {/* Top Cap */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-ink-black whitespace-nowrap">
                        {Math.round(point.predictedDemandKg / 100) / 10}k
                      </div>
                    </div>

                    {/* Day label */}
                    <div className="mt-3 text-center">
                      <span className={`font-mono text-xs font-bold block ${isHovered ? 'text-farm-green underline' : 'text-ink-black'}`}>
                        {point.day}
                      </span>
                      <span className="font-mono text-[10px] text-gray-500 block">
                        {point.date.split(' ')[0]}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-farm-green border border-ink-black"></span>
                <span>HISTORICAL REALISED DEMAND</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-farm-green-light border border-ink-black"></span>
                <span>AI PREDICTIVE DEMAND</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 bg-soil-brown border border-soil-brown"></span>
                <span>GROWING TREND LINE</span>
              </div>
            </div>

            <div className="text-gray-600 text-[11px]">
              HOVER COLUMNS TO INSPECT TARGET VOLUME
            </div>
          </div>

        </div>

        {/* Signals Driver Breakdown with Agri Weather Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-ink-black font-mono text-xs">
          <div className="p-4 bg-warm-cream border-2 border-ink-black space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-farm-green uppercase">
              <Sun className="w-4 h-4 text-harvest-yellow" /> SIGNAL 01: FESTIVAL SURGE
            </div>
            <p className="text-[11px] text-gray-700">
              Navratri/Dussehra preparations in Telangana metropolitan markets driving +24% wholesale tomato demand for catering chains.
            </p>
          </div>

          <div className="p-4 bg-warm-cream border-2 border-ink-black space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-farm-green uppercase">
              <CloudRain className="w-4 h-4 text-blue-600" /> SIGNAL 02: UPSTREAM RAINFALL
            </div>
            <p className="text-[11px] text-gray-700">
              Belgaum & Kolar excessive rainfall delayed local picking, shifting buyer demand to Ranga Reddy and Medak greenhouse clusters.
            </p>
          </div>

          <div className="p-4 bg-warm-cream border-2 border-ink-black space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-farm-green uppercase">
              <Droplets className="w-4 h-4 text-soil-brown" /> SIGNAL 03: PRICE HEADROOM
            </div>
            <p className="text-[11px] text-gray-700">
              Forecast indicates stable wholesale realization at ₹24-₹26/kg for the next 10 days before northern winter arrivals begin.
            </p>
          </div>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="p-4 bg-yellow-50 border-2 border-harvest-yellow text-ink-black font-mono text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-ink-black shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">OFFICIAL PLATFORM DISCLAIMER:</strong>
            <p className="mt-0.5 text-gray-800">
              Forecasts are algorithmic market signals and recommendations, not guaranteed transaction prices or purchase commitments. Actual fulfillment prices are decided directly between buyers and farmers during trade confirmation.
            </p>
          </div>
        </div>

      </Card>

    </div>
  );
};
