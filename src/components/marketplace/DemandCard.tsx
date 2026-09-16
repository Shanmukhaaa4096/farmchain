import React from 'react';
import { MapPin, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DemandRequirement } from '../../types';

interface DemandCardProps {
  demand: DemandRequirement;
  onSelect: (demand: DemandRequirement) => void;
  onPledge?: (demand: DemandRequirement) => void;
  userRole?: string;
}

export const DemandCard: React.FC<DemandCardProps> = ({
  demand,
  onSelect,
  onPledge,
  userRole = 'farmer'
}) => {
  const percentFulfilled = Math.min(100, Math.round((demand.matchedQuantityKg / demand.quantityKg) * 100));
  const isFulfilled = percentFulfilled >= 100;

  const getDemandIndicator = (urgency: string) => {
    switch (urgency) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-rust-red bg-red-50 border border-rust-red px-2 py-0.5">
            <span className="w-2 h-2 rounded-full bg-rust-red animate-pulse"></span>
            HIGH DEMAND
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-amber-800 bg-amber-50 border border-amber-800 px-2 py-0.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            STEADY DEMAND
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-gray-700 bg-gray-100 border border-gray-400 px-2 py-0.5">
            NORMAL DEMAND
          </span>
        );
    }
  };

  return (
    <Card 
      variant="white" 
      interactive 
      className="p-5 border-brutal flex flex-col justify-between group relative"
      onClick={() => onSelect(demand)}
    >
      <div className="space-y-3">
        {/* Header: Crop name & Demand Indicator */}
        <div className="flex items-start justify-between gap-2 pb-2 border-b border-gray-200">
          <div>
            <h3 className="font-heading font-black text-xl uppercase tracking-tight text-ink-black group-hover:text-farm-green transition-colors">
              {demand.crop}
            </h3>
            <span className="font-mono text-xs text-gray-600">
              {demand.qualityGrade} • {demand.buyerName}
            </span>
          </div>

          <div>{getDemandIndicator(demand.urgency)}</div>
        </div>

        {/* Essential Info: Volume & Price (Big, Bold, Readable) */}
        <div className="p-3 bg-warm-cream border-2 border-ink-black font-mono flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-600 uppercase font-bold block">
              VOLUME NEEDED:
            </span>
            <strong className="font-heading font-black text-xl text-ink-black">
              {demand.quantityKg.toLocaleString()} KG
            </strong>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-600 uppercase font-bold block">
              EXPECTED PRICE:
            </span>
            <strong className="font-heading font-black text-xl text-farm-green">
              ₹{demand.targetPricePerKg} / KG
            </strong>
          </div>
        </div>

        {/* Location & Delivery Date */}
        <div className="font-mono text-xs text-gray-700 space-y-1">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-farm-green shrink-0" />
            <span className="truncate">{demand.deliveryLocation.split('(')[0].trim()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-farm-green shrink-0" />
            <span>Delivery: <strong>{demand.requiredDate}</strong></span>
          </div>
        </div>
      </div>

      {/* Primary Action Button & View Details */}
      <div className="pt-4 border-t border-gray-200 mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(demand);
          }}
          className="font-mono text-xs font-bold text-gray-600 hover:text-ink-black underline py-1"
        >
          View Details
        </button>

        {userRole === 'farmer' && !isFulfilled && onPledge ? (
          <Button
            variant="yellow"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPledge(demand);
            }}
            className="flex items-center gap-1 text-xs font-heading font-black px-4"
          >
            <span>SELL PRODUCE</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Button>
        ) : (
          <Button
            variant="white"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(demand);
            }}
            className="text-xs font-heading font-bold"
          >
            CHECK DETAILS
          </Button>
        )}
      </div>
    </Card>
  );
};
