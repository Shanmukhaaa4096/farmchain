import React from 'react';
import { Plus, MapPin, Scale, ArrowUpRight } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';
import { cn } from '@/lib/utils';

export interface ListingCardProps {
  id?: string;
  photoUrl: string;
  crop: string;
  variety?: string;
  farmerName: string;
  village: string;
  district?: string;
  quantity: string;
  pricePerKg: number;
  mandiPricePerKg?: number;
  verified?: boolean;
  harvestDate?: string;
  onMakeOffer?: () => void;
  className?: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  photoUrl,
  crop,
  variety,
  farmerName,
  village,
  district,
  quantity,
  pricePerKg,
  mandiPricePerKg,
  verified = true,
  harvestDate,
  onMakeOffer,
  className = '',
}) => {
  const extraEarnings = mandiPricePerKg ? Math.round(((pricePerKg - mandiPricePerKg) / mandiPricePerKg) * 100) : null;

  return (
    <div
      className={cn(
        "group relative rounded-[28px] bg-[#FBF8F2] border border-[#2F4A3A]/12 shadow-soft overflow-hidden",
        "flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-soft-lg",
        className
      )}
    >
      {/* Top Agricultural Photography with zoom on hover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6]">
        <img
          src={photoUrl}
          alt={`${crop} harvested by ${farmerName} in ${village}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {verified ? (
            <VerifiedBadge type="farmer" size="sm" className="pointer-events-auto backdrop-blur-md bg-[#FBF8F2]/90" />
          ) : (
            <span />
          )}

          {extraEarnings && extraEarnings > 0 && (
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[#2F4A3A] text-[#FBF8F2] px-2.5 py-1 rounded-full shadow-soft-sm">
              +{extraEarnings}% vs Mandi
            </span>
          )}
        </div>

        {/* Bottom Bar overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono font-medium text-[#FBF8F2] bg-[#163323]/80 backdrop-blur-sm px-3 py-1.5 rounded-xl">
          <span className="flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-[#E5B94A]" />
            {quantity} AVAILABLE
          </span>
          {harvestDate && <span>READY: {harvestDate}</span>}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#C77B58] block">
                {variety ? `${variety} • ` : ''}FARM-GATE LOT
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#163323] tracking-tight group-hover:text-[#C77B58] transition-colors">
                {crop}
              </h3>
            </div>
            
            <div className="text-right">
              <div className="font-editorial text-2xl font-bold text-[#163323]">
                ₹{pricePerKg}
                <span className="text-xs font-sans font-normal text-[#2F4A3A]/70">/kg</span>
              </div>
              {mandiPricePerKg && (
                <span className="text-[10px] font-mono text-[#2F4A3A]/60 line-through block">
                  Mandi: ₹{mandiPricePerKg}
                </span>
              )}
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-[#2F4A3A]/80 border-t border-[#2F4A3A]/10">
            <span className="font-medium text-[#163323]">{farmerName}</span>
            <span className="flex items-center gap-1 text-[11px] text-[#2F4A3A]/70">
              <MapPin className="w-3 h-3 text-[#C77B58]" />
              {village}{district ? `, ${district}` : ''}
            </span>
          </div>
        </div>

        {/* Action Button with 90-degree rotating '+' */}
        <div className="pt-2">
          <button
            onClick={onMakeOffer}
            className={cn(
              "w-full min-h-[44px] px-4 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-[0.14em]",
              "bg-[#2F4A3A] text-[#FBF8F2] hover:bg-[#163323] transition-all duration-200 shadow-soft-sm",
              "flex items-center justify-between group/btn cursor-pointer"
            )}
          >
            <span>Make Offer</span>
            <span className="w-7 h-7 rounded-full bg-[#FBF8F2]/15 flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-90">
              <Plus className="w-4 h-4 text-[#FBF8F2]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
