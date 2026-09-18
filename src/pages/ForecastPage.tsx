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
              <span className="px-2.5 py-1 bg-farm-green text-pure-white text-[10px] font-mono uppercase tracking-wider rounded-full">
                Forward Demand Intelligence
              </span>
              <span className="px-2.5 py-1 bg-paper-bg text-dark-text border border-dark-text/15 text-[10px] font-mono uppercase rounded-full">
                Agri-LSTM v2.4
              </span>
            </div>
            <h1 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-dark-text max-w-3xl leading-[1.1]">
              Forward Demand Forecasting & Gluts Prevention
            </h1>
            <p className="font-sans text-sm sm:text-base text-dark-text/70 max-w-2xl leading-relaxed">
              Plant and harvest for actual forward buyer curves rather than speculating at harvest day. FarmChain models institutional consumption, festival spikes, and regional weather deviations.
            </p>
          </div>

          <div className="p-5 bg-farm-green text-pure-white rounded-2xl border border-farm-green/30 font-mono text-xs shadow-soft shrink-0">
            <span className="text-harvest-yellow block text-[10px] font-semibold uppercase tracking-wider">Historical Accuracy</span>
            <strong className="text-2xl sm:text-3xl font-serif font-bold text-pure-white block mt-0.5">88.4% Mean MAP</strong>
            <div className="text-[11px] text-pure-white/70 mt-1">Calibrated across 12 APMC Mandis</div>
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
