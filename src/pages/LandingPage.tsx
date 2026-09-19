import React, { useState } from 'react';
import { 
  Sprout, 
  Truck, 
  ShieldCheck, 
  Scale, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  PlusCircle, 
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { WaveDivider } from '../components/ui/WaveDivider';
import { StatCounter } from '../components/ui/StatCounter';
import { ListingCard } from '../components/ui/ListingCard';
import { PriceCompare } from '../components/ui/PriceCompare';
import { Accordion } from '../components/ui/Accordion';
import { HeroReferenceSection } from '../components/layout/HeroReferenceSection';
import { ProduceJourneyFlow } from '../components/interactive/ProduceJourneyFlow';
import { VideoStoryModal } from '../components/modals/VideoStoryModal';
import { BendingMarquee } from '../components/reactbits/BendingMarquee';
import { WavySquiggle } from '../components/ui/SketchAccents';
import { 
  SAMPLE_LISTINGS, 
  SAMPLE_IMPACT_COUNTERS, 
  SAMPLE_CATEGORIES, 
  SAMPLE_FARMER_STORIES, 
  SAMPLE_FAQS,
  SampleListing
} from '../data/sampleHomepageData';
import { DemandRequirement } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredListings = selectedCategory === 'all'
    ? SAMPLE_LISTINGS
    : SAMPLE_LISTINGS.filter(l => l.category === selectedCategory);

  return (
    <div className="bg-[#F4EFE6] min-h-screen text-[#2F4A3A] overflow-x-hidden selection:bg-[#A8B89A]/40 selection:text-[#163323]">
      
      {/* 1. HERO SECTION (Asymmetrical Editorial Layout with Dual-Track CTAs & Rotating Badge) */}
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

      {/* 2. MINIMAL 4-POINT TRUST STRIP (Verified buyers, 0% broker fee, Direct bank payout, Village pickup) */}
      <div className="bg-[#FBF8F2] border-b border-[#2F4A3A]/10 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#2F4A3A]/10 text-center">
            
            {/* 01. Verified Buyers */}
            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-[#2F4A3A]/20 flex items-center justify-center bg-[#F4EFE6] shadow-soft-sm">
                <Building2 className="w-5 h-5 text-[#2F4A3A] stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#163323]">
                {t.trustStrip.verifiedBuyers}
              </span>
              <span className="font-sans text-xs text-[#2F4A3A]/75 max-w-[24ch]">
                {t.trustStrip.verifiedBuyersSub}
              </span>
            </div>

            {/* 02. 0% Broker Fee */}
            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-[#2F4A3A]/20 flex items-center justify-center bg-[#F4EFE6] shadow-soft-sm">
                <Sprout className="w-5 h-5 text-[#2F4A3A] stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#163323]">
                {t.trustStrip.zeroBroker}
              </span>
              <span className="font-sans text-xs text-[#2F4A3A]/75 max-w-[24ch]">
                {t.trustStrip.zeroBrokerSub}
              </span>
            </div>

            {/* 03. Direct Bank Payout */}
            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-[#2F4A3A]/20 flex items-center justify-center bg-[#F4EFE6] shadow-soft-sm">
                <ShieldCheck className="w-5 h-5 text-[#2F4A3A] stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#163323]">
                {t.trustStrip.directPayout}
              </span>
              <span className="font-sans text-xs text-[#2F4A3A]/75 max-w-[24ch]">
                {t.trustStrip.directPayoutSub}
              </span>
            </div>

            {/* 04. Village Pickup */}
            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-[#2F4A3A]/20 flex items-center justify-center bg-[#F4EFE6] shadow-soft-sm">
                <Truck className="w-5 h-5 text-[#2F4A3A] stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#163323]">
                {t.trustStrip.villagePickup}
              </span>
              <span className="font-sans text-xs text-[#2F4A3A]/75 max-w-[24ch]">
                {t.trustStrip.villagePickupSub}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Undulating Marquee Ticker */}
      <BendingMarquee speed={36} />

      {/* 3. LIVE IMPACT COUNTERS (Sample Data, Clearly Labeled) */}
      <section className="py-20 sm:py-28 bg-[#F4EFE6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <SectionHeader
            eyebrow="01 / NETWORK SCALE"
            title="Real Direct Impact."
            highlightWord="No Dalal Cut."
            squiggleColor="#C77B58"
            description="Aggregating harvest supply across farmer cooperatives to eliminate speculative intermediary deductions and deliver guaranteed farmgate prices."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_IMPACT_COUNTERS.map((stat, idx) => (
              <StatCounter
                key={idx}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                subtext={stat.subtext}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Wave Seam Transition to Section 4 */}
      <WaveDivider fillColor="#FBF8F2" bgColor="#F4EFE6" />

      {/* 4. HOW IT WORKS: TWO TRANSPARENT TRACKS (Farmer vs Buyer) */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-[#FBF8F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#C77B58]">
              {t.howItWorks.eyebrow}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-[#163323] tracking-tight">
              {t.howItWorks.title}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#2F4A3A]/80 max-w-[55ch] mx-auto">
              A transparent, escrow-secured coordination workflow connecting supply directly with institutional consumption.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Track 1: Farmer Experience */}
            <div className="p-8 sm:p-10 rounded-[32px] bg-[#F4EFE6] border border-[#2F4A3A]/12 shadow-soft space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#2F4A3A]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-[#A8B89A]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#C77B58] tracking-widest block">
                      PRODUCER WORKFLOW
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-[#163323]">
                      {t.howItWorks.farmerTrackTitle}
                    </h3>
                  </div>
                </div>
                <Badge variant="green" size="sm">0% BROKER FEE</Badge>
              </div>

              <div className="space-y-6 font-sans">
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#163323] block">List Crop &amp; Harvest Date</strong>
                    <p className="text-xs sm:text-sm text-[#2F4A3A]/75 mt-0.5">
                      {t.howItWorks.farmerStep1}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#163323] block">Receive Locked Wholesale Offers</strong>
                    <p className="text-xs sm:text-sm text-[#2F4A3A]/75 mt-0.5">
                      {t.howItWorks.farmerStep2}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#163323] block">Village Pickup &amp; Calibrated QC</strong>
                    <p className="text-xs sm:text-sm text-[#2F4A3A]/75 mt-0.5">
                      {t.howItWorks.farmerStep3}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#C77B58] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#C77B58] block">Direct Bank Deposit (Under 2h)</strong>
                    <p className="text-xs sm:text-sm text-[#2F4A3A]/75 mt-0.5">
                      {t.howItWorks.farmerStep4}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2F4A3A]/10">
                <Button
                  variant="primary"
                  size="md"
                  withArrow
                  fullWidth
                  onClick={onOpenSellModal || (() => onNavigate('farmer'))}
                >
                  List Your Produce Now
                </Button>
              </div>
            </div>

            {/* Track 2: Buyer Experience */}
            <div className="p-8 sm:p-10 rounded-[32px] bg-[#163323] text-[#FBF8F2] border border-[#163323] shadow-soft space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#FBF8F2]/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FBF8F2]/10 text-[#FBF8F2] flex items-center justify-center border border-[#FBF8F2]/20">
                    <Building2 className="w-5 h-5 text-[#E5B94A]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#E5B94A] tracking-widest block">
                      COMMERCIAL BUYER DESK
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-[#FBF8F2]">
                      {t.howItWorks.buyerTrackTitle}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#E5B94A] text-[#163323]">
                  AUDITED DOCK
                </span>
              </div>

              <div className="space-y-6 font-sans">
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#FBF8F2]/20 text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#FBF8F2] block">Browse Verified Farmer Harvests</strong>
                    <p className="text-xs sm:text-sm text-[#FBF8F2]/75 mt-0.5">
                      {t.howItWorks.buyerStep1}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#FBF8F2]/20 text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#FBF8F2] block">Make Binding Forward Offer</strong>
                    <p className="text-xs sm:text-sm text-[#FBF8F2]/75 mt-0.5">
                      {t.howItWorks.buyerStep2}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#FBF8F2]/20 text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#E5B94A] block">Secure Escrow Lock</strong>
                    <p className="text-xs sm:text-sm text-[#FBF8F2]/75 mt-0.5">
                      {t.howItWorks.buyerStep3}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#E5B94A] text-[#163323] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-[#E5B94A] block">Digital Invoiced Dock Delivery</strong>
                    <p className="text-xs sm:text-sm text-[#FBF8F2]/75 mt-0.5">
                      {t.howItWorks.buyerStep4}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#FBF8F2]/15">
                <Button
                  variant="yellow"
                  size="md"
                  withArrow
                  fullWidth
                  onClick={onOpenPostDemand || (() => onNavigate('buyer'))}
                >
                  Post Commercial Procurement Need
                </Button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Wave Seam Transition to Section 5 */}
      <WaveDivider fillColor="#F4EFE6" bgColor="#FBF8F2" />

      {/* 5. MANDI VS FARMCHAIN PRICE COMPARISON BLOCK */}
      <section className="py-20 sm:py-32 bg-[#F4EFE6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <SectionHeader
            eyebrow="03 / DIRECT TRANSPARENCY"
            title="Mandi Price vs."
            highlightWord="FarmChain Realization."
            squiggleColor="#C77B58"
            description="Inspect the actual commission leak in traditional APMC mandis compared to direct farm-gate settlement. Select any crop to simulate payout gains."
          />

          <PriceCompare />

        </div>
      </section>

      {/* Wave Seam Transition to Section 6 */}
      <WaveDivider fillColor="#FBF8F2" bgColor="#F4EFE6" />

      {/* 6. FEATURED VERIFIED FARMER LISTINGS */}
      <section className="py-20 sm:py-32 bg-[#FBF8F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="04 / VERIFIED HARVESTS"
              title="Featured Direct"
              highlightWord="Produce Lots."
              squiggleColor="#C77B58"
              description="Fresh crops listed directly by audited smallholders and FPOs. 100% farmgate quality guaranteed with calibrated digital parameters."
            />

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['all', 'vegetables', 'grains', 'fruits', 'spices'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[40px] px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                      : 'bg-[#F4EFE6] text-[#2F4A3A] hover:bg-[#A8B89A]/30 border border-[#2F4A3A]/10'
                  }`}
                >
                  {cat === 'all' ? 'All Crops' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredListings.map((lot) => (
              <ListingCard
                key={lot.id}
                id={lot.id}
                photoUrl={lot.photoUrl}
                crop={lot.crop}
                variety={lot.variety}
                farmerName={lot.farmerName}
                village={lot.village}
                district={lot.district}
                quantity={lot.quantity}
                pricePerKg={lot.pricePerKg}
                mandiPricePerKg={lot.mandiPricePerKg}
                verified={lot.verified}
                harvestDate={lot.harvestDate}
                onMakeOffer={() => onNavigate('marketplace')}
              />
            ))}
          </div>

          <div className="text-center pt-6">
            <Button
              variant="ink"
              size="lg"
              withArrow
              onClick={() => onNavigate('marketplace')}
            >
              Browse All Live Marketplace Listings ({SAMPLE_LISTINGS.length + liveDemands.length})
            </Button>
          </div>

        </div>
      </section>

      {/* Wave Seam Transition to Section 7 */}
      <WaveDivider fillColor="#F4EFE6" bgColor="#FBF8F2" />

      {/* 7. CROP CATEGORIES AS IMAGE TILES */}
      <section className="py-20 sm:py-28 bg-[#F4EFE6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <SectionHeader
            eyebrow="05 / PRODUCE CATEGORIES"
            title="Source by Agricultural"
            highlightWord="Commodity."
            squiggleColor="#C77B58"
            description="From high-moisture perishable vegetables to export-grade dry spices, FarmChain coordinates refrigerated and dry transit loops tailored to crop respiration."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {SAMPLE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const listEl = document.getElementById('marketplace') || document.querySelector('section:has(.grid-cols-3)');
                  if (listEl) listEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative rounded-3xl overflow-hidden bg-[#FBF8F2] border border-[#2F4A3A]/12 shadow-soft hover:-translate-y-1.5 transition-all duration-200 cursor-pointer flex flex-col aspect-[3/4]"
              >
                <div className="relative flex-1 w-full overflow-hidden bg-[#F4EFE6]">
                  <img
                    src={cat.photoUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#163323]/90 via-[#163323]/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] font-bold uppercase bg-[#E5B94A] text-[#163323] px-2 py-0.5 rounded-full">
                      {cat.avgGain}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-[#FBF8F2]">
                    <span className="text-[10px] font-mono text-[#A8B89A] block font-medium">
                      {cat.hindi} / {cat.telugu}
                    </span>
                    <strong className="font-editorial text-lg sm:text-xl font-bold block leading-tight">
                      {cat.name}
                    </strong>
                    <span className="text-[10px] font-sans text-[#FBF8F2]/70 block mt-0.5">
                      {cat.itemCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 7b: GSAP Animated Produce Journey SVG (Preserved FarmChain SVG) */}
      <div id="farm-to-market-journey" className="bg-[#F4EFE6]">
        <ProduceJourneyFlow onNavigate={onNavigate} />
      </div>

      {/* Wave Seam Transition to Section 8 */}
      <WaveDivider fillColor="#163323" bgColor="#F4EFE6" />

      {/* 8. AUTHENTIC FARMER STORIES (Clearly Labeled Sample Data) */}
      <section className="py-24 sm:py-36 bg-[#163323] text-[#FBF8F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#E5B94A] block mb-2">
                06 / GROUND REALITY • SAMPLE CASE STUDIES
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-[#FBF8F2] tracking-tight">
                Voices From the Field.
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#FBF8F2]/75 max-w-md leading-relaxed">
              Real agricultural transformation stories from farmers who escaped dalal commissions and distressed auction yards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_FARMER_STORIES.map((story) => (
              <div
                key={story.id}
                className="rounded-[30px] bg-[#2F4A3A]/40 border border-[#FBF8F2]/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative backdrop-blur-sm shadow-soft-lg group hover:border-[#E5B94A]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#E5B94A] tracking-wider bg-[#E5B94A]/15 px-2.5 py-1 rounded-full border border-[#E5B94A]/30">
                      {story.crop}
                    </span>
                    <VerifiedBadge type="farmer" size="sm" />
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#FBF8F2]/85 leading-relaxed italic">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FBF8F2]/10 flex items-center justify-between">
                  <div>
                    <strong className="font-editorial text-base font-bold text-[#FBF8F2] block">
                      {story.name}
                    </strong>
                    <span className="text-[11px] font-sans text-[#A8B89A] block">
                      {story.village}, {story.district}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#E5B94A] bg-[#E5B94A]/10 px-2 py-1 rounded-lg">
                    {story.earningsGain}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Wave Seam Transition to Section 9 */}
      <WaveDivider fillColor="#FBF8F2" bgColor="#163323" />

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-20 sm:py-32 bg-[#FBF8F2] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          
          <SectionHeader
            eyebrow="07 / QUESTIONS & TRUST"
            title="Everything You Need"
            highlightWord="To Know."
            squiggleColor="#C77B58"
            description="Clear answers on 0% commissions, simulated escrow safety, quality testing, and village pickup milk-runs."
          />

          <Accordion
            items={SAMPLE_FAQS.map(faq => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer
            }))}
            defaultOpenId="faq-1"
          />

        </div>
      </section>

      {/* Wave Seam Transition to Section 10 */}
      <WaveDivider fillColor="#F4EFE6" bgColor="#FBF8F2" />

      {/* 10. FINAL CLOSING CTA SECTION */}
      <section id="final-cta" className="py-16 sm:py-28 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden bg-[#163323] text-[#FBF8F2] py-20 sm:py-28 px-6 sm:px-12 text-center shadow-soft-lg border border-[#2F4A3A]/20">
            
            {/* Background Agricultural Photograph */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero_tractor_farmland.jpg"
                alt="Agricultural farmland at sunset"
                className="w-full h-full object-cover object-center opacity-25 filter saturate-[0.7]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#163323] via-[#163323]/85 to-[#163323]/70" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10 space-y-8">
              
              <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#E5B94A] px-4 py-1.5 rounded-full bg-[#FBF8F2]/10 backdrop-blur-sm border border-[#FBF8F2]/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SMART INDIA HACKATHON 2024–2026 // AGRI-LOGISTICS</span>
              </div>

              <h2 className="font-editorial font-bold text-4xl sm:text-6xl lg:text-7xl text-[#FBF8F2] leading-[0.98] tracking-tight">
                Sell Directly.<br />
                <span className="text-[#C77B58] inline-block mt-2 relative">
                  Zero Middlemen.
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-48 sm:w-64 flex justify-center pointer-events-none">
                    <WavySquiggle color="#C77B58" className="w-48 sm:w-64 h-4 text-[#C77B58]" />
                  </span>
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#FBF8F2]/85 max-w-xl mx-auto leading-relaxed">
                Connect your farm yield or commercial kitchen directly to real market demand. Free registration with 0% broker fee and guaranteed village-gate collection.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  withArrow
                  onClick={onOpenSellModal || (() => onNavigate('farmer'))}
                  className="shadow-soft-terracotta text-xs tracking-[0.14em]"
                >
                  I'm a Farmer — Register Crop
                </Button>

                <Button
                  variant="white"
                  size="lg"
                  withArrow
                  onClick={onOpenPostDemand || (() => onNavigate('buyer'))}
                  className="shadow-soft text-xs tracking-[0.14em]"
                >
                  I'm a Buyer — Sourcing Desk
                </Button>
              </div>

              <div className="pt-6 font-sans text-xs text-[#FBF8F2]/60 tracking-wider">
                100% Direct Bank Payout • Calibrated Village Weighing • 0% Broker Intermediary Fees
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
