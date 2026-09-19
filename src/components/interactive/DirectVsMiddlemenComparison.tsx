import React, { useState } from 'react';
import { 
  Sprout, 
  ArrowRight, 
  Users, 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  Building2,
  Home,
  Truck
} from 'lucide-react';
import { Card } from '../ui/Card';
import { PriceCompare } from '../ui/PriceCompare';

export const DirectVsMiddlemenComparison: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<'tomato' | 'onion' | 'wheat' | 'chilli'>('tomato');

  const cropStats = {
    tomato: {
      crop: 'Tomato',
      mandiFarmerRate: 22,
      middlemenCuts: 18,
      retailPrice: 40,
      farmChainFarmerRate: 32,
      farmChainBuyerRate: 32,
      farmerGain: '+45%',
      buyerSavings: '-20%',
    },
    onion: {
      crop: 'Onion',
      mandiFarmerRate: 19,
      middlemenCuts: 16,
      retailPrice: 35,
      farmChainFarmerRate: 28,
      farmChainBuyerRate: 28,
      farmerGain: '+47%',
      buyerSavings: '-20%',
    },
    wheat: {
      crop: 'Wheat',
      mandiFarmerRate: 24,
      middlemenCuts: 14,
      retailPrice: 38,
      farmChainFarmerRate: 31,
      farmChainBuyerRate: 31,
      farmerGain: '+29%',
      buyerSavings: '-18%',
    },
    chilli: {
      crop: 'Green Chilli',
      mandiFarmerRate: 46,
      middlemenCuts: 39,
      retailPrice: 85,
      farmChainFarmerRate: 64,
      farmChainBuyerRate: 64,
      farmerGain: '+39%',
      buyerSavings: '-25%',
    },
  };

  const current = cropStats[selectedCrop];

  return (
    <div className="space-y-12">
      
      {/* Visual Chain Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Track A: Traditional Middlemen (Broken, slow, multi-cut) */}
        <div className="bg-[#FBF8F2] p-6 sm:p-8 rounded-[32px] border border-[#C77B58]/25 shadow-soft flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2F4A3A]/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C77B58]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C77B58]">
                  TRADITIONAL LOCAL MANDI CHAIN
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase bg-[#C77B58]/15 text-[#C77B58] px-2.5 py-0.5 rounded-full">
                UP TO 38% VALUE LOST
              </span>
            </div>

            {/* Stepper with intermediary cuts */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F4EFE6] border border-[#2F4A3A]/10">
                <Sprout className="w-4 h-4 text-[#536458] shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span><strong>Farmer:</strong> Takes all weather &amp; harvest risk</span>
                  <span className="font-mono text-[#536458] font-bold">Gets ₹{current.mandiFarmerRate}/kg</span>
                </div>
              </div>

              <div className="flex justify-center text-[#C77B58] text-[10px] font-mono">
                ↓ Village Trader (8% Cut + Hamali Charges)
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F4EFE6] border border-[#2F4A3A]/10">
                <Users className="w-4 h-4 text-[#C77B58] shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span><strong>Commission Agent (Arhtiya):</strong> Informal deductions</span>
                  <span className="font-mono text-[#C77B58]">+₹4 to ₹6/kg</span>
                </div>
              </div>

              <div className="flex justify-center text-[#C77B58] text-[10px] font-mono">
                ↓ Mandi Yard Auction &amp; Loading Fees
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F4EFE6] border border-[#2F4A3A]/10">
                <Building2 className="w-4 h-4 text-[#536458] shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span><strong>Wholesale Trader &amp; Distributor</strong></span>
                  <span className="font-mono text-[#C77B58]">+₹5 to ₹8/kg</span>
                </div>
              </div>

              <div className="flex justify-center text-[#C77B58] text-[10px] font-mono">
                ↓ Multi-tier Transit Spoilage (3–5 days)
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F4EFE6] border border-[#2F4A3A]/10">
                <Store className="w-4 h-4 text-[#536458] shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span><strong>End Buyer (Household or Restaurant)</strong></span>
                  <span className="font-mono font-bold text-[#163323]">Pays ₹{current.retailPrice}/kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#C77B58]/10 border border-[#C77B58]/20 rounded-2xl text-xs text-[#C77B58] flex items-center gap-2 font-mono">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Middlemen absorb ₹{current.middlemenCuts}/kg of pure margin</span>
          </div>
        </div>

        {/* Track B: FarmChain Direct Path (Highlighted in forest green) */}
        <div className="bg-[#163323] text-[#FBF8F2] p-6 sm:p-8 rounded-[32px] border border-[#163323] shadow-soft-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#FBF8F2]/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5B94A] animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5B94A]">
                  FARMCHAIN DIRECT INFRASTRUCTURE
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase bg-[#E5B94A] text-[#163323] px-2.5 py-0.5 rounded-full">
                0% BROKER FEE
              </span>
            </div>

            {/* Direct Flow */}
            <div className="space-y-4 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-[#2F4A3A]/60 border border-[#FBF8F2]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#A8B89A]/20 flex items-center justify-center text-[#A8B89A]">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm block text-[#FBF8F2]">Verified Farmer</strong>
                    <span className="text-[#A8B89A] text-[11px]">Agrees on harvest rate before picking</span>
                  </div>
                </div>
                <div className="text-right">
                  <strong className="font-editorial text-xl text-[#E5B94A] block">
                    ₹{current.farmChainFarmerRate}/kg
                  </strong>
                  <span className="text-[10px] font-mono text-[#A8B89A]">{current.farmerGain} Higher</span>
                </div>
              </div>

              {/* Animated Connection Arrow */}
              <div className="p-3 rounded-2xl bg-[#2F4A3A]/30 border border-[#E5B94A]/30 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-[#E5B94A]">
                  <Truck className="w-4 h-4" />
                  <span>Scheduled Village Pickup Milk-Run</span>
                </div>
                <span className="text-[#A8B89A] text-[11px]">Under 24h Transit</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#2F4A3A]/60 border border-[#FBF8F2]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E5B94A]/20 flex items-center justify-center text-[#E5B94A]">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm block text-[#FBF8F2]">Buyer (Home / Restaurant / Shop)</strong>
                    <span className="text-[#A8B89A] text-[11px]">Farm-fresh harvest delivered to dock</span>
                  </div>
                </div>
                <div className="text-right">
                  <strong className="font-editorial text-xl text-[#FBF8F2] block">
                    ₹{current.farmChainBuyerRate}/kg
                  </strong>
                  <span className="text-[10px] font-mono text-[#E5B94A]">{current.buyerSavings} Below Retail</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#E5B94A]/15 border border-[#E5B94A]/30 rounded-2xl text-xs text-[#E5B94A] flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#E5B94A]" />
            <span>100% of price paid directly into farmer bank account via Safe Payment</span>
          </div>
        </div>

      </div>

      {/* Embedded Crop Price Realization Comparison Component */}
      <PriceCompare />

    </div>
  );
};
