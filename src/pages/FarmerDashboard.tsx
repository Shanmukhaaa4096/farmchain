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
    <div className="py-6 sm:py-10 bg-warm-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Simple Welcome & Quick Profile */}
        <div className="bg-farm-green text-paper-white border-brutal-thick p-5 sm:p-6 shadow-brutal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 font-mono text-xs text-harvest-yellow font-bold">
              <span>KISAN ID: {currentFarmer.kisanId}</span>
              <span>•</span>
              <span>{currentFarmer.village}, {currentFarmer.district}</span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight">
              NAMASTE, {currentFarmer.name.split(' ')[0].toUpperCase()}
            </h1>
            <p className="font-body text-xs sm:text-sm text-warm-cream mt-0.5">
              Direct Farmer Hub • Zero broker fee • 100% direct bank payout
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onOpenSellModal ? (
              <Button
                variant="yellow"
                size="md"
                onClick={onOpenSellModal}
                className="font-heading font-black text-xs sm:text-sm px-4 shadow-brutal-sm"
              >
                + LIST PRODUCE
              </Button>
            ) : (
              <Button
                variant="yellow"
                size="md"
                onClick={() => onNavigate('marketplace')}
                className="font-heading font-black text-xs sm:text-sm px-4 shadow-brutal-sm"
              >
                + LIST PRODUCE
              </Button>
            )}
          </div>
        </div>

        {/* 4 ESSENTIAL METRIC CARDS (Large numbers, short labels) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          
          {/* Card 1: Today's Orders */}
          <Card 
            variant="white" 
            interactive
            onClick={() => onNavigate('orders')}
            className="p-4 border-brutal"
          >
            <span className="text-[10px] sm:text-xs text-gray-600 font-bold block uppercase">
              TODAY'S ORDERS
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-ink-black mt-1">
              03
            </div>
            <div className="text-[10px] text-farm-green font-bold mt-1">
              ✓ On schedule for pickup
            </div>
          </Card>

          {/* Card 2: Pending Actions */}
          <Card 
            variant="yellow" 
            interactive
            onClick={() => onNavigate('marketplace')}
            className="p-4 border-brutal"
          >
            <span className="text-[10px] sm:text-xs text-ink-black font-bold block uppercase">
              PENDING ACTIONS
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-ink-black mt-1">
              02
            </div>
            <div className="text-[10px] text-ink-black font-bold mt-1">
              Buyer requests to pledge
            </div>
          </Card>

          {/* Card 3: Earnings */}
          <Card 
            variant="white" 
            className="p-4 border-brutal"
          >
            <span className="text-[10px] sm:text-xs text-gray-600 font-bold block uppercase">
              TOTAL EARNINGS
            </span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-farm-green mt-1">
              ₹1,48,200
            </div>
            <div className="text-[10px] text-gray-500 font-bold mt-1">
              Direct to bank account
            </div>
          </Card>

          {/* Card 4: Current Listings */}
          <Card 
            variant="white" 
            className="p-4 border-brutal"
          >
            <span className="text-[10px] sm:text-xs text-gray-600 font-bold block uppercase">
              MY LISTINGS
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-ink-black mt-1">
              03
            </div>
            <div className="text-[10px] text-gray-600 font-bold mt-1">
              1,950 KG available
            </div>
          </Card>

        </div>

        {/* SECTION 1: TODAY'S ACTIVE PICKUPS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-ink-black">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-farm-green" />
              <h2 className="font-heading font-black text-lg sm:text-xl uppercase text-ink-black">
                TODAY'S PICKUPS
              </h2>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="font-mono text-xs font-bold text-farm-green hover:underline"
            >
              VIEW ALL ORDERS →
            </button>
          </div>

          <Card variant="white" className="p-4 sm:p-5 border-brutal space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-lg uppercase text-ink-black">
                    TOMATOES (GRADE A)
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-citrus-yellow border border-ink-black">
                    800 KG
                  </span>
                </div>
                <p className="font-mono text-xs text-gray-600 mt-0.5">
                  Buyer: <strong>UrbanFork Kitchens</strong> • Agreed Rate: <strong>₹24/KG</strong> (₹19,200)
                </p>
                <div className="flex items-center gap-2 font-mono text-xs text-gray-700 mt-1">
                  <Clock className="w-3.5 h-3.5 text-farm-green" />
                  <span>Pickup: <strong>Today, 07:15 AM</strong> at Village Hub</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <span className="px-2.5 py-1 bg-green-100 text-green-900 border border-green-900 font-mono font-bold text-xs uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> READY FOR PICKUP
                </span>
                <button
                  onClick={() => onNavigate('logistics')}
                  className="font-mono text-[11px] font-bold text-farm-green hover:underline"
                >
                  TRACK VEHICLE →
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* SECTION 2: NEARBY BUYER REQUESTS (ACTION NEEDED) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-ink-black">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-farm-green" />
              <h2 className="font-heading font-black text-lg sm:text-xl uppercase text-ink-black">
                MATCHED BUYER REQUESTS
              </h2>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className="font-mono text-xs font-bold text-farm-green hover:underline"
            >
              BROWSE ALL ({demands.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {demands.slice(0, 2).map((demand) => (
              <Card
                key={demand.id}
                variant="white"
                className="p-4 sm:p-5 border-brutal hover:border-farm-green transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-base sm:text-lg uppercase text-ink-black">
                        {demand.crop}
                      </span>
                      <span className="font-mono text-xs font-bold text-gray-500">
                        • {demand.quantityKg.toLocaleString()} KG NEEDED
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-green-100 text-green-800 border border-green-800">
                        {demand.qualityGrade}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-gray-600 mt-1">
                      Buyer: <strong>{demand.buyerName}</strong> • Offer: <strong className="text-farm-green">₹{demand.targetPricePerKg}/KG</strong> • Delivery: {demand.requiredDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="yellow"
                      size="sm"
                      onClick={() => onPledgeDemand(demand)}
                      className="text-xs font-heading font-black px-4"
                    >
                      PLEDGE CROP →
                    </Button>
                    <button
                      onClick={() => onSelectDemand(demand)}
                      className="font-mono text-xs text-gray-600 hover:underline px-2 py-1"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* SECTION 3: MY CURRENT LISTINGS (HARVEST CALENDAR) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-ink-black">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-farm-green" />
              <h2 className="font-heading font-black text-lg sm:text-xl uppercase text-ink-black">
                MY REGISTERED CROPS
              </h2>
            </div>
            
            {onOpenSellModal ? (
              <button
                onClick={onOpenSellModal}
                className="font-mono text-xs font-bold text-farm-green hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD CROP</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('marketplace')}
                className="font-mono text-xs font-bold text-farm-green hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD CROP</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {cropsInventory.map((item, idx) => (
              <Card key={idx} variant="white" className="p-4 border-brutal space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <strong className="font-heading font-black text-base uppercase text-ink-black">
                    {item.crop}
                  </strong>
                  <span className="font-bold text-farm-green">₹{item.expectedPrice}/KG</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  {item.variety} • {item.acreage} Acres
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                  <span className="text-gray-500">Available:</span>
                  <strong className="text-ink-black">{item.estimatedKg} KG</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Pledged:</span>
                  <strong className="text-farm-green">{item.pledgedKg} KG</strong>
                </div>
                <div className="text-[10px] text-gray-500 pt-1">
                  Ready: <strong>{item.readyDate}</strong>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* PROGRESSIVE DISCLOSURE: AI DEMAND FORECAST & FPO POOLING DETAILS */}
        <div className="pt-4 border-t-2 border-ink-black text-center">
          <button
            onClick={() => setShowMarketDetails(!showMarketDetails)}
            className="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase px-4 py-2.5 bg-paper-white border-2 border-ink-black shadow-brutal-sm hover:bg-citrus-yellow transition-colors"
          >
            <span>{showMarketDetails ? 'HIDE 7-DAY FORECAST & FPO DETAILS ▲' : 'VIEW 7-DAY AI DEMAND FORECAST & FPO POOLING DETAILS ▼'}</span>
          </button>
        </div>

        {showMarketDetails && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-200">
            
            {/* AI 7-Day Forecast */}
            <Card variant="white" shadow="default" className="p-5 border-brutal space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-farm-green" />
                  <strong className="font-heading font-black text-sm uppercase text-ink-black">
                    7-DAY REGIONAL DEMAND FORECAST (TELANGANA CORRIDOR)
                  </strong>
                </div>
                <Badge variant="yellow" size="sm">88% CONFIDENCE</Badge>
              </div>

              <p className="text-gray-700">
                Tomatoes: Expected regional demand is <strong>3,100 KG</strong> (+29% surge). Wholesale prices expected to hold firm at ₹22 - ₹26/KG over the next 7 days.
              </p>

              <div className="pt-2">
                <Button
                  variant="white"
                  size="sm"
                  onClick={() => onNavigate('forecast')}
                  className="font-mono text-xs font-bold"
                >
                  OPEN DETAILED INTERACTIVE PREDICTION ENGINE →
                </Button>
              </div>
            </Card>

            {/* FPO Group Aggregation Details */}
            <Card variant="cream" shadow="default" className="p-5 border-brutal space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-farm-green" />
                <strong className="font-heading font-black text-sm uppercase text-ink-black">
                  CHEVELLA FPO GROUP POOLING STATUS
                </strong>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You and 2 other farmers in Shankarpally and Moinabad are pooling 2,400 KG tomatoes for UrbanFork Kitchens. Coordinated Reefer Truck pickup confirmed for 25 Sep, 07:15 AM.
              </p>
              <div className="pt-1">
                <Button 
                  variant="white" 
                  size="sm" 
                  onClick={() => onNavigate('logistics')}
                  className="text-xs"
                >
                  <Truck className="w-3.5 h-3.5 mr-1" /> TRACK COLLECTION VEHICLE ROUTE
                </Button>
              </div>
            </Card>

          </div>
        )}

      </div>
    </div>
  );
};
