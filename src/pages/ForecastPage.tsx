import React from 'react';
import { Sparkles, BrainCircuit, Calendar, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { ForecastChart } from '../components/interactive/ForecastChart';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const ForecastPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-paper-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Forecast Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-dark-text/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 bg-[#2F4A3A] text-white text-[10px] font-mono uppercase tracking-wider rounded-full">
                Best Time to Sell
              </span>
              <span className="px-2.5 py-1 bg-white text-[#2F4A3A] border border-[#2F4A3A]/15 text-[10px] font-mono uppercase rounded-full">
                7-Day Price Forecast
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl tracking-tight text-[#2F4A3A] max-w-3xl leading-[1.1]">
              Best Time to Sell: 7-Day Market Price Forecast
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#536458] max-w-2xl leading-relaxed">
              See expected prices for the next 7 days. Plan your harvest day to get higher earnings and avoid sudden price drops in local mandis.
            </p>
          </div>

          <div className="p-5 bg-[#2F4A3A] text-white rounded-2xl border border-[#2F4A3A]/30 font-mono text-xs shadow-soft shrink-0">
            <span className="text-[#E5B94A] block text-[10px] font-semibold uppercase tracking-wider">Forecast Accuracy</span>
            <strong className="text-2xl sm:text-3xl font-serif font-bold text-white block mt-0.5">88.4% Accuracy</strong>
            <div className="text-[11px] text-white/70 mt-1">Calibrated across 12 Local Mandis</div>
          </div>
        </div>

        {/* The Core Forecast Visualization */}
        <ForecastChart />

        {/* Deep Dive: How AI Forecasting Protects Farmers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Card variant="paper" className="p-7 space-y-4">
            <div className="w-9 h-9 rounded-xl bg-farm-green text-pure-white flex items-center justify-center font-mono font-bold text-xs shadow-soft-sm">
              01
            </div>
            <h3 className="font-serif font-bold text-xl text-dark-text">
              Prevent Harvest Gluts
            </h3>
            <p className="font-sans text-xs sm:text-sm text-dark-text/70 leading-relaxed">
              When all farmers in a taluka harvest simultaneously, mandi prices crash to ₹2/kg. Early demand visibility allows farmers to stagger picking or divert to processing buyers.
            </p>
          </Card>

          <Card variant="paper" className="p-7 space-y-4">
            <div className="w-9 h-9 rounded-xl bg-terracotta text-pure-white flex items-center justify-center font-mono font-bold text-xs shadow-soft-terracotta">
              02
            </div>
            <h3 className="font-serif font-bold text-xl text-dark-text">
              Metric Tons vs Crates
            </h3>
            <p className="font-sans text-xs sm:text-sm text-dark-text/70 leading-relaxed">
              Commercial cloud kitchens and supermarket chains lock monthly supply contracts 14 days in advance. We surface these macro institutional requirements directly to village FPOs.
            </p>
          </Card>

          <Card variant="paper" className="p-7 space-y-4">
            <div className="w-9 h-9 rounded-xl bg-farm-green/90 text-pure-white flex items-center justify-center font-mono font-bold text-xs shadow-soft-sm">
              03
            </div>
            <h3 className="font-serif font-bold text-xl text-dark-text">
              Weather Risk Shield
            </h3>
            <p className="font-sans text-xs sm:text-sm text-dark-text/70 leading-relaxed">
              Satellite radar and moisture tracking anticipate supply bottlenecks from distant production zones, alerting local farmers to capture sudden price surges.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};
