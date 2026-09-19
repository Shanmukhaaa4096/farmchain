import React from 'react';
import { 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';

interface HowItWorksPageProps {
  onNavigate: (view: string) => void;
  onOpenSellModal?: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  onOpenSellModal,
}) => {
  return (
    <div className="py-10 sm:py-16 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#C77B58] bg-[#FBF8F2] border border-[#2F4A3A]/10 px-3.5 py-1.5 rounded-full">
            PLAIN GUIDE // HOW FARMCHAIN WORKS
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-[#163323] tracking-tight">
            Fair Prices for Farmers.<br />
            <span className="text-[#C77B58]">Fresh Produce for Buyers.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#2F4A3A]/80 max-w-2xl mx-auto leading-relaxed">
            Sell crops directly to verified wholesale buyers. Agree on harvest prices in advance. Village pickup. 100% direct bank payout. 0% broker fee.
          </p>
        </div>

        {/* 3 User Tracks: Farmers, Households, Shops & Bulk Buyers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. For Farmers */}
          <div className="bg-[#FBF8F2] p-8 rounded-[32px] border border-[#2F4A3A]/15 shadow-soft space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-[#A8B89A]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C77B58] tracking-widest block">
                  FOR FARMERS &amp; FPOS
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#163323]">
                  Sell Your Crop Before Harvest
                </h2>
              </div>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#2F4A3A]/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0 mt-0.5" />
                  <span><strong>List your crop:</strong> Tell us expected quantity (kg or quintals) and village gate location.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0 mt-0.5" />
                  <span><strong>Receive direct offers:</strong> Agree on harvest rates in advance with no middleman.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0 mt-0.5" />
                  <span><strong>Village pickup:</strong> Vehicles collect directly from your village point.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0 mt-0.5" />
                  <span><strong>Money in your bank:</strong> 100% of agreed price sent straight to your account.</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="md"
              withArrow
              fullWidth
              onClick={onOpenSellModal || (() => onNavigate('farmer'))}
              className="text-xs uppercase tracking-wider font-semibold"
            >
              Sell Your Crop
            </Button>
          </div>

          {/* 2. For Households */}
          <div className="bg-[#FBF8F2] p-8 rounded-[32px] border border-[#2F4A3A]/15 shadow-soft space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#C77B58] text-[#FBF8F2] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C77B58] tracking-widest block">
                  BUY FOR HOME (1–25 KG)
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#163323]">
                  Fresh Crops for Your Kitchen
                </h2>
              </div>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#2F4A3A]/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C77B58] shrink-0 mt-0.5" />
                  <span><strong>Direct harvest:</strong> Harvested within 24 hours of delivery.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C77B58] shrink-0 mt-0.5" />
                  <span><strong>Simple cart:</strong> Choose 1 to 25 kg at fixed ₹ per kg.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C77B58] shrink-0 mt-0.5" />
                  <span><strong>15–20% below retail:</strong> No retailer markup or distributor cuts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C77B58] shrink-0 mt-0.5" />
                  <span><strong>Doorstep delivery:</strong> Clean crates right to your home.</span>
                </li>
              </ul>
            </div>

            <Button
              variant="outline"
              size="md"
              withArrow
              fullWidth
              onClick={() => onNavigate('market')}
              className="text-xs uppercase tracking-wider font-semibold"
            >
              Buy Fresh Crops
            </Button>
          </div>

          {/* 3. For Shops & Bulk Buyers */}
          <div className="bg-[#163323] text-[#FBF8F2] p-8 rounded-[32px] border border-[#163323] shadow-soft space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FBF8F2]/15 text-[#E5B94A] flex items-center justify-center border border-[#FBF8F2]/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#E5B94A] tracking-widest block">
                  BULK ORDER (QUINTALS)
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#FBF8F2]">
                  For Shops, Hotels &amp; Kitchens
                </h2>
              </div>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#FBF8F2]/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E5B94A] shrink-0 mt-0.5" />
                  <span><strong>Order in quintals:</strong> 1 quintal = 100 kg. Direct lot aggregation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E5B94A] shrink-0 mt-0.5" />
                  <span><strong>Ask for a price:</strong> Propose custom forward price per quintal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E5B94A] shrink-0 mt-0.5" />
                  <span><strong>Safe Payment:</strong> Money locked securely until dock delivery.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E5B94A] shrink-0 mt-0.5" />
                  <span><strong>Single invoice:</strong> Unified GST bill with calibrated quality QC.</span>
                </li>
              </ul>
            </div>

            <Button
              variant="yellow"
              size="md"
              withArrow
              fullWidth
              onClick={() => onNavigate('buyer')}
              className="text-xs uppercase tracking-wider font-semibold"
            >
              Bulk Sourcing Desk
            </Button>
          </div>

        </div>

        {/* Integrated Section: Pickup & Delivery Guide (Moved from standalone top-level menu as requested) */}
        <div id="pickup-and-delivery" className="bg-[#FBF8F2] p-8 sm:p-12 rounded-[36px] border border-[#2F4A3A]/15 shadow-soft-lg space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#C77B58]">
              LOGISTICS &amp; TRANSPORTATION
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323]">
              Pickup &amp; Delivery: How It Works
            </h2>
            <p className="font-sans text-sm text-[#536458] leading-relaxed">
              Farmers do not have to pay expensive private tempo charges or waste full days at distant mandi yards. FarmChain coordinates shared collection routes across village clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#163323]">
                Village Aggregation Point
              </h3>
              <p className="text-xs text-[#536458] leading-relaxed font-sans">
                Each village has a designated collection center (panchayat shed or cooperative gate). Farmers bring their harvested crates at the scheduled morning hour.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#C77B58] text-[#FBF8F2] flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#163323]">
                Digital Weighing &amp; Quality Signoff
              </h3>
              <p className="text-xs text-[#536458] leading-relaxed font-sans">
                The driver and village lead inspect the crates using digital scales. Weight and grade are entered into the app, immediately triggering the Safe Payment confirmation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#163323] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold">
                03
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#163323]">
                Direct Transport to Destination
              </h3>
              <p className="text-xs text-[#536458] leading-relaxed font-sans">
                Ventilated trucks transport produce directly to urban city hubs and buyer docks without sitting in intermediate godowns or multi-tier market auctions.
              </p>
            </div>
          </div>
        </div>

        {/* Integrated Section: Safe Payment Explained */}
        <div className="bg-[#163323] text-[#FBF8F2] p-8 sm:p-12 rounded-[36px] shadow-soft-lg space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#E5B94A]">
              ZERO LOSS GUARANTEE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#FBF8F2]">
              Safe Payment: Complete Peace of Mind
            </h2>
            <p className="font-sans text-sm text-[#FBF8F2]/75 leading-relaxed">
              Neither the farmer nor the buyer risks their money. Here is the exact 4-step money flow:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            <div className="p-5 rounded-2xl bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-2">
              <span className="text-xs font-mono text-[#E5B94A] font-bold">STEP 1</span>
              <h3 className="font-editorial text-lg font-bold text-[#FBF8F2]">Buyer Deposits Funds</h3>
              <p className="text-xs text-[#FBF8F2]/70 leading-relaxed">
                Money is safely locked in the system. The farmer can see that funds are guaranteed before harvesting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-2">
              <span className="text-xs font-mono text-[#E5B94A] font-bold">STEP 2</span>
              <h3 className="font-editorial text-lg font-bold text-[#FBF8F2]">Harvest &amp; Village Weighing</h3>
              <p className="text-xs text-[#FBF8F2]/70 leading-relaxed">
                Produce is picked and weighed digitally at the village point. Both parties receive an instant digital slip.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-2">
              <span className="text-xs font-mono text-[#E5B94A] font-bold">STEP 3</span>
              <h3 className="font-editorial text-lg font-bold text-[#FBF8F2]">Delivery &amp; Check</h3>
              <p className="text-xs text-[#FBF8F2]/70 leading-relaxed">
                The buyer inspects the fresh crates upon arrival. Any defective crates are flagged with photo evidence.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-2">
              <span className="text-xs font-mono text-[#E5B94A] font-bold">STEP 4</span>
              <h3 className="font-editorial text-lg font-bold text-[#FBF8F2]">Money in Bank (Under 2h)</h3>
              <p className="text-xs text-[#FBF8F2]/70 leading-relaxed">
                100% of the agreed amount is transferred straight to the farmer bank account via IMPS with 0% broker fee.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
