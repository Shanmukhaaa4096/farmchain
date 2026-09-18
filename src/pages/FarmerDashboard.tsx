import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  AlertCircle, 
  Plus, 
  Truck,
  Layers,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  Phone
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DemandRequirement, Farmer, UserRole } from '../types';
import { MOCK_FARMERS } from '../data/mockData';

interface FarmerDashboardProps {
  demands: DemandRequirement[];
  onSelectDemand: (demand: DemandRequirement) => void;
  onPledgeDemand: (demand: DemandRequirement) => void;
  onNavigate: (view: string) => void;
  onOpenSellModal?: () => void;
  requireAuth?: (role: UserRole, action: () => void, promptMessage: string) => void;
  isAuthenticated?: boolean;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  demands,
  onSelectDemand,
  onPledgeDemand,
  onNavigate,
  onOpenSellModal,
  requireAuth,
  isAuthenticated = false,
}) => {
  const currentFarmer = MOCK_FARMERS[0]; // Ramesh Reddy

  // Local inventory state
  const [cropsInventory, setCropsInventory] = useState([
    { crop: 'Tomatoes', variety: 'US-440 Hybrid', acreage: 2.5, readyDate: '24-28 Sep', estimatedKg: 1400, pledgedKg: 800, expectedPrice: 24 },
    { crop: 'Green Chilli', variety: 'G4 Hot Slender', acreage: 1.2, readyDate: '02-05 Oct', estimatedKg: 650, pledgedKg: 200, expectedPrice: 48 },
    { crop: 'Bell Peppers', variety: 'Indra Yellow/Red', acreage: 0.8, readyDate: '10-15 Oct', estimatedKg: 500, pledgedKg: 0, expectedPrice: 58 },
  ]);

  const [showMarketDetails, setShowMarketDetails] = useState(false);

  return (
    <div className="py-8 sm:py-12 bg-paper-bg min-h-screen text-dark-text">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Editorial Farmer Hub Header Card */}
        <div className="rounded-3xl border border-dark-text/15 bg-farm-green text-paper-bg p-6 sm:p-8 shadow-soft-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-paper-bg/15 text-paper-bg border border-paper-bg/20 font-bold uppercase tracking-wider">
                  KISAN ID: {currentFarmer.kisanId}
                </span>
                <span className="text-paper-bg/60">•</span>
                <span className="text-paper-bg/90 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-harvest-yellow" />
                  {currentFarmer.village}, {currentFarmer.district}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-paper-bg">
                Namaste, {currentFarmer.name.split(' ')[0]}
              </h1>
              <p className="text-xs sm:text-sm text-paper-bg/80 max-w-xl">
                Direct Farmer Ledger • Zero broker deductions • Direct bank escrow settlement within 2 hours of dock signoff.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
              <Button
                variant="clay"
                size="md"
                onClick={onOpenSellModal || (() => onNavigate('marketplace'))}
                className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                List Produce
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Essential Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Today's Orders */}
          <div 
            onClick={() => onNavigate('orders')}
            className="cursor-pointer rounded-2xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm hover:border-farm-green/40 hover:shadow-soft-md transition-all group"
          >
            <span className="text-[11px] font-mono text-dark-text/50 uppercase tracking-wider block">
              Today's Orders
            </span>
            <div className="font-serif text-3xl font-bold text-dark-text mt-1.5 group-hover:text-farm-green transition-colors">
              03
            </div>
            <div className="text-xs text-farm-green font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> On schedule for pickup
            </div>
          </div>

          {/* Card 2: Pending Actions */}
          <div 
            onClick={() => onNavigate('marketplace')}
            className="cursor-pointer rounded-2xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm hover:border-farm-green/40 hover:shadow-soft-md transition-all group"
          >
            <span className="text-[11px] font-mono text-dark-text/50 uppercase tracking-wider block">
              Matching Requests
            </span>
            <div className="font-serif text-3xl font-bold text-terracotta mt-1.5">
              02
            </div>
            <div className="text-xs text-dark-text/60 mt-1">
              Ready to pledge harvest
            </div>
          </div>

          {/* Card 3: Total Earnings */}
          <div className="rounded-2xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm">
            <span className="text-[11px] font-mono text-dark-text/50 uppercase tracking-wider block">
              Total Earnings
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-farm-green mt-1.5">
              ₹1,48,200
            </div>
            <div className="text-xs text-dark-text/60 mt-1">
              Direct bank payouts
            </div>
          </div>

          {/* Card 4: Active Lots */}
          <div className="rounded-2xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm">
            <span className="text-[11px] font-mono text-dark-text/50 uppercase tracking-wider block">
              Active Lots
            </span>
            <div className="font-serif text-3xl font-bold text-dark-text mt-1.5">
              03
            </div>
            <div className="text-xs text-dark-text/60 mt-1">
              1,950 KG available
            </div>
          </div>

        </div>

        {/* SECTION 1: TODAY'S ACTIVE PICKUPS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-text/10">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-farm-green" />
              <h2 className="font-serif text-xl font-bold text-dark-text">
                Today's Scheduled Pickups
              </h2>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-semibold text-farm-green hover:underline flex items-center gap-1"
            >
              View All Orders →
            </button>
          </div>

          <div className="rounded-2xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-serif font-bold text-lg text-dark-text">
                    Tomatoes (Grade A)
                  </span>
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-paper-bg text-dark-text border border-dark-text/10">
                    800 KG
                  </span>
                </div>
                <p className="text-xs text-dark-text/70 mt-1">
                  Buyer: <strong className="text-dark-text">UrbanFork Kitchens</strong> • Rate: <strong className="text-farm-green">₹24/KG</strong> (₹19,200)
                </p>
                <div className="flex items-center gap-2 font-mono text-xs text-dark-text/60 mt-1.5">
                  <Clock className="w-3.5 h-3.5 text-farm-green" />
                  <span>Pickup: <strong className="text-dark-text">Today, 07:15 AM</strong> at Village Hub</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-2.5">
                <span className="px-3 py-1 bg-farm-green/10 text-farm-green border border-farm-green/20 rounded-full font-mono font-semibold text-xs uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Reefer Dispatched
                </span>
                <button
                  onClick={() => onNavigate('logistics')}
                  className="text-xs font-semibold text-farm-green hover:underline"
                >
                  Track Vehicle →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: MATCHED BUYER REQUESTS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-text/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-farm-green" />
              <h2 className="font-serif text-xl font-bold text-dark-text">
                Matched Buyer Requests
              </h2>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className="text-xs font-semibold text-farm-green hover:underline flex items-center gap-1"
            >
              Browse All ({demands.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {demands.slice(0, 2).map((demand) => (
              <div
                key={demand.id}
                className="rounded-2xl border border-dark-text/10 bg-pure-white p-5 hover:border-farm-green/30 transition-all shadow-soft-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-lg text-dark-text">
                        {demand.crop}
                      </span>
                      <span className="font-mono text-xs text-dark-text/60">
                        • {demand.quantityKg.toLocaleString()} KG NEEDED
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-farm-green/10 text-farm-green border border-farm-green/20">
                        {demand.qualityGrade}
                      </span>
                    </div>

                    <p className="text-xs text-dark-text/70 mt-1">
                      Buyer: <strong className="text-dark-text">{demand.buyerName}</strong> • Offer: <strong className="text-farm-green">₹{demand.targetPricePerKg}/KG</strong> • Delivery: {demand.requiredDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="clay"
                      size="sm"
                      onClick={() => onPledgeDemand(demand)}
                      className="text-xs px-4 shadow-soft-terracotta"
                    >
                      PLEDGE CROP →
                    </Button>
                    <button
                      onClick={() => onSelectDemand(demand)}
                      className="text-xs text-dark-text/60 hover:text-dark-text hover:underline px-2.5 py-1"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: MY REGISTERED CROPS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-text/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-farm-green" />
              <h2 className="font-serif text-xl font-bold text-dark-text">
                My Registered Crops
              </h2>
            </div>
            
            <button
              onClick={onOpenSellModal || (() => onNavigate('marketplace'))}
              className="text-xs font-semibold text-farm-green hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD CROP</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cropsInventory.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-dark-text/10 bg-pure-white p-4 shadow-soft-sm space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="font-serif font-bold text-base text-dark-text">
                    {item.crop}
                  </strong>
                  <span className="font-bold text-farm-green">₹{item.expectedPrice}/KG</span>
                </div>
                <p className="text-xs text-dark-text/60">
                  {item.variety} • {item.acreage} Acres
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-dark-text/10 text-xs font-mono">
                  <span className="text-dark-text/60">Available:</span>
                  <strong className="text-dark-text">{item.estimatedKg} KG</strong>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-dark-text/60">Pledged:</span>
                  <strong className="text-farm-green">{item.pledgedKg} KG</strong>
                </div>
                <div className="text-[11px] text-dark-text/50 pt-1 font-mono">
                  Harvest Ready: <strong className="text-dark-text">{item.readyDate}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROGRESSIVE DISCLOSURE: AI DEMAND FORECAST & FPO POOLING DETAILS */}
        <div className="pt-4 border-t border-dark-text/10 text-center">
          <button
            onClick={() => setShowMarketDetails(!showMarketDetails)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full border border-dark-text/15 bg-pure-white hover:bg-paper-bg shadow-soft-sm text-dark-text transition-colors"
          >
            <span>{showMarketDetails ? 'Hide 7-Day Forecast & FPO Details ▲' : 'View 7-Day Forward Demand Forecast & FPO Details ▼'}</span>
          </button>
        </div>

        {showMarketDetails && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            
            {/* Forward Demand Forecast */}
            <div className="rounded-2xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-dark-text/10">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-farm-green" />
                  <strong className="font-serif text-sm font-bold text-dark-text">
                    7-Day Regional Forward Demand (Telangana Corridor)
                  </strong>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-harvest-yellow/20 text-dark-text font-mono text-[10px] font-bold">
                  88% CONFIDENCE
                </span>
              </div>

              <p className="text-xs text-dark-text/70 leading-relaxed">
                Tomatoes: Expected regional demand is <strong className="text-dark-text">3,100 KG</strong> (+29% surge). Wholesale prices expected to hold firm at ₹22 - ₹26/KG over the next 7 days.
              </p>

              <div className="pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('forecast')}
                  className="text-xs font-semibold"
                >
                  Open Detailed Forecast Engine →
                </Button>
              </div>
            </div>

            {/* FPO Group Aggregation Details */}
            <div className="rounded-2xl border border-dark-text/10 bg-pure-white p-5 shadow-soft-sm space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-farm-green" />
                <strong className="font-serif text-sm font-bold text-dark-text">
                  Chevella FPO Group Pooling Status
                </strong>
              </div>
              <p className="text-xs text-dark-text/70 leading-relaxed">
                You and 2 other farmers in Shankarpally and Moinabad are pooling 2,400 KG tomatoes for UrbanFork Kitchens. Coordinated Reefer Truck pickup confirmed for 25 Sep, 07:15 AM.
              </p>
              <div className="pt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onNavigate('logistics')}
                  className="text-xs font-semibold"
                >
                  <Truck className="w-3.5 h-3.5 mr-1" /> Track Collection Route
                </Button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
