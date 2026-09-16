import React, { useState } from 'react';
import { 
  Plus, 
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Scale
} from 'lucide-react';
import { DemandCard } from '../components/marketplace/DemandCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { DemandRequirement } from '../types';

interface MarketplacePageProps {
  demands: DemandRequirement[];
  onSelectDemand: (demand: DemandRequirement) => void;
  onOpenPostDemand: () => void;
  onPledgeDemand: (demand: DemandRequirement) => void;
  onNavigate?: (view: string) => void;
  userRole: string;
}

const CROP_PILLS = [
  'ALL CROPS',
  'Tomatoes',
  'Onions',
  'Potatoes',
  'Green Chilli',
  'Bell Peppers'
];

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  demands,
  onSelectDemand,
  onOpenPostDemand,
  onPledgeDemand,
  onNavigate,
  userRole
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('ALL CROPS');

  const filteredDemands = demands.filter(d => {
    const matchesSearch = 
      d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrop = selectedCrop === 'ALL CROPS' || d.crop.toLowerCase() === selectedCrop.toLowerCase();

    return matchesSearch && matchesCrop;
  });

  const totalDemandTonnage = Math.round(demands.reduce((acc, d) => acc + d.quantityKg, 0) / 1000);

  return (
    <div className="py-6 sm:py-10 bg-warm-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Simple Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-ink-black">
          <div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-black">
              MARKET DEMAND
            </h1>
            <p className="font-body text-xs sm:text-sm text-gray-700 mt-1">
              Verified wholesale purchase orders with guaranteed direct payment.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {userRole === 'buyer' && (
              <Button
                variant="yellow"
                size="sm"
                onClick={onOpenPostDemand}
                className="font-heading font-black text-xs"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>POST BUYER ORDER</span>
              </Button>
            )}
          </div>
        </div>

        {/* 1-Tap Crop Filter Pills (Thumb-Friendly on Phones) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CROP_PILLS.map((crop) => {
              const isSelected = selectedCrop === crop;
              return (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3.5 py-1.5 font-heading text-xs font-bold uppercase whitespace-nowrap border-2 border-ink-black transition-all ${
                    isSelected
                      ? 'bg-citrus-yellow text-ink-black shadow-brutal-sm -translate-y-0.5'
                      : 'bg-paper-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {crop}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crop, buyer, or city..."
              className="w-full p-2 pl-9 bg-paper-white border-2 border-ink-black font-mono text-xs font-bold focus:outline-hidden"
            />
          </div>
        </div>

        {/* Results Count & Quick Summary */}
        <div className="flex items-center justify-between font-mono text-xs text-gray-600">
          <span>
            Showing <strong>{filteredDemands.length}</strong> active buyer demands ({totalDemandTonnage} MT total)
          </span>
          {onNavigate && (
            <button
              onClick={() => onNavigate('prices')}
              className="text-farm-green font-bold hover:underline flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Check APMC Mandi Rates →</span>
            </button>
          )}
        </div>

        {/* Grid of Clean Demand Cards */}
        {filteredDemands.length === 0 ? (
          <Card variant="white" className="p-8 text-center border-brutal font-mono text-xs text-gray-600">
            No active buyer demands match your search. Try selecting "All Crops".
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDemands.map((demand) => (
              <DemandCard
                key={demand.id}
                demand={demand}
                onSelect={onSelectDemand}
                onPledge={onPledgeDemand}
                userRole={userRole}
              />
            ))}
          </div>
        )}

        {/* Progressive Disclosure: Deep Market Analytics Link */}
        {onNavigate && (
          <div className="pt-6 border-t-2 border-ink-black flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <span className="text-gray-600">Want deeper market intelligence and price trends?</span>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('forecast')}
                className="px-3 py-1.5 bg-paper-white border border-ink-black font-bold hover:bg-citrus-yellow"
              >
                7-Day Price Forecast →
              </button>
              <button
                onClick={() => onNavigate('prices')}
                className="px-3 py-1.5 bg-paper-white border border-ink-black font-bold hover:bg-citrus-yellow"
              >
                Mandi Benchmark Calculator →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
