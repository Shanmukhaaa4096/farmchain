import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  MapPin, 
  Sprout, 
  Building2, 
  ShoppingCart, 
  Filter,
  CheckCircle2,
  Scale
} from 'lucide-react';
import { SAMPLE_LISTINGS, SampleListing } from '../data/sampleHomepageData';
import { ListingCard } from '../components/ui/ListingCard';
import { DemandCard } from '../components/marketplace/DemandCard';
import { Button } from '../components/ui/Button';
import { VoiceSearchButton } from '../components/ui/VoiceSearchButton';
import { useCart } from '../context/CartContext';
import { DemandRequirement } from '../types';

interface MarketplacePageProps {
  demands?: DemandRequirement[];
  onSelectDemand?: (demand: DemandRequirement) => void;
  onOpenPostDemand?: () => void;
  onPledgeDemand?: (demand: DemandRequirement) => void;
  onNavigate: (view: string, params?: { id?: string }) => void;
  userRole?: string;
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Crops' },
  { id: 'vegetables', label: 'Fresh Vegetables' },
  { id: 'grains', label: 'Grains & Cereals' },
  { id: 'fruits', label: 'Orchard Fruits' },
  { id: 'pulses', label: 'Pulses & Lentils' },
  { id: 'spices', label: 'Spices & Jaggery' },
];

const LOCATIONS = [
  'All Locations',
  'Telangana (Chevella / Ranga Reddy)',
  'Maharashtra (Nashik / Lasalgaon)',
  'Karnataka (Mandya)',
  'Madhya Pradesh (Narmadapuram)',
  'Bihar (Samastipur)',
  'Punjab (Ludhiana / Khanna)',
  'Tamil Nadu (Erode)',
  'Gujarat (Anand)',
];

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  demands = [],
  onSelectDemand,
  onOpenPostDemand,
  onPledgeDemand,
  onNavigate,
  userRole = 'buyer',
  onShowToast,
}) => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'crops' | 'demands'>('crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [buyModeFilter, setBuyModeFilter] = useState<'all' | 'home' | 'bulk'>('all');
  const [sortBy, setSortBy] = useState<'freshest' | 'price_asc' | 'price_desc' | 'gain'>('freshest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleAddToCart = (lot: SampleListing) => {
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

  // Filter & Sort listings
  const filteredListings = SAMPLE_LISTINGS.filter((lot) => {
    const matchesSearch = 
      lot.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.village.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || lot.category === selectedCategory;

    const matchesLocation = 
      selectedLocation === 'All Locations' ||
      lot.state.toLowerCase().includes(selectedLocation.split(' ')[0].toLowerCase()) ||
      selectedLocation.toLowerCase().includes(lot.district.toLowerCase());

    const matchesMode = 
      buyModeFilter === 'all' ||
      (buyModeFilter === 'home' && lot.homeAvailable) ||
      (buyModeFilter === 'bulk' && lot.unit === 'quintal');

    return matchesSearch && matchesCategory && matchesLocation && matchesMode;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.pricePerKg - b.pricePerKg;
    if (sortBy === 'price_desc') return b.pricePerKg - a.pricePerKg;
    if (sortBy === 'gain') {
      const gainA = (a.pricePerKg - a.mandiPricePerKg) / a.mandiPricePerKg;
      const gainB = (b.pricePerKg - b.mandiPricePerKg) / b.mandiPricePerKg;
      return gainB - gainA;
    }
    return 0; // freshest default
  });

  return (
    <div className="py-8 sm:py-12 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2F4A3A]/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#C77B58] animate-pulse" />
              <span className="font-mono text-xs text-[#2F4A3A] font-bold uppercase tracking-wider">
                BUY FRESH CROPS // 24+ VERIFIED HARVEST LOTS
              </span>
              <span className="text-xs text-[#536458] font-mono">• Sample Data</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#163323] tracking-tight">
              Direct Produce Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-[#536458] mt-1 max-w-2xl font-sans">
              Buy for home (1–25 kg at fixed ₹/kg) or order in bulk (quintals, 1 quintal = 100 kg). 100% direct bank payout with 0% broker fee.
            </p>
          </div>

          {/* Tab Switcher: Crops For Sale vs Buyer Demands */}
          <div className="flex items-center gap-2 bg-[#FBF8F2] p-1 rounded-2xl border border-[#2F4A3A]/15 shadow-soft shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('crops')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'crops'
                  ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                  : 'text-[#2F4A3A] hover:bg-[#F4EFE6]'
              }`}
            >
              Crops For Sale ({SAMPLE_LISTINGS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('demands')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'demands'
                  ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                  : 'text-[#2F4A3A] hover:bg-[#F4EFE6]'
              }`}
            >
              Wholesale Demands ({demands.length})
            </button>
          </div>
        </div>

        {activeTab === 'crops' ? (
          <div className="space-y-6">
            
            {/* Search & Comprehensive Filters Bar */}
            <div className="bg-[#FBF8F2] p-4 sm:p-5 rounded-[28px] border border-[#2F4A3A]/15 shadow-soft space-y-4">
              
              <div className="flex flex-col md:flex-row items-center gap-3">
                {/* Search Bar with Voice Input */}
                <div className="relative flex-1 w-full flex items-center">
                  <Search className="w-4 h-4 text-[#536458] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search crop, variety, village, or farmer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-12 py-2.5 bg-[#F4EFE6] rounded-xl border border-[#2F4A3A]/15 font-sans text-xs sm:text-sm text-[#163323] outline-none"
                  />
                  <div className="absolute right-2">
                    <VoiceSearchButton
                      onResult={(query: string) => setSearchQuery(query)}
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div className="w-full md:w-60">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/15 rounded-xl text-xs font-sans font-semibold text-[#163323] outline-none cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="w-full md:w-52">
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/15 rounded-xl text-xs font-sans font-semibold text-[#163323] outline-none cursor-pointer"
                  >
                    <option value="freshest">Sort: Freshest Harvest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="gain">Farmer Realization (+%)</option>
                  </select>
                </div>
              </div>

              {/* Buying Mode & Category Chips */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#2F4A3A]/10">
                
                {/* Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-sans">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                          : 'bg-[#F4EFE6] text-[#2F4A3A] hover:bg-[#A8B89A]/30 border border-[#2F4A3A]/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-2 font-sans text-xs shrink-0">
                  <span className="font-bold text-[#536458] text-[11px] uppercase">Mode:</span>
                  <div className="grid grid-cols-3 gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-[#2F4A3A]/10">
                    <button
                      onClick={() => setBuyModeFilter('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        buyModeFilter === 'all' ? 'bg-[#2F4A3A] text-[#FBF8F2]' : 'text-[#2F4A3A]'
                      }`}
                    >
                      All Lots
                    </button>
                    <button
                      onClick={() => setBuyModeFilter('home')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        buyModeFilter === 'home' ? 'bg-[#2F4A3A] text-[#FBF8F2]' : 'text-[#2F4A3A]'
                      }`}
                    >
                      Home (1–25kg)
                    </button>
                    <button
                      onClick={() => setBuyModeFilter('bulk')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        buyModeFilter === 'bulk' ? 'bg-[#2F4A3A] text-[#FBF8F2]' : 'text-[#2F4A3A]'
                      }`}
                    >
                      Bulk (Quintals)
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Produce Grid (24+ listings) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((lot) => (
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
                      onClick={() => handleAddToCart(lot)}
                      className="py-2 px-2 bg-[#2F4A3A] text-[#FBF8F2] hover:bg-[#163323] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[40px]"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Buy for Home</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('crop', { id: lot.id })}
                      className="py-2 px-2 bg-[#FBF8F2] text-[#2F4A3A] border border-[#2F4A3A]/20 hover:bg-[#F4EFE6] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[40px]"
                    >
                      <span>Bulk Quote</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="p-12 bg-[#FBF8F2] rounded-[32px] text-center border border-[#2F4A3A]/15 space-y-3">
                <Sprout className="w-12 h-12 text-[#536458]/40 mx-auto" />
                <h3 className="font-editorial text-xl font-bold text-[#163323]">No matching crops found</h3>
                <p className="text-xs text-[#536458]">Try changing your location filter or searching for another crop.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLocation('All Locations');
                    setBuyModeFilter('all');
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}

          </div>
        ) : (
          /* Wholesale Demands Tab */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono font-bold uppercase text-[#536458]">
                WHOLESALE DEMANDS POSTED BY COMMERCIAL BUYERS
              </span>
              {userRole === 'buyer' && onOpenPostDemand && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenPostDemand}
                  className="text-xs uppercase font-semibold tracking-wider"
                >
                  Post Sourcing Demand
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demands.map((demand) => (
                <DemandCard
                  key={demand.id}
                  demand={demand}
                  onSelect={(d) => onSelectDemand && onSelectDemand(d)}
                  onPledge={(d) => onPledgeDemand && onPledgeDemand(d)}
                  userRole={userRole}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
