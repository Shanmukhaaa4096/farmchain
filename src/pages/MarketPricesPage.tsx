import React from 'react';
import { Scale, TrendingUp, ShieldCheck, AlertCircle, Info, Calculator } from 'lucide-react';
import { PriceCalculator } from '../components/interactive/PriceCalculator';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const MarketPricesPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-paper-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-dark-text/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 bg-farm-green text-pure-white text-[10px] font-mono uppercase tracking-wider rounded-full">
                Price Intelligence Desk
              </span>
              <span className="px-2.5 py-1 bg-paper-bg text-dark-text border border-dark-text/15 text-[10px] font-mono uppercase rounded-full">
                Zero Middleman Spread
              </span>
            </div>
            <h1 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-dark-text max-w-3xl leading-[1.1]">
              Transparent Mandi Benchmarks & Direct Pricing
            </h1>
            <p className="font-sans text-sm sm:text-base text-dark-text/70 max-w-2xl leading-relaxed">
              Transparent APMC price signals calibrate fair reference baselines for direct farm-gate contracts between farmer clusters and verified buyers.
            </p>
          </div>

          {/* Platform Policy Note */}
          <div className="p-5 bg-pure-white border border-dark-text/10 rounded-2xl font-mono text-xs max-w-sm shadow-soft-sm shrink-0">
            <div className="flex items-center gap-1.5 font-serif font-bold text-dark-text mb-1.5">
              <Info className="w-4 h-4 text-farm-green" /> Platform Policy
            </div>
            <p className="text-[11px] text-dark-text/70 leading-relaxed font-sans">
              Indicative/reference data : <strong className="text-dark-text">not a guaranteed transaction price</strong>. FarmChain does not buy, sell, or dictate final settlement rates.
            </p>
          </div>
        </div>

        {/* The Price Calculator & Benchmark Table Component */}
        <PriceCalculator />

        {/* Value Preservation Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Card variant="paper" className="p-7 space-y-3">
            <h3 className="font-serif font-bold text-xl text-dark-text">
              Where do traditional commissions go?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-dark-text/70 leading-relaxed">
              In physical APMC mandis, unregulated loading charges (hamali), weighing cess, cleaning deductions, and 6-10% informal broker cuts drain ₹4 to ₹7 per kilogram directly from the farmer's pocket before they even receive cash.
            </p>
            <div className="pt-2 font-mono text-xs font-semibold text-terracotta">
              Traditional margin erosion: Up to 38% lost to intermediaries
            </div>
          </Card>

          <Card variant="paper" className="p-7 space-y-3">
            <h3 className="font-serif font-bold text-xl text-dark-text">
              The FarmChain transparency promise
            </h3>
            <p className="font-sans text-xs sm:text-sm text-dark-text/70 leading-relaxed">
              Every invoice clearly itemizes the agreed farm-gate payout to the farmer and the exact logistics transportation cost. Buyers pay lower than wholesale distributors, while farmers earn significantly higher than local mandi auctions.
            </p>
            <div className="pt-2 font-mono text-xs font-semibold text-farm-green">
              Direct value realization: 86%+ retained by the producer
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
