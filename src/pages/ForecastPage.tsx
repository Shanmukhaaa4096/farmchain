import React from 'react';
import { Sparkles, BrainCircuit, Calendar, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { ForecastChart } from '../components/interactive/ForecastChart';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const ForecastPage: React.FC = () => {
  return (
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Forecast Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-brutal">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold">
              <Badge variant="dark" size="sm">PREDICTIVE INTELLIGENCE</Badge>
              <Badge variant="yellow" size="sm">AGRI-LSTM v2.4</Badge>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-black">
              THE MARKET BEFORE IT HAPPENS.
            </h1>
            <p className="font-body text-base text-gray-700 mt-2 font-medium max-w-2xl">
              Plant and harvest for actual buyer demand curves rather than speculating at harvest time. FarmChain models institutional consumption, festival seasons, and rainfall anomalies.
            </p>
          </div>

          <div className="p-4 bg-farm-green text-paper-white border-2 border-ink-black font-mono text-xs shadow-brutal-sm">
            <span className="text-harvest-yellow block text-[10px] font-bold">ACCURACY SCORE</span>
            <strong className="text-xl font-heading font-black text-paper-white">88.4% MEAN MAP</strong>
            <div className="text-[10px] text-gray-300">Across 12 APMC Mandis</div>
          </div>
        </div>

        {/* The Core Forecast Visualization */}
        <ForecastChart />

        {/* Deep Dive: How AI Forecasting Protects Farmers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <Card variant="white" shadow="sm" className="p-6 border-brutal space-y-2">
            <div className="w-10 h-10 bg-farm-green text-harvest-yellow border-2 border-ink-black flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              PREVENT HARVEST GLUTS
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              When all farmers in a taluka harvest simultaneously, mandi prices crash to ₹2/kg. Early demand visibility allows farmers to stagger picking or divert to processing buyers.
            </p>
          </Card>

          <Card variant="white" shadow="sm" className="p-6 border-brutal space-y-2">
            <div className="w-10 h-10 bg-harvest-yellow text-ink-black border-2 border-ink-black flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              METRIC TONS VS CRATES
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              Commercial cloud kitchens and supermarket chains lock monthly supply contracts 14 days in advance. We surface these macro institutional requirements directly to village FPOs.
            </p>
          </Card>

          <Card variant="white" shadow="sm" className="p-6 border-brutal space-y-2">
            <div className="w-10 h-10 bg-ink-black text-paper-white border-2 border-ink-black flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              WEATHER RISK SHIELD
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              Satellite radar and moisture tracking anticipate supply bottlenecks from distant production zones, alerting local farmers to capture sudden price surges.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};
