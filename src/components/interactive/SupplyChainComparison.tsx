import React, { useState } from 'react';
import { ArrowDown, AlertTriangle, CheckCircle2, TrendingDown, TrendingUp, Users, Building, Truck, Store } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const SupplyChainComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'farmchain'>('farmchain');
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState<boolean>(false);

  return (
    <section className="py-12 sm:py-20 bg-paper-bg border-y border-dark-text/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-3 py-1 bg-farm-green text-pure-white rounded-full uppercase">
              SECTION 02 // STRUCTURAL INEFFICIENCY
            </span>
          </div>
          <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-dark-text leading-[1.1]">
            Where Does the Value Go?
          </h2>
          <p className="font-sans text-sm sm:text-base text-dark-text/70 max-w-3xl leading-relaxed">
            In the traditional system, produce passes through five distinct brokers before reaching commercial kitchens or store shelves. Each middleman takes a margin while adding zero shelf-life.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('traditional')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'traditional' 
                ? 'bg-terracotta text-pure-white shadow-soft-terracotta' 
                : 'bg-pure-white text-dark-text/70 border border-dark-text/10 hover:border-dark-text/30'
            }`}
          >
            TRADITIONAL BROKER CHAIN (5 LAYERS)
          </button>
          <button
            onClick={() => setActiveTab('farmchain')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'farmchain' 
                ? 'bg-farm-green text-pure-white shadow-soft-sm' 
                : 'bg-pure-white text-dark-text/70 border border-dark-text/10 hover:border-dark-text/30'
            }`}
          >
            FARMCHAIN DEMAND-MATCHED FLOW (DIRECT)
          </button>
        </div>

        {/* High-Level Executive Summary Card */}
        <div className="p-6 sm:p-8 bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-dark-text/60 block">
                {activeTab === 'traditional' ? 'TRADITIONAL SYSTEM SNAPSHOT' : 'FARMCHAIN DIRECT MODEL SNAPSHOT'}
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-dark-text">
                {activeTab === 'traditional' ? '5 Middlemen Layers • 38% Produce Decay' : '0 Middlemen • 12-Hour Harvest-to-Kitchen'}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-dark-text/70 max-w-2xl leading-relaxed">
                {activeTab === 'traditional' 
                  ? 'Produce spends 36 to 48 hours bouncing between village agents, wholesale mandis, and city distributors before delivery.'
                  : 'Commercial buyers post exact demand parameters. Nearby farmer clusters combine volume and dispatch directly along an optimized route.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
                className="px-5 py-2.5 rounded-full bg-paper-bg border border-dark-text/15 text-dark-text text-xs font-sans font-semibold hover:bg-pure-white transition-colors cursor-pointer"
              >
                <span>{isBreakdownExpanded ? 'Collapse 5-Stage Details ▲' : 'Explore 5-Stage Audit Trail ▼'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Flow Column (7 cols) */}
          <div className="lg:col-span-7">
            {activeTab === 'traditional' ? (
              <div className="bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-dark-text/10">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-terracotta">
                      Traditional Broker Chain
                    </h3>
                    <p className="font-mono text-xs text-dark-text/60">FRUIT & VEGETABLE LOSS: ~38%</p>
                  </div>
                  <Badge variant="red" size="sm">5 MIDDLEMEN</Badge>
                </div>

                {/* Step Flow */}
                {(isBreakdownExpanded || typeof window !== 'undefined') && (
                  <div className="space-y-3 pt-2">
                  {[
                    { title: 'Farmer', role: 'Takes price offered by village commission agent', cut: 'Farmer receives: ₹17.50/KG (Distress auction rate)', icon: Users },
                    { title: 'Local Trader / Agent', role: 'Charges 6-10% brokerage + uncalibrated weighing deduction', cut: '+ ₹2.50 commission markup', icon: Building },
                    { title: 'Mandi Wholesaler', role: 'Unregulated APMC auction markup + loading cuts', cut: '+ ₹3.50 speculative margin', icon: Store },
                    { title: 'City Distributor', role: 'Secondary cold-storage transit loss & re-packing markups', cut: '+ ₹4.50 distribution overhead', icon: Truck },
                    { title: 'Commercial Buyer', role: 'Pays inflated rate for 3-day-old degraded produce', cut: 'Buyer pays: ₹28.00/KG', icon: Store },
                  ].map((step, idx, arr) => (
                    <div key={step.title} className="relative">
                      <div className="flex items-center justify-between p-4 bg-paper-bg rounded-2xl border border-dark-text/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-terracotta/15 text-terracotta flex items-center justify-center font-mono font-bold text-xs">
                            0{idx + 1}
                          </div>
                          <div>
                            <span className="font-serif font-bold text-sm text-dark-text">{step.title}</span>
                            <p className="font-sans text-xs text-dark-text/70">{step.role}</p>
                          </div>
                        </div>
                        <span className="font-mono font-semibold text-xs text-terracotta shrink-0 ml-2">
                          {step.cut}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="flex justify-center py-1 text-dark-text/30">
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  </div>
                )}

                <div className="mt-6 p-4 bg-terracotta/10 border border-terracotta/25 rounded-2xl text-dark-text text-xs font-mono">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-terracotta">SYSTEMIC FAILURE:</strong>
                      <p className="mt-1 font-sans text-dark-text/80">More layers → less transparency → lower farmer bargaining power → higher buyer prices + 36-48 hour freshness decay.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-dark-text/10">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-farm-green">
                      FarmChain Demand-First Flow
                    </h3>
                    <p className="font-mono text-xs text-dark-text/60">ZERO BROKERS // MACHINE OPTIMIZED</p>
                  </div>
                  <Badge variant="green" size="sm" dot>FARMER GETS 78%+</Badge>
                </div>

                {/* Step Flow */}
                {(isBreakdownExpanded || typeof window !== 'undefined') && (
                  <div className="space-y-3 pt-2">
                  {[
                    { title: 'Buyer Posts Verified Demand', role: 'Specifies crop, exact tonnage, quality grade & delivery window', cut: 'Market Signal Published', icon: Store },
                    { title: 'AI Smart Matching Engine', role: 'Clusters geo-proximate farmers and verifies available yields', cut: 'Near-Zero Search Cost', icon: Building },
                    { title: 'Farmers Group Aggregation', role: 'Smallholders combine 600kg-1000kg batches to fulfill multi-ton PO', cut: 'Farmer receives: ₹23.00/KG (+31% direct)', icon: Users },
                    { title: 'Optimized Logistics Route', role: 'Single consolidated truck collects along algorithmic pickup loop', cut: 'Transport cost: ₹2.50/KG', icon: Truck },
                    { title: 'Direct Buyer Fulfillment', role: 'Buyer receives farm-fresh harvest within 12 hours of harvest', cut: 'Buyer pays: ₹25.50/KG (-9% savings)', icon: CheckCircle2 },
                  ].map((step, idx, arr) => (
                    <div key={step.title} className="relative">
                      <div className="flex items-center justify-between p-4 bg-farm-green/5 rounded-2xl border border-farm-green/15">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-farm-green text-pure-white flex items-center justify-center font-mono font-bold text-xs shadow-soft-sm">
                            0{idx + 1}
                          </div>
                          <div>
                            <span className="font-serif font-bold text-sm text-farm-green">{step.title}</span>
                            <p className="font-sans text-xs text-dark-text/70">{step.role}</p>
                          </div>
                        </div>
                        <span className="font-mono font-semibold text-xs text-farm-green shrink-0 ml-2">
                          {step.cut}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="flex justify-center py-1 text-farm-green/40">
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  </div>
                )}

                <div className="mt-6 p-4 bg-farm-green/10 border border-farm-green/25 rounded-2xl text-dark-text text-xs font-mono">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-farm-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-farm-green font-bold">FARMCHAIN PRINCIPLE:</strong>
                      <p className="mt-1 font-sans text-dark-text/80">Direct negotiation. Direct bank settlement. Farmers see where value is created instead of being blind to end-market prices.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metric Comparison Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 md:p-8 bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-dark-text/10">
                <span className="font-mono text-xs font-semibold uppercase text-dark-text/70">VALUE CAPTURE SHIFT</span>
                <Badge variant="dark" size="sm">DATA BENCHMARK</Badge>
              </div>

              {/* Farmer Realization Comparison */}
              <div className="space-y-2">
                <div className="flex justify-between font-serif font-bold text-sm text-dark-text">
                  <span>Farmer Price Realization</span>
                  <span className="font-mono text-xs">48% vs 78%</span>
                </div>
                <div className="h-7 w-full bg-paper-bg rounded-full border border-dark-text/10 flex overflow-hidden p-0.5">
                  <div className="bg-terracotta h-full rounded-full flex items-center justify-center text-[10px] font-mono text-pure-white font-bold" style={{ width: '48%' }}>
                    Old: 48%
                  </div>
                  <div className="bg-farm-green h-full rounded-full flex items-center justify-center text-[10px] font-mono text-pure-white font-bold flex-1 ml-1">
                    FarmChain: +30% Retained
                  </div>
                </div>
              </div>

              {/* Transit Latency Comparison */}
              <div className="space-y-2">
                <div className="flex justify-between font-serif font-bold text-sm text-dark-text">
                  <span>Harvest to Kitchen Latency</span>
                  <span className="font-mono text-xs">48h vs 12h</span>
                </div>
                <div className="h-7 w-full bg-paper-bg rounded-full border border-dark-text/10 flex overflow-hidden p-0.5">
                  <div className="bg-farm-green h-full rounded-full flex items-center justify-center text-[10px] font-mono text-pure-white font-bold" style={{ width: '28%' }}>
                    12h Fresh
                  </div>
                  <div className="bg-dark-text/20 h-full rounded-full flex items-center justify-center text-[10px] font-mono text-dark-text font-semibold flex-1 ml-1">
                    Traditional Decay: 48h+
                  </div>
                </div>
              </div>

              {/* Key Highlights Bullet points */}
              <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 space-y-2.5 font-sans text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-farm-green shrink-0" />
                  <span><strong className="text-dark-text">+31% Higher Realization</strong> for smallholder farmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-terracotta shrink-0" />
                  <span><strong className="text-dark-text">-9% Net Procurement Cost</strong> for restaurant buyers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-farm-green shrink-0" />
                  <span><strong className="text-dark-text">Zero Intermediary</strong> holding warehouses</span>
                </div>
              </div>

              <div className="border-t border-dark-text/10 pt-4">
                <p className="font-serif font-bold text-lg tracking-tight text-dark-text">
                  "Don't sell to the middleman. Sell to the demand."
                </p>
              </div>
            </div>

            {/* Quick Quote box */}
            <div className="p-6 bg-dark-text text-pure-white rounded-3xl border border-dark-text/20 shadow-soft space-y-2">
              <p className="font-mono text-xs text-harvest-yellow font-bold uppercase tracking-wider">
                // COMMISSION AGENT INDEPENDENCE
              </p>
              <p className="font-sans text-xs text-pure-white/80 leading-relaxed">
                When farmers sell to local commission agents, they accept whatever rate is announced at noon. With FarmChain, harvest begins only when the buyer requirement and pricing are already locked.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
