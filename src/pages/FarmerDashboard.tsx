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
  Phone,
  ShieldCheck,
  Award,
  Scale
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { DemandRequirement, UserRole } from '../types';
import { MOCK_FARMERS } from '../data/mockData';
import { EmptyState } from '../components/ui/EmptyState';

interface FarmerDashboardProps {
  demands: DemandRequirement[];
  onSelectDemand: (demand: DemandRequirement) => void;
  onPledgeDemand: (demand: DemandRequirement) => void;
  onNavigate: (view: string, params?: { id?: string }) => void;
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

  // 1. Seeded 6 crops in inventory as required by PART A #5
  const [cropsInventory, setCropsInventory] = useState([
    { id: 'c-1', crop: 'Tomatoes', variety: 'US-440 Hybrid', acreage: 2.5, readyDate: 'Tomorrow Morning', estimatedKg: 220, pledgedKg: 150, pricePerKg: 32, status: 'Ready' },
    { id: 'c-2', crop: 'Green Chilli', variety: 'G4 Hot Slender', acreage: 1.2, readyDate: 'Ready for Pickup', estimatedKg: 90, pledgedKg: 80, pricePerKg: 64, status: 'Ready' },
    { id: 'c-3', crop: 'Round Brinjal', variety: 'Bhagyamati Purple', acreage: 1.0, readyDate: 'In 2 Days', estimatedKg: 140, pledgedKg: 0, pricePerKg: 34, status: 'Ready' },
    { id: 'c-4', crop: 'Teja Red Chilli', variety: 'Sun-Dried Hot', acreage: 1.5, readyDate: 'Stored Dry', estimatedKg: 600, pledgedKg: 300, pricePerKg: 185, status: 'Stored' },
    { id: 'c-5', crop: 'Kufri Jyoti Potato', variety: 'Table Grade Oval', acreage: 1.8, readyDate: 'In 3 Days', estimatedKg: 400, pledgedKg: 0, pricePerKg: 22, status: 'Harvesting' },
    { id: 'c-6', crop: 'Tender Okra (Bhindi)', variety: 'Radhika Tender', acreage: 0.8, readyDate: 'Tomorrow 6 AM', estimatedKg: 110, pledgedKg: 0, pricePerKg: 38, status: 'Ready' },
  ]);

  // 2. Seeded 4 incoming wholesale buyer requests as required by PART A #5
  const [incomingOffers, setIncomingOffers] = useState([
    {
      id: 'OFF-2026-101',
      buyer: 'UrbanFork Kitchens',
      buyerType: 'Restaurant Chain (18 Outlets)',
      crop: 'Tomatoes (US-440 Hybrid)',
      quantityKg: 200,
      offeredRate: 32,
      pickupDate: 'Tomorrow 07:30 AM',
      status: 'pending',
      total: 6400,
      note: 'Need Grade A firm harvest for restaurant kitchens. Scheduled collection at Village Gate #1.'
    },
    {
      id: 'OFF-2026-102',
      buyer: 'SpiceCraft Natural Foods',
      buyerType: 'Food Processing Corp',
      crop: 'Green Chilli (G4 Hot)',
      quantityKg: 60,
      offeredRate: 65,
      pickupDate: '30 Sep 2026',
      status: 'pending',
      total: 3900,
      note: 'Direct dock delivery, 100% Safe Payment locked in advance.'
    },
    {
      id: 'OFF-2026-103',
      buyer: 'FreshPlate Retail Supermarket',
      buyerType: 'Retail Supermarket Chain',
      crop: 'Round Brinjal (Bhagyamati)',
      quantityKg: 100,
      offeredRate: 34,
      pickupDate: '02 Oct 2026',
      status: 'pending',
      total: 3400,
      note: 'Firm shiny skin required. Digital gate weighing agreed.'
    },
    {
      id: 'OFF-2026-104',
      buyer: 'Malwa Agro Traders',
      buyerType: 'Wholesale Buyer',
      crop: 'Teja Dry Red Chilli',
      quantityKg: 300,
      offeredRate: 185,
      pickupDate: '05 Oct 2026',
      status: 'pending',
      total: 55500,
      note: 'Moisture checked lot with calibrated moisture meter at village shed.'
    }
  ]);

  // 3. Seeded 3 orders in different statuses as required by PART A #5
  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'ORD-2026-881',
      crop: 'Tomatoes (Grade A)',
      quantityKg: 150,
      ratePerKg: 32,
      totalAmount: 4800,
      buyerName: 'UrbanFork Kitchens',
      status: 'Pickup scheduled',
      timing: 'Tomorrow, 07:30 AM',
      vehiclePlate: 'TS-08-NP-2026',
      driverName: 'Mohan Lal (+91 99887 76655)',
      location: 'Village Hub Gate #1, Chevella'
    },
    {
      id: 'ORD-2026-882',
      crop: 'Green Chilli (G4 Slender)',
      quantityKg: 80,
      ratePerKg: 64,
      totalAmount: 5120,
      buyerName: 'SpiceCraft Natural Foods',
      status: 'Delivered & Inspected',
      timing: 'Delivered Today 11:00 AM',
      vehiclePlate: 'TS-07-UA-4190',
      driverName: 'Ramu K. (+91 98480 11223)',
      location: 'Buyer Cold Dock, Hyderabad'
    },
    {
      id: 'ORD-2026-883',
      crop: 'Sharbati Gold Wheat',
      quantityKg: 500,
      ratePerKg: 31,
      totalAmount: 15500,
      buyerName: 'Deccan Agro Millers',
      status: 'Paid',
      timing: 'Yesterday, 04:30 PM',
      vehiclePlate: 'MP-09-KA-8812',
      driverName: 'Sanjay S. (+91 97551 22334)',
      location: 'Money in Bank (SBI A/c ••••4091)'
    }
  ]);

  const [counterOfferId, setCounterOfferId] = useState<string | null>(null);
  const [counterRate, setCounterRate] = useState<number>(34);

  const handleAcceptOffer = (offerId: string) => {
    setIncomingOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'accepted' } : o));
  };

  const handleRejectOffer = (offerId: string) => {
    setIncomingOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'rejected' } : o));
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Editorial Farmer Hub Header Card */}
        <div className="rounded-[32px] border border-[#2F4A3A]/15 bg-[#163323] text-[#FBF8F2] p-6 sm:p-8 shadow-soft-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-[#FBF8F2]/15 text-[#FBF8F2] border border-[#FBF8F2]/20 font-bold uppercase tracking-wider">
                  KISAN ID: {currentFarmer.kisanId}
                </span>
                <VerifiedBadge type="farmer" size="sm" />
                <span className="text-[#FBF8F2]/60">•</span>
                <span className="text-[#FBF8F2]/90 flex items-center gap-1 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#E5B94A]" />
                  {currentFarmer.village}, {currentFarmer.district}
                </span>
              </div>
              <h1 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-[#FBF8F2]">
                Namaste, {currentFarmer.name.split(' ')[0]}
              </h1>
              <p className="text-xs sm:text-sm text-[#FBF8F2]/80 max-w-xl font-sans">
                Direct Farmer Ledger • 0% broker fee • Money in your bank account within 2 hours of gate weighing.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
              <Button
                variant="primary"
                size="md"
                onClick={onOpenSellModal || (() => onNavigate('market'))}
                className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[44px]"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Sell Your Crop</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Essential Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('orders')}
            className="cursor-pointer rounded-2xl border border-[#2F4A3A]/10 bg-[#FBF8F2] p-5 shadow-soft hover:border-[#2F4A3A]/40 transition-all group"
          >
            <span className="text-[11px] font-mono text-[#536458] uppercase tracking-wider block">
              Active Orders
            </span>
            <div className="font-editorial text-3xl font-bold text-[#163323] mt-1.5 group-hover:text-[#C77B58] transition-colors">
              {recentOrders.length}
            </div>
            <div className="text-xs text-[#2F4A3A] font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All on schedule
            </div>
          </div>

          <div className="rounded-2xl border border-[#2F4A3A]/10 bg-[#FBF8F2] p-5 shadow-soft">
            <span className="text-[11px] font-mono text-[#536458] uppercase tracking-wider block">
              Incoming Buyer Bids
            </span>
            <div className="font-editorial text-3xl font-bold text-[#C77B58] mt-1.5">
              {incomingOffers.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-xs text-[#536458] mt-1">
              Awaiting your confirmation
            </div>
          </div>

          <div className="rounded-2xl border border-[#2F4A3A]/10 bg-[#FBF8F2] p-5 shadow-soft">
            <span className="text-[11px] font-mono text-[#536458] uppercase tracking-wider block">
              Money in Your Bank
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#2F4A3A] mt-1.5">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
                recentOrders.filter(o => o.status === 'Paid').reduce((sum, o) => sum + o.totalAmount, 0)
              )}
            </div>
            <div className="text-xs text-[#536458] mt-1">
              0% broker deduction
            </div>
          </div>

          <div className="rounded-2xl border border-[#2F4A3A]/10 bg-[#FBF8F2] p-5 shadow-soft">
            <span className="text-[11px] font-mono text-[#536458] uppercase tracking-wider block">
              Crops Listed
            </span>
            <div className="font-editorial text-3xl font-bold text-[#163323] mt-1.5">
              {cropsInventory.length} Lots
            </div>
            <div className="text-xs text-[#536458] mt-1">
              {cropsInventory.reduce((sum, c) => sum + (c.estimatedKg - c.pledgedKg), 0).toLocaleString('en-IN')} KG available
            </div>
          </div>
        </div>

        {/* SECTION 1: INCOMING BUYER OFFERS (Direct Bulk Bids) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2F4A3A]/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C77B58] animate-pulse" />
              <h2 className="font-editorial text-2xl font-bold text-[#163323]">
                Incoming Bulk Buyer Offers ({incomingOffers.filter(o => o.status === 'pending').length})
              </h2>
            </div>
            <span className="font-mono text-xs text-[#536458]">Direct Bids With Safe Payment</span>
          </div>

          <div className="space-y-3">
            {incomingOffers.map((offer) => {
              const isAccepted = offer.status === 'accepted';
              const isRejected = offer.status === 'rejected';

              return (
                <div
                  key={offer.id}
                  className={`rounded-2xl border p-5 transition-all shadow-soft ${
                    isAccepted
                      ? 'bg-emerald-50/80 border-emerald-300'
                      : isRejected
                      ? 'bg-gray-100 border-gray-200 opacity-60'
                      : 'bg-[#FBF8F2] border-[#2F4A3A]/15 hover:border-[#2F4A3A]/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="font-editorial font-bold text-xl text-[#163323]">
                          {offer.crop}
                        </strong>
                        <span className="font-mono text-xs text-[#536458]">
                          • {offer.quantityKg} KG
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          isAccepted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isRejected
                            ? 'bg-red-100 text-red-800'
                            : 'bg-[#E5B94A]/25 text-[#163323]'
                        }`}>
                          {offer.status}
                        </span>
                      </div>

                      <p className="text-xs text-[#536458] font-sans">
                        Offered by: <strong className="text-[#163323]">{offer.buyer}</strong> ({offer.buyerType}) •
                        Offered Rate: <strong className="text-[#2F4A3A] font-bold text-sm">₹{offer.offeredRate}/KG</strong> (Total: ₹{offer.total.toLocaleString()})
                      </p>

                      <p className="text-xs text-[#536458] italic font-sans pt-0.5">
                        "{offer.note}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {offer.status === 'pending' && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAcceptOffer(offer.id)}
                            className="text-xs font-semibold uppercase min-h-[38px] px-4"
                          >
                            Accept Offer
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectOffer(offer.id)}
                            className="text-xs font-semibold uppercase min-h-[38px] px-3"
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      {isAccepted && (
                        <span className="font-mono text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Locked into Harvest Schedule
                        </span>
                      )}
                      {isRejected && (
                        <span className="font-mono text-xs text-gray-500">Declined</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: CROPS CURRENTLY FOR SALE (6 seeded crops with Empty State support) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2F4A3A]/10">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-[#2F4A3A]" />
              <h2 className="font-editorial text-2xl font-bold text-[#163323]">
                Your Crops for Sale ({cropsInventory.length})
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSellModal}
              className="text-xs uppercase font-semibold"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Crop
            </Button>
          </div>

          {cropsInventory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cropsInventory.map((crop) => (
                <div key={crop.id} className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#2F4A3A]/15 shadow-soft space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#C77B58] font-bold block">
                        {crop.variety}
                      </span>
                      <strong className="font-editorial text-xl font-bold text-[#163323] block">
                        {crop.crop}
                      </strong>
                    </div>
                    <span className="px-2 py-0.5 bg-[#2F4A3A]/10 text-[#2F4A3A] rounded-full text-[10px] font-mono font-bold uppercase">
                      {crop.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs font-sans text-[#536458]">
                    <div className="flex justify-between">
                      <span>Available Lot:</span>
                      <strong className="text-[#163323] font-mono">{crop.estimatedKg} KG</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Rate:</span>
                      <strong className="text-[#2F4A3A] font-mono">₹{crop.pricePerKg}/kg</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Harvest Ready:</span>
                      <span className="text-[#163323]">{crop.readyDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 bg-[#FBF8F2] rounded-[32px] border border-[#2F4A3A]/15 text-center space-y-4">
              <Sprout className="w-12 h-12 text-[#536458]/40 mx-auto" />
              <h3 className="font-editorial text-2xl font-bold text-[#163323]">No crops added yet</h3>
              <p className="text-xs text-[#536458] max-w-sm mx-auto font-sans">
                Tell us what you are growing this season to receive direct offers from verified bulk buyers before harvest day.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={onOpenSellModal}
                className="text-xs uppercase font-semibold"
              >
                Add Your First Crop
              </Button>
            </div>
          )}
        </div>

        {/* SECTION 3: RECENT ORDERS & 5-STAGE STATUS TRACKER */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2F4A3A]/10">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#2F4A3A]" />
              <h2 className="font-editorial text-2xl font-bold text-[#163323]">
                Your Active Orders ({recentOrders.length})
              </h2>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-semibold text-[#C77B58] hover:underline cursor-pointer"
            >
              View All Orders →
            </button>
          </div>

          <div className="space-y-3">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#2F4A3A]/15 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 font-sans text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="font-editorial text-lg text-[#163323]">{ord.crop}</strong>
                    <span className="font-mono text-xs font-bold text-[#536458]">• {ord.quantityKg} KG</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#2F4A3A] text-[#FBF8F2] uppercase">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-[#536458]">
                    Buyer: <strong className="text-[#163323]">{ord.buyerName}</strong> • Rate: <strong className="text-[#2F4A3A]">₹{ord.ratePerKg}/KG</strong> (Total: ₹{ord.totalAmount.toLocaleString()})
                  </p>
                  <p className="text-[#536458] flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#C77B58]" />
                    <span>{ord.timing} • {ord.location}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-xs text-[#536458] block">Vehicle: {ord.vehiclePlate}</span>
                  <span className="text-xs text-[#2F4A3A] font-medium block">{ord.driverName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: INTEGRATED BEST TIME TO SELL WIDGET (Requirement 3) */}
        <div className="bg-[#FBF8F2] p-6 sm:p-8 rounded-[32px] border border-[#2F4A3A]/15 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#C77B58] tracking-wider block">
                HARVEST TIMING ADVICE
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#163323]">
                Best Time to Sell: 7-Day Market Trend
              </h2>
            </div>
            <button
              onClick={() => onNavigate('prices')}
              className="text-xs font-semibold text-[#C77B58] hover:underline font-mono"
            >
              Open Full Price Forecast →
            </button>
          </div>

          <p className="text-xs text-[#536458] font-sans leading-relaxed">
            Market prices for <strong>Tomatoes</strong> are expected to rise by +14% by Friday due to weekend restaurant demand. Recommendation: Pick 150 kg on Thursday evening for Friday morning milk-run.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center font-sans text-xs">
            <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#2F4A3A]/10">
              <span className="text-[#536458] text-[10px] block">Today (Wed)</span>
              <strong className="text-sm text-[#163323]">₹32 / kg</strong>
            </div>
            <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#2F4A3A]/10">
              <span className="text-[#536458] text-[10px] block">Tomorrow (Thu)</span>
              <strong className="text-sm text-[#163323]">₹33 / kg</strong>
            </div>
            <div className="p-3 bg-[#A8B89A]/25 rounded-xl border border-[#A8B89A]/50">
              <span className="text-[#2F4A3A] font-bold text-[10px] block">Friday (Peak Demand)</span>
              <strong className="text-sm text-[#2F4A3A] font-bold">₹36 / kg ★</strong>
            </div>
            <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#2F4A3A]/10">
              <span className="text-[#536458] text-[10px] block">Saturday</span>
              <strong className="text-sm text-[#163323]">₹34 / kg</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
