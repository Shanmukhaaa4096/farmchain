import React, { useState } from 'react';
import { ArrowDown, AlertTriangle, CheckCircle2, TrendingDown, TrendingUp, Users, Building, Truck, Store } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const SupplyChainComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'farmchain'>('farmchain');

  return (
    <section className="py-16 bg-warm-cream border-y-brutal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-ink-black text-paper-white">
              SECTION 02 // STRUCTURAL INEFFICIENCY
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-ink-black">
            WHERE DOES THE MONEY GO?
          </h2>
          <p className="font-body text-base md:text-lg text-gray-800 max-w-3xl mt-3 font-medium">
            In the traditional system, produce passes through five distinct brokers before reaching commercial kitchens or store shelves. Each middleman takes a margin while adding zero shelf-life.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('traditional')}
            className={`btn-brutal px-5 py-2.5 text-xs md:text-sm font-heading ${
              activeTab === 'traditional' ? 'bg-rust-red text-paper-white' : 'bg-paper-white text-ink-black'
            }`}
          >
            TRADITIONAL BROKER CHAIN (5 LAYERS)
          </button>
          <button
            onClick={() => setActiveTab('farmchain')}
            className={`btn-brutal px-5 py-2.5 text-xs md:text-sm font-heading ${
              activeTab === 'farmchain' ? 'bg-farm-green text-paper-white' : 'bg-paper-white text-ink-black'
            }`}
          >
            FARMCHAIN DEMAND-MATCHED FLOW (DIRECT)
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Flow Column (7 cols) */}
          <div className="lg:col-span-7">
            {activeTab === 'traditional' ? (
              <Card variant="white" shadow="lg" className="p-6 md:p-8 space-y-4 border-rust-red/50">
                <div className="flex items-center justify-between pb-4 border-b-2 border-ink-black">
                  <div>
                    <h3 className="font-heading font-black text-xl text-rust-red uppercase">
                      TRADITIONAL BROKER CHAIN
                    </h3>
                    <p className="font-mono text-xs text-gray-600">FRUIT & VEGETABLE LOSS: ~38%</p>
                  </div>
                  <Badge variant="red" size="sm">HIGH LOSS RATE</Badge>
                </div>

                {/* Step Flow */}
                <div className="space-y-3 pt-2">
                  {[
                    { title: 'FARMER', role: 'Takes price offered by village commission agent', cut: 'Farmer receives: ₹17.50/KG (Distress auction rate)', icon: Users },
                    { title: 'LOCAL TRADER / AGENT', role: 'Charges 6-10% brokerage + uncalibrated weighing deduction', cut: '+ ₹2.50 commission markup', icon: Building },
                    { title: 'MANDI WHOLESALER', role: 'Unregulated APMC auction markup + loading cuts', cut: '+ ₹3.50 speculative margin', icon: Store },
                    { title: 'CITY DISTRIBUTOR', role: 'Secondary cold-storage transit loss & re-packing markups', cut: '+ ₹4.50 distribution overhead', icon: Truck },
                    { title: 'COMMERCIAL BUYER', role: 'Pays inflated rate for 3-day-old degraded produce', cut: 'Buyer pays: ₹28.00/KG', icon: Store },
                  ].map((step, idx, arr) => (
                    <div key={step.title} className="relative">
                      <div className="flex items-center justify-between p-3.5 bg-warm-cream/60 border-2 border-ink-black">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-ink-black text-paper-white flex items-center justify-center font-mono font-bold text-xs">
                            0{idx + 1}
                          </div>
                          <div>
                            <span className="font-heading font-black text-sm uppercase">{step.title}</span>
                            <p className="font-body text-xs text-gray-700">{step.role}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-xs text-rust-red shrink-0 ml-2">
                          {step.cut}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="flex justify-center py-1 text-ink-black">
                          <ArrowDown className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-red-50 border-2 border-rust-red text-ink-black text-xs font-mono">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rust-red shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">SYSTEMIC FAILURE:</strong>
                      <p className="mt-1">More layers → less transparency → lower farmer bargaining power → higher buyer prices + 36-48 hour freshness decay.</p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card variant="white" shadow="lg" className="p-6 md:p-8 space-y-4 border-farm-green">
                <div className="flex items-center justify-between pb-4 border-b-2 border-ink-black">
                  <div>
                    <h3 className="font-heading font-black text-xl text-farm-green uppercase">
                      FARMCHAIN DEMAND-FIRST FLOW
                    </h3>
                    <p className="font-mono text-xs text-gray-600">ZERO BROKERS // MACHINE OPTIMIZED</p>
                  </div>
                  <Badge variant="green" size="sm" dot>FARMER GETS 78%+</Badge>
                </div>

                {/* Step Flow */}
                <div className="space-y-3 pt-2">
                  {[
                    { title: 'BUYER POSTS VERIFIED DEMAND', role: 'Specifies crop, exact tonnage, quality grade & delivery window', cut: 'Market Signal Published', icon: Store },
                    { title: 'AI SMART MATCHING ENGINE', role: 'Clusters geo-proximate farmers and verifies available yields', cut: 'Near-Zero Search Cost', icon: Building },
                    { title: 'FARMERS GROUP AGGREGATION', role: 'Smallholders combine 600kg-1000kg batches to fulfill multi-ton PO', cut: 'Farmer receives: ₹23.00/KG (+31% direct)', icon: Users },
                    { title: 'OPTIMIZED LOGISTICS ROUTE', role: 'Single consolidated truck collects along algorithmic pickup loop', cut: 'Transport cost: ₹2.50/KG', icon: Truck },
                    { title: 'DIRECT BUYER FULFILLMENT', role: 'Buyer receives farm-fresh harvest within 12 hours of harvest', cut: 'Buyer pays: ₹25.50/KG (-9% savings)', icon: CheckCircle2 },
                  ].map((step, idx, arr) => (
                    <div key={step.title} className="relative">
                      <div className="flex items-center justify-between p-3.5 bg-farm-green-pale/70 border-2 border-ink-black">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-farm-green text-harvest-yellow border border-ink-black flex items-center justify-center font-mono font-bold text-xs">
                            0{idx + 1}
                          </div>
                          <div>
                            <span className="font-heading font-black text-sm uppercase text-farm-green">{step.title}</span>
                            <p className="font-body text-xs text-gray-800">{step.role}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-xs text-farm-green shrink-0 ml-2">
                          {step.cut}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="flex justify-center py-1 text-farm-green">
                          <ArrowDown className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-farm-green text-paper-white border-2 border-ink-black text-xs font-mono">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-yellow shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-harvest-yellow font-bold">FARMCHAIN PRINCIPLE:</strong>
                      <p className="mt-1">Direct negotiation. Direct bank settlement. Farmers see where value is created instead of being blind to end-market prices.</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Metric Comparison Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <Card variant="yellow" shadow="lg" className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
                <span className="font-mono text-xs font-bold uppercase">VALUE CAPTURE SHIFT</span>
                <Badge variant="dark" size="sm">DATA BENCHMARK</Badge>
              </div>

              {/* Farmer Realization Comparison */}
              <div className="space-y-2">
                <div className="flex justify-between font-heading font-bold text-sm">
                  <span>FARMER PRICE REALIZATION</span>
                  <span className="font-mono">48% vs 78%</span>
                </div>
                <div className="h-6 w-full bg-paper-white border-2 border-ink-black flex overflow-hidden">
                  <div className="bg-rust-red h-full flex items-center justify-center text-[10px] font-mono text-white font-bold" style={{ width: '48%' }}>
                    Old: 48%
                  </div>
                  <div className="bg-farm-green h-full flex items-center justify-center text-[10px] font-mono text-harvest-yellow font-bold flex-1">
                    FarmChain: +30% Retained
                  </div>
                </div>
              </div>

              {/* Transit Latency Comparison */}
              <div className="space-y-2">
                <div className="flex justify-between font-heading font-bold text-sm">
                  <span>HARVEST TO KITCHEN LATENCY</span>
                  <span className="font-mono">48h vs 12h</span>
                </div>
                <div className="h-6 w-full bg-paper-white border-2 border-ink-black flex overflow-hidden">
                  <div className="bg-farm-green h-full flex items-center justify-center text-[10px] font-mono text-harvest-yellow font-bold" style={{ width: '25%' }}>
                    12h Fresh
                  </div>
                  <div className="bg-warm-cream-dark h-full flex items-center justify-center text-[10px] font-mono text-ink-black font-bold flex-1">
                    Traditional Decay: 48h+
                  </div>
                </div>
              </div>

              {/* Key Highlights Bullet points */}
              <div className="p-4 bg-paper-white border-2 border-ink-black space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-farm-green shrink-0" />
                  <span><strong>+31% Higher Realization</strong> for smallholder farmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-rust-red shrink-0" />
                  <span><strong>-9% Net Procurement Cost</strong> for restaurant buyers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-farm-green shrink-0" />
                  <span><strong>Zero Intermediary</strong> holding warehouses</span>
                </div>
              </div>

              <div className="border-t-2 border-ink-black pt-4">
                <p className="font-heading font-black text-lg tracking-tight uppercase text-ink-black">
                  "DON'T SELL TO THE MIDDLEMAN. SELL TO THE DEMAND."
                </p>
              </div>
            </Card>

            {/* Quick Quote box */}
            <div className="p-5 bg-ink-black text-paper-white border-brutal shadow-brutal">
              <p className="font-mono text-xs text-harvest-yellow font-bold mb-1">
                // COMMISSION AGENT INDEPENDENCE
              </p>
              <p className="font-body text-xs text-gray-300 leading-relaxed">
                When farmers sell to local commission agents, they accept whatever rate is announced at noon. With FarmChain, harvest begins only when the buyer requirement and pricing are already locked.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
