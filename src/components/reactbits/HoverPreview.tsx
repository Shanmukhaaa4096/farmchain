import React, { useState } from 'react';
import { ShieldCheck, MapPin, Eye, Plus, ArrowRight } from 'lucide-react';

interface HoverPreviewProps {
  crop: string;
  quantity: string;
  targetPrice: string;
  buyer: string;
  location: string;
  grade: string;
  moisture: string;
  deliveryWindow: string;
  imageUrl?: string;
  onPledge?: () => void;
  className?: string;
}

export const HoverPreview: React.FC<HoverPreviewProps> = ({
  crop,
  quantity,
  targetPrice,
  buyer,
  location,
  grade,
  moisture,
  deliveryWindow,
  imageUrl,
  onPledge,
  className = ''
}) => {
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  // Map image based on crop type
  const getImageForCrop = (cropName: string) => {
    if (imageUrl) return imageUrl;
    const name = cropName.toUpperCase();
    if (name.includes('TOMATO')) return '/farmer_hands_produce.jpg';
    if (name.includes('ONION')) return '/farmer_harvest_crate.jpg';
    if (name.includes('POTATO')) return '/wholesale_produce_dock.jpg';
    return '/hero_indian_agriculture.jpg';
  };

  return (
    <div 
      className={`group relative rounded-3xl bg-pure-white border border-dark-text/10 shadow-soft card-soft-lift overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Top Image Container with Soft Rounded Corners */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-bg">
        <img
          src={getImageForCrop(crop)}
          alt={`${crop} - ${grade}`}
          className="w-full h-full object-cover object-center image-soft-zoom"
          loading="lazy"
        />
        
        <div className="absolute top-3 left-3 bg-pure-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase text-dark-text border border-dark-text/10">
          {grade}
        </div>

        <div className="absolute top-3 right-3 bg-primary-green text-pure-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
          {quantity}
        </div>
      </div>

      {/* Card Content (Wash House Collection Layout) */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-terracotta">
            <span>WHOLESALE LOT</span>
            <span className="text-mandi-charcoal-muted text-[10px]">{deliveryWindow}</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-dark-text tracking-tight">
            {crop}
          </h3>

          <p className="font-sans text-xs text-mandi-charcoal-muted leading-relaxed line-clamp-2">
            Procured for <strong className="text-dark-text">{buyer}</strong>. QC Grade: {grade}, Max Moisture: {moisture}.
          </p>
        </div>

        {/* Bottom Price & Circular Plus Button */}
        <div className="pt-3 border-t border-dark-text/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-mandi-charcoal-muted block">
              TARGET PRICE
            </span>
            <span className="font-editorial text-xl sm:text-2xl font-bold text-primary-green block leading-none mt-0.5">
              {targetPrice}
            </span>
          </div>

          <button
            onClick={() => {
              if (onPledge) onPledge();
            }}
            className="w-10 h-10 rounded-full bg-soft-green/30 hover:bg-primary-green text-primary-green hover:text-pure-white flex items-center justify-center transition-all duration-300 shadow-soft-sm cursor-pointer group-hover:scale-105"
            aria-label={`Pledge for ${crop}`}
          >
            <Plus className="w-5 h-5 stroke-[2.4] transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

      </div>
    </div>
  );
};
