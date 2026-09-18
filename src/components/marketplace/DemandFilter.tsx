import React from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

interface DemandFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCrop: string;
  onCropChange: (c: string) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  selectedUrgency: string;
  onUrgencyChange: (u: string) => void;
  onReset: () => void;
}

export const DemandFilter: React.FC<DemandFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCrop,
  onCropChange,
  selectedLocation,
  onLocationChange,
  selectedUrgency,
  onUrgencyChange,
  onReset
}) => {
  const crops = ['ALL CROPS', 'Tomatoes', 'Onions', 'Potatoes', 'Green Chilli', 'Basmati Rice', 'Bell Peppers'];
  const locations = ['ALL REGIONS', 'Hyderabad', 'Nashik', 'Pune', 'Bangalore', 'Delhi NCR'];
  const urgencies = ['ALL DEMAND', 'HIGH', 'MEDIUM', 'NORMAL'];

  return (
    <div className="bg-pure-white rounded-3xl border border-dark-text/10 p-6 shadow-soft space-y-4">
      
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-dark-text/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search crop, buyer company, or grade (e.g. Tomatoes Grade A)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-paper-bg rounded-xl border border-dark-text/10 font-sans text-xs text-dark-text focus:outline-hidden focus:bg-pure-white focus:border-farm-green transition-colors"
          />
        </div>

        <button
          onClick={onReset}
          className="px-4 py-2 text-xs font-sans font-semibold rounded-xl border border-dark-text/15 bg-pure-white text-dark-text/80 hover:bg-paper-bg hover:text-dark-text transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET FILTERS</span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-dark-text/10 font-sans text-xs">
        
        {/* Crop Filter Dropdown / Select */}
        <div>
          <label className="block text-[10px] font-bold text-dark-text/60 uppercase mb-1">
            COMMODITY CROP
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => onCropChange(e.target.value)}
            className="w-full p-2.5 bg-paper-bg rounded-xl border border-dark-text/10 font-medium text-dark-text focus:outline-hidden focus:border-farm-green cursor-pointer"
          >
            {crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-[10px] font-bold text-dark-text/60 uppercase mb-1">
            TARGET DESTINATION
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full p-2.5 bg-paper-bg rounded-xl border border-dark-text/10 font-medium text-dark-text focus:outline-hidden focus:border-farm-green cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Urgency Filter */}
        <div>
          <label className="block text-[10px] font-bold text-dark-text/60 uppercase mb-1">
            DEMAND VELOCITY
          </label>
          <select
            value={selectedUrgency}
            onChange={(e) => onUrgencyChange(e.target.value)}
            className="w-full p-2.5 bg-paper-bg rounded-xl border border-dark-text/10 font-medium text-dark-text focus:outline-hidden focus:border-farm-green cursor-pointer"
          >
            {urgencies.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
};
