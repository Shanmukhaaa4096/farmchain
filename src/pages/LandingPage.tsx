import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Truck, 
  Layers, 
  MapPin,
  Building2,
  BadgeCheck,
  FileText,
  Sprout,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Play
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { SupplyChainComparison } from '../components/interactive/SupplyChainComparison';
import { MatchingVisual } from '../components/interactive/MatchingVisual';
import { AssistedPushDemandShowcase } from '../components/interactive/AssistedPushDemandShowcase';
import { HeroReferenceSection } from '../components/layout/HeroReferenceSection';
import { VideoStoryModal } from '../components/modals/VideoStoryModal';
import { DemandRequirement } from '../types';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenPostDemand: () => void;
  liveDemands: DemandRequirement[];
  onSelectDemand: (demand: DemandRequirement) => void;
  onOpenSellModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenPostDemand,
  liveDemands,
  onSelectDemand,
  onOpenSellModal,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showDeepDiveComparison, setShowDeepDiveComparison] = useState(false);
  const [showInteractiveMatcher, setShowInteractiveMatcher] = useState(false);

  return (
    <div className="space-y-0">
      
      {/* 1. SIMPLIFIED HERO (What FarmChain does + Primary CTAs) */}
      <HeroReferenceSection
        onNavigate={onNavigate}
        onOpenSellModal={onOpenSellModal}
        onOpenPostDemand={onOpenPostDemand}
      />

      {/* Documentary Video Story Modal */}
      <VideoStoryModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* 2. TODAY'S BUYER DEMAND (Essential 3 Crops, Big Numbers, 1-Tap Action) */}
      <section className="py-8 sm:py-12 bg-warm-cream border-b-brutal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-green animate-pulse"></span>
              <h2 className="font-heading font-black text-lg sm:text-xl uppercase text-ink-black tracking-tight">
                TODAY'S BUYER DEMAND
              </h2>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className="font-mono text-xs font-bold text-farm-green hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL DEMAND ({liveDemands.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simple Clean Demand Cards */}
          <div className="divide-y-2 divide-ink-black/20 font-mono text-xs sm:text-sm pt-1">
            {liveDemands.slice(0, 3).map((demand) => (
              <div 
                key={demand.id}
                onClick={() => onSelectDemand(demand)}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-warm-cream/50 cursor-pointer transition-colors"
                role="button"
                tabIndex={0}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-base sm:text-lg uppercase text-ink-black">
                      {demand.crop}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-citrus-yellow border border-ink-black font-bold text-ink-black">
                      {demand.qualityGrade}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 block mt-0.5">
                    Buyer: <strong>{demand.buyerName}</strong> • {demand.deliveryLocation.split(',')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  <div className="text-left sm:text-right">
                    <span className="font-heading font-black text-base sm:text-lg text-ink-black block">
                      {demand.quantityKg.toLocaleString()} KG
                    </span>
                    <span className="text-xs text-farm-green font-bold">
                      Target: ₹{demand.targetPricePerKg}/KG
                    </span>
                  </div>

                  <Button
                    variant="yellow"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDemand(demand);
                    }}
                    className="text-xs font-heading font-bold"
                  >
                    RESPOND →
                  </Button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS (3 Simple, Plain-Language Steps) */}
      <section className="py-12 sm:py-16 bg-warm-cream border-b-brutal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center sm:text-left mb-8">
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black">
              HOW FARMCHAIN WORKS
            </h2>
            <p className="font-body text-xs sm:text-sm text-gray-700 mt-1">
              Three simple steps to sell your produce at fair prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1 */}
            <Card variant="white" className="p-5 border-brutal space-y-2">
              <span className="font-heading font-black text-3xl text-farm-green block">
                01
              </span>
              <h3 className="font-heading font-black text-base uppercase text-ink-black">
                BUYERS POST DEMAND
              </h3>
              <p className="font-body text-xs text-gray-700 leading-relaxed">
                Restaurants and supermarkets post what crops they need, quantities, and target prices.
              </p>
            </Card>

            {/* Step 2 */}
            <Card variant="yellow" className="p-5 border-brutal space-y-2">
              <span className="font-heading font-black text-3xl text-ink-black block">
                02
              </span>
              <h3 className="font-heading font-black text-base uppercase text-ink-black">
                AGREE ON PRICE
              </h3>
              <p className="font-body text-xs text-ink-black leading-relaxed font-medium">
                You receive nearby demand requests. Accept with one tap and agree on price directly.
              </p>
            </Card>

            {/* Step 3 */}
            <Card variant="white" className="p-5 border-brutal space-y-2">
              <span className="font-heading font-black text-3xl text-farm-green block">
                03
              </span>
              <h3 className="font-heading font-black text-base uppercase text-ink-black">
                PICKUP & DIRECT PAYOUT
              </h3>
              <p className="font-body text-xs text-gray-700 leading-relaxed">
                Truck picks up from your village. 100% of money transfers directly to your bank account.
              </p>
            </Card>

          </div>

          {/* Progressive Disclosure Toggle: Detailed Middleman Comparison */}
          <div className="mt-8 pt-4 border-t-2 border-ink-black text-center">
            <button
              onClick={() => setShowDeepDiveComparison(!showDeepDiveComparison)}
              className="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase px-4 py-2 bg-paper-white border-2 border-ink-black shadow-brutal-sm hover:bg-citrus-yellow transition-colors"
            >
              <span>{showDeepDiveComparison ? 'HIDE PRICE BREAKDOWN & COMMISSION DETAILS ▲' : 'VIEW TRADITIONAL MANDI VS FARMCHAIN PRICE BREAKDOWN ▼'}</span>
            </button>
          </div>

          {showDeepDiveComparison && (
            <div className="mt-6 animate-in fade-in duration-200">
              <SupplyChainComparison />
            </div>
          )}

        </div>
      </section>

      {/* 4. TRUST & GUARANTEES (3 Clean Cards) */}
      <section className="py-12 sm:py-16 bg-warm-cream border-b-brutal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center sm:text-left mb-8">
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black">
              DIRECT & VERIFIED
            </h2>
            <p className="font-body text-xs sm:text-sm text-gray-700 mt-1">
              Safety, transparency, and timely payments for every harvest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <Card variant="white" className="p-5 border-brutal space-y-2">
              <div className="w-10 h-10 bg-farm-green text-harvest-yellow border-2 border-ink-black flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-bold text-base uppercase text-ink-black">
                VERIFIED BUYERS
              </h3>
              <p className="font-body text-xs text-gray-700">
                All restaurants and businesses are GSTIN verified with escrow payment guarantees.
              </p>
            </Card>

            <Card variant="white" className="p-5 border-brutal space-y-2">
              <div className="w-10 h-10 bg-harvest-yellow text-ink-black border-2 border-ink-black flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-bold text-base uppercase text-ink-black">
                0% BROKER CUT
              </h3>
              <p className="font-body text-xs text-gray-700">
                Zero middleman commissions. You keep 100% of the agreed farm-gate price.
              </p>
            </Card>

            <Card variant="white" className="p-5 border-brutal space-y-2">
              <div className="w-10 h-10 bg-ink-black text-paper-white border-2 border-ink-black flex items-center justify-center">
                <Truck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-bold text-base uppercase text-ink-black">
                VILLAGE PICKUP
              </h3>
              <p className="font-body text-xs text-gray-700">
                Coordinated collection trucks pick up from your village with calibrated digital weighbridges.
              </p>
            </Card>

          </div>

          {/* Progressive Disclosure Toggle: Interactive Cluster Matcher & Assisted Onboarding */}
          <div className="mt-8 pt-4 border-t-2 border-ink-black text-center">
            <button
              onClick={() => setShowInteractiveMatcher(!showInteractiveMatcher)}
              className="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase px-4 py-2 bg-paper-white border-2 border-ink-black shadow-brutal-sm hover:bg-citrus-yellow transition-colors"
            >
              <span>{showInteractiveMatcher ? 'HIDE ADVANCED CLUSTER MATCHING DEMO ▲' : 'EXPLORE INTERACTIVE CLUSTER MATCHING & FIELD SIMULATION ▼'}</span>
            </button>
          </div>

          {showInteractiveMatcher && (
            <div className="mt-6 space-y-8 animate-in fade-in duration-200">
              <MatchingVisual />
              <AssistedPushDemandShowcase />
            </div>
          )}

        </div>
      </section>

      {/* 5. BOTTOM FAST ACTION BANNER */}
      <section className="py-10 bg-blue-crate text-paper-white border-b-brutal text-center">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-citrus-yellow">
            READY TO SELL YOUR CROP?
          </h2>
          <p className="font-body text-xs sm:text-sm text-gray-200">
            List your harvest in under 2 minutes. Free registration for farmers and FPOs.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onOpenSellModal ? (
              <Button
                variant="yellow"
                size="lg"
                onClick={onOpenSellModal}
                className="font-heading font-black text-sm w-full sm:w-auto px-8"
              >
                + SELL PRODUCE NOW
              </Button>
            ) : (
              <Button
                variant="yellow"
                size="lg"
                onClick={() => onNavigate('farmer')}
                className="font-heading font-black text-sm w-full sm:w-auto px-8"
              >
                + SELL PRODUCE NOW
              </Button>
            )}

            <Button
              variant="white"
              size="lg"
              onClick={() => onNavigate('marketplace')}
              className="font-heading font-bold text-sm w-full sm:w-auto px-6"
            >
              VIEW LIVE DEMANDS
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
