import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sprout, 
  Truck, 
  PackageCheck,
  PlusCircle,
  TrendingUp
} from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroReferenceSectionProps {
  onNavigate: (view: string) => void;
  onOpenSellModal?: () => void;
  onOpenPostDemand: () => void;
}

export const HeroReferenceSection: React.FC<HeroReferenceSectionProps> = ({
  onNavigate,
  onOpenSellModal,
  onOpenPostDemand
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-farm-green-dark border-b-brutal">
      
      {/* Full-Width Agricultural Farmland Hero Background */}
      <div className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[560px] flex items-center">
        
        {/* Background Photo */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <img
            src="/hero_tractor_farmland.jpg"
            alt="Farmland at sunrise"
            className="w-full h-full object-cover object-[45%_center] sm:object-center"
            loading="eager"
          />
          
          {/* Gradients to ensure pristine contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-farm-green-dark/95 via-farm-green-dark/80 to-farm-green-dark/60 sm:to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-farm-green-dark/90 via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-furrow-pattern opacity-15 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 w-full text-center sm:text-left">
          
          {/* Simple Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 bg-harvest-yellow text-ink-black font-mono text-xs font-bold px-3 py-1 border-2 border-ink-black shadow-brutal-sm uppercase mb-4">
            <Sprout className="w-4 h-4" />
            <span>FARM-TO-BUYER DIRECT NETWORK</span>
          </div>

          {/* Simple, Bold Headline */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[1.05] text-paper-white mb-4">
            DIRECT MARKET <br />
            <span className="text-harvest-yellow">FOR YOUR HARVEST.</span>
          </h1>

          {/* One Short Supporting Sentence */}
          <p className="font-body text-base sm:text-lg text-warm-cream font-medium max-w-xl mb-6 leading-relaxed">
            Sell crops directly to verified wholesale buyers. Agree on prices in advance, get scheduled farm pickup, and receive 100% direct bank payout.
          </p>

          {/* 3 Quick Farmer Guarantees */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mb-8 font-mono text-xs text-paper-white">
            <span className="inline-flex items-center gap-1.5 bg-farm-green/80 border border-paper-white/30 px-2.5 py-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-harvest-yellow" />
              <span>0% Broker Fee</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-farm-green/80 border border-paper-white/30 px-2.5 py-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-harvest-yellow" />
              <span>Scheduled Pickup</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-farm-green/80 border border-paper-white/30 px-2.5 py-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-harvest-yellow" />
              <span>Direct Bank Transfer</span>
            </span>
          </div>

          {/* Primary and Secondary CTAs (Large, Touch-Friendly) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {onOpenSellModal ? (
              <Button
                variant="yellow"
                size="lg"
                onClick={onOpenSellModal}
                className="flex items-center justify-center gap-2 text-base font-heading font-black min-h-[50px] px-8 shadow-brutal"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span>SELL PRODUCE</span>
              </Button>
            ) : (
              <Button
                variant="yellow"
                size="lg"
                onClick={() => onNavigate('farmer')}
                className="flex items-center justify-center gap-2 text-base font-heading font-black min-h-[50px] px-8 shadow-brutal"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span>SELL PRODUCE</span>
              </Button>
            )}

            <Button
              variant="white"
              size="lg"
              onClick={() => onNavigate('orders')}
              className="flex items-center justify-center gap-2 text-base font-heading font-bold min-h-[50px] px-6 shadow-brutal"
            >
              <PackageCheck className="w-5 h-5" />
              <span>VIEW ORDERS</span>
            </Button>

            <button
              onClick={() => onNavigate('marketplace')}
              className="font-mono text-xs font-bold text-warm-cream hover:text-harvest-yellow underline self-center sm:self-auto px-2 py-1 mt-1 sm:mt-0"
            >
              Check Buyer Demand →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
