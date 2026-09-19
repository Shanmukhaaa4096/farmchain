import React, { useState } from 'react';
import { 
  TrendingUp, 
  Scale, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PriceCalculator } from '../components/interactive/PriceCalculator';
import { ForecastChart } from '../components/interactive/ForecastChart';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SAMPLE_LISTINGS } from '../data/sampleHomepageData';

export const MarketPricesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prices' | 'forecast'>('prices');

  return (
    <div className="py-8 sm:py-14 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2F4A3A]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 bg-[#2F4A3A] text-[#FBF8F2] text-[10px] font-bold uppercase tracking-wider rounded-full">
                TODAY'S PRICES &amp; MARKET SIGNALS
              </span>
              <span className="px-3 py-1 bg-[#FBF8F2] text-[#2F4A3A] border border-[#2F4A3A]/15 text-[10px] font-bold uppercase rounded-full">
                SAMPLE DATA // SIH DEMO
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#163323] leading-tight">
              Today's Prices &amp; Best Time to Sell
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#536458] max-w-2xl leading-relaxed">
              Check real mandi rates compared to FarmChain direct prices, and see 7-day price trends to choose the best day to harvest.
            </p>
          </div>

          {/* Tab Switcher: Today's Prices vs Best Time to Sell */}
          <div className="flex items-center gap-2 bg-[#FBF8F2] p-1 rounded-2xl border border-[#2F4A3A]/15 shadow-soft shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('prices')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'prices'
                  ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                  : 'text-[#2F4A3A] hover:bg-[#F4EFE6]'
              }`}
            >
              Today's Prices &amp; Calculator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('forecast')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'forecast'
                  ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                  : 'text-[#2F4A3A] hover:bg-[#F4EFE6]'
              }`}
            >
              Best Time to Sell (7-Day Trends)
            </button>
          </div>
        </div>

        {activeTab === 'prices' ? (
          <div className="space-y-10">
            
            {/* Live Comparison Table */}
            <div className="bg-[#FBF8F2] rounded-[32px] border border-[#2F4A3A]/15 p-6 sm:p-8 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#C77B58] tracking-wider block">
                    TODAY'S PRICE COMPARISON
                  </span>
                  <h2 className="font-editorial text-2xl font-bold text-[#163323]">
                    Mandi Auction Rate vs FarmChain Direct
                  </h2>
                </div>
                <span className="text-xs text-[#536458] font-sans">
                  Updated Today • 0% Broker Deductions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#2F4A3A]/15 font-mono text-[10px] uppercase text-[#536458]">
                      <th className="pb-3 font-bold">Crop &amp; Variety</th>
                      <th className="pb-3 font-bold">Mandi Price (₹/kg)</th>
                      <th className="pb-3 font-bold">FarmChain Direct (₹/kg)</th>
                      <th className="pb-3 font-bold">Farmer Gain</th>
                      <th className="pb-3 font-bold">Retail Market</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2F4A3A]/10">
                    {SAMPLE_LISTINGS.slice(0, 10).map((lot) => {
                      const gain = Math.round(((lot.pricePerKg - lot.mandiPricePerKg) / lot.mandiPricePerKg) * 100);
                      return (
                        <tr key={lot.id} className="hover:bg-[#F4EFE6]/60 transition-colors">
                          <td className="py-3.5 pr-4">
                            <strong className="font-editorial text-base text-[#163323] block">{lot.crop}</strong>
                            <span className="text-[11px] text-[#536458]">{lot.variety} • {lot.village}</span>
                          </td>
                          <td className="py-3.5 text-[#536458] font-mono">
                            ₹{lot.mandiPricePerKg} / kg
                          </td>
                          <td className="py-3.5 font-mono font-bold text-[#163323] text-base">
                            ₹{lot.pricePerKg} / kg
                          </td>
                          <td className="py-3.5">
                            <span className="inline-block bg-[#2F4A3A] text-[#FBF8F2] font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                              +{gain}%
                            </span>
                          </td>
                          <td className="py-3.5 text-[#536458] font-sans">
                            <span className="line-through">₹{lot.retailPricePerKg}/kg</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* The Price Calculator Component */}
            <PriceCalculator />

            {/* Value Preservation Explainer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Card variant="paper" className="p-7 space-y-3">
                <h3 className="font-editorial font-bold text-2xl text-[#163323]">
                  Where do mandi commissions go?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#536458] leading-relaxed">
                  In physical auction yards, loading fees (hamali), weighing cess, cleaning charges, and 6–10% broker cuts take ₹4 to ₹7 per kg directly out of the farmer's pocket.
                </p>
                <div className="pt-2 font-mono text-xs font-semibold text-[#C77B58]">
                  Traditional loss: Up to 38% lost to intermediaries
                </div>
              </Card>

              <Card variant="paper" className="p-7 space-y-3">
                <h3 className="font-editorial font-bold text-2xl text-[#163323]">
                  The FarmChain direct promise
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#536458] leading-relaxed">
                  Every transaction itemizes the agreed farm-gate payout to the farmer and the scheduled village collection truck fee. 100% of the harvest price reaches the farmer bank account.
                </p>
                <div className="pt-2 font-mono text-xs font-semibold text-[#2F4A3A]">
                  Direct value retained: 86%+ kept by the producer
                </div>
              </Card>
            </div>

          </div>
        ) : (
          /* Best Time to Sell Tab (Integrated as requested) */
          <div className="space-y-8">
            <div className="bg-[#FBF8F2] p-6 sm:p-8 rounded-[32px] border border-[#2F4A3A]/15 shadow-soft space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#C77B58] tracking-wider block">
                    HARVEST TIMING INTELLIGENCE
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163323]">
                    Best Time to Sell: 7-Day Demand Curves
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#2F4A3A] bg-[#2F4A3A]/10 px-3 py-1 rounded-full font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#C77B58]" />
                  <span>Harvest Planning Horizon: Next 7 Days</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#536458] leading-relaxed font-sans max-w-3xl">
                When everyone in a district harvests at the same time, local market prices crash. Use our forward demand curve to decide whether to pick today, stagger over the weekend, or divert to processing buyers.
              </p>
            </div>

            {/* Core Visualization */}
            <ForecastChart />

            {/* 3 Practical Harvest Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <Card variant="paper" className="p-6 space-y-2 font-sans">
                <CheckCircle2 className="w-6 h-6 text-[#2F4A3A]" />
                <strong className="text-sm font-bold text-[#163323] block">Avoid Peak Mandi Glut</strong>
                <p className="text-xs text-[#536458] leading-relaxed">
                  Notice when expected supply surges on Monday mornings. Staggering harvest by 48 hours protects your realization.
                </p>
              </Card>
              <Card variant="paper" className="p-6 space-y-2 font-sans">
                <CheckCircle2 className="w-6 h-6 text-[#C77B58]" />
                <strong className="text-sm font-bold text-[#163323] block">Pre-Lock Bulk Contracts</strong>
                <p className="text-xs text-[#536458] leading-relaxed">
                  Institutional buyers lock purchases 7–14 days in advance. Accept a forward offer before cutting the crop.
                </p>
              </Card>
              <Card variant="paper" className="p-6 space-y-2 font-sans">
                <CheckCircle2 className="w-6 h-6 text-[#163323]" />
                <strong className="text-sm font-bold text-[#163323] block">Direct Cold-Chain Divert</strong>
                <p className="text-xs text-[#536458] leading-relaxed">
                  For perishable tomatoes and chillies, divert lots into refrigerated milk-runs directly to urban cloud kitchens.
                </p>
              </Card>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
