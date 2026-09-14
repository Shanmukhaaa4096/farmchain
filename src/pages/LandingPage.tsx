import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Truck, 
  Layers, 
  Sparkles,
  MapPin,
  Building2,
  BadgeCheck,
  FileText,
  Sprout,
  Droplets,
  Wind
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { SupplyChainComparison } from '../components/interactive/SupplyChainComparison';
import { MatchingVisual } from '../components/interactive/MatchingVisual';
import { 
  WindSwayWheat, 
  TractorInFieldIllustration, 
  CropGrowthStageIndicator, 
  TopographicContourLines 
} from '../components/agricultural/AgriIllustrations';
import { FieldPlotVisual } from '../components/agricultural/FieldPlotVisual';
import { HeroReferenceSection } from '../components/layout/HeroReferenceSection';
import { LayeredAgriGrid } from '../components/agricultural/LayeredAgriGrid';
import { VideoStoryModal } from '../components/modals/VideoStoryModal';
import { AssistedPushDemandShowcase } from '../components/interactive/AssistedPushDemandShowcase';
import { DemandRequirement } from '../types';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenPostDemand: () => void;
  liveDemands: DemandRequirement[];
  onSelectDemand: (demand: DemandRequirement) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenPostDemand,
  liveDemands,
  onSelectDemand,
}) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  return (
    <div className="space-y-0">
      
      {/* REFERENCE-INSPIRED AGRICULTURAL HERO (Bold typography, cinematic Indian farmland, floating UI cards & guarantee banner) */}
      <HeroReferenceSection
        onNavigate={onNavigate}
        onOpenPostDemand={onOpenPostDemand}
        onOpenVideo={() => setIsVideoOpen(true)}
      />

      {/* DOCUMENTARY VIDEO STORY MODAL */}
      <VideoStoryModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* LIVE MARKET DEMAND TICKER & REAL-TIME AGGREGATION */}
      <section className="py-12 bg-warm-cream bg-topo-pattern border-b-brutal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Card variant="white" shadow="lg" className="p-6 md:p-8 border-brutal-thick relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-ink-black">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-terminal-green animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-farm-green">
                  LIVE MARKET DEMAND // REAL-TIME AGGREGATION FEED
                </span>
              </div>
              <div className="font-mono text-xs text-gray-500 font-bold">
                TELANGANA / ANDHRA AGRI-CORRIDOR
              </div>
            </div>

            {/* Demand Ticker Rows with Animated Counters */}
            <div className="divide-y-2 divide-ink-black/20 font-mono text-sm pt-2">
              <div 
                onClick={() => onSelectDemand(liveDemands[0])}
                className="py-3 flex items-center justify-between hover:bg-warm-cream/50 px-2 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading font-black text-base uppercase text-ink-black">
                    TOMATOES (GRADE A)
                  </span>
                  <Badge variant="green" size="sm">URBANFORK</Badge>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-ink-black">
                    <AnimatedCounter value={2400} suffix=" KG" />
                  </span>
                  <span className="font-bold text-farm-green flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> ↑ 18%
                  </span>
                  <span className="text-xs text-farm-green font-bold underline hidden sm:inline">
                    VIEW →
                  </span>
                </div>
              </div>

              <div 
                onClick={() => onSelectDemand(liveDemands[1])}
                className="py-3 flex items-center justify-between hover:bg-warm-cream/50 px-2 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading font-black text-base uppercase text-ink-black">
                    ONIONS (PINK MEDIUM)
                  </span>
                  <Badge variant="yellow" size="sm">FRESHSPROUT</Badge>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-ink-black">
                    <AnimatedCounter value={5000} suffix=" KG" />
                  </span>
                  <span className="font-bold text-farm-green flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> ↑ 11%
                  </span>
                  <span className="text-xs text-farm-green font-bold underline hidden sm:inline">
                    VIEW →
                  </span>
                </div>
              </div>

              <div 
                onClick={() => onSelectDemand(liveDemands[2])}
                className="py-3 flex items-center justify-between hover:bg-warm-cream/50 px-2 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading font-black text-base uppercase text-ink-black">
                    POTATOES (CHIPS GRADE)
                  </span>
                  <Badge variant="white" size="sm">DECCAN AGRO</Badge>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-ink-black">
                    <AnimatedCounter value={8500} suffix=" KG" />
                  </span>
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    → 4%
                  </span>
                  <span className="text-xs text-farm-green font-bold underline hidden sm:inline">
                    VIEW →
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Card Strip */}
            <div className="mt-4 pt-3 border-t-2 border-ink-black flex items-center justify-between text-xs font-mono">
              <span className="text-gray-600">ZERO MIDDLEMEN // DIRECT CONTRACT ESCROW</span>
              <button 
                onClick={() => onNavigate('marketplace')}
                className="font-bold text-farm-green hover:underline flex items-center gap-1"
              >
                EXPLORE ALL 28 ACTIVE DEMANDS →
              </button>
            </div>
          </Card>

          {/* Crop Growth Stages Infographic */}
          <div className="mt-8">
            <CropGrowthStageIndicator cropName="Tomatoes (Grade A) : Current Harvest Cycle" />
          </div>

        </div>
      </section>

      {/* LAYERED AGRI GRID (Mirroring Reference Image Editorial Layout) */}
      <LayeredAgriGrid onNavigate={onNavigate} />

      {/* SECTION 11: PROBLEM SECTION // WHERE DOES THE MONEY GO? */}
      <SupplyChainComparison />

      {/* SECTION 12: HOW FARMCHAIN WORKS // 5-STEP EDITORIAL GRID */}
      <section className="py-20 bg-warm-cream bg-topo-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Badge variant="dark" size="sm" className="mb-3">
                SECTION 05 // SYSTEM WORKFLOW
              </Badge>
              <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-ink-black">
                HOW FARMCHAIN WORKS
              </h2>
              <p className="font-body text-base text-gray-700 max-w-2xl mt-2 font-medium">
                Five structured, transparent operational steps turning fragmented village supply into enterprise-grade direct fulfillment.
              </p>
            </div>

            {/* Tractor vector illustration in corner */}
            <div className="w-56 hidden md:block opacity-90">
              <TractorInFieldIllustration />
            </div>
          </div>

          {/* 5-Step Editorial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Step 01 */}
            <Card variant="white" shadow="default" className="p-6 border-brutal flex flex-col justify-between">
              <div>
                <span className="font-heading font-black text-4xl text-farm-green block mb-4">
                  01
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  BUYER POSTS DEMAND
                </h3>
                <p className="font-body text-xs text-gray-700 leading-relaxed">
                  Restaurants and retailers publish specific requirements: crop, quantity, quality grade, location and target delivery date.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-200 font-mono text-[10px] text-farm-green font-bold">
                ✓ VERIFIED PURCHASE ORDERS
              </div>
            </Card>

            {/* Step 02 */}
            <Card variant="white" shadow="default" className="p-6 border-brutal flex flex-col justify-between">
              <div>
                <span className="font-heading font-black text-4xl text-farm-green block mb-4">
                  02
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  FARMERS GET MATCHED
                </h3>
                <p className="font-body text-xs text-gray-700 leading-relaxed">
                  FarmChain identifies nearby farmers & FPOs with ready crops and alerts them with clear demand parameters.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-200 font-mono text-[10px] text-farm-green font-bold">
                ✓ GEOLOCATION PROXIMITY
              </div>
            </Card>

            {/* Step 03 */}
            <Card variant="yellow" shadow="default" className="p-6 border-brutal flex flex-col justify-between">
              <div>
                <span className="font-heading font-black text-4xl text-ink-black block mb-4">
                  03
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  SMALL QUANTITIES COMBINE
                </h3>
                <p className="font-body text-xs text-ink-black leading-relaxed font-medium">
                  Multiple smallholder farmers voluntarily form digital groups to fulfill large multi-ton commercial orders.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-ink-black font-mono text-[10px] text-ink-black font-bold">
                ✓ DIGITAL COOPERATIVE POWER
              </div>
            </Card>

            {/* Step 04 */}
            <Card variant="white" shadow="default" className="p-6 border-brutal flex flex-col justify-between">
              <div>
                <span className="font-heading font-black text-4xl text-farm-green block mb-4">
                  04
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  LOGISTICS ARE OPTIMIZED
                </h3>
                <p className="font-body text-xs text-gray-700 leading-relaxed">
                  The platform coordinates shared transportation, cold-chain trucks, and optimized circular pickup routes.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-200 font-mono text-[10px] text-farm-green font-bold">
                ✓ 91% FLEET UTILIZATION
              </div>
            </Card>

            {/* Step 05 */}
            <Card variant="green" shadow="default" className="p-6 border-brutal flex flex-col justify-between">
              <div>
                <span className="font-heading font-black text-4xl text-harvest-yellow block mb-4">
                  05
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-paper-white mb-2">
                  FARMERS SELL DIRECTLY
                </h3>
                <p className="font-body text-xs text-warm-cream leading-relaxed">
                  Buyers and farmers agree on pricing directly. 100% of payment goes straight from buyer to the farmer's account.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-farm-green-light font-mono text-[10px] text-harvest-yellow font-bold">
                ✓ 0% BROKER COMMISSION
              </div>
            </Card>

          </div>

        </div>
      </section>

      {/* SECTION 16 & 17: GROUP AGGREGATION & MATCHING VISUALIZATION */}
      <MatchingVisual />

      {/* ASSISTED ONBOARDING & PUSH-DEMAND SECTION */}
      <section className="py-20 bg-warm-cream bg-topo-pattern border-t-brutal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AssistedPushDemandShowcase />
          <FieldPlotVisual />
        </div>
      </section>

      {/* SECTION 22: TRUST & VERIFICATION // DIRECT DOESN'T MEAN UNVERIFIED */}
      <section className="py-20 bg-warm-cream border-t-brutal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="dark" size="sm" className="mb-3">
              SECTION 06 // RISK MITIGATION & TRUST
            </Badge>
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-ink-black">
              DIRECT DOESN'T MEAN UNVERIFIED.
            </h2>
            <p className="font-body text-base text-gray-700 mt-2 font-medium">
              Every participant on FarmChain passes strict operational identity verification before transacting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Card variant="white" shadow="default" className="p-6 border-brutal space-y-3">
              <div className="w-12 h-12 bg-farm-green text-harvest-yellow border-2 border-ink-black flex items-center justify-center">
                <BadgeCheck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                VERIFIED FARMERS & FPOS
              </h3>
              <p className="font-body text-xs text-gray-700 leading-relaxed">
                Govt Kisan ID (Kisan Credit Card), land record geolocation, and cooperative FPO registrations are verified by local field officers.
              </p>
              <div className="pt-2 font-mono text-xs text-farm-green font-bold">
                ✓ ZERO GHOST FARMERS
              </div>
            </Card>

            <Card variant="white" shadow="default" className="p-6 border-brutal space-y-3">
              <div className="w-12 h-12 bg-harvest-yellow text-ink-black border-2 border-ink-black flex items-center justify-center">
                <Building2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                VERIFIED ENTERPRISE BUYERS
              </h3>
              <p className="font-body text-xs text-gray-700 leading-relaxed">
                Restaurants, supermarket chains, and food processors submit GSTIN, FSSAI licenses, and escrow payment guarantees before placing POs.
              </p>
              <div className="pt-2 font-mono text-xs text-farm-green font-bold">
                ✓ ESCROW PROTECTED TRANSACTIONS
              </div>
            </Card>

            <Card variant="white" shadow="default" className="p-6 border-brutal space-y-3">
              <div className="w-12 h-12 bg-ink-black text-paper-white border-2 border-ink-black flex items-center justify-center">
                <FileText className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                DIGITAL WEIGHBRIDGE & QC
              </h3>
              <p className="font-body text-xs text-gray-700 leading-relaxed">
                Calibrated digital scales, automated moisture meters, and geotagged dispatch photo receipts prevent dispute or uncalibrated deductions.
              </p>
              <div className="pt-2 font-mono text-xs text-farm-green font-bold">
                ✓ TRANSPARENT LOAD SLIPS
              </div>
            </Card>

          </div>

        </div>
      </section>

    </div>
  );
};
