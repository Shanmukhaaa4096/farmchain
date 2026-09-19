import React, { useState } from 'react';
import { ArrowRight, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CropPriceData {
  crop: string;
  mandiPrice: number;
  farmchainPrice: number;
  mspPrice: number;
  unit: string;
  typicalLotKg: number;
}

const DEFAULT_CROPS: CropPriceData[] = [
  { crop: 'Tomato (Hybrid)', mandiPrice: 22, farmchainPrice: 31, mspPrice: 18, unit: 'kg', typicalLotKg: 3000 },
  { crop: 'Onion (Nashik Red)', mandiPrice: 19, farmchainPrice: 27, mspPrice: 15, unit: 'kg', typicalLotKg: 4000 },
  { crop: 'Green Chilli (G4)', mandiPrice: 38, farmchainPrice: 52, mspPrice: 30, unit: 'kg', typicalLotKg: 1500 },
  { crop: 'Potato (Jyoti)', mandiPrice: 16, farmchainPrice: 23, mspPrice: 14, unit: 'kg', typicalLotKg: 5000 },
  { crop: 'Wheat (Sharbati)', mandiPrice: 24, farmchainPrice: 30, mspPrice: 22.75, unit: 'kg', typicalLotKg: 6000 },
];

export interface PriceCompareProps {
  crops?: CropPriceData[];
  className?: string;
}

export const PriceCompare: React.FC<PriceCompareProps> = ({
  crops = DEFAULT_CROPS,
  className = '',
}) => {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const current = crops[selectedCropIndex];

  const priceDiffPerKg = current.farmchainPrice - current.mandiPrice;
  const percentageGain = Math.round((priceDiffPerKg / current.mandiPrice) * 100);
  const totalExtraEarnings = priceDiffPerKg * current.typicalLotKg;

  const mandiBrokerCutsPerLot = Math.round(current.mandiPrice * current.typicalLotKg * 0.08); // 8% commission + hamali
  const netMandiTakehome = (current.mandiPrice * current.typicalLotKg) - mandiBrokerCutsPerLot;
  const farmchainTakehome = current.farmchainPrice * current.typicalLotKg;
  const netFarmerAdvantage = farmchainTakehome - netMandiTakehome;

  return (
    <div
      className={cn(
        "rounded-[32px] bg-[#FBF8F2] border border-[#2F4A3A]/12 shadow-soft p-6 sm:p-10",
        className
      )}
    >
      {/* Header with Sample Data Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2F4A3A]/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#C77B58] bg-[#F1C9B8]/40 px-2.5 py-0.5 rounded-full border border-[#C77B58]/25">
              SAMPLE BENCHMARK DATA
            </span>
            <span className="font-mono text-[10px] text-[#2F4A3A]/60">APMC BOWENPALLY & AZADPUR BENCHMARK</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163323] tracking-tight">
            Mandi vs. FarmChain Payout Simulator
          </h3>
        </div>

        {/* Crop Selector Chips */}
        <div className="flex flex-wrap gap-2">
          {crops.map((item, idx) => (
            <button
              key={item.crop}
              onClick={() => setSelectedCropIndex(idx)}
              className={cn(
                "min-h-[38px] px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer",
                selectedCropIndex === idx
                  ? "bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm"
                  : "bg-[#F4EFE6] text-[#2F4A3A] hover:bg-[#A8B89A]/30 border border-[#2F4A3A]/10"
              )}
            >
              {item.crop.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Visual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 items-center">
        
        {/* Mandi Traditional Side (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-[#2F4A3A]/60 tracking-wider">
              TRADITIONAL APMC MANDI
            </span>
            <span className="text-[10px] text-red-700 bg-red-100 font-bold px-2 py-0.5 rounded-full">
              -8% to -12% DEDUCTED
            </span>
          </div>

          <div>
            <div className="text-3xl font-editorial font-bold text-[#2F4A3A]">
              ₹{current.mandiPrice}
              <span className="text-xs font-sans font-normal text-[#2F4A3A]/60">/kg gross</span>
            </div>
            <p className="text-[11px] font-sans text-[#2F4A3A]/70 mt-1">
              Subject to auction bidding volatility, commission broker cuts, and hamali unloading fees.
            </p>
          </div>

          <div className="pt-3 border-t border-[#2F4A3A]/10 space-y-2 text-xs font-sans">
            <div className="flex justify-between text-[#2F4A3A]/80">
              <span>Lot Value ({current.typicalLotKg} kg)</span>
              <span className="font-mono font-medium">₹{(current.mandiPrice * current.typicalLotKg).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-700">
              <span>Dalal & Hamali Cuts</span>
              <span className="font-mono">-₹{mandiBrokerCutsPerLot.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-[#163323] pt-1 border-t border-[#2F4A3A]/10">
              <span>Net Take-home</span>
              <span className="font-mono">₹{netMandiTakehome.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Central Vs / Net Gain Pill (4 cols) */}
        <div className="lg:col-span-4 text-center space-y-4 p-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C77B58] text-[#FBF8F2] shadow-soft-terracotta mx-auto">
            <TrendingUp className="w-7 h-7 stroke-[2.2]" />
          </div>

          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#C77B58] block">
              FARMER NET ADVANTAGE
            </span>
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#163323] tracking-tight mt-1">
              +₹{netFarmerAdvantage.toLocaleString()}
            </div>
            <p className="font-sans text-xs text-[#2F4A3A]/80 mt-1">
              Extra take-home pay per {current.typicalLotKg.toLocaleString()} kg harvest lot (+{percentageGain}%)
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163323] bg-[#A8B89A]/30 px-3 py-1 rounded-full border border-[#A8B89A]/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2F4A3A]" />
            <span>0% Broker Fee • Guaranteed Escrow Payout</span>
          </div>
        </div>

        {/* FarmChain Direct Side (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#2F4A3A] text-[#FBF8F2] border border-[#2F4A3A] shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-[#A8B89A] tracking-wider">
              FARMCHAIN DIRECT CONTRACT
            </span>
            <span className="text-[10px] text-[#163323] bg-[#E5B94A] font-bold px-2 py-0.5 rounded-full">
              0% BROKER CUT
            </span>
          </div>

          <div>
            <div className="text-3xl font-editorial font-bold text-[#FBF8F2]">
              ₹{current.farmchainPrice}
              <span className="text-xs font-sans font-normal text-[#FBF8F2]/70">/kg net</span>
            </div>
            <p className="text-[11px] font-sans text-[#FBF8F2]/80 mt-1">
              Pre-agreed price locked in escrow before harvest with village-gate refrigerated pickup.
            </p>
          </div>

          <div className="pt-3 border-t border-[#FBF8F2]/15 space-y-2 text-xs font-sans">
            <div className="flex justify-between text-[#FBF8F2]/80">
              <span>Gross Direct Settlement</span>
              <span className="font-mono font-medium">₹{farmchainTakehome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#E5B94A]">
              <span>Broker Commission</span>
              <span className="font-mono">₹0.00 (Zero)</span>
            </div>
            <div className="flex justify-between font-bold text-[#FBF8F2] pt-1 border-t border-[#FBF8F2]/15">
              <span>Direct Bank Deposit</span>
              <span className="font-mono text-[#E5B94A]">₹{farmchainTakehome.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
