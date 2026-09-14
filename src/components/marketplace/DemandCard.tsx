import React from 'react';
import { MapPin, Calendar, Users, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
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

  return (
    <Card 
      variant="white" 
      shadow="default" 
      interactive 
      className="p-6 border-brutal flex flex-col justify-between group"
      onClick={() => onSelect(demand)}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2 pb-4 border-b-2 border-ink-black">
          <div>
            <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
              {demand.id}
            </span>
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-ink-black group-hover:text-farm-green transition-colors">
              {demand.crop}
            </h3>
            <span className="font-mono text-xs text-gray-600 block">
              {demand.buyerType}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Badge 
              variant={demand.urgency === 'HIGH' ? 'red' : demand.urgency === 'MEDIUM' ? 'yellow' : 'white'}
              size="sm"
            >
              {demand.urgency} DEMAND
            </Badge>
            <span className="font-mono text-[10px] font-bold text-farm-green">
              {demand.qualityGrade}
            </span>
          </div>
        </div>

        {/* Big Required Quantity Banner */}
        <div className="my-5 p-4 bg-warm-cream border-2 border-ink-black font-mono">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-gray-600 uppercase font-bold">VOLUME REQUIRED:</span>
            <span className="font-heading font-black text-2xl text-ink-black">
              {demand.quantityKg.toLocaleString()} <span className="text-xs font-mono font-normal">KG</span>
            </span>
          </div>
          <div className="flex justify-between items-center text-xs mt-1 pt-1 border-t border-gray-300">
            <span className="text-gray-600">TARGET OFFER:</span>
            <strong className="text-farm-green font-bold">₹{demand.targetPricePerKg} / KG</strong>
          </div>
        </div>

        {/* Location & Delivery Info */}
        <div className="space-y-2 font-mono text-xs text-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-farm-green shrink-0" />
            <span className="truncate">{demand.deliveryLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-farm-green shrink-0" />
            <span>DELIVERY BY: <strong>{demand.requiredDate}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-farm-green shrink-0" />
            <span>MATCH STATUS: <strong>{demand.matchedFarmersCount} FARMERS PLEDGED</strong></span>
          </div>
        </div>

        {/* Fulfillment Progress Bar */}
        <div className="mt-2 font-mono text-xs">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-gray-600">GROUP AGGREGATION:</span>
            <span className="font-bold text-ink-black">
              {demand.matchedQuantityKg.toLocaleString()} / {demand.quantityKg.toLocaleString()} KG ({percentFulfilled}%)
            </span>
          </div>
          <div className="h-2.5 w-full bg-gray-200 border border-ink-black overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${isFulfilled ? 'bg-farm-green' : 'bg-harvest-yellow'}`}
              style={{ width: `${percentFulfilled}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-6 border-t-2 border-ink-black mt-4 flex items-center gap-2">
        <Button
          variant="yellow"
          size="sm"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onSelect(demand);
          }}
          className="flex items-center justify-center gap-1 text-xs"
        >
          <span>VIEW REQUIREMENT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>

        {userRole === 'farmer' && !isFulfilled && onPledge && (
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPledge(demand);
            }}
            className="text-xs shrink-0"
          >
            PLEDGE
          </Button>
        )}
      </div>
    </Card>
  );
};
