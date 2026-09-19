import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sprout, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Scale, 
  Truck, 
  CheckCircle2, 
  Star, 
  ShoppingCart, 
  MessageSquare,
  Building2,
  Info
} from 'lucide-react';
import { SAMPLE_LISTINGS, SAMPLE_FARMERS, SampleListing } from '../data/sampleHomepageData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { useCart } from '../context/CartContext';

interface CropDetailPageProps {
  cropId: string;
  onNavigate: (view: string, params?: { id?: string }) => void;
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

export const CropDetailPage: React.FC<CropDetailPageProps> = ({
  cropId,
  onNavigate,
  onShowToast,
}) => {
  const { addToCart } = useCart();
  const listing: SampleListing = 
    SAMPLE_LISTINGS.find((item) => item.id === cropId) || SAMPLE_LISTINGS[0];

  const farmer = SAMPLE_FARMERS[listing.farmerId] || SAMPLE_FARMERS['farmer-1'];

  const [buyMode, setBuyMode] = useState<'home' | 'bulk'>('home');
  const [homeQtyKg, setHomeQtyKg] = useState<number>(listing.minOrderKg || 5);
  const [bulkQuintals, setBulkQuintals] = useState<number>(5);
  const [bulkNotes, setBulkNotes] = useState<string>('');
  const [bulkSubmitted, setBulkSubmitted] = useState<boolean>(false);

  const handleAddToCart = () => {
    addToCart({
      listingId: listing.id,
      crop: listing.crop,
      variety: listing.variety,
      farmerName: listing.farmerName,
      village: listing.village,
      pricePerKg: listing.pricePerKg,
      quantityKg: homeQtyKg,
      photoUrl: listing.photoUrl,
    });
    onShowToast(`Added ${homeQtyKg} kg of fresh ${listing.crop} to your cart!`);
  };

  const handleSendBulkQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setBulkSubmitted(true);
    onShowToast(`Price quote request for ${bulkQuintals} quintals (${bulkQuintals * 100} kg) sent to ${listing.farmerName}!`);
  };

  return (
    <div className="py-8 sm:py-14 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('market')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2F4A3A]/75 hover:text-[#C77B58] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Buy Fresh Crops</span>
          </button>

          <span className="font-mono text-[11px] uppercase tracking-wider bg-[#FBF8F2] border border-[#2F4A3A]/15 px-3 py-1 rounded-full text-[#536458]">
            Sample data // SIH Demo
          </span>
        </div>

        {/* Hero Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image & Calibrated Quality Metrics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-[32px] overflow-hidden bg-[#FBF8F2] border border-[#2F4A3A]/15 shadow-soft-lg aspect-[4/3]">
              <img
                src={listing.photoUrl}
                alt={`${listing.crop} - ${listing.variety}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-[#163323] text-[#FBF8F2] font-mono text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {listing.category}
                </span>
                {listing.isFarmerGroup && (
                  <span className="bg-[#C77B58] text-[#FBF8F2] font-mono text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Farmer Group
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-[#163323]/90 text-[#FBF8F2] backdrop-blur-md p-4 rounded-2xl flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#A8B89A] block text-[10px] uppercase">Available Harvest Lot</span>
                  <strong className="text-base font-bold text-[#FBF8F2]">{listing.quantity}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[#A8B89A] block text-[10px] uppercase">Quality Grade</span>
                  <span className="text-[#E5B94A] font-bold">{listing.grade}</span>
                </div>
              </div>
            </div>

            {/* Quality Testing Parameters Strip */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#2F4A3A]/10">
                <Scale className="w-5 h-5 mx-auto text-[#2F4A3A] mb-1" />
                <span className="text-[10px] font-mono uppercase text-[#536458] block">Moisture</span>
                <strong className="text-sm font-bold text-[#163323]">{listing.moisturePercent}% Calibrated</strong>
              </div>
              <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#2F4A3A]/10">
                <Clock className="w-5 h-5 mx-auto text-[#2F4A3A] mb-1" />
                <span className="text-[10px] font-mono uppercase text-[#536458] block">Shelf Life</span>
                <strong className="text-sm font-bold text-[#163323]">{listing.shelfLifeDays} Days</strong>
              </div>
              <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#2F4A3A]/10">
                <Calendar className="w-5 h-5 mx-auto text-[#2F4A3A] mb-1" />
                <span className="text-[10px] font-mono uppercase text-[#536458] block">Harvest Timing</span>
                <strong className="text-sm font-bold text-[#163323]">{listing.harvestDate}</strong>
              </div>
            </div>

            {/* Farmer Profile Card (Clickable) */}
            <div 
              onClick={() => onNavigate('farmer-profile', { id: farmer.id })}
              className="bg-[#FBF8F2] p-6 rounded-[28px] border border-[#2F4A3A]/15 shadow-soft hover:border-[#C77B58] transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#A8B89A] shrink-0 bg-[#2F4A3A]">
                  <img
                    src={farmer.avatarUrl}
                    alt={farmer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-xl font-bold text-[#163323]">
                      {farmer.name}
                    </h3>
                    <VerifiedBadge type="farmer" size="sm" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#536458] mt-1 font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C77B58]" />
                      {farmer.village}, {farmer.district}
                    </span>
                    <span>•</span>
                    <span>{farmer.landAcreage} Acres</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-[#163323] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#E5B94A] text-[#E5B94A]" />
                      {farmer.rating} ({farmer.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs font-mono text-[#C77B58] font-bold uppercase tracking-wider block">
                  View Farmer Story →
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Purchase Modes */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#FBF8F2] p-6 sm:p-8 rounded-[32px] border border-[#2F4A3A]/15 shadow-soft-lg space-y-6">
              
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#C77B58] font-bold block mb-1">
                  DIRECT FROM {listing.village.toUpperCase()}
                </span>
                <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323] tracking-tight">
                  {listing.crop}
                </h1>
                <p className="text-sm font-sans text-[#536458] mt-0.5">
                  {listing.variety}
                </p>
              </div>

              {/* Price Callout */}
              <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#536458] uppercase block">Direct Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323]">
                      ₹{listing.pricePerKg}
                    </span>
                    <span className="text-xs font-sans text-[#536458]">per kg</span>
                  </div>
                </div>
                <div className="text-right text-xs font-sans">
                  <span className="text-[#536458] block line-through">Retail: ₹{listing.retailPricePerKg}/kg</span>
                  <span className="text-[#2F4A3A] font-semibold block">Mandi: ₹{listing.mandiPricePerKg}/kg</span>
                  <span className="text-[#C77B58] font-mono text-[11px] font-bold">
                    Farmer receives +{Math.round(((listing.pricePerKg - listing.mandiPricePerKg) / listing.mandiPricePerKg) * 100)}%
                  </span>
                </div>
              </div>

              {/* Mode Switcher: Buy for Home vs Bulk Order */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#536458] block">
                  Select How You Want to Buy:
                </span>
                <div className="grid grid-cols-2 p-1 bg-[#F4EFE6] rounded-xl border border-[#2F4A3A]/10">
                  <button
                    type="button"
                    onClick={() => setBuyMode('home')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      buyMode === 'home'
                        ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                        : 'text-[#2F4A3A] hover:bg-[#2F4A3A]/5'
                    }`}
                  >
                    Buy for Home (1–25 kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyMode('bulk')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      buyMode === 'bulk'
                        ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                        : 'text-[#2F4A3A] hover:bg-[#2F4A3A]/5'
                    }`}
                  >
                    Bulk Order (Quintals)
                  </button>
                </div>
              </div>

              {/* Tab 1: Buy for Home (Cart flow) */}
              {buyMode === 'home' && (
                <div className="space-y-5 pt-2 font-sans">
                  <div>
                    <label className="text-xs font-bold text-[#163323] block mb-2">
                      Quantity: {homeQtyKg} kg
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={listing.minOrderKg || 1}
                        max={listing.maxOrderKg || 25}
                        step={1}
                        value={homeQtyKg}
                        onChange={(e) => setHomeQtyKg(Number(e.target.value))}
                        className="flex-1 accent-[#C77B58] cursor-pointer"
                      />
                      <div className="w-16 py-1.5 px-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-lg text-center font-mono font-bold text-sm">
                        {homeQtyKg} kg
                      </div>
                    </div>
                    <span className="text-[11px] text-[#536458] block mt-1">
                      Min order {listing.minOrderKg} kg • Max {listing.maxOrderKg} kg for home delivery
                    </span>
                  </div>

                  <div className="p-3 bg-[#A8B89A]/20 border border-[#A8B89A]/40 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-medium text-[#163323]">Total Cost:</span>
                    <strong className="font-editorial text-lg text-[#163323]">
                      ₹{listing.pricePerKg * homeQtyKg}
                    </strong>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[48px]"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span>Add {homeQtyKg} kg to Cart</span>
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#536458]">
                    <Truck className="w-4 h-4 text-[#C77B58]" />
                    <span>Village pickup to your door • 0% Broker Fee</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Bulk Order (Ask for a price / quote) */}
              {buyMode === 'bulk' && (
                <div className="space-y-4 pt-2 font-sans">
                  <div className="p-3.5 rounded-xl bg-[#163323]/5 border border-[#163323]/15 text-xs text-[#163323] space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#C77B58]" />
                      <span>For Shops, Hotels, Kitchens &amp; Bulk Buyers</span>
                    </div>
                    <p className="text-[#536458]">
                      Order by the quintal (1 quintal = 100 kg). Agree on a harvest price directly with {listing.farmerName}.
                    </p>
                  </div>

                  {bulkSubmitted ? (
                    <div className="p-4 bg-[#A8B89A]/20 border border-[#A8B89A]/50 rounded-2xl text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 mx-auto text-[#2F4A3A]" />
                      <strong className="font-editorial text-lg block text-[#163323]">Price Request Sent!</strong>
                      <p className="text-xs text-[#536458]">
                        {listing.farmerName} will respond to your price proposal within 4 hours. You can track this under My Orders.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendBulkQuote} className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-[#163323] block mb-1">
                          Required Volume (Quintals):
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            max={30}
                            value={bulkQuintals}
                            onChange={(e) => setBulkQuintals(Number(e.target.value))}
                            className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm font-sans"
                            required
                          />
                          <span className="text-xs font-mono font-bold text-[#536458] shrink-0">
                            = {bulkQuintals * 100} KG
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#163323] block mb-1">
                          Delivery Note / Preferred Rate:
                        </label>
                        <textarea
                          rows={2}
                          value={bulkNotes}
                          onChange={(e) => setBulkNotes(e.target.value)}
                          placeholder="e.g. Delivery needed at Gachibowli hub by Friday. Offering ₹30/kg."
                          className="w-full px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-xs font-sans"
                        />
                      </div>

                      <Button
                        variant="ink"
                        size="lg"
                        fullWidth
                        type="submit"
                        className="text-xs tracking-wider uppercase font-semibold min-h-[48px]"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span>Ask for a Price</span>
                      </Button>
                    </form>
                  )}
                </div>
              )}

              {/* Safe Payment Notice */}
              <div className="pt-4 border-t border-[#2F4A3A]/10 space-y-2">
                <div className="flex items-start gap-2.5 text-xs font-sans text-[#536458]">
                  <ShieldCheck className="w-5 h-5 text-[#2F4A3A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#163323] block font-bold">Safe Payment Protection</strong>
                    <span>Your money is held safely and only released to the farmer after produce is weighed and quality-checked.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Detailed Crop Story & Cultivation Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <Card variant="paper" className="p-6 sm:p-8 space-y-4">
            <h3 className="font-editorial text-2xl font-bold text-[#163323]">
              About This Fresh Crop Lot
            </h3>
            <p className="text-sm font-sans text-[#2F4A3A]/85 leading-relaxed">
              {listing.description}
            </p>
            <div className="pt-3 flex flex-wrap gap-2 text-xs font-mono">
              <span className="bg-[#F4EFE6] px-3 py-1 rounded-full border border-[#2F4A3A]/10">
                Grown in: {listing.village}, {listing.state}
              </span>
              <span className="bg-[#F4EFE6] px-3 py-1 rounded-full border border-[#2F4A3A]/10">
                Harvest: {listing.harvestDate}
              </span>
              <span className="bg-[#F4EFE6] px-3 py-1 rounded-full border border-[#2F4A3A]/10">
                0% Chemical Dye / Unpolished
              </span>
            </div>
          </Card>

          <Card variant="paper" className="p-6 sm:p-8 space-y-4">
            <h3 className="font-editorial text-2xl font-bold text-[#163323]">
              Village Pickup &amp; Delivery
            </h3>
            <div className="space-y-3 font-sans text-xs sm:text-sm text-[#2F4A3A]/80">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">1</span>
                <p>Produce is picked fresh from the farm gate on the scheduled date.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#2F4A3A] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">2</span>
                <p>Digital weight scale and moisture meter calibration at village collection point.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C77B58] text-[#FBF8F2] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">3</span>
                <p>Delivered in ventilated crates straight to your home or shop dock.</p>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Sticky Mobile Primary CTA (Positioned cleanly above Mobile Tab Bar) */}
      <div className="fixed bottom-[54px] left-0 right-0 z-30 lg:hidden bg-[#FBF8F2]/95 border-t border-[#2F4A3A]/15 backdrop-blur-md p-3 px-4 flex items-center justify-between gap-4 shadow-soft-lg">
        <div>
          <span className="text-[10px] font-mono text-[#536458] uppercase block">Direct Price</span>
          <div className="flex items-baseline gap-1">
            <strong className="font-editorial text-xl font-bold text-[#163323]">₹{listing.pricePerKg}</strong>
            <span className="text-xs text-[#536458]">/ kg</span>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={buyMode === 'home' ? handleAddToCart : () => window.scrollTo({ top: 300, behavior: 'smooth' })}
          className="min-h-[44px] px-5 text-xs tracking-wider uppercase font-semibold"
        >
          {buyMode === 'home' ? 'Add to Cart' : 'Ask for Price'}
        </Button>
      </div>

    </div>
  );
};
