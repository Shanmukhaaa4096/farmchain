import React from 'react';
import { 
  Sprout, 
  TrendingUp, 
  Layers, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AgriImage } from '../ui/AgriImage';

interface LayeredAgriGridProps {
  onNavigate: (view: string) => void;
}

export const LayeredAgriGrid: React.FC<LayeredAgriGridProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-warm-cream bg-topo-pattern border-b-brutal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Editorial Style from Reference) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-farm-green text-harvest-yellow font-mono text-xs font-bold px-3 py-1 border-2 border-ink-black shadow-brutal-sm uppercase inline-flex items-center gap-1.5 mb-3">
            <Sprout className="w-3.5 h-3.5" /> OUR CAPABILITIES
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-5xl uppercase tracking-tight text-ink-black leading-tight">
            DISCOVER OUR DIRECT <span className="text-farm-green">AGRI-TECH INFRASTRUCTURE</span> BUILT FOR FARMERS, FPOS, AND BUYERS.
          </h2>
          <p className="font-body text-base text-gray-700 mt-3 font-medium">
            From algorithmic demand clustering to cold-chain dispatch, FarmChain replaces fragmented broker speculation with organized, transparent supply execution.
          </p>
        </div>

        {/* Asymmetric 3-Column Layered Cards Grid (Mirroring Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column (3.5 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Card 1: Direct Demand Matching */}
            <div className="p-6 bg-paper-white border-brutal shadow-brutal flex-1 space-y-3">
              <div className="w-12 h-12 bg-farm-green text-harvest-yellow border-2 border-ink-black flex items-center justify-center">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                DIRECT DEMAND MATCHING
              </h3>
              <p className="font-body text-xs text-gray-700 leading-relaxed">
                We connect farmer clusters with verified institutional and restaurant purchase orders before the harvest window begins.
              </p>
              <div className="pt-2 font-mono text-[11px] font-bold text-farm-green flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ZERO BROKER SPECULATION
              </div>
            </div>

            {/* Card 2: Group Aggregation (Solid Harvest Yellow) */}
            <div className="p-6 bg-harvest-yellow border-brutal shadow-brutal space-y-4">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider bg-ink-black text-paper-white px-2 py-0.5">
                COOPERATIVE POWER
              </span>
              <h3 className="font-heading font-black text-2xl uppercase text-ink-black leading-tight">
                SMALL FARMS. <br />
                ONE BIG ORDER.
              </h3>
              <p className="font-body text-xs text-ink-black leading-relaxed font-medium">
                Multiple smallholders combine individual 600kg-1000kg harvests to fulfill large multi-ton commercial POs.
              </p>
              <button
                onClick={() => onNavigate('marketplace')}
                className="font-heading font-bold text-xs uppercase flex items-center gap-1 hover:underline text-ink-black pt-1"
              >
                <span>EXPLORE ACTIVE CO-OPS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Middle Column (4 cols): Tall Vertical High-Res Photographic Card (Reference Mirror) */}
          <div className="md:col-span-4 flex flex-col">
            <div className="relative h-full min-h-[480px] bg-paper-white border-brutal-thick shadow-brutal-lg overflow-hidden flex flex-col group">
              
              {/* Resilient AgriImage with Agricultural Skeleton & Fallback */}
              <div className="relative w-full flex-1 overflow-hidden">
                <AgriImage
                  src="/farmer_harvest_crate.jpg"
                  alt="Proud smiling Indian farmer holding wooden crate of fresh ripe produce"
                  aspectRatio="3/4"
                  priority={false}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient & Tag Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-farm-green-dark via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="yellow" size="sm">
                    100% FARM-GATE FRESH
                  </Badge>
                </div>

                {/* Bottom Overlay Info Box */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-paper-white font-mono text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-harvest-yellow text-[10px] font-bold">PRODUCE CRATE #884</span>
                    <span className="text-[10px] bg-farm-green px-1.5 py-0.5 border border-paper-white/50">QC GRADE A</span>
                  </div>
                  <strong className="font-heading font-black text-lg uppercase text-paper-white block">
                    Kavitha Patel (Annapurna Agro)
                  </strong>
                  <p className="text-[11px] text-warm-cream leading-tight">
                    Harvested at sunrise in Shankarpally • Dispatched directly to buyer kitchens.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (4.5 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Card 4: Price Transparency */}
            <div className="p-6 bg-paper-white border-brutal shadow-brutal space-y-3">
              <div className="w-12 h-12 bg-harvest-yellow text-ink-black border-2 border-ink-black flex items-center justify-center">
                <BarChart3 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                PRICE TRANSPARENCY
              </h3>
              <p className="font-body text-xs text-gray-700 leading-relaxed">
                Live Mandi benchmarks and cost calculators reveal exact farm gate payout, transport, and handling items.
              </p>
              <div className="pt-2 font-mono text-[11px] font-bold text-farm-green flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 86%+ RETAINED VALUE
              </div>
            </div>

            {/* Card 5: Agri-Tech Tablet Photographic Card */}
            <div className="relative h-56 bg-paper-white border-brutal shadow-brutal overflow-hidden group">
              <AgriImage
                src="/agri_tech_field_tablet.jpg"
                alt="Indian agri-tech specialists reviewing harvest telemetry on digital tablet in field"
                aspectRatio="16/9"
                priority={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 text-paper-white font-mono text-xs">
                <span className="text-[10px] text-harvest-yellow font-bold uppercase block">
                  IOT TELEMETRY & EXTENSION
                </span>
                <strong className="font-heading font-black text-sm uppercase text-paper-white block">
                  Soil Moisture & Caliber Verification
                </strong>
              </div>
            </div>

          </div>

        </div>

        {/* Section Bottom Action */}
        <div className="mt-14 text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('marketplace')}
            className="text-sm font-heading font-black"
          >
            <span>VIEW COMPLETE LIVE DEMAND BOARD →</span>
          </Button>
        </div>

      </div>
    </section>
  );
};
