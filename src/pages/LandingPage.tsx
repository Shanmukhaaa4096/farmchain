import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Truck, 
  MapPin,
  Building2, 
  Sprout, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Scale, 
  PlusCircle,
  Eye,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { HeroReferenceSection } from '../components/layout/HeroReferenceSection';
import { ProduceJourneyFlow } from '../components/interactive/ProduceJourneyFlow';
import { VideoStoryModal } from '../components/modals/VideoStoryModal';
import { StaggeredText } from '../components/reactbits/StaggeredText';
import { BlurHighlight } from '../components/reactbits/BlurHighlight';
import { CenterFlow } from '../components/reactbits/CenterFlow';
import { SimpleGraph } from '../components/reactbits/SimpleGraph';
import { HoverPreview } from '../components/reactbits/HoverPreview';
import { BendingMarquee } from '../components/reactbits/BendingMarquee';
import { SupplyChainComparison } from '../components/interactive/SupplyChainComparison';
import { WavySquiggle, WavySectionDivider } from '../components/ui/SketchAccents';
import { DemandFlowStepper } from '../components/reui/DemandFlowStepper';
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

  // Mandi-inspired curated demand requirements with QC specifications
  const mandiDemands = [
    { 
      crop: 'TOMATO', 
      quantity: '4,200 KG', 
      targetPrice: '₹32 / KG', 
      buyer: 'Metro Central Kitchen', 
      location: 'Hyderguda Logistics Dock', 
      grade: 'Grade A Firm (DESI)', 
      moisture: '19% Index',
      deliveryWindow: 'Within 48 Hours'
    },
    { 
      crop: 'ONION', 
      quantity: '2,800 KG', 
      targetPrice: '₹28 / KG', 
      buyer: 'Deccan Agro Processors', 
      location: 'Shamshabad Facility', 
      grade: 'Medium Pink (Nashik Spec)', 
      moisture: '14% Cured',
      deliveryWindow: '3 Days Scheduled'
    },
    { 
      crop: 'POTATO', 
      quantity: '1,900 KG', 
      targetPrice: '₹22 / KG', 
      buyer: 'Taj Retail Procurement', 
      location: 'Bowenpally Cold Store', 
      grade: 'Jyoti Fresh (50mm+)', 
      moisture: 'Grade 1 Soil-Free',
      deliveryWindow: 'Immediate Dispatch'
    },
    { 
      crop: 'WHEAT', 
      quantity: '6,500 KG', 
      targetPrice: '₹26 / KG', 
      buyer: 'Nizamabad Roller Mills', 
      location: 'Secunderabad Depot', 
      grade: 'Sharbati Premium', 
      moisture: '11% Moisture Standard',
      deliveryWindow: 'Next Week Milk-Run'
    }
  ];

  return (
    <div className="bg-paper-bg min-h-screen text-dark-text overflow-x-hidden selection:bg-soft-green selection:text-dark-text">
      
      {/* 1. HERO SECTION (Asymmetrical Wash House Layout) */}
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

      {/* TRUST / FEATURE STRIP (Direct Wash House homage: 4 minimal circular line icons with hairline vertical dividers) */}
      <div className="bg-[#EAE5D8]/70 border-b border-dark-text/10 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-dark-text/10 text-center">
            
            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-11 h-11 rounded-full border border-dark-text/20 flex items-center justify-center bg-pure-white shadow-soft-sm">
                <Sprout className="w-5 h-5 text-primary-green stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-dark-text">
                0% BROKER CUTS
              </span>
              <span className="font-sans text-[11px] text-dark-text/70 max-w-[22ch]">
                Direct bank payout with no commission deductions
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-11 h-11 rounded-full border border-dark-text/20 flex items-center justify-center bg-pure-white shadow-soft-sm">
                <Truck className="w-5 h-5 text-primary-green stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-dark-text">
                FARM-GATE PICKUP
              </span>
              <span className="font-sans text-[11px] text-dark-text/70 max-w-[22ch]">
                Scheduled village-loop collection at standard time
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-11 h-11 rounded-full border border-dark-text/20 flex items-center justify-center bg-pure-white shadow-soft-sm">
                <ShieldCheck className="w-5 h-5 text-primary-green stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-dark-text">
                ESCROW PROTECTION
              </span>
              <span className="font-sans text-[11px] text-dark-text/70 max-w-[22ch]">
                Funds locked in advance for guaranteed harvest pay
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-11 h-11 rounded-full border border-dark-text/20 flex items-center justify-center bg-pure-white shadow-soft-sm">
                <Scale className="w-5 h-5 text-primary-green stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-dark-text">
                CALIBRATED QC
              </span>
              <span className="font-sans text-[11px] text-dark-text/70 max-w-[22ch]">
                Standardized 25kg crates and refractometer tests
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION TRANSITION: BENDING MARQUEE TAPE */}
      <BendingMarquee speed={36} />

      {/* 2. STORY / PROBLEM (Soft Retro Organic Editorial) */}
      <section id="problem" className="py-20 sm:py-32 bg-pure-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          {/* Header Block: Small Label → Big Type → Short Copy */}
          <div className="max-w-3xl space-y-4">
            <span className="font-sans text-xs font-semibold text-terracotta uppercase tracking-[0.18em] block">
              01 / THE STORY
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-dark-text leading-[1.01] tracking-tight">
              Too many hands.<br />
              <span className="relative inline-block text-terracotta mt-1">
                Too little value.
                <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                  <WavySquiggle color="#C96B45" className="w-40 sm:w-56 h-4 sm:h-5 text-terracotta" />
                </span>
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-dark-text/70 leading-relaxed max-w-[55ch] pt-3">
              When farmers harvest without forward market connection, produce passes through five layers of intermediaries — commission brokers, handling agents, and secondary auctions. While household retail prices rise, the farmer receives a mere fraction of the crop's true value.
            </p>
          </div>

          {/* Large Agricultural Photograph with Rounded 3XL Organic Container */}
          <div className="relative w-full rounded-3xl overflow-hidden border border-dark-text/10 shadow-soft-lg bg-paper-bg">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
              <img
                src="/farmer_hands_produce.jpg"
                alt="Weathered hands of an Indian farmer holding freshly harvested ripe tomatoes"
                className="w-full h-full object-cover object-center image-soft-zoom"
                loading="lazy"
              />
              
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-dark-text/90 backdrop-blur-sm text-pure-white p-4 sm:p-5 rounded-2xl max-w-md border border-pure-white/15 shadow-soft">
                <span className="text-accent-yellow font-bold uppercase block text-[10px] tracking-wider mb-1 font-mono">
                  MANDI AUCTION REALITY
                </span>
                <p className="font-sans text-xs text-pure-white/90 leading-snug">
                  Speculative distress sales destroy up to 60% of farmgate crop value before produce leaves the rural taluka.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Data Editorial Statement (No Boxy Problem Cards) */}
          <div className="py-6 border-y border-dark-text/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-editorial text-2xl sm:text-3xl font-bold text-dark-text">
                5+ Intermediary Cuts. 48–72h In Sunlight. 15–45 Day Delays.
              </p>
              <p className="font-sans text-xs text-dark-text/70 mt-1 max-w-xl leading-relaxed">
                Dalal margins, hamali deductions, and APMC cess compound while perishable harvests rot in congested mandi holding yards.
              </p>
            </div>
            <button
              onClick={() => setShowDeepDiveComparison(!showDeepDiveComparison)}
              className="shrink-0 px-6 py-2.5 text-xs font-sans font-semibold uppercase tracking-wider bg-paper-bg border border-dark-text/20 rounded-full shadow-soft-sm hover:bg-soft-green/30 text-dark-text transition-colors cursor-pointer"
            >
              {showDeepDiveComparison ? 'Hide Traditional APMC Breakdown ▲' : 'Inspect Traditional APMC Commission Breakdown ▼'}
            </button>
          </div>

          {showDeepDiveComparison && (
            <div className="pt-4 animate-in fade-in duration-200">
              <SupplyChainComparison />
            </div>
          )}

        </div>
      </section>

      {/* Wavy Seam Transition to Section 3 */}
      <WavySectionDivider fillColor="var(--color-paper-bg, #F4F0E6)" bgColor="#FFFDF7" />

      {/* 3. THE BIG IDEA (Soft Retro Organic Editorial) */}
      <section id="big-idea" className="py-20 sm:py-32 bg-paper-bg relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
          
          <div className="max-w-3xl space-y-4">
            <span className="font-sans text-xs font-semibold text-primary-green uppercase tracking-[0.18em] block">
              02 / THE BIG IDEA
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-dark-text leading-[1.01] tracking-tight">
              FarmChain starts<br />
              <span className="relative inline-block text-primary-green mt-1">
                with demand.
                <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                  <WavySquiggle color="#315C3A" className="w-36 sm:w-52 h-4 sm:h-5 text-primary-green" />
                </span>
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-dark-text/75 leading-relaxed max-w-[55ch] pt-3">
              FarmChain does not simply create another farmer-to-consumer marketplace. It begins with <strong>actual market demand</strong> and connects that demand directly to the farmers and FPOs who can supply it.
            </p>
          </div>

          {/* ReUI Interactive Flow: BUYERS → DEMAND → FARMERS → LOGISTICS → MARKET */}
          <DemandFlowStepper />

          {/* Subtle Interactive CenterFlow */}
          <div className="pt-4">
            <CenterFlow />
          </div>

        </div>
      </section>

      {/* Wavy Seam Transition to Section 4 */}
      <WavySectionDivider fillColor="#FFFDF7" bgColor="var(--color-paper-bg, #F4F0E6)" />

      {/* 4. FARMER STORY (Asymmetrical Editorial Layout) */}
      <section id="farmer-story" className="py-20 sm:py-32 bg-pure-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Large Farmer Photo with Rounded 3XL & Soft Shadow (7 cols) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-dark-text/10 shadow-soft-lg bg-paper-bg">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/farmer_harvest_crate.jpg"
                    alt="Indian farmer harvesting produce into field crate"
                    className="w-full h-full object-cover object-center image-soft-zoom"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-dark-text text-pure-white font-mono text-[11px] flex items-center justify-between">
                  <span>CHEVELLA VILLAGE FPO // LOT #44</span>
                  <span className="text-accent-yellow font-bold">FORWARD CONTRACT PLEDGED</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Message & Action (5 cols) */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <span className="font-sans text-xs font-semibold text-primary-green uppercase tracking-[0.18em] block">
                03 / FARMER STORY
              </span>

              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-text leading-[1.01] tracking-tight">
                The market<br />
                <span className="relative inline-block text-primary-green mt-1">
                  finds the farmer.
                  <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                    <WavySquiggle color="#315C3A" className="w-40 sm:w-56 h-4 sm:h-5 text-primary-green" />
                  </span>
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-dark-text/70 leading-relaxed max-w-[50ch]">
                Discover verified commercial purchase orders before your crop is even picked. Instead of hauling produce to distant auction yards and praying for fair bids, commit your upcoming yield against locked contracts with guaranteed floor prices and village-gate collection.
              </p>

              <div className="space-y-3 font-sans text-xs sm:text-sm text-dark-text/85 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-soft-green/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-green" />
                  </div>
                  <span>0% broker cuts, hamali, or unloading deductions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-soft-green/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-green" />
                  </div>
                  <span>Scheduled refrigerated truck collection at village gate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-soft-green/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-green" />
                  </div>
                  <span>Direct escrow bank transfer within 2 hours of dock signoff</span>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  variant="clay"
                  size="lg"
                  onClick={onOpenSellModal || (() => onNavigate('farmer'))}
                  className="shadow-soft-terracotta text-xs tracking-[0.14em]"
                >
                  <PlusCircle className="w-4 h-4 stroke-[2.2] mr-2" />
                  <span>POST A REQUEST</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Wavy Seam Transition to Section 5 */}
      <WavySectionDivider fillColor="var(--color-paper-bg, #F4F0E6)" bgColor="#FFFDF7" />

      {/* 5. BUYER STORY (Reversed Asymmetrical Composition) */}
      <section id="buyer-story" className="py-20 sm:py-32 bg-paper-bg relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Message & Action (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-sans text-xs font-semibold text-terracotta uppercase tracking-[0.18em] block">
                04 / BUYER STORY
              </span>

              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-text leading-[1.01] tracking-tight">
                Know the demand.<br />
                <span className="relative inline-block text-terracotta mt-1">
                  Source directly.
                  <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                    <WavySquiggle color="#C96B45" className="w-40 sm:w-56 h-4 sm:h-5 text-terracotta" />
                  </span>
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-dark-text/70 leading-relaxed max-w-[50ch]">
                Restaurants, supermarket chains, and food processors post upcoming procurement schedules weeks ahead. Connect directly with suitable farmers and FPO clusters to secure standardized 25 KG crates, digital QC provenance, and single-bill logistics straight to your receiving dock.
              </p>

              <div className="space-y-3 font-sans text-xs sm:text-sm text-dark-text/85 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-soft-green/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-green" />
                  </div>
                  <span>Bypass 5+ APMC intermediary markups and speculative volatility</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-soft-green/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-green" />
                  </div>
                  <span>Calibrated refractometer moisture and digital scale grade tags</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-soft-green/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-green" />
                  </div>
                  <span>Consistent single-invoice logistics direct to your kitchen dock</span>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onOpenPostDemand}
                  className="text-xs tracking-[0.14em]"
                >
                  <span>FIND PRODUCE</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* Right Column: Large Wholesale Dock Photo with Rounded 3XL Container (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-dark-text/10 shadow-soft-lg bg-pure-white">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/wholesale_produce_dock.jpg"
                    alt="Wholesale agricultural produce receiving dock with crates"
                    className="w-full h-full object-cover object-center image-soft-zoom"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-dark-text text-pure-white font-mono text-[11px] flex items-center justify-between">
                  <span>CENTRAL COMMERCIAL RECEIVING DOCK // MADHAPUR</span>
                  <span className="text-primary-green font-bold">BATCH QC VERIFIED</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Wavy Seam Transition to Section 6 */}
      <WavySectionDivider fillColor="#FFFDF7" bgColor="var(--color-paper-bg, #F4F0E6)" />

      {/* 6. DEMAND INTELLIGENCE (Minimal Editorial Data Visualization) */}
      <section id="intelligence" className="py-20 sm:py-32 bg-pure-white border-b border-dark-text/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <span className="font-sans text-xs font-semibold text-primary-green uppercase tracking-[0.18em] block">
              05 / DEMAND INTELLIGENCE
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-dark-text leading-[1.01] tracking-tight">
              Demand, before<br />
              <span className="relative inline-block text-primary-green mt-1">
                the harvest.
                <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                  <WavySquiggle color="#315C3A" className="w-36 sm:w-48 h-4 text-primary-green" />
                </span>
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-dark-text/70 leading-relaxed max-w-2xl">
              Demand forecasting, route optimization, and algorithmic supply matching align regional sowing calendars with institutional consumption schedules across primary South Indian procurement corridors.
            </p>
          </div>

          {/* Minimal Editorial SimpleGraph Visualization */}
          <SimpleGraph onNavigate={onNavigate} />

          {/* Curated Active Wholesale Forward Demand Ledger */}
          <div className="pt-10 border-t border-dark-text/10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="font-sans text-xs font-semibold text-primary-green uppercase tracking-[0.18em] block mb-1">
                  LIVE FORWARD CONTRACTS
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text tracking-tight">
                  Current Wholesale Procurement Ledger
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-dark-text/70 max-w-sm leading-relaxed">
                Hover or tap any contract to inspect calibrated QC parameters, moisture limits, and dock delivery schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mandiDemands.map((demand, idx) => (
                <HoverPreview
                  key={idx}
                  crop={demand.crop}
                  quantity={demand.quantity}
                  targetPrice={demand.targetPrice}
                  buyer={demand.buyer}
                  location={demand.location}
                  grade={demand.grade}
                  moisture={demand.moisture}
                  deliveryWindow={demand.deliveryWindow}
                  onPledge={onOpenSellModal || (() => onNavigate('farmer'))}
                />
              ))}
            </div>

            <div className="pt-4 border-t border-dark-text/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
              <span className="text-dark-text/70">
                Verified wholesale institutional demand • <strong className="text-dark-text">{liveDemands.length + 4} lots available</strong>
              </span>
              <button
                onClick={() => onNavigate('marketplace')}
                className="text-xs font-sans font-semibold uppercase tracking-wider text-primary-green hover:underline flex items-center gap-1.5"
              >
                <span>EXPLORE ALL LIVE MARKETPLACE DEMAND ({liveDemands.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Wavy Seam Transition to Section 7 */}
      <WavySectionDivider fillColor="var(--color-paper-bg, #F4F0E6)" bgColor="#FFFDF7" />

      {/* 7. FARM-TO-MARKET JOURNEY (GSAP Animated SVG Sequence) */}
      <div id="farm-to-market-journey" className="bg-paper-bg">
        <ProduceJourneyFlow onNavigate={onNavigate} />
      </div>

      {/* Wavy Seam Transition to Section 8 Full-Bleed Color Band */}
      <WavySectionDivider fillColor="var(--color-primary-green, #315C3A)" bgColor="var(--color-paper-bg, #F4F0E6)" />

      {/* 8. IMPACT (Oversized Editorial Typography Statements on Full-Bleed Rich Band) */}
      <section id="impact" className="py-24 sm:py-36 bg-primary-green text-pure-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          
          <div className="max-w-2xl space-y-3">
            <span className="font-sans text-xs font-semibold text-accent-yellow uppercase tracking-[0.18em] block">
              06 / IMPACT
            </span>
            <span className="font-sans text-xs text-pure-white/80 uppercase tracking-wider block">
              MEASURABLE AGRICULTURAL RESTRUCTURING
            </span>
          </div>

          {/* 4 Large Editorial Statements */}
          <div className="divide-y divide-pure-white/15 border-y border-pure-white/15">
            
            <div className="py-8 sm:py-12 group hover:bg-pure-white/5 transition-colors px-2 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <span className="font-sans text-xs text-soft-green font-bold uppercase tracking-[0.18em]">01 / PRODUCERS</span>
                <h3 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-pure-white tracking-tight flex-1 md:px-8">
                  BETTER PRICES FOR FARMERS.
                </h3>
                <span className="font-sans text-xs sm:text-sm text-pure-white/85 max-w-xs leading-relaxed">
                  +18% to +32% farmgate price uplift through zero broker deductions and contract-grade transparency.
                </span>
              </div>
            </div>

            <div className="py-8 sm:py-12 group hover:bg-pure-white/5 transition-colors px-2 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <span className="font-sans text-xs text-accent-yellow font-bold uppercase tracking-[0.18em]">02 / INSTITUTIONS</span>
                <h3 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-pure-white tracking-tight flex-1 md:px-8">
                  LOWER COSTS FOR BUYERS.
                </h3>
                <span className="font-sans text-xs sm:text-sm text-pure-white/85 max-w-xs leading-relaxed">
                  -12% wholesale procurement expenditure by bypassing five compounding APMC trader margins.
                </span>
              </div>
            </div>

            <div className="py-8 sm:py-12 group hover:bg-pure-white/5 transition-colors px-2 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <span className="font-sans text-xs text-soft-green font-bold uppercase tracking-[0.18em]">03 / CORRIDORS</span>
                <h3 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-pure-white tracking-tight flex-1 md:px-8">
                  SHORTER SUPPLY CHAINS.
                </h3>
                <span className="font-sans text-xs sm:text-sm text-pure-white/85 max-w-xs leading-relaxed">
                  Farmgate to city dock delivery completed in under 6 hours compared to 48-72 hours in traditional mandis.
                </span>
              </div>
            </div>

            <div className="py-8 sm:py-12 group hover:bg-pure-white/5 transition-colors px-2 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <span className="font-sans text-xs text-accent-yellow font-bold uppercase tracking-[0.18em]">04 / SUSTAINABILITY</span>
                <h3 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-pure-white tracking-tight flex-1 md:px-8">
                  LESS WASTE IN TRANSIT.
                </h3>
                <span className="font-sans text-xs sm:text-sm text-pure-white/85 max-w-xs leading-relaxed">
                  Transit spoilage slashed from 28% to less than 4% with food-safe ventilated crating and reefer routing.
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Wavy Seam Transition to Section 9 */}
      <WavySectionDivider fillColor="var(--color-paper-bg, #F4F0E6)" bgColor="var(--color-primary-green, #315C3A)" />

      {/* 9. FINAL CTA (Cinematic Editorial Closing Campaign with Rounded Container) */}
      <section id="final-cta" className="py-16 sm:py-28 bg-paper-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden bg-dark-text text-pure-white py-20 sm:py-32 px-6 sm:px-12 text-center shadow-soft-lg border border-dark-text/10">
            
            {/* Background Agricultural Photograph */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero_tractor_farmland.jpg"
                alt="Agricultural farmland at sunset"
                className="w-full h-full object-cover object-center opacity-30 filter saturate-[0.8]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-text via-dark-text/80 to-dark-text/65" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10 space-y-8">
              
              <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-yellow px-4 py-1.5 rounded-full bg-pure-white/10 backdrop-blur-sm border border-pure-white/15">
                <span>FARMCHAIN // DIRECT PRODUCE MOVEMENT</span>
              </div>

              <h2 className="font-editorial font-bold text-4xl sm:text-6xl lg:text-7xl text-pure-white leading-[0.98] tracking-tight">
                <StaggeredText text="LET THE MARKET" as="span" />
                <br />
                <span className="text-accent-yellow inline-block mt-2 relative">
                  <StaggeredText text="FIND THE FARMER." as="span" delay={200} />
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-48 sm:w-64 flex justify-center pointer-events-none">
                    <WavySquiggle color="#E5B94A" className="w-48 sm:w-64 h-4 text-accent-yellow" />
                  </span>
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-pure-white/85 max-w-xl mx-auto leading-relaxed">
                Eliminate commission cuts, transit decay, and speculative distress sales. Connect your harvest or commercial kitchen directly to real market demand today.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="clay"
                  size="lg"
                  onClick={onOpenSellModal || (() => onNavigate('farmer'))}
                  className="shadow-soft-terracotta text-xs tracking-[0.14em]"
                >
                  <span>ENTER FARMCHAIN</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>

                <Button
                  variant="white"
                  size="lg"
                  onClick={() => onNavigate('marketplace')}
                  className="shadow-soft text-xs tracking-[0.14em]"
                >
                  <span>EXPLORE LIVE DEMAND</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>

              <div className="pt-6 font-sans text-xs text-pure-white/60 tracking-wider">
                Free Registration for Smallholders &amp; FPOs • 0% Broker Commission • 2-Hour Bank Payout
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
