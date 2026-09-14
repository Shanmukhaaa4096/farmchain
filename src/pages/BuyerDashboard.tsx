import React from 'react';
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
  ShieldCheck
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DemandRequirement, UserRole } from '../types';
import { MOCK_MATCHES_FOR_TOMATO } from '../data/mockData';

interface BuyerDashboardProps {
  demands: DemandRequirement[];
  onOpenPostDemand: () => void;
  onSelectDemand: (demand: DemandRequirement) => void;
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
  const buyerDemands = demands.filter(d => d.buyerId.startsWith('BUY'));

  return (
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Buyer Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-brutal">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-gray-700 font-bold">
              <Badge variant="dark" size="sm">ENTERPRISE BUYER DESK</Badge>
              <Badge variant="green" size="sm">GSTIN & FSSAI VERIFIED</Badge>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-black">
              SOURCE DIRECT.
            </h1>
            <p className="font-body text-base text-gray-700 mt-2 font-medium max-w-2xl">
              Contract directly with smallholder farmer clusters. We coordinate group aggregation and single-bill cold-chain logistics right to your receiving dock.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="yellow"
              size="lg"
              onClick={onOpenPostDemand}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>POST NEW REQUIREMENT →</span>
            </Button>
          </div>
        </div>

        {/* Section 15 Matched Supply Breakdown Highlight */}
        <Card variant="white" shadow="lg" className="p-6 md:p-8 border-brutal-thick space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-ink-black">
            <div>
              <span className="font-mono text-xs font-bold text-farm-green uppercase tracking-wider block">
                PO: DEM-2026-081 // FULFILLMENT BREAKDOWN
              </span>
              <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-ink-black">
                MATCHED CLUSTER SUPPLY: 2,400 KG TOMATOES
              </h2>
            </div>
            <Badge variant="green" size="md" dot>
              ✓ REQUIREMENT 100% FULFILLED
            </Badge>
          </div>

          {/* Prompt requirement: Farm A, Farm B, Farm C Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-warm-cream border-2 border-ink-black space-y-1">
              <div className="flex justify-between font-bold">
                <span>FARM A (CHEVALLA)</span>
                <span className="text-farm-green">800 KG</span>
              </div>
              <p className="text-[11px] text-gray-600">Ramesh Reddy • US-440 Hybrid • Grade A</p>
              <div className="text-[10px] text-gray-500 pt-1">Pickup ETA: 07:15 AM (Loaded ✓)</div>
            </div>

            <div className="p-4 bg-warm-cream border-2 border-ink-black space-y-1">
              <div className="flex justify-between font-bold">
                <span>FARM B (SHANKARPALLY)</span>
                <span className="text-farm-green">600 KG</span>
              </div>
              <p className="text-[11px] text-gray-600">Kavitha Patel • Greenhouse Round • Grade A</p>
              <div className="text-[10px] text-gray-500 pt-1">Pickup ETA: 07:55 AM (Loaded ✓)</div>
            </div>

            <div className="p-4 bg-warm-cream border-2 border-ink-black space-y-1">
              <div className="flex justify-between font-bold">
                <span>FARM C (MOINABAD)</span>
                <span className="text-farm-green">1,000 KG</span>
              </div>
              <p className="text-[11px] text-gray-600">Babu Rao Mandava • Polyhouse Grade A</p>
              <div className="text-[10px] text-gray-500 pt-1">Pickup ETA: 08:30 AM (Loaded ✓)</div>
            </div>
          </div>

          {/* Total Sum Bar */}
          <div className="p-4 bg-farm-green text-paper-white border-brutal flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-300 block text-[10px]">TOTAL CONSOLIDATED</span>
                <strong className="font-heading font-black text-xl text-harvest-yellow">2,400 KG</strong>
              </div>
              <div>
                <span className="text-gray-300 block text-[10px]">DIRECT PO VALUE</span>
                <strong className="font-heading font-black text-xl text-paper-white">₹57,600</strong>
              </div>
              <div>
                <span className="text-gray-300 block text-[10px]">CO-OP LOGISTICS</span>
                <strong className="font-heading font-black text-xl text-paper-white">₹3.00 / KG</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="yellow" 
                size="sm" 
                onClick={() => onNavigate('logistics')}
                className="text-xs"
              >
                <Truck className="w-3.5 h-3.5 mr-1" /> TRACK TRUCK TELEMETRY →
              </Button>
            </div>
          </div>
        </Card>

        {/* Active Requirements List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-ink-black">
              YOUR ACTIVE SOURCING REQUIREMENTS
            </h3>
            <span className="font-mono text-xs text-gray-600">
              {buyerDemands.length} ACTIVE DIRECT ORDERS
            </span>
          </div>

          <div className="space-y-4">
            {buyerDemands.map((demand) => {
              const percent = Math.min(100, Math.round((demand.matchedQuantityKg / demand.quantityKg) * 100));
              const isFulfilled = percent >= 100;

              return (
                <Card 
                  key={demand.id} 
                  variant="white" 
                  shadow="sm" 
                  className="p-6 border-brutal hover:border-farm-green transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="font-bold text-gray-500">{demand.id}</span>
                        <span>•</span>
                        <Badge variant={isFulfilled ? "green" : "yellow"} size="sm">
                          {isFulfilled ? "FULFILLED" : `${percent}% MATCHED`}
                        </Badge>
                        <span>•</span>
                        <span className="font-bold text-farm-green">{demand.qualityGrade}</span>
                      </div>

                      <h4 className="font-heading font-black text-2xl uppercase text-ink-black">
                        {demand.crop} : {demand.quantityKg.toLocaleString()} KG
                      </h4>
                      <p className="font-mono text-xs text-gray-600">
                        Delivery Dock: <strong>{demand.deliveryLocation}</strong> • By: <strong>{demand.requiredDate}</strong>
                      </p>

                      {/* Progress */}
                      <div className="pt-2 max-w-md font-mono text-xs">
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-gray-600">FARMER POOLING:</span>
                          <span className="font-bold text-ink-black">
                            {demand.matchedQuantityKg.toLocaleString()} / {demand.quantityKg.toLocaleString()} KG
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 border border-ink-black overflow-hidden">
                          <div 
                            className={`h-full transition-all ${isFulfilled ? 'bg-farm-green' : 'bg-harvest-yellow'}`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2 shrink-0">
                      <Button
                        variant="yellow"
                        size="sm"
                        onClick={() => onSelectDemand(demand)}
                        className="text-xs"
                      >
                        VIEW MATCHED FARMERS ({demand.matchedFarmersCount}) →
                      </Button>
                      <Button
                        variant="white"
                        size="sm"
                        onClick={() => onSelectDemand(demand)}
                        className="text-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1" /> DIRECT CHAT
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
