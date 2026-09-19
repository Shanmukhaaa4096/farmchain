import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Layers, 
  FileText, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Search,
  Scale,
  DollarSign
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DemandRequirement, UserRole } from '../types';
import { MakeOfferModal } from '../components/modals/MakeOfferModal';
import { VoiceSearchButton } from '../components/ui/VoiceSearchButton';
import { MOCK_MATCHES_FOR_TOMATO } from '../data/mockData';

interface BuyerDashboardProps {
  demands: DemandRequirement[];
  onOpenPostDemand: () => void;
  onSelectDemand: (demand: DemandRequirement, initialTab?: 'specs' | 'farmers' | 'negotiate') => void;
  onNavigate: (view: string) => void;
  requireAuth?: (role: UserRole, action: () => void, promptMessage: string) => void;
  isAuthenticated?: boolean;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  demands,
  onOpenPostDemand,
  onSelectDemand,
  onNavigate,
  requireAuth,
  isAuthenticated = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<'ALL' | 'Grade A' | 'Grade B' | 'Export Quality'>('ALL');
  const [isMakeOfferOpen, setIsMakeOfferOpen] = useState(false);
  const [activeOfferTarget, setActiveOfferTarget] = useState<{
    crop: string;
    farmer: string;
    rate: number;
    qty: number;
  }>({
    crop: 'Tomatoes (Grade A)',
    farmer: 'Ramesh Reddy (Chevella FPO)',
    rate: 24,
    qty: 1500,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const buyerDemands = demands.filter(d => {
    const matchesSearch = d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'ALL' || d.qualityGrade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleOfferSubmitted = (data: {
    crop: string;
    offeredRate: number;
    quantityKg: number;
    deliveryDate: string;
    notes: string;
  }) => {
    setToastMessage(`Offer of ₹${data.offeredRate}/KG for ${data.quantityKg} KG ${data.crop} dispatched directly to farmer ledger!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="py-10 sm:py-14 bg-paper-bg min-h-screen text-dark-text">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Buyer Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-text/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-dark-text/60">
              <span className="px-2.5 py-0.5 rounded-full bg-farm-green text-paper-bg text-[10px] font-mono uppercase tracking-wider font-semibold">
                Enterprise Procurement Desk
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-pure-white text-dark-text border border-dark-text/15 text-[10px] font-mono uppercase font-semibold">
                GSTIN &amp; FSSAI Verified
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark-text">
              Source Direct from Farmer Clusters
            </h1>
            <p className="text-xs sm:text-base text-dark-text/75 mt-2 max-w-2xl leading-relaxed">
              Contract directly with smallholder producer clusters before harvest. We coordinate transparent group aggregation, cold-chain logistics, and single-invoice delivery right to your dock.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsMakeOfferOpen(true)}
              className="text-xs tracking-wider uppercase font-semibold"
            >
              Make Direct Offer
            </Button>
            <Button
              variant="clay"
              size="lg"
              onClick={onOpenPostDemand}
              className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Post Sourcing Demand</span>
            </Button>
          </div>
        </div>

        {/* Action Toast */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Matched Supply Breakdown Highlight */}
        <div className="rounded-3xl border border-dark-text/15 bg-pure-white p-6 md:p-8 shadow-soft-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-dark-text/10">
            <div>
              <span className="font-mono text-xs font-semibold text-farm-green uppercase tracking-wider block">
                PO: DEM-2026-081 // FULFILLMENT BREAKDOWN
              </span>
              <h2 className="font-serif font-bold text-2xl text-dark-text mt-1">
                Matched Cluster Supply: 2,400 KG Tomatoes
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-farm-green/10 text-farm-green border border-farm-green/20 font-mono text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Requirement 100% Fulfilled
            </span>
          </div>

          {/* Cluster Farm Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-paper-bg/60 border border-dark-text/10 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-dark-text">FARM A (CHEVALLA)</span>
                <span className="text-farm-green font-bold">800 KG</span>
              </div>
              <p className="text-[11px] text-dark-text/60 font-sans">Ramesh Reddy • US-440 Hybrid • Grade A</p>
              <div className="text-[10px] text-dark-text/50 pt-1">Pickup ETA: 07:15 AM (Loaded ✓)</div>
            </div>

            <div className="p-4 rounded-2xl bg-paper-bg/60 border border-dark-text/10 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-dark-text">FARM B (SHANKARPALLY)</span>
                <span className="text-farm-green font-bold">600 KG</span>
              </div>
              <p className="text-[11px] text-dark-text/60 font-sans">Kavitha Patel • Greenhouse Round • Grade A</p>
              <div className="text-[10px] text-dark-text/50 pt-1">Pickup ETA: 07:55 AM (Loaded ✓)</div>
            </div>

            <div className="p-4 rounded-2xl bg-paper-bg/60 border border-dark-text/10 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-dark-text">FARM C (MOINABAD)</span>
                <span className="text-farm-green font-bold">1,000 KG</span>
              </div>
              <p className="text-[11px] text-dark-text/60 font-sans">Babu Rao Mandava • Polyhouse Grade A</p>
              <div className="text-[10px] text-dark-text/50 pt-1">Pickup ETA: 08:30 AM (Loaded ✓)</div>
            </div>
          </div>

          {/* Total Sum Bar */}
          <div className="p-5 rounded-2xl bg-farm-green text-paper-bg flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-soft-sm">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-paper-bg/60 block text-[10px] uppercase">Total Consolidated</span>
                <strong className="font-serif text-xl font-bold text-paper-bg">2,400 KG</strong>
              </div>
              <div>
                <span className="text-paper-bg/60 block text-[10px] uppercase">Direct PO Value</span>
                <strong className="font-serif text-xl font-bold text-paper-bg">₹57,600</strong>
              </div>
              <div>
                <span className="text-paper-bg/60 block text-[10px] uppercase">Co-op Logistics</span>
                <strong className="font-serif text-xl font-bold text-paper-bg">₹3.00 / KG</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="clay" 
                size="sm" 
                onClick={() => onNavigate('logistics')}
                className="text-xs tracking-wider uppercase font-semibold shadow-soft-terracotta"
              >
                <Truck className="w-3.5 h-3.5 mr-1.5" /> Track Reefer Telemetry →
              </Button>
            </div>
          </div>
        </div>

        {/* Sourcing Search & Filter Strip */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex items-center w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by crop or delivery dock..."
                className="w-full pl-11 pr-14 py-2.5 rounded-2xl bg-pure-white border border-dark-text/15 text-dark-text text-sm focus:outline-none focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 shadow-soft-sm"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <VoiceSearchButton onResult={(text) => setSearchQuery(text)} />
              </div>
            </div>

            {/* Quality Grade Filter */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto font-mono text-xs">
              {(['ALL', 'Grade A', 'Grade B', 'Export Quality'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1.5 rounded-full uppercase font-bold transition-all whitespace-nowrap ${
                    selectedGrade === grade
                      ? 'bg-farm-green text-paper-bg shadow-soft-sm'
                      : 'bg-pure-white border border-dark-text/15 text-dark-text/70 hover:bg-paper-bg'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Requirements List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-text/10">
            <h3 className="font-serif font-bold text-xl tracking-tight text-dark-text">
              Active Sourcing Requirements ({buyerDemands.length})
            </h3>
            <span className="font-mono text-xs text-dark-text/50 uppercase">
              Automated 100% Bank Escrow
            </span>
          </div>

          <div className="space-y-4">
            {buyerDemands.map((demand) => {
              const percent = Math.min(100, Math.round((demand.matchedQuantityKg / demand.quantityKg) * 100));
              const isFulfilled = percent >= 100;

              return (
                <div 
                  key={demand.id} 
                  className="rounded-2xl border border-dark-text/10 bg-pure-white p-6 hover:border-farm-green/30 transition-all shadow-soft-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-bold text-dark-text/60">{demand.id}</span>
                        <span>•</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isFulfilled ? 'bg-farm-green/10 text-farm-green border border-farm-green/20' : 'bg-harvest-yellow/20 text-dark-text'
                        }`}>
                          {isFulfilled ? 'FULFILLED' : `${percent}% MATCHED`}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-farm-green">{demand.qualityGrade}</span>
                      </div>

                      <h4 className="font-serif font-bold text-2xl text-dark-text">
                        {demand.crop} : {demand.quantityKg.toLocaleString()} KG
                      </h4>
                      <p className="text-xs text-dark-text/70">
                        Delivery Dock: <strong className="text-dark-text">{demand.deliveryLocation}</strong> • By: <strong className="text-dark-text">{demand.requiredDate}</strong>
                      </p>

                      {/* Progress Bar */}
                      <div className="pt-2 max-w-md font-mono text-xs">
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-dark-text/50">FARMER POOLING:</span>
                          <span className="font-bold text-dark-text">
                            {demand.matchedQuantityKg.toLocaleString()} / {demand.quantityKg.toLocaleString()} KG
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-dark-text/10 overflow-hidden">
                          <div 
                            className={`h-full transition-all ${isFulfilled ? 'bg-farm-green' : 'bg-terracotta'}`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2 shrink-0">
                      <Button
                        variant="clay"
                        size="sm"
                        onClick={() => onSelectDemand(demand, 'farmers')}
                        className="text-xs px-4 shadow-soft-terracotta"
                      >
                        View Matched Farmers ({demand.matchedFarmersCount}) →
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const openChat = () => onSelectDemand(demand, 'negotiate');
                          if (!isAuthenticated && requireAuth) {
                            requireAuth(
                              'buyer',
                              openChat,
                              `Buyer authentication required to enter price negotiation and direct chat for ${demand.crop} (${demand.id}).`
                            );
                          } else {
                            openChat();
                          }
                        }}
                        className="text-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1" /> Direct Chat
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal for Direct Offers */}
        <MakeOfferModal
          isOpen={isMakeOfferOpen}
          onClose={() => setIsMakeOfferOpen(false)}
          cropName={activeOfferTarget.crop}
          farmerName={activeOfferTarget.farmer}
          listedPricePerKg={activeOfferTarget.rate}
          availableKg={activeOfferTarget.qty}
          onSubmitOffer={handleOfferSubmitted}
        />

      </div>
    </div>
  );
};
