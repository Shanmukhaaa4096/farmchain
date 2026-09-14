import React, { useState } from 'react';
import { 
  Plus, 
  TrendingUp, 
  Layers, 
  Filter, 
  Sparkles, 
  Building,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { DemandFilter } from '../components/marketplace/DemandFilter';
import { DemandCard } from '../components/marketplace/DemandCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { DemandRequirement } from '../types';

interface MarketplacePageProps {
  demands: DemandRequirement[];
  onSelectDemand: (demand: DemandRequirement) => void;
  onOpenPostDemand: () => void;
  onPledgeDemand: (demand: DemandRequirement) => void;
  userRole: string;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  demands,
  onSelectDemand,
  onOpenPostDemand,
  onPledgeDemand,
  userRole
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('ALL CROPS');
  const [selectedLocation, setSelectedLocation] = useState('ALL REGIONS');
  const [selectedUrgency, setSelectedUrgency] = useState('ALL DEMAND');

  const filteredDemands = demands.filter(d => {
    const matchesSearch = 
      d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.qualityGrade.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrop = selectedCrop === 'ALL CROPS' || d.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesLocation = selectedLocation === 'ALL REGIONS' || d.deliveryLocation.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesUrgency = selectedUrgency === 'ALL DEMAND' || d.urgency === selectedUrgency;

    return matchesSearch && matchesCrop && matchesLocation && matchesUrgency;
  });

  const totalDemandTonnage = Math.round(demands.reduce((acc, d) => acc + d.quantityKg, 0) / 1000);

  return (
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-brutal">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="dark" size="sm">LIVE DEMAND EXCHANGE</Badge>
              <Badge variant="green" size="sm" dot>DIRECT SOURCING ACTIVE</Badge>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-ink-black">
              WHAT DOES THE MARKET NEED?
            </h1>
            <p className="font-body text-base text-gray-700 mt-2 font-medium max-w-2xl">
              This is not a retail grocery catalog. These are verified institutional and restaurant purchase orders looking for verified farmer supply.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="yellow"
              size="md"
              onClick={onOpenPostDemand}
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>POST BUYER REQUIREMENT</span>
            </Button>
          </div>
        </div>

        {/* Live Marketplace Statistics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <Card variant="white" shadow="sm" className="p-4 border-brutal">
            <span className="text-[10px] text-gray-600 uppercase font-bold block">
              TOTAL VOLUME WANTED
            </span>
            <strong className="font-heading font-black text-2xl text-ink-black">
              {totalDemandTonnage} <span className="text-xs font-mono font-normal">METRIC TONS</span>
            </strong>
            <div className="text-[10px] text-farm-green font-bold mt-1">Across 6 primary crops</div>
          </Card>

          <Card variant="white" shadow="sm" className="p-4 border-brutal">
            <span className="text-[10px] text-gray-600 uppercase font-bold block">
              ACTIVE PURCHASE ORDERS
            </span>
            <strong className="font-heading font-black text-2xl text-ink-black">
              {demands.length} <span className="text-xs font-mono font-normal">ORDERS</span>
            </strong>
            <div className="text-[10px] text-gray-600 mt-1">100% Escrow Funded</div>
          </Card>

          <Card variant="yellow" shadow="sm" className="p-4 border-brutal">
            <span className="text-[10px] text-ink-black uppercase font-bold block">
              AVERAGE FARMER NET GAIN
            </span>
            <strong className="font-heading font-black text-2xl text-ink-black">
              +28.4%
            </strong>
            <div className="text-[10px] text-ink-black font-bold mt-1">Above local APMC cuts</div>
          </Card>

          <Card variant="green" shadow="sm" className="p-4 border-brutal">
            <span className="text-[10px] text-harvest-yellow uppercase font-bold block">
              GROUP AGGREGATION RATE
            </span>
            <strong className="font-heading font-black text-2xl text-paper-white">
              88.2%
            </strong>
            <div className="text-[10px] text-warm-cream mt-1">Cooperative order pooling</div>
          </Card>
        </div>

        {/* Search & Filter Tool */}
        <DemandFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCrop={selectedCrop}
          onCropChange={setSelectedCrop}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          selectedUrgency={selectedUrgency}
          onUrgencyChange={setSelectedUrgency}
          onReset={() => {
            setSearchQuery('');
            setSelectedCrop('ALL CROPS');
            setSelectedLocation('ALL REGIONS');
            setSelectedUrgency('ALL DEMAND');
          }}
        />

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between font-mono text-xs text-gray-700">
          <span>
            SHOWING <strong className="text-ink-black">{filteredDemands.length}</strong> ACTIVE DEMAND REQUIREMENTS
          </span>
          <span className="hidden sm:inline">
            SORTED BY: <strong>URGENCY & DELIVERY DATE</strong>
          </span>
        </div>

        {/* Demand Cards Grid */}
        {filteredDemands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : (
          <Card variant="white" shadow="default" className="p-12 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="font-heading font-black text-xl uppercase">
              NO MATCHING REQUIREMENTS FOUND
            </h3>
            <p className="font-mono text-xs text-gray-600 max-w-md mx-auto">
              No active buyer orders matched your filter combination. Try resetting your filters or post a requirement if you are an enterprise buyer.
            </p>
            <Button
              variant="yellow"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCrop('ALL CROPS');
                setSelectedLocation('ALL REGIONS');
                setSelectedUrgency('ALL DEMAND');
              }}
            >
              CLEAR ALL FILTERS
            </Button>
          </Card>
        )}

      </div>
    </div>
  );
};
