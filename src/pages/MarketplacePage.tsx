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
import { EmptyState } from '../components/ui/EmptyState';
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
    <div className="py-8 sm:py-12 bg-paper-bg min-h-screen text-dark-text">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Editorial Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-dark-text/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
              <span className="font-mono text-xs text-farm-green font-bold uppercase tracking-wider">
                LIVE MARKET DEMAND BOARD // {totalDemandTonnage} MT AGGREGATED
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark-text">
              Wholesale Purchase Orders
            </h1>
            <p className="text-xs sm:text-base text-dark-text/70 mt-1 max-w-2xl">
              Verified institutional buyers, locked farm-gate rates, and guaranteed village-gate collection loops.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {userRole === 'buyer' && (
              <Button
                variant="clay"
                size="md"
                onClick={onOpenPostDemand}
                className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Post Sourcing Demand</span>
              </Button>
            )}
          </div>
        </div>

        {/* 1-Tap Crop Filter Pills */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CROP_PILLS.map((crop) => {
              const isSelected = selectedCrop === crop;
              return (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase whitespace-nowrap border transition-all ${
                    isSelected
                      ? 'bg-farm-green text-paper-bg border-farm-green shadow-soft-sm'
                      : 'bg-pure-white text-dark-text border-dark-text/15 hover:border-farm-green/40 hover:bg-paper-bg'
                  }`}
                >
                  {crop}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop name (e.g. Tomatoes), buyer name, or delivery district..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-pure-white border border-dark-text/15 text-dark-text text-sm focus:outline-none focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 shadow-soft-sm placeholder:text-dark-text/40 transition-all"
            />
          </div>
        </div>

        {/* Results Count & Quick Summary */}
        <div className="flex items-center justify-between font-mono text-xs text-dark-text/60">
          <span>
            Showing <strong className="text-dark-text">{filteredDemands.length}</strong> active buyer demands ({totalDemandTonnage} MT total)
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
          <EmptyState
            type="demand"
            title="NO MATCHING REQUIREMENTS"
            description="No active buyer purchase orders match your current crop or search filter. Try resetting your filter to view all crops."
            actionLabel="Reset to All Crops"
            onAction={() => {
              setSelectedCrop('ALL CROPS');
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Market Analytics Callout */}
        {onNavigate && (
          <div className="pt-6 border-t border-dark-text/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <span className="text-dark-text/60">Need deep agricultural forecasting and mandi rate comparisons?</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onNavigate('forecast')}
                className="px-4 py-2 rounded-full bg-pure-white border border-dark-text/15 font-semibold text-dark-text hover:bg-paper-bg shadow-soft-sm transition-colors"
              >
                7-Day Price Forecast →
              </button>
              <button
                onClick={() => onNavigate('prices')}
                className="px-4 py-2 rounded-full bg-pure-white border border-dark-text/15 font-semibold text-dark-text hover:bg-paper-bg shadow-soft-sm transition-colors"
              >
                Mandi Benchmark Ledger →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
