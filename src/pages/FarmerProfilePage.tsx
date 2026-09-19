import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Star, 
  Sprout, 
  Phone, 
  CheckCircle2, 
  Share2,
  Package
} from 'lucide-react';
import { SAMPLE_FARMERS, SAMPLE_LISTINGS, FarmerProfile } from '../data/sampleHomepageData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { ListingCard } from '../components/ui/ListingCard';

interface FarmerProfilePageProps {
  farmerId: string;
  onNavigate: (view: string, params?: { id?: string }) => void;
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

export const FarmerProfilePage: React.FC<FarmerProfilePageProps> = ({
  farmerId,
  onNavigate,
  onShowToast,
}) => {
  const farmer: FarmerProfile = 
    SAMPLE_FARMERS[farmerId] || SAMPLE_FARMERS['farmer-1'];

  const farmerListings = SAMPLE_LISTINGS.filter(
    (item) => item.farmerId === farmer.id || item.farmerName.toLowerCase() === farmer.name.toLowerCase()
  );

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
            Sample data // Farmer Profile
          </span>
        </div>

        {/* Farmer Header Hero Banner */}
        <div className="bg-[#FBF8F2] rounded-[36px] border border-[#2F4A3A]/15 p-6 sm:p-10 shadow-soft-lg relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-[#A8B89A] shrink-0 bg-[#2F4A3A] shadow-soft">
                <img
                  src={farmer.avatarUrl}
                  alt={farmer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323] tracking-tight">
                    {farmer.name}
                  </h1>
                  <VerifiedBadge type="farmer" size="md" />
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#536458] font-sans">
                  <span className="flex items-center gap-1 font-semibold text-[#163323]">
                    <MapPin className="w-4 h-4 text-[#C77B58]" />
                    {farmer.village}, {farmer.district}, {farmer.state}
                  </span>
                  <span>•</span>
                  <span>{farmer.landAcreage} Acres Farmland</span>
                  <span>•</span>
                  <span>Kisan ID: <strong className="font-mono text-[#163323]">{farmer.kisanId}</strong></span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#163323] bg-[#E5B94A]/20 px-2.5 py-1 rounded-full border border-[#E5B94A]/40">
                    <Star className="w-3.5 h-3.5 fill-[#E5B94A] text-[#E5B94A]" />
                    <span>{farmer.rating} Rating ({farmer.reviewsCount} verified orders)</span>
                  </div>
                  <span className="text-xs text-[#536458] font-sans">
                    {farmer.experienceYears} Years Farming
                  </span>
                </div>
              </div>

            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => onShowToast(`Direct phone connection requested for ${farmer.name}`)}
                className="min-h-[44px] text-xs uppercase tracking-wider font-semibold"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                <span>Contact Farmer</span>
              </Button>
            </div>
          </div>

          {/* Farmer Bio / Philosophy */}
          <div className="mt-8 pt-6 border-t border-[#2F4A3A]/10 max-w-4xl space-y-2">
            <h3 className="font-editorial text-lg font-bold text-[#163323]">
              About {farmer.name}'s Farm
            </h3>
            <p className="font-sans text-sm text-[#2F4A3A]/85 leading-relaxed">
              {farmer.bio}
            </p>
            {farmer.isFarmerGroup && (
              <div className="mt-2 inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-[#C77B58]/15 border border-[#C77B58]/30 text-xs font-sans text-[#163323] font-bold">
                <Sprout className="w-4 h-4 text-[#C77B58]" />
                <span>Leader of {farmer.groupName}</span>
              </div>
            )}
          </div>

        </div>

        {/* Crops Currently Available from this Farmer */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C77B58] block">
                FRESH HARVESTS
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163323]">
                Crops For Sale by {farmer.name} ({farmerListings.length})
              </h2>
            </div>
          </div>

          {farmerListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerListings.map((lot) => (
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
                  onMakeOffer={() => onNavigate('crop', { id: lot.id })}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-[#FBF8F2] rounded-2xl text-center border border-[#2F4A3A]/10">
              <Package className="w-10 h-10 mx-auto text-[#536458]/40 mb-2" />
              <p className="text-sm text-[#536458]">Next harvest lot will be listed in 3 days.</p>
            </div>
          )}
        </div>

        {/* Farmer Trust and Verification Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Card variant="paper" className="p-6 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-[#2F4A3A]" />
            <strong className="font-editorial text-lg block text-[#163323]">Verified Land Title</strong>
            <p className="text-xs text-[#536458] leading-relaxed">
              Government RoR land ownership record checked by Village Revenue Officer (VRO).
            </p>
          </Card>
          <Card variant="paper" className="p-6 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#2F4A3A]" />
            <strong className="font-editorial text-lg block text-[#163323]">Direct Bank Link</strong>
            <p className="text-xs text-[#536458] leading-relaxed">
              Direct IMPS transfer to State Bank account with 0% intermediary broker cut.
            </p>
          </Card>
          <Card variant="paper" className="p-6 space-y-2">
            <Star className="w-6 h-6 text-[#E5B94A] fill-[#E5B94A]" />
            <strong className="font-editorial text-lg block text-[#163323]">Consistent Grade Quality</strong>
            <p className="text-xs text-[#536458] leading-relaxed">
              Maintained 4.8+ rating across {farmer.reviewsCount} fulfilled village pickups.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};
