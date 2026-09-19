import React, { useState, useEffect, useRef } from 'react';
import { 
  Sprout, 
  Scissors, 
  Package, 
  Truck, 
  Building2, 
  CheckCircle2, 
  Play, 
  RotateCcw,
  ShieldCheck,
  MapPin,
  Clock,
  Scale
} from 'lucide-react';
import gsap from 'gsap';
import { WavySquiggle } from '../ui/SketchAccents';

export interface JourneyStep {
  id: string;
  stage: string;
  label: string;
  subLabel: string;
  icon: React.ElementType;
  location: string;
  timing: string;
  dataTag: {
    lot: string;
    spec: string;
    value: string;
  };
  details: string;
  guarantee: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'farmer',
    stage: '01',
    label: 'FARMER',
    subLabel: 'Cluster Harvest Match',
    icon: Sprout,
    location: 'Chevella Village Cluster, Ranga Reddy',
    timing: 'Day -14 (Pledge Matched)',
    dataTag: {
      lot: 'RR-CHEV-44',
      spec: 'CLUSTER AGGREGATION',
      value: '3 Smallholders / 5.2 Acres'
    },
    details: 'Smallholders are algorithmically pooled into standardized commercial lots matching the buyer’s delivery calendar before picking begins.',
    guarantee: 'Contracted farm-gate rate guaranteed in writing before harvest'
  },
  {
    id: 'harvest',
    stage: '02',
    label: 'HARVEST',
    subLabel: 'Field-Side QC Sorting',
    icon: Scissors,
    location: 'Field Plot #4, Chevella',
    timing: '06:00 AM Dawn Picking',
    dataTag: {
      lot: 'RR-CHEV-44-QC',
      spec: 'MOISTURE / MATURITY',
      value: 'Grade A (19% Moisture Index)'
    },
    details: 'Picking begins in cool dawn hours. Produce is graded and sorted immediately under field shade to retain crispness and shelf life.',
    guarantee: 'Calibrated digital refractometer verification at village gate'
  },
  {
    id: 'packing',
    stage: '03',
    label: 'PACKING',
    subLabel: 'Standardized Crate Tagging',
    icon: Package,
    location: 'Village Collection Point',
    timing: '08:30 AM Batch Crated',
    dataTag: {
      lot: 'LOT-RR-44-C08',
      spec: 'VENTILATED 25KG CRATES',
      value: '168 Crates QR-Tagged'
    },
    details: 'Produce moves into food-safe, ventilated plastic crates with individual batch QR tags. Eliminates crushing damage from rough burlap bags.',
    guarantee: 'Zero bruising loss; complete barcode provenance trace'
  },
  {
    id: 'transport',
    stage: '04',
    label: 'TRANSPORT',
    subLabel: 'Village Milk-Run Direct',
    icon: Truck,
    location: 'Highway 44 Corridor → City Dock',
    timing: '09:45 AM En-Route (48 KM)',
    dataTag: {
      lot: 'REEFER-TS-08',
      spec: 'DIRECT REEFER TRANSIT',
      value: '58 Mins to Dock'
    },
    details: 'Consolidated refrigerated vehicles collect directly from village farm-gates and travel straight to institutional docks without mandi holding yards.',
    guarantee: 'Single-loop continuous transit without broker layovers'
  },
  {
    id: 'buyer',
    stage: '05',
    label: 'BUYER',
    subLabel: 'Weighbridge & Safe Payment',
    icon: Building2,
    location: 'Madhapur Central Kitchen / Dock Hub',
    timing: '11:15 AM Dock Arrival & Signoff',
    dataTag: {
      lot: 'SAFE-PAY-HYD-9021',
      spec: 'INSTANT BANK RELEASE',
      value: '₹1,34,400 Transferred'
    },
    details: 'Buyer verifies weight on calibrated scales. Instant digital receipt triggers safe payment straight into the farmer’s bank account.',
    guarantee: '100% money in your bank released within 2 hours of dock signoff'
  }
];

export const ProduceJourneyFlow: React.FC<{
  className?: string;
  onNavigate?: (view: string) => void;
}> = ({ className = '', onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Refs for GSAP animation
  const containerRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<SVGGElement>(null);
  const routeLineRef = useRef<SVGLineElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const iconNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP animation triggered when active step changes (Exact 7-step sequence)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Farm / Farmer / Crop milestone appearance
      const currentNode = iconNodesRef.current[activeStepIndex];
      if (currentNode) {
        if (activeStepIndex === 0) {
          tl.fromTo(
            currentNode,
            { scale: 0.7, opacity: 0.3 },
            { scale: 1.08, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
          // 2. Crop subtle sway
          tl.to(currentNode, {
            rotation: 4,
            duration: 0.15,
            yoyo: true,
            repeat: 3,
            ease: 'sine.inOut',
          });
        } else if (activeStepIndex === 2) {
          // 3 & 4. Produce moves toward packaging & packaging bounces
          tl.fromTo(
            currentNode,
            { scale: 0.8, y: -6 },
            { scale: 1.08, y: 0, duration: 0.45, ease: 'bounce.out' }
          );
        } else {
          tl.fromTo(
            currentNode,
            { scale: 0.9, opacity: 0.6 },
            { scale: 1.05, opacity: 1, duration: 0.35, ease: 'power2.out' }
          );
        }
      }

      // 5. Route line draws itself
      if (routeLineRef.current) {
        const pct = (activeStepIndex / (JOURNEY_STEPS.length - 1)) * 100;
        tl.to(
          routeLineRef.current,
          {
            attr: { x2: `${pct}%` },
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      // 6. Reefer truck travels along route
      if (truckRef.current) {
        const pct = (activeStepIndex / (JOURNEY_STEPS.length - 1)) * 100;
        tl.to(
          truckRef.current,
          {
            x: `${pct}%`,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          '-=0.5'
        );
      }

      // 7. Buyer / active card appears and locks in
      if (activeCardRef.current) {
        tl.fromTo(
          activeCardRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeStepIndex]);

  // Automated playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section ref={containerRef} className={`py-16 sm:py-28 bg-pure-white border-b border-dark-text/10 relative overflow-hidden ${className}`}>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header: Repeating Rhythm */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-text/10">
          <div className="max-w-2xl space-y-3">
            <span className="font-sans text-xs font-semibold text-primary-green uppercase tracking-[0.18em] block">
              FARM-TO-MARKET JOURNEY
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-dark-text leading-[1.01] font-bold tracking-tight">
              Follow the<br />
              <span className="relative inline-block text-primary-green mt-1">
                harvest.
                <span className="absolute left-0 -bottom-3 sm:-bottom-4 w-full flex justify-start pointer-events-none">
                  <WavySquiggle color="#315C3A" className="w-32 sm:w-44 h-4 text-primary-green" />
                </span>
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-mandi-charcoal-muted leading-relaxed">
              Watch how produce moves directly from village farm-gates to commercial buyer docks in under six hours. Zero speculative holding yards, zero broker cuts.
            </p>
          </div>

          {/* Interactive Play / Pause & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2.5 text-xs font-sans font-semibold uppercase tracking-wider rounded-full bg-paper-bg text-dark-text border border-dark-text/10 shadow-soft hover:bg-soft-green/30 transition-all flex items-center gap-2"
              title={isPlaying ? "Pause automated journey" : "Play automated journey"}
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
                  <span>PAUSE JOURNEY</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-primary-green" />
                  <span>PLAY JOURNEY</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setActiveStepIndex(0);
                setIsPlaying(false);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-sans text-dark-text bg-paper-bg border border-dark-text/10 shadow-soft hover:bg-soft-green/30 transition-all"
              title="Reset to step 01"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. DESKTOP SVG INTERACTIVE JOURNEY (md: and above) */}
        <div className="hidden md:block relative pt-4 pb-6">
          
          {/* Animated Connecting SVG Route Track */}
          <div className="absolute top-[44px] left-[6%] right-[6%] h-12 -z-0">
            <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none">
              {/* Background dashed route */}
              <line 
                x1="0%" 
                y1="50%" 
                x2="100%" 
                y2="50%" 
                stroke="#D8D1BF" 
                strokeWidth="2" 
                strokeDasharray="5 5" 
              />
              
              {/* Active progress track */}
              <line 
                ref={routeLineRef}
                x1="0%" 
                y1="50%" 
                x2={`${(activeStepIndex / (JOURNEY_STEPS.length - 1)) * 100}%`} 
                y2="50%" 
                stroke="#315C3A" 
                strokeWidth="3" 
                className="transition-all duration-700 ease-out"
              />

              {/* Travelling Truck Icon along route */}
              <g ref={truckRef} className="transition-transform duration-700 ease-out">
                <circle cx="0%" cy="50%" r="15" fill="#17231A" />
                <Truck className="w-4 h-4 text-pure-white" x="-8" y="16" />
              </g>
            </svg>
          </div>

          {/* 5 Milestone Step Nodes: FARMER → HARVEST → PACKING → TRANSPORT → BUYER */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-200 outline-none p-2 ${
                    isActive ? 'scale-105' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Step Node Box */}
                  <div
                    ref={(el) => {
                      iconNodesRef.current[idx] = el;
                    }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all relative ${
                      isActive
                        ? 'bg-primary-green text-pure-white border-primary-green shadow-soft-lg'
                        : isPast
                          ? 'bg-soft-green text-dark-text border-dark-text/15'
                          : 'bg-paper-bg text-dark-text border-dark-text/15 group-hover:border-dark-text/30'
                    }`}
                  >
                    <StepIcon className="w-6 h-6 stroke-[2]" />
                    
                    {/* Stage number badge */}
                    <span className="absolute -top-2 -right-2 font-sans text-[10px] font-bold px-2 py-0.5 rounded-full bg-pure-white text-dark-text border border-dark-text/10 shadow-sm">
                      {step.stage}
                    </span>

                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-terracotta animate-ping" />
                    )}
                  </div>

                  {/* Step Name */}
                  <span className={`font-editorial font-bold text-base mt-3 block uppercase tracking-wide transition-colors ${
                    isActive ? 'text-dark-text' : 'text-mandi-charcoal-muted group-hover:text-dark-text'
                  }`}>
                    {step.label}
                  </span>

                  {/* Timing Pill */}
                  <span className="font-sans text-[11px] text-mandi-charcoal-muted truncate max-w-full block mt-0.5">
                    {step.timing.split('(')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Inspector Card (Editorial Presentation) */}
          <div 
            ref={activeCardRef}
            className="mt-10 bg-paper-bg rounded-3xl border border-dark-text/10 p-7 sm:p-9 shadow-soft-lg transition-all duration-300"
          >
            <div className="grid grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Details (7 cols) */}
              <div className="col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-sans text-xs font-semibold text-primary-green uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-green" />
                    MILESTONE {activeStep.stage} OF 05
                  </span>
                  <span className="text-dark-text/30">•</span>
                  <span className="font-sans text-xs text-mandi-charcoal-muted flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary-green" />
                    {activeStep.location}
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-dark-text font-bold leading-tight">
                    {activeStep.label}: <span className="italic font-normal text-terracotta">{activeStep.subLabel}</span>
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-dark-text/85 leading-relaxed mt-2.5">
                    {activeStep.details}
                  </p>
                </div>

                <div className="p-4 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-green shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-sans text-dark-text leading-snug">
                    <strong className="text-primary-green font-sans font-bold">FarmChain Guarantee:</strong> {activeStep.guarantee}
                  </div>
                </div>
              </div>

              {/* Right Column: Trip Slip (5 cols) */}
              <div className="col-span-5 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft p-5 space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-dark-text/10 pb-2">
                  <span className="font-bold text-[10px] text-dark-text uppercase tracking-wider">
                    HARVEST TRIP SLIP
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-soft-green/40 text-primary-green text-[10px] font-bold">
                    MANDI EXEMPTION COMPLIANT
                  </span>
                </div>

                <div className="space-y-2 py-1 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-mandi-charcoal-muted text-[11px]">BATCH TRACE:</span>
                    <strong className="text-dark-text">{activeStep.dataTag.lot}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mandi-charcoal-muted text-[11px]">SPECIFICATION:</span>
                    <span className="text-dark-text font-semibold">{activeStep.dataTag.spec}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mandi-charcoal-muted text-[11px]">VERIFIED VALUE:</span>
                    <span className="text-terracotta font-bold text-xs">{activeStep.dataTag.value}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mandi-charcoal-muted text-[11px]">SCHEDULED TIMING:</span>
                    <span className="text-dark-text text-[11px]">{activeStep.timing}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-dark-text/15 flex items-center justify-between text-[11px] text-mandi-charcoal-muted">
                  <span>SAFE PAYMENT PROTOCOL</span>
                  <span className="text-primary-green font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% DIRECT
                  </span>
                </div>
              </div>

            </div>

            {/* Step Selector Controls */}
            <div className="mt-8 pt-4 border-t border-dark-text/10 flex items-center justify-between">
              <div className="font-sans text-xs text-mandi-charcoal-muted">
                Step {activeStep.stage} / 05 &mdash; {activeStep.label}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => {
                    setActiveStepIndex((prev) => Math.max(0, prev - 1));
                    setIsPlaying(false);
                  }}
                  className="px-5 py-2 text-xs font-sans font-semibold uppercase tracking-wider rounded-full disabled:opacity-30 disabled:cursor-not-allowed bg-pure-white text-dark-text border border-dark-text/10 shadow-soft hover:bg-soft-green/30 transition-all"
                >
                  ← PREV
                </button>

                <button
                  disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
                  onClick={() => {
                    setActiveStepIndex((prev) => Math.min(JOURNEY_STEPS.length - 1, prev + 1));
                    setIsPlaying(false);
                  }}
                  className="px-5 py-2 text-xs font-sans font-semibold uppercase tracking-wider rounded-full disabled:opacity-30 disabled:cursor-not-allowed bg-primary-green text-pure-white border border-primary-green shadow-soft hover:bg-opacity-90 transition-all"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 2. MOBILE VERTICAL EDITORIAL STORYTELLING (Phones block md:hidden) */}
        <div className="block md:hidden space-y-4">
          
          <div className="font-sans text-xs text-primary-green font-semibold uppercase tracking-[0.18em] mb-2">
            TAP STAGE TO INSPECT DETAILS
          </div>

          <div className="relative pl-6 space-y-3">
            
            {/* Vertical Connecting Line */}
            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-dark-text/15" />

            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="relative">
                  
                  {/* Timeline Node */}
                  <div 
                    className={`absolute -left-[23px] top-4 w-6 h-6 rounded-full flex items-center justify-center border font-sans text-[10px] font-bold z-10 transition-colors ${
                      isActive 
                        ? 'bg-primary-green text-pure-white border-primary-green shadow-soft' 
                        : isPast 
                          ? 'bg-soft-green text-dark-text border-dark-text/15' 
                          : 'bg-pure-white text-dark-text border-dark-text/20'
                    }`}
                  >
                    {step.stage}
                  </div>

                  {/* Stage Card */}
                  <div
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    role="button"
                    tabIndex={0}
                    className={`p-4 rounded-2xl border transition-all text-left ${
                      isActive
                        ? 'bg-paper-bg rounded-2xl border-dark-text/20 shadow-soft-lg'
                        : 'bg-pure-white rounded-2xl border-dark-text/10 hover:border-dark-text/30 shadow-soft'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StepIcon className={`w-4 h-4 ${isActive ? 'text-terracotta' : 'text-dark-text'}`} />
                        <span className="font-editorial font-bold text-lg text-dark-text">
                          {step.label}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-mandi-charcoal-muted uppercase tracking-wider">
                        {step.timing.split('(')[0]}
                      </span>
                    </div>

                    <div className="font-sans text-xs text-primary-green font-semibold mt-0.5">
                      {step.subLabel}
                    </div>

                    {/* Expanded details when active */}
                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-dark-text/10 space-y-2.5">
                        <p className="font-sans text-xs text-dark-text/85 leading-relaxed">
                          {step.details}
                        </p>

                        <div className="p-3 bg-pure-white rounded-xl border border-dark-text/10 text-[11px] font-sans text-dark-text">
                          <strong className="text-primary-green font-sans font-bold block text-[10px] uppercase mb-0.5">FarmChain Guarantee:</strong>
                          {step.guarantee}
                        </div>

                        <div className="p-3 bg-paper-bg/60 rounded-xl border border-dark-text/10 font-mono text-[10px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-mandi-charcoal-muted">SPEC:</span>
                            <span className="font-semibold text-dark-text">{step.dataTag.spec}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-mandi-charcoal-muted">VERIFIED:</span>
                            <span className="font-bold text-terracotta">{step.dataTag.value}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}

          </div>

          {/* Mobile Bottom Step Controls */}
          <div className="pt-2 flex items-center justify-between">
            <span className="font-sans text-xs text-mandi-charcoal-muted">
              Step {activeStep.stage} / 05 &mdash; {activeStep.label}
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => {
                  setActiveStepIndex((prev) => Math.max(0, prev - 1));
                  setIsPlaying(false);
                }}
                className="px-4 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider rounded-full disabled:opacity-30 bg-pure-white text-dark-text border border-dark-text/10 shadow-soft"
              >
                ← PREV
              </button>

              <button
                disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
                onClick={() => {
                  setActiveStepIndex((prev) => Math.min(JOURNEY_STEPS.length - 1, prev + 1));
                  setIsPlaying(false);
                }}
                className="px-4 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider rounded-full disabled:opacity-30 bg-primary-green text-pure-white border border-primary-green shadow-soft"
              >
                NEXT →
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
