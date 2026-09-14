import React from 'react';
import { Scale, TrendingUp, ShieldCheck, AlertCircle, Info, Calculator } from 'lucide-react';
import { PriceCalculator } from '../components/interactive/PriceCalculator';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const MarketPricesPage: React.FC = () => {
  return (
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-brutal">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold">
              <Badge variant="dark" size="sm">PRICE INTELLIGENCE</Badge>
              <Badge variant="green" size="sm">ZERO BROKER CUTS</Badge>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-black">
              KNOW THE PRICE. <br className="hidden sm:inline" />
              NEGOTIATE BETTER.
            </h1>
            <p className="font-body text-base text-gray-700 mt-2 font-medium max-w-2xl">
              Transparent market price signals provide farmers and buyers with calibrated reference points for fair, direct contracts.
            </p>
          </div>

          {/* Prompt explicit disclaimer requirement */}
          <div className="p-4 bg-paper-white border-2 border-ink-black font-mono text-xs max-w-sm shadow-brutal-sm">
            <div className="flex items-center gap-1.5 font-bold text-ink-black mb-1">
              <Info className="w-4 h-4 text-farm-green" /> PLATFORM POLICY
            </div>
            <p className="text-[11px] text-gray-700 leading-tight">
              Indicative/reference information : <strong>not a guaranteed transaction price</strong>. FarmChain does not buy, sell, or determine the final trading price.
            </p>
          </div>
        </div>

        {/* The Price Calculator & Benchmark Table Component */}
        <PriceCalculator />

        {/* Value Preservation Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <Card variant="cream" shadow="sm" className="p-6 border-brutal space-y-3">
            <h3 className="font-heading font-black text-xl uppercase text-ink-black">
              WHERE DO TRADITIONAL COMMISSIONS GO?
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              In physical APMC mandis, unregulated loading charges (hamali), weighing cess, cleaning deductions, and 6-10% informal broker cuts drain ₹4 to ₹7 per kilogram directly from the farmer's pocket before they even receive cash.
            </p>
            <div className="pt-2 font-mono text-xs font-bold text-rust-red">
              TRADITIONAL MARGIN EROSION: UP TO 38%
            </div>
          </Card>

          <Card variant="cream" shadow="sm" className="p-6 border-brutal space-y-3">
            <h3 className="font-heading font-black text-xl uppercase text-ink-black">
              THE FARMCHAIN TRANSPARENCY PROMISE
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              Every invoice clearly itemizes the agreed farm-gate payout to the farmer and the exact logistics transportation cost. Buyers pay lower than wholesale distributors, while farmers earn significantly higher than local mandi auctions.
            </p>
            <div className="pt-2 font-mono text-xs font-bold text-farm-green">
              DIRECT VALUE REALIZATION: 86%+ RETAINED
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
