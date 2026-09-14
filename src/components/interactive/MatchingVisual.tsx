import React, { useState } from 'react';
import { Layers, CheckCircle, MapPin, Zap, ArrowRight, Truck, Check, Sprout, Package } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { WashiTape, RubberStamp, SketchAnnotation } from '../ui/SketchAccents';

export const MatchingVisual: React.FC = () => {
  const [activeFarmers, setActiveFarmers] = useState<{ [key: string]: boolean }>({
    'farm-a': true,
    'farm-b': true,
    'farm-c': true,
  });

  const farms = [
    { 
      id: 'farm-a', 
      name: 'FARM A : Ramesh Reddy', 
      village: 'Chevella (28 KM)', 
      qty: 800, 
      qcStatus: 'QC Grade A',
      soil: 'Red Loamy Soil • 4.5 Acres',
      crates: 32
    },
    { 
      id: 'farm-b', 
      name: 'FARM B : Kavitha Patel', 
      village: 'Shankarpally (34 KM)', 
      qty: 600, 
      qcStatus: 'QC Grade A',
      soil: 'Black Clay Loam • 3.2 Acres',
      crates: 24
    },
    { 
      id: 'farm-c', 
      name: 'FARM C : Babu Rao Mandava', 
      village: 'Moinabad (22 KM)', 
      qty: 1000, 
      qcStatus: 'QC Grade A',
      soil: 'Polyhouse Greenhouse • 6.0 Acres',
      crates: 40
    },
  ];

  const toggleFarm = (id: string) => {
    setActiveFarmers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const targetQty = 2400;
  const currentTotal = farms
    .filter(f => activeFarmers[f.id])
    .reduce((sum, f) => sum + f.qty, 0);

  const matchedPercent = Math.min(100, Math.round((currentTotal / targetQty) * 100));
  const isFulfilled = currentTotal >= targetQty;
  const farmerCount = Object.values(activeFarmers).filter(Boolean).length;
  const totalCrates = Math.round(currentTotal / 25);

  return (
    <section className="py-16 bg-warm-cream bg-furrow-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="dark" size="sm" className="mb-3">
            SECTION 03 // GROUP AGGREGATION ENGINE
          </Badge>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-ink-black">
            SMALL FARMS. ONE BIG ORDER.
          </h2>
          <p className="font-body text-base text-gray-700 mt-3 font-medium">
            Single smallholders rarely produce enough volume to satisfy commercial enterprise contracts. FarmChain automatically aggregates nearby harvests into a unified order with coordinated pickup.
          </p>
        </div>

        {/* Interactive Interactive Matching Canvas */}
        <Card variant="white" shadow="lg" className="p-6 md:p-10 border-brutal-thick overflow-hidden relative">
          
          {/* Top Status Readout */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-ink-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-harvest-yellow border-2 border-ink-black flex items-center justify-center font-black">
                <Layers className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg md:text-xl uppercase">
                  ACTIVE AGGREGATION CLUSTER: HYD-TOMATO-81
                </h3>
                <p className="font-mono text-xs text-gray-600">
                  ALGORITHMIC CONSOLIDATION LOOP // 12.4 KM RADIUS // {totalCrates} CRATES
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="p-2 bg-warm-cream border border-ink-black">
                PLEDGED: <strong className="text-farm-green">{currentTotal.toLocaleString()} / {targetQty.toLocaleString()} KG</strong>
              </span>
              <Badge variant={isFulfilled ? "green" : "yellow"} size="md" dot>
                {isFulfilled ? "REQUIREMENT FULFILLED (100%)" : `${matchedPercent}% MATCHED`}
              </Badge>
            </div>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Left: Buyer Demand Box (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-blue-crate text-paper-white border-brutal p-6 shadow-brutal relative">
                <WashiTape color="blue" className="-top-3 left-6 z-10" />
                {isFulfilled && (
                  <RubberStamp text="100% MATCHED" variant="green" className="absolute top-4 right-4 z-10" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-citrus-yellow px-2 py-0.5 bg-ink-black border border-citrus-yellow">
                    ENTERPRISE DEMAND
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-lettuce-green animate-pulse"></span>
                </div>

                <h4 className="font-heading font-black text-2xl uppercase tracking-tight text-paper-white">
                  URBANFORK KITCHENS
                </h4>
                <p className="font-mono text-xs text-warm-cream opacity-80 mt-1">
                  HYDERABAD (GACHIBOWLI CENTRAL HUB)
                </p>

                <div className="mt-6 pt-4 border-t border-blue-800 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-300">REQUIRED CROP:</span>
                    <strong className="text-citrus-yellow">TOMATOES (GRADE A)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">ORDER VOLUME:</span>
                    <strong className="text-paper-white text-base">2,400 KG</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">DELIVERY WINDOW:</span>
                    <span className="text-paper-white">25 SEP, 09:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">TARGET RATE:</span>
                    <span className="text-paper-white font-bold">₹24.00 / KG</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span>AGGREGATION PROGRESS:</span>
                    <span className="font-bold text-citrus-yellow">{matchedPercent}%</span>
                  </div>
                  <div className="h-4 bg-ink-black border border-paper-white overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isFulfilled ? 'bg-lettuce-green' : 'bg-citrus-yellow'}`}
                      style={{ width: `${matchedPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Aggregation Hub & Transit SVG (4 cols) with Animated Produce Crates */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
              <div className="w-full relative flex flex-col items-center">
                
                {/* Visual SVG connecting lines */}
                <div className="w-full h-48 flex items-center justify-center relative">
                  <svg className="w-full h-full" viewBox="0 0 300 160">
                    {/* Cable 1 to Farm A */}
                    <path
                      d="M 30 80 C 100 80, 150 35, 270 35"
                      fill="none"
                      stroke="#111111"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 30 80 C 100 80, 150 35, 270 35"
                      fill="none"
                      stroke="#173B2B"
                      strokeWidth="2.5"
                      className={activeFarmers['farm-a'] ? 'animate-route-flow' : 'opacity-20'}
                    />

                    {/* Cable 2 to Farm B */}
                    <path
                      d="M 30 80 C 120 80, 180 80, 270 80"
                      fill="none"
                      stroke="#111111"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 30 80 C 120 80, 180 80, 270 80"
                      fill="none"
                      stroke="#173B2B"
                      strokeWidth="2.5"
                      className={activeFarmers['farm-b'] ? 'animate-route-flow' : 'opacity-20'}
                    />

                    {/* Cable 3 to Farm C */}
                    <path
                      d="M 30 80 C 100 80, 150 125, 270 125"
                      fill="none"
                      stroke="#111111"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 30 80 C 100 80, 150 125, 270 125"
                      fill="none"
                      stroke="#173B2B"
                      strokeWidth="2.5"
                      className={activeFarmers['farm-c'] ? 'animate-route-flow' : 'opacity-20'}
                    />

                    {/* Central Consolidation Truck Node */}
                    <circle cx="150" cy="80" r="18" fill="#E6A300" stroke="#111111" strokeWidth="3.5" />
                  </svg>

                  {/* Hub Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Truck className="w-6 h-6 text-ink-black" />
                  </div>

                  {/* Crates Traveling Micro-Badge */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-crate text-citrus-yellow text-[9px] font-mono font-bold px-2 py-0.5 border border-ink-black shadow-brutal-sm">
                    CRATES IN TRANSIT
                  </div>
                </div>

                <div className="text-center font-mono text-xs bg-warm-cream border-2 border-ink-black px-4 py-2 shadow-brutal-sm">
                  <span className="font-bold text-blue-crate">SHARED SMART PICKUP LOOP</span>
                  <div className="text-[10px] text-gray-700">1 Reefer Truck • 3 Smallholder Farms • 12.4 KM Circuit</div>
                </div>

              </div>
            </div>

            {/* Right: Small Farms Individual Pledges (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-mono font-bold text-gray-600 flex justify-between items-center mb-1">
                <span>DIGITAL CO-OP PLEDGES:</span>
                <span className="text-ink-black font-bold">CLICK TO SIMULATE</span>
              </div>

              {farms.map((farm) => {
                const isActive = activeFarmers[farm.id];
                return (
                  <div
                    key={farm.id}
                    onClick={() => toggleFarm(farm.id)}
                    className={`p-3.5 border-brutal transition-all cursor-pointer select-none ${
                      isActive 
                        ? 'bg-paper-white shadow-brutal hover:translate-x-0.5' 
                        : 'bg-gray-100 opacity-60 border-dashed hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 border border-ink-black flex items-center justify-center text-xs font-mono font-bold ${
                          isActive ? 'bg-farm-green text-harvest-yellow' : 'bg-gray-300 text-gray-500'
                        }`}>
                          {isActive ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '✕'}
                        </div>
                        <div>
                          <h5 className="font-heading font-black text-sm uppercase leading-tight">
                            {farm.name}
                          </h5>
                          <span className="font-mono text-[10px] text-soil-brown font-bold block">
                            {farm.soil}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500">
                            {farm.village}
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <span className="text-base font-bold text-ink-black block">
                          {farm.qty} KG
                        </span>
                        <div className="text-[10px] text-farm-green font-bold">
                          {farm.crates} Crates • {farm.qcStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Bottom Live Metrics Banner */}
          <div className="mt-6 pt-6 border-t-2 border-ink-black bg-warm-cream p-4 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center">
            <div className="border-r border-ink-black pr-2">
              <span className="text-[11px] text-gray-600 block">TOTAL COMBINED</span>
              <strong className="text-lg font-black font-heading text-ink-black">
                <AnimatedCounter value={currentTotal} suffix=" KG" />
              </strong>
            </div>
            <div className="border-r border-ink-black pr-2">
              <span className="text-[11px] text-gray-600 block">FARMERS MATCHED</span>
              <strong className="text-lg font-black font-heading text-farm-green">{farmerCount} FARMERS</strong>
            </div>
            <div className="border-r border-ink-black pr-2">
              <span className="text-[11px] text-gray-600 block">TRANSIT DISTANCE</span>
              <strong className="text-lg font-black font-heading text-ink-black">12.4 KM TOTAL</strong>
            </div>
            <div>
              <span className="text-[11px] text-gray-600 block">COLLECTION STATUS</span>
              <strong className="text-sm font-bold text-farm-green uppercase">
                {isFulfilled ? "✓ ROUTE DISPATCHABLE" : `AWAITING +${targetQty - currentTotal} KG`}
              </strong>
            </div>
          </div>

        </Card>

      </div>
    </section>
  );
};
