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
  Award,
  Search,
  MapPin,
  ShoppingBag,
  Store,
  Home,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { WaveDivider } from '../components/ui/WaveDivider';
import { StatCounter } from '../components/ui/StatCounter';
import { ListingCard } from '../components/ui/ListingCard';
import { Accordion } from '../components/ui/Accordion';
import { HeroReferenceSection } from '../components/layout/HeroReferenceSection';
import { BendingMarquee } from '../components/reactbits/BendingMarquee';
import { DirectVsMiddlemenComparison } from '../components/interactive/DirectVsMiddlemenComparison';
import { WavySquiggle } from '../components/ui/SketchAccents';
import { 
  SAMPLE_LISTINGS, 
  SAMPLE_IMPACT_COUNTERS, 
  SAMPLE_CATEGORIES, 
  SAMPLE_FARMER_STORIES, 
  SAMPLE_FAQS,
  SampleListing
} from '../data/sampleHomepageData';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface LandingPageProps {
  onNavigate: (view: string, params?: { id?: string }) => void;
  onOpenPostDemand: () => void;
  onSelectDemand?: (demand: any) => void;
  onOpenSellModal?: () => void;
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

const LOCATIONS = [
  'All Districts',
  'Ranga Reddy (Telangana)',
  'Nashik (Maharashtra)',
  'Mandya (Karnataka)',
  'Narmadapuram (Madhya Pradesh)',
  'Samastipur (Bihar)',
  'Ludhiana (Punjab)',
  'Erode (Tamil Nadu)',
  'Anand (Gujarat)',
];

const PRICE_TICKER_ITEMS = [
  "TODAY'S DIRECT PRICES: CHEVELLA TOMATO MANDI ₹22/KG → FARMCHAIN ₹32/KG (+45%)",
  "NASHIK RED ONION: MANDI ₹19/KG → FARMCHAIN ₹28/KG (+47%)",
  "G4 GREEN CHILLI: MANDI ₹46/KG → FARMCHAIN ₹64/KG (+39%)",
  "SHARBATI WHEAT: MANDI ₹24/KG → FARMCHAIN ₹31/KG (+29%)",
  "MANDYA SONA MASOORI: MANDI ₹41/KG → FARMCHAIN ₹52/KG (+27%)",
  "DESI TOOR DAL: MANDI ₹96/KG → FARMCHAIN ₹118/KG (+23%)",
  "SALEM HIGH-CURCUMIN TURMERIC: MANDI ₹108/KG → FARMCHAIN ₹138/KG (+28%)",
  "ORGANIC BROWN JAGGERY: MANDI ₹51/KG → FARMCHAIN ₹64/KG (+25%)",
  "SCHEDULED VILLAGE MILK-RUNS ACROSS 42 CLUSTERS • 0% BROKER FEE • SAFE PAYMENT"
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenPostDemand,
  onOpenSellModal,
  onShowToast,
}) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Districts');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleQuickAddToCart = (lot: SampleListing) => {
    addToCart({
      listingId: lot.id,
      crop: lot.crop,
      variety: lot.variety,
      farmerName: lot.farmerName,
      village: lot.village,
      pricePerKg: lot.pricePerKg,
      quantityKg: lot.minOrderKg || 5,
      photoUrl: lot.photoUrl,
    });
    onShowToast(`Added ${lot.minOrderKg || 5} kg of fresh ${lot.crop} to your cart!`);
  };

  // Filter listings
  const filteredListings = SAMPLE_LISTINGS.filter((lot) => {
    const matchesSearch = 
      lot.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.village.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || lot.category === selectedCategory;
    
    const matchesLocation = 
      selectedLocation === 'All Districts' || 
      lot.district.toLowerCase().includes(selectedLocation.split(' ')[0].toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Take at least 8 crop cards for the homepage grid
  const displayLots = filteredListings.length >= 8 
    ? filteredListings.slice(0, 8) 
    : SAMPLE_LISTINGS.slice(0, 8);

  return (
    <div className="bg-[#F4EFE6] min-h-screen text-[#2F4A3A] overflow-x-hidden selection:bg-[#A8B89A]/40 selection:text-[#163323]">
      
      {/* 1. HERO SECTION (Chunky headline, two CTAs "Sell your crop" & "Buy fresh crops", organic-masked photo, rotating "DIRECT FROM FARM" badge) */}
      <HeroReferenceSection
        onNavigate={onNavigate}
        onOpenSellModal={onOpenSellModal}
        onOpenPostDemand={onOpenPostDemand}
      />

      {/* 2. SEARCH BAR WITH CROP + LOCATION FILTERS AND CATEGORY CHIPS */}
      <section className="bg-[#FBF8F2] border-b border-[#2F4A3A]/10 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="bg-[#F4EFE6] p-2.5 sm:p-3 rounded-2xl border border-[#2F4A3A]/15 shadow-soft flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#536458] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search crop, variety, farmer name, or village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent border-0 font-sans text-xs sm:text-sm text-[#163323] placeholder-[#536458]/60 outline-none"
              />
            </div>

            {/* Location Filter Dropdown */}
            <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-[#2F4A3A]/10 pt-2 md:pt-0 md:pl-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-2 bg-transparent text-xs font-sans font-semibold text-[#163323] outline-none cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('market')}
              className="w-full md:w-auto text-xs uppercase tracking-wider font-semibold min-h-[40px] px-5 shrink-0"
            >
              <span>Explore All Crops</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-sans">
            <span className="text-[10px] font-mono uppercase font-bold text-[#536458] shrink-0 mr-1">
              CATEGORY:
            </span>
            {[
              { id: 'all', label: 'All Crops' },
              { id: 'vegetables', label: 'Fresh Vegetables' },
              { id: 'grains', label: 'Grains & Cereals' },
              { id: 'fruits', label: 'Orchard Fruits' },
              { id: 'pulses', label: 'Pulses & Lentils' },
              { id: 'spices', label: 'Spices & Jaggery' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                    : 'bg-[#F4EFE6] text-[#2F4A3A] hover:bg-[#A8B89A]/30 border border-[#2F4A3A]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. TODAY'S PRICES SCROLLING TICKER (Marquee) */}
      <BendingMarquee items={PRICE_TICKER_ITEMS} speed={38} />

      {/* 4. TRUST STRIP (4 icons: Verified tick, 0% broker fee, Safe Payment, Village pickup) */}
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

            {/* 03. Safe Payment */}
            <div className="p-4 sm:p-5 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-[#2F4A3A]/20 flex items-center justify-center bg-[#F4EFE6] shadow-soft-sm">
                <ShieldCheck className="w-5 h-5 text-[#2F4A3A] stroke-[1.5]" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#163323]">
                {t.trustStrip.safePayment}
              </span>
              <span className="font-sans text-xs text-[#2F4A3A]/75 max-w-[24ch]">
                {t.trustStrip.safePaymentSub}
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

      {/* 5. GRID OF AT LEAST 8 CROP CARDS */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="FRESH HARVESTS // SAMPLE DATA"
              title="Crops Ready For"
              highlightWord="Direct Pickup."
              squiggleColor="#C77B58"
              description="Fresh harvest lots listed directly by verified smallholders and FPOs. Buy 1–25 kg for home or order in quintals for business."
            />

            <Button
              variant="outline"
              size="md"
              withArrow
              onClick={() => onNavigate('market')}
              className="text-xs uppercase tracking-wider font-semibold self-start md:self-auto"
            >
              See All 24+ Crops
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayLots.map((lot) => (
              <div key={lot.id} className="flex flex-col">
                <ListingCard
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
                  onMakeOffer={() => onNavigate('crop', { id: lot.id })}
                />
                <div className="mt-2.5 grid grid-cols-2 gap-2 font-sans">
                  <button
                    type="button"
                    onClick={() => handleQuickAddToCart(lot)}
                    className="py-2 px-2 bg-[#2F4A3A] text-[#FBF8F2] hover:bg-[#163323] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Buy for Home</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('crop', { id: lot.id })}
                    className="py-2 px-2 bg-[#FBF8F2] text-[#2F4A3A] border border-[#2F4A3A]/20 hover:bg-[#F4EFE6] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Bulk Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Wave Seam */}
      <WaveDivider fillColor="#FBF8F2" bgColor="#F4EFE6" />

      {/* 6. "BUY FOR HOME VS BULK ORDER" EXPLAINER */}
      <section className="py-16 sm:py-24 bg-[#FBF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#C77B58] bg-[#F4EFE6] border border-[#2F4A3A]/10 px-3 py-1 rounded-full">
              FLEXIBLE BUYING
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#163323] tracking-tight">
              Two Ways to Buy Fresh Produce
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#536458] leading-relaxed">
              Whether you need 5 kg of ripe tomatoes for your family kitchen or 15 quintals for your restaurant chain, FarmChain connects you directly to the farmer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Mode 1: Buy for Home */}
            <div className="p-8 sm:p-10 rounded-[32px] bg-[#F4EFE6] border border-[#2F4A3A]/15 shadow-soft space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#C77B58] text-[#FBF8F2] flex items-center justify-center shadow-soft">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#C77B58] tracking-wider block">
                    MODE 1 // HOUSEHOLDS &amp; HOME COOKS
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#163323]">
                    Buy for Home (1–25 kg)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#536458] leading-relaxed font-sans">
                  Get fresh, unpolished produce harvested within 24 hours. Fixed transparent price per kg with zero retailer markups.
                </p>
                <div className="space-y-2.5 font-sans text-xs">
                  <div className="flex items-center gap-2 text-[#163323]">
                    <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0" />
                    <span>Fixed price per kg clearly shown on every lot</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#163323]">
                    <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0" />
                    <span>Order 1 to 25 kg using simple Add to Cart</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#163323]">
                    <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0" />
                    <span>Doorstep delivery in ventilated clean crates</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                withArrow
                fullWidth
                onClick={() => onNavigate('market')}
                className="text-xs uppercase tracking-wider font-semibold min-h-[44px]"
              >
                Shop for Your Home
              </Button>
            </div>

            {/* Mode 2: Bulk Order */}
            <div className="p-8 sm:p-10 rounded-[32px] bg-[#163323] text-[#FBF8F2] border border-[#163323] shadow-soft space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E5B94A] text-[#163323] flex items-center justify-center shadow-soft">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#E5B94A] tracking-wider block">
                    MODE 2 // SHOPS, HOTELS &amp; RESTAURANTS
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#FBF8F2]">
                    Bulk Order (Quintals)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#FBF8F2]/75 leading-relaxed font-sans">
                  Order full harvest lots by the quintal (1 quintal = 100 kg). Agree on harvest prices in advance with unified single-bill invoicing.
                </p>
                <div className="space-y-2.5 font-sans text-xs">
                  <div className="flex items-center gap-2 text-[#FBF8F2]">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B94A] shrink-0" />
                    <span>1 quintal = 100 kg clearly measured</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FBF8F2]">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B94A] shrink-0" />
                    <span>Tap "Ask for a price" to propose custom rates</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FBF8F2]">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B94A] shrink-0" />
                    <span>Calibrated gate weighing and dock delivery</span>
                  </div>
                </div>
              </div>

              <Button
                variant="yellow"
                size="md"
                withArrow
                fullWidth
                onClick={() => onNavigate('buyer')}
                className="text-xs uppercase tracking-wider font-semibold min-h-[44px]"
              >
                Post Bulk Requirement
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* Wave Seam */}
      <WaveDivider fillColor="#F4EFE6" bgColor="#FBF8F2" />

      {/* 7. "FARMER > FARMCHAIN > BUYER" VS "FARMER > TRADER > AGENT > WHOLESALER > BUYER" COMPARISON WITH MANDI VS FARMCHAIN PRICE BARS */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <SectionHeader
            eyebrow="PRICE TRANSPARENCY"
            title="Where Does the"
            highlightWord="Commission Go?"
            squiggleColor="#C77B58"
            description="Traditional APMC physical mandis have 4 to 5 layers of intermediaries taking cuts. FarmChain removes every layer, giving farmers 25%+ more and buyers lower rates."
          />

          <DirectVsMiddlemenComparison />

        </div>
      </section>

      {/* Wave Seam */}
      <WaveDivider fillColor="#163323" bgColor="#F4EFE6" />

      {/* 8. SAFE PAYMENT EXPLAINER */}
      <section className="py-20 sm:py-28 bg-[#163323] text-[#FBF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#E5B94A]">
              100% SECURE TRANSACTIONS
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#FBF8F2] tracking-tight">
              How Safe Payment Works
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#FBF8F2]/80 max-w-2xl mx-auto leading-relaxed">
              Neither the farmer nor the buyer is at risk. Funds are held safely and only disbursed after produce is weighed and checked at the village gate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            <div className="p-6 rounded-[28px] bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-3">
              <span className="font-mono text-xs font-bold text-[#E5B94A] block">STEP 01</span>
              <h3 className="font-editorial text-xl font-bold text-[#FBF8F2]">Agree on Price</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">
                Farmer and buyer confirm price per kg and delivery date in advance with no middleman.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-3">
              <span className="font-mono text-xs font-bold text-[#E5B94A] block">STEP 02</span>
              <h3 className="font-editorial text-xl font-bold text-[#FBF8F2]">Safe Deposit Lock</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">
                Buyer deposits payment into the safe system. Farmer receives instant SMS confirmation before harvesting.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-3">
              <span className="font-mono text-xs font-bold text-[#E5B94A] block">STEP 03</span>
              <h3 className="font-editorial text-xl font-bold text-[#FBF8F2]">Digital Gate Weighing</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">
                At the village aggregation shed, crates are weighed on calibrated digital scales and inspected for quality.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-[#2F4A3A]/50 border border-[#FBF8F2]/10 space-y-3">
              <span className="font-mono text-xs font-bold text-[#E5B94A] block">STEP 04</span>
              <h3 className="font-editorial text-xl font-bold text-[#FBF8F2]">Money in Bank (Under 2h)</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">
                100% of the harvest price is transferred straight to the farmer bank account with 0% broker fee.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Wave Seam */}
      <WaveDivider fillColor="#FBF8F2" bgColor="#163323" />

      {/* 9. "WHO IS FARMCHAIN FOR" (Farmers, Households, Shops & Restaurants) */}
      <section className="py-16 sm:py-24 bg-[#FBF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#C77B58] bg-[#F4EFE6] border border-[#2F4A3A]/10 px-3 py-1 rounded-full">
              BUILT FOR INDIA
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#163323] tracking-tight">
              Who is FarmChain For?
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#536458] leading-relaxed">
              Designed for the ground realities of Indian agriculture with plain language, village collection points, and no tech barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[32px] bg-[#F4EFE6] border border-[#2F4A3A]/15 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-[#A8B89A]" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#163323]">
                Farmers &amp; Cooperatives
              </h3>
              <p className="text-xs sm:text-sm text-[#536458] leading-relaxed font-sans">
                Smallholders and FPOs who want fair harvest prices agreed in advance, village gate pickup, and direct bank deposits without commission deductions.
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-[#F4EFE6] border border-[#2F4A3A]/15 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#C77B58] text-[#FBF8F2] flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#163323]">
                Households &amp; Families
              </h3>
              <p className="text-xs sm:text-sm text-[#536458] leading-relaxed font-sans">
                Urban families who want genuine farm-fresh vegetables and grains harvested 24 hours prior, without cold-storage chemicals or retail markups.
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-[#F4EFE6] border border-[#2F4A3A]/15 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#163323] text-[#E5B94A] flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#163323]">
                Shops, Hotels &amp; Restaurants
              </h3>
              <p className="text-xs sm:text-sm text-[#536458] leading-relaxed font-sans">
                Commercial kitchens and grocery retailers sourcing in quintals with guaranteed quality grades, scheduled dock deliveries, and single GST invoices.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Wave Seam */}
      <WaveDivider fillColor="#F4EFE6" bgColor="#FBF8F2" />

      {/* 10. MODEST IMPACT COUNTERS (Marked "Sample data") */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#536458] bg-[#FBF8F2] border border-[#2F4A3A]/10 px-3 py-1 rounded-full">
              PILOT METRICS // SAMPLE DATA
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323]">
              Real Community Impact
            </h2>
          </div>

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

      {/* Wave Seam */}
      <WaveDivider fillColor="#163323" bgColor="#F4EFE6" />

      {/* 11. FARMER STORIES (Marked "Sample data") */}
      <section className="py-20 sm:py-28 bg-[#163323] text-[#FBF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#E5B94A] block mb-2">
                VOICES FROM THE VILLAGE // SAMPLE DATA
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#FBF8F2] tracking-tight">
                Stories From Real Smallholders
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#FBF8F2]/75 max-w-md leading-relaxed">
              How eliminating the middleman restored fair profits to farmers across our pilot village clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_FARMER_STORIES.map((story) => (
              <div
                key={story.id}
                className="rounded-[30px] bg-[#2F4A3A]/40 border border-[#FBF8F2]/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-soft-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#E5B94A] bg-[#E5B94A]/15 px-2.5 py-1 rounded-full border border-[#E5B94A]/30">
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

      {/* Wave Seam */}
      <WaveDivider fillColor="#FBF8F2" bgColor="#163323" />

      {/* 12. DELIVERY AND PICKUP INFO */}
      <section className="py-16 sm:py-24 bg-[#FBF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#C77B58] bg-[#F4EFE6] border border-[#2F4A3A]/10 px-3 py-1 rounded-full">
              COORDINATED LOGISTICS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323]">
              Village Pickup &amp; Direct Delivery
            </h2>
            <p className="font-sans text-sm text-[#536458] leading-relaxed">
              No individual tempos needed. Scheduled collection loops pick up from village sheds and deliver directly to buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card variant="paper" className="p-6 space-y-3">
              <Truck className="w-8 h-8 text-[#2F4A3A]" />
              <h3 className="font-editorial text-xl font-bold text-[#163323]">Refrigerated Milk-Runs</h3>
              <p className="text-xs text-[#536458] leading-relaxed font-sans">
                Ventilated collection vehicles pick up harvested crates on fixed weekly schedules across all 42 villages.
              </p>
            </Card>

            <Card variant="paper" className="p-6 space-y-3">
              <Scale className="w-8 h-8 text-[#C77B58]" />
              <h3 className="font-editorial text-xl font-bold text-[#163323]">Calibrated Digital Scales</h3>
              <p className="text-xs text-[#536458] leading-relaxed font-sans">
                Every crate is weighed on government-calibrated digital scales at the village gate, preventing any weight dispute.
              </p>
            </Card>

            <Card variant="paper" className="p-6 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#163323]" />
              <h3 className="font-editorial text-xl font-bold text-[#163323]">Transit Spoilage Cover</h3>
              <p className="text-xs text-[#536458] leading-relaxed font-sans">
                If unexpected road delays cause produce damage, FarmChain absorbs the loss. The farmer's payout is protected.
              </p>
            </Card>
          </div>

        </div>
      </section>

      {/* Wave Seam */}
      <WaveDivider fillColor="#F4EFE6" bgColor="#FBF8F2" />

      {/* 13. FAQ ACCORDION */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          
          <SectionHeader
            eyebrow="QUESTIONS & TRUST"
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

      {/* Wave Seam */}
      <WaveDivider fillColor="#163323" bgColor="#F4EFE6" />

      {/* 14. FINAL CALL TO ACTION */}
      <section id="final-cta" className="py-16 sm:py-24 bg-[#163323] text-[#FBF8F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#E5B94A] bg-[#2F4A3A] px-4 py-1.5 rounded-full border border-[#FBF8F2]/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT FROM FARM // ZERO BROKER FEE</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl font-bold text-[#FBF8F2] tracking-tight leading-tight">
            Ready to Sell or Buy Fresh Crops?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#FBF8F2]/80 max-w-xl mx-auto leading-relaxed">
            Sell crops directly to verified wholesale buyers. Agree on harvest prices in advance. Village pickup. 100% direct bank payout. 0% broker fee.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              withArrow
              onClick={onOpenSellModal || (() => onNavigate('farmer'))}
              className="text-xs uppercase tracking-wider font-semibold min-h-[48px] px-8 shadow-soft-terracotta"
            >
              Sell Your Crop
            </Button>
            <Button
              variant="white"
              size="lg"
              withArrow
              onClick={() => onNavigate('market')}
              className="text-xs uppercase tracking-wider font-semibold min-h-[48px] px-8"
            >
              Buy Fresh Crops
            </Button>
          </div>

        </div>
      </section>

    </div>
  );
};
