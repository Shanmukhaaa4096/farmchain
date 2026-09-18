import React from 'react';
import { MapPin, Calendar, ArrowRight, TrendingUp, Sprout } from 'lucide-react';
import { Button } from '../ui/Button';
import { DemandRequirement } from '../../types';

interface DemandCardProps {
  demand: DemandRequirement;
  onSelect: (demand: DemandRequirement) => void;
  onPledge?: (demand: DemandRequirement) => void;
  userRole?: string;
}

const CROP_IMAGES: Record<string, string> = {
  Tomatoes: '/farmer_hands_produce.jpg',
  Onions: '/wholesale_produce_dock.jpg',
  Potatoes: '/farmer_harvest_crate.jpg',
  'Green Chilli': '/hero_indian_agriculture.jpg',
  'Bell Peppers': '/farmer_hands_produce.jpg',
  'Basmati Rice': '/hero_tractor_farmland.jpg',
};

export const DemandCard: React.FC<DemandCardProps> = ({
  demand,
  onSelect,
  onPledge,
  userRole = 'farmer'
}) => {
  const percentFulfilled = Math.min(100, Math.round((demand.matchedQuantityKg / demand.quantityKg) * 100));
  const isFulfilled = percentFulfilled >= 100;
  const imageSrc = CROP_IMAGES[demand.crop] || '/farmer_hands_produce.jpg';

  const getDemandIndicator = (urgency: string) => {
    switch (urgency) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[10px] text-terracotta bg-terracotta/10 border border-terracotta/25 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse"></span>
            HIGH DEMAND
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[10px] text-dark-text bg-harvest-yellow/20 border border-harvest-yellow/30 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest-yellow"></span>
            STEADY
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-[10px] text-dark-text/60 bg-paper-bg border border-dark-text/10 px-2.5 py-0.5 rounded-full">
            STANDARD
          </span>
        );
    }
  };

  return (
    <div 
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm hover:border-farm-green/30 hover:shadow-soft-md transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(demand)}
    >
      <div className="space-y-4">
        {/* Top Image + Badge Strip */}
        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-paper-bg">
          <img
            src={imageSrc}
            alt={demand.crop}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/70 via-transparent to-transparent pointer-events-none" />

          {/* Urgency Badge */}
          <div className="absolute top-3 left-3 z-10">
            {getDemandIndicator(demand.urgency)}
          </div>

          {/* Grade Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pure-white/90 backdrop-blur-xs text-dark-text border border-dark-text/10">
              {demand.qualityGrade}
            </span>
          </div>

          {/* Title on Image overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-pure-white">
            <h3 className="font-serif text-xl font-bold tracking-tight text-pure-white drop-shadow-sm">
              {demand.crop}
            </h3>
            <p className="text-xs text-pure-white/80 font-sans truncate">
              {demand.buyerName} • {demand.buyerType}
            </p>
          </div>
        </div>

        {/* Essential Info: Volume & Price */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-dark-text/10 bg-paper-bg/60 p-3 text-xs font-mono">
          <div>
            <span className="text-[10px] uppercase text-dark-text/50 block">Target Volume</span>
            <strong className="font-serif text-lg font-bold text-dark-text">
              {demand.quantityKg.toLocaleString()} KG
            </strong>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase text-dark-text/50 block">Locked Rate</span>
            <strong className="font-serif text-lg font-bold text-farm-green">
              ₹{demand.targetPricePerKg} / KG
            </strong>
          </div>
        </div>

        {/* Location & Delivery Date */}
        <div className="space-y-1.5 text-xs text-dark-text/70">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-farm-green shrink-0" />
            <span className="truncate">{demand.deliveryLocation.split('(')[0].trim()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-farm-green shrink-0" />
            <span>Delivery: <strong className="text-dark-text">{demand.requiredDate}</strong></span>
          </div>
        </div>
      </div>

      {/* Primary Action Button & View Details */}
      <div className="pt-4 mt-4 border-t border-dark-text/10 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(demand);
          }}
          className="text-xs font-semibold text-dark-text/60 hover:text-dark-text hover:underline py-1"
        >
          View Specs
        </button>

        {userRole === 'farmer' && !isFulfilled && onPledge ? (
          <Button
            variant="clay"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPledge(demand);
            }}
            className="shadow-soft-terracotta text-xs px-4"
          >
            <span>Sell Produce</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        ) : (
          <Button
            variant="white"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(demand);
            }}
            className="text-xs"
          >
            Details →
          </Button>
        )}
      </div>
    </div>
  );
};
