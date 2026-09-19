import React from 'react';
import { 
  Building2, 
  Utensils, 
  Store, 
  Sprout, 
  Truck, 
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface CenterFlowProps {
  className?: string;
}

export const CenterFlow: React.FC<CenterFlowProps> = ({ className = '' }) => {
  return (
    <div className={`w-full py-8 ${className}`}>
      
      {/* Desktop & Tablet Layout (Center Flow Diagram) */}
      <div className="hidden lg:grid grid-cols-12 gap-4 items-center font-mono">
        
        {/* Stream 1: Institutional Sources (3 cols) */}
        <div className="col-span-3 space-y-2.5">
          <div className="text-[10px] font-bold text-mandi-charcoal-muted uppercase tracking-wider pb-1 border-b border-charcoal/20">
            1. SOURCES OF DEMAND
          </div>

          <div className="p-3 bg-pure-white border border-dark-text shadow-tactile-sm flex items-center gap-2.5">
            <Utensils className="w-4 h-4 text-terracotta shrink-0" />
            <div>
              <strong className="text-xs text-dark-text block">Restaurants & Caterers</strong>
              <span className="text-[10px] text-mandi-charcoal-muted">Daily fresh perishables</span>
            </div>
          </div>

          <div className="p-3 bg-pure-white border border-dark-text shadow-tactile-sm flex items-center gap-2.5">
            <Store className="w-4 h-4 text-primary-green shrink-0" />
            <div>
              <strong className="text-xs text-dark-text block">Modern Retailers</strong>
              <span className="text-[10px] text-mandi-charcoal-muted">Grade A sorted volume</span>
            </div>
          </div>

          <div className="p-3 bg-pure-white border border-dark-text shadow-tactile-sm flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-accent-yellow shrink-0" />
            <div>
              <strong className="text-xs text-dark-text block">Bulk Processors</strong>
              <span className="text-[10px] text-mandi-charcoal-muted">Multi-ton processing lots</span>
            </div>
          </div>
        </div>

        {/* Connector SVG arrow left */}
        <div className="col-span-1 flex justify-center text-charcoal/40">
          <ArrowRight className="w-6 h-6 text-primary-green stroke-[2]" />
        </div>

        {/* Stream 2: Central Demand Convergence Hub (4 cols) */}
        <div className="col-span-4 p-5 bg-pure-white border-2 border-primary-green shadow-tactile space-y-3 text-center relative">
          <div className="inline-block px-2.5 py-0.5 bg-primary-green text-pure-white text-[10px] font-bold uppercase tracking-widest">
            CENTRAL DEMAND MATCHING
          </div>

          <div className="font-editorial text-2xl font-bold text-dark-text leading-tight">
            Upcoming Verified Market Demand
          </div>

          <p className="font-sans text-xs text-mandi-charcoal-muted leading-relaxed">
            Forward purchase contracts with locked floor prices aggregated before farmers sow or harvest.
          </p>

          <div className="pt-2 border-t border-charcoal/15 flex items-center justify-around text-[10px] text-dark-text">
            <div>
              <span className="text-mandi-charcoal-muted block">COMMITTED</span>
              <strong className="text-xs font-bold text-terracotta">18,500 KG</strong>
            </div>
            <div className="w-px h-6 bg-charcoal/20" />
            <div>
              <span className="text-mandi-charcoal-muted block">SAFE PAYMENT</span>
              <strong className="text-xs font-bold text-primary-green">100% SECURED</strong>
            </div>
          </div>
        </div>

        {/* Connector SVG arrow right */}
        <div className="col-span-1 flex justify-center text-charcoal/40">
          <ArrowRight className="w-6 h-6 text-primary-green stroke-[2]" />
        </div>

        {/* Stream 3: Direct Agricultural Fulfillment (3 cols) */}
        <div className="col-span-3 space-y-2.5">
          <div className="text-[10px] font-bold text-mandi-charcoal-muted uppercase tracking-wider pb-1 border-b border-charcoal/20">
            2. DIRECT FULFILLMENT
          </div>

          <div className="p-3 bg-pure-white border border-dark-text shadow-tactile-sm flex items-center gap-2.5">
            <Sprout className="w-4 h-4 text-primary-green shrink-0" />
            <div>
              <strong className="text-xs text-dark-text block">Village Farmers & FPOs</strong>
              <span className="text-[10px] text-mandi-charcoal-muted">Pledge matched harvest volume</span>
            </div>
          </div>

          <div className="p-3 bg-pure-white border border-dark-text shadow-tactile-sm flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-terracotta shrink-0" />
            <div>
              <strong className="text-xs text-dark-text block">Milk-Run Logistics</strong>
              <span className="text-[10px] text-mandi-charcoal-muted">Scheduled village-gate pickup</span>
            </div>
          </div>

          <div className="p-3 bg-pure-white border border-dark-text shadow-tactile-sm flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary-green shrink-0" />
            <div>
              <strong className="text-xs text-dark-text block">Buyers Receive &amp; Safe Payment Releases</strong>
              <span className="text-[10px] text-mandi-charcoal-muted">Instant payment into farmer bank</span>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Stacked Flow (Phones & Small Tablets) */}
      <div className="block lg:hidden space-y-3 font-mono">
        <div className="p-4 bg-pure-white border border-dark-text shadow-tactile-sm space-y-2">
          <div className="flex items-center justify-between text-[11px] text-terracotta font-bold">
            <span>STEP 1: UPCOMING DEMAND</span>
            <Building2 className="w-4 h-4" />
          </div>
          <div className="font-editorial text-lg text-dark-text font-bold">
            Restaurants, Retailers & Bulk Buyers
          </div>
          <p className="font-sans text-xs text-mandi-charcoal-muted">
            Post forward wholesale requirements with target pricing and quality grades.
          </p>
        </div>

        <div className="flex justify-center py-0.5">
          <div className="w-0.5 h-4 bg-primary-green" />
        </div>

        <div className="p-4 bg-pure-white border-2 border-primary-green shadow-tactile space-y-2">
          <div className="flex items-center justify-between text-[11px] text-primary-green font-bold">
            <span>STEP 2: FARMER MATCHING</span>
            <Sprout className="w-4 h-4" />
          </div>
          <div className="font-editorial text-lg text-dark-text font-bold">
            Farmers & FPOs Pledge Harvest
          </div>
          <p className="font-sans text-xs text-mandi-charcoal-muted">
            Nearby growers pool yields into single commercial lots matching the buyer’s delivery date.
          </p>
        </div>

        <div className="flex justify-center py-0.5">
          <div className="w-0.5 h-4 bg-primary-green" />
        </div>

        <div className="p-4 bg-pure-white border border-dark-text shadow-tactile-sm space-y-2">
          <div className="flex items-center justify-between text-[11px] text-terracotta font-bold">
            <span>STEP 3: DIRECT DISPATCH</span>
            <Truck className="w-4 h-4" />
          </div>
          <div className="font-editorial text-lg text-dark-text font-bold">
            Village Pickup &amp; Safe Payment in Bank
          </div>
          <p className="font-sans text-xs text-mandi-charcoal-muted">
            Village pickup goes straight to buyer dock. Weighbridge signoff triggers safe payment to farmer bank within 2 hours.
          </p>
        </div>
      </div>

    </div>
  );
};
