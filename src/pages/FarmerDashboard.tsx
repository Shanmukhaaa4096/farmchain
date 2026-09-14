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
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DemandRequirement, Farmer } from '../types';
import { MOCK_FARMERS } from '../data/mockData';

interface FarmerDashboardProps {
  demands: DemandRequirement[];
  onSelectDemand: (demand: DemandRequirement) => void;
  onPledgeDemand: (demand: DemandRequirement) => void;
  onNavigate: (view: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  demands,
  onSelectDemand,
  onPledgeDemand,
  onNavigate,
}) => {
  const currentFarmer = MOCK_FARMERS[0]; // Ramesh Reddy (Sri Lakshmi Farm)

  // Local inventory state
  const [cropsInventory, setCropsInventory] = useState([
    { crop: 'Tomatoes', variety: 'US-440 Hybrid', acreage: 2.5, readyDate: '24-28 Sep', estimatedKg: 1400, pledgedKg: 800 },
    { crop: 'Green Chilli', variety: 'G4 Hot Slender', acreage: 1.2, readyDate: '02-05 Oct', estimatedKg: 650, pledgedKg: 200 },
    { crop: 'Bell Peppers', variety: 'Indra Yellow/Red', acreage: 0.8, readyDate: '10-15 Oct', estimatedKg: 500, pledgedKg: 0 },
  ]);

  const [showAddProduce, setShowAddProduce] = useState(false);
  const [newCropName, setNewCropName] = useState('Tomatoes');
  const [newQty, setNewQty] = useState('500');

  const handleAddProduce = (e: React.FormEvent) => {
    e.preventDefault();
    setCropsInventory(prev => [
      ...prev,
      {
        crop: newCropName,
        variety: 'Local Verified Certified',
        acreage: 1.0,
        readyDate: 'Within 7 Days',
        estimatedKg: Number(newQty) || 500,
        pledgedKg: 0,
      }
    ]);
    setShowAddProduce(false);
  };

  return (
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Farmer Welcome Header */}
        <div className="bg-farm-green text-paper-white border-brutal-thick p-6 md:p-8 shadow-brutal-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-harvest-yellow font-bold">
                <Badge variant="yellow" size="sm">KISAN ID: {currentFarmer.kisanId}</Badge>
                <span>•</span>
                <span>{currentFarmer.village}, {currentFarmer.district}</span>
              </div>
              <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight">
                GOOD MORNING, FARMER.
              </h1>
              <p className="font-heading font-bold text-base md:text-lg text-harvest-yellow mt-1 uppercase tracking-wider">
                YOUR MARKET. YOUR DATA. YOUR CHOICE.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="yellow"
                size="sm"
                onClick={() => onNavigate('marketplace')}
                className="text-xs"
              >
                BROWSE ALL REGIONAL DEMAND →
              </Button>
            </div>
          </div>
        </div>

        {/* Section 14 Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <Card variant="white" shadow="default" className="p-6 border-brutal">
            <span className="text-xs text-gray-600 uppercase font-bold block">
              ACTIVE COMMITTED ORDERS
            </span>
            <div className="font-heading font-black text-5xl text-ink-black mt-2">
              03
            </div>
            <div className="text-xs text-farm-green font-bold mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> 100% On-schedule for pickup
            </div>
          </Card>

          <Card variant="white" shadow="default" className="p-6 border-brutal">
            <span className="text-xs text-gray-600 uppercase font-bold block">
              NEARBY VERIFIED DEMAND
            </span>
            <div className="font-heading font-black text-5xl text-farm-green mt-2">
              12
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Within 35km radius of Chevella
            </div>
          </Card>

          <Card variant="yellow" shadow="default" className="p-6 border-brutal">
            <span className="text-xs text-ink-black uppercase font-bold block">
              7-DAY DEMAND FORECAST
            </span>
            <div className="font-heading font-black text-5xl text-ink-black mt-2">
              ↑18%
            </div>
            <div className="text-xs text-ink-black font-bold mt-2">
              Regional wholesale velocity surge
            </div>
          </Card>
        </div>

        {/* Main Content: Nearby Demands vs AI Forecast Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Nearby Demand Matches (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-ink-black">
                  NEARBY DEMAND REQUIREMENTS
                </h2>
                <p className="font-mono text-xs text-gray-600">
                  MATCHING YOUR CROP PROFILE (TOMATOES, CHILLI, PEPPERS)
                </p>
              </div>
              <Badge variant="green" size="sm" dot>LIVE SIGNALS</Badge>
            </div>

            {/* List of Nearby Requirements */}
            <div className="space-y-4">
              {demands.slice(0, 3).map((demand) => (
                <Card 
                  key={demand.id} 
                  variant="white" 
                  shadow="sm" 
                  className="p-5 border-brutal hover:border-farm-green transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500 mb-1">
                        <span className="font-bold text-farm-green">{demand.id}</span>
                        <span>•</span>
                        <span>{demand.qualityGrade}</span>
                        <span>•</span>
                        <span className="text-rust-red font-bold">4.2 KM AWAY</span>
                      </div>

                      <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                        {demand.crop} : {demand.quantityKg.toLocaleString()} KG
                      </h3>
                      <p className="font-mono text-xs text-gray-600 mt-0.5">
                        Buyer: <strong>{demand.buyerName}</strong> ({demand.buyerType})
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
                        <span className="text-farm-green font-bold">Target Offer: ₹{demand.targetPricePerKg}/KG</span>
                        <span className="text-gray-400">|</span>
                        <span>Delivery: {demand.requiredDate}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                      <Button
                        variant="yellow"
                        size="sm"
                        onClick={() => onPledgeDemand(demand)}
                        className="text-xs px-4"
                      >
                        RESPOND / PLEDGE →
                      </Button>
                      <button
                        onClick={() => onSelectDemand(demand)}
                        className="font-mono text-[11px] text-gray-600 hover:underline uppercase"
                      >
                        VIEW FULL SPECS
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* FPO Group Aggregation Status Banner */}
            <Card variant="cream" shadow="sm" className="p-5 border-brutal space-y-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-farm-green stroke-[2.5]" />
                <h4 className="font-heading font-black text-base uppercase text-ink-black">
                  CHEVELLA FPO AGGREGATION STATUS
                </h4>
              </div>
              <p className="font-mono text-xs text-gray-700 leading-relaxed">
                You and 2 other farmers in Shankarpally and Moinabad are pooling 2,400 KG tomatoes for UrbanFork Kitchens. Coordinated Reefer Truck pickup is confirmed for 25 Sep, 07:15 AM.
              </p>
              <div className="pt-2">
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

          {/* Right Column: AI Demand Forecast & Inventory (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* AI Demand Forecast Card (Section 14 Prompt Requirement) */}
            <Card variant="white" shadow="default" className="p-6 border-brutal space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-farm-green" />
                  <h3 className="font-heading font-black text-lg uppercase text-ink-black">
                    AI DEMAND FORECAST
                  </h3>
                </div>
                <Badge variant="yellow" size="sm">7-DAY SIGNAL</Badge>
              </div>

              <div>
                <span className="font-mono text-xs text-gray-600 uppercase block font-bold">
                  TOMATO DEMAND NEXT 7 DAYS
                </span>
                
                {/* Ascii-like progress bar requested in prompt */}
                <div className="mt-2 font-mono text-xs bg-ink-black text-harvest-yellow p-2.5 border-2 border-ink-black">
                  ██████████████████░
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-center">
                  <div className="p-3 bg-warm-cream border border-ink-black">
                    <span className="text-[10px] text-gray-600 block">EXPECTED REGIONAL DEMAND</span>
                    <strong className="font-heading font-black text-2xl text-ink-black">3,100 KG</strong>
                    <span className="text-xs font-bold text-farm-green block mt-0.5">+29% SURGE</span>
                  </div>

                  <div className="p-3 bg-warm-cream border border-ink-black">
                    <span className="text-[10px] text-gray-600 block">MODEL CONFIDENCE</span>
                    <strong className="font-heading font-black text-2xl text-ink-black">82%</strong>
                    <span className="text-[10px] text-gray-500 block mt-0.5">High Certainty</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3 bg-yellow-50 border border-harvest-yellow text-[11px] font-mono text-gray-800">
                <strong>DISCLAIMER:</strong> Forecasts are recommendations, not guaranteed prices or demand. Negotiate directly with buyers.
              </div>

              <Button
                variant="white"
                fullWidth
                size="sm"
                onClick={() => onNavigate('forecast')}
                className="text-xs font-mono"
              >
                OPEN DETAILED AI PREDICTION ENGINE →
              </Button>
            </Card>

            {/* My Produce & Inventory Logger */}
            <Card variant="white" shadow="default" className="p-6 border-brutal space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
                <div>
                  <h3 className="font-heading font-black text-lg uppercase text-ink-black">
                    MY HARVEST CALENDAR
                  </h3>
                  <span className="font-mono text-xs text-gray-600">REGISTERED CROPS & CAPACITY</span>
                </div>
                <Button
                  variant="yellow"
                  size="sm"
                  onClick={() => setShowAddProduce(!showAddProduce)}
                  className="text-xs p-1.5"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Add Produce Form */}
              {showAddProduce && (
                <form onSubmit={handleAddProduce} className="p-3 bg-warm-cream border-2 border-ink-black space-y-3 font-mono text-xs">
                  <div className="font-bold uppercase">LOG NEW READY HARVEST</div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newCropName}
                      onChange={(e) => setNewCropName(e.target.value)}
                      className="p-1.5 bg-white border border-ink-black font-bold"
                    >
                      <option value="Tomatoes">Tomatoes</option>
                      <option value="Onions">Onions</option>
                      <option value="Potatoes">Potatoes</option>
                      <option value="Green Chilli">Green Chilli</option>
                    </select>
                    <input
                      type="number"
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      placeholder="Qty in KG"
                      className="p-1.5 bg-white border border-ink-black"
                      required
                    />
                  </div>
                  <Button variant="primary" size="sm" type="submit" fullWidth>
                    SAVE PRODUCE ENTRY ✓
                  </Button>
                </form>
              )}

              {/* Produce List */}
              <div className="space-y-2.5 font-mono text-xs">
                {cropsInventory.map((item, idx) => (
                  <div key={idx} className="p-3 bg-warm-cream/50 border border-ink-black flex items-center justify-between">
                    <div>
                      <strong className="font-heading font-bold text-sm uppercase text-ink-black block">
                        {item.crop}
                      </strong>
                      <span className="text-[11px] text-gray-600">
                        {item.variety} • Harvest: {item.readyDate}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-ink-black">{item.estimatedKg} KG</span>
                      <div className="text-[10px] text-farm-green font-bold">
                        {item.pledgedKg} KG Pledged
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </Card>

          </div>

        </div>

      </div>
    </div>
  );
};
