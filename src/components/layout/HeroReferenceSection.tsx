import React from 'react';
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Truck, 
  Users, 
  ShieldCheck, 
  Sparkles,
  Sprout,
  Radio
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { AgriImage } from '../ui/AgriImage';
import { WashiTape, SketchAnnotation, RubberStamp, SketchArrow } from '../ui/SketchAccents';

interface HeroReferenceSectionProps {
  onNavigate: (view: string) => void;
  onOpenPostDemand: () => void;
  onOpenVideo?: () => void;
}

export const HeroReferenceSection: React.FC<HeroReferenceSectionProps> = ({
  onNavigate,
  onOpenPostDemand,
  onOpenVideo
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-farm-green-dark border-b-brutal">
      
      {/* FULL-WIDTH CINEMATIC AGRICULTURAL FARMLAND HERO BACKGROUND */}
      <div className="relative w-full min-h-[640px] md:min-h-[760px] lg:min-h-[820px] flex items-center">
        
        {/* Background Photo with Subtle Slow Zoom on Desktop */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <img
            src="/hero_tractor_farmland.jpg"
            alt="Modern Indian tractor cultivating vast lush green crop fields at golden hour sunset"
            className="w-full h-full object-cover object-[45%_center] sm:object-center animate-subtle-zoom transition-transform duration-1000"
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Subtle Atmospheric Gradient Overlay to Ensure High Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-farm-green-dark/95 via-farm-green-dark/70 to-farm-green-dark/40 sm:via-farm-green-dark/60 sm:to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-farm-green-dark via-transparent to-black/30"></div>
          
          {/* Subtle Agricultural Furrow & Topo Pattern */}
          <div className="absolute inset-0 bg-furrow-pattern opacity-20 pointer-events-none"></div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 8 Cols: Bold Editorial Headline, Concept, & CTAs */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Agricultural Tagline Pill */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-harvest-yellow text-ink-black font-mono text-xs font-bold px-3 py-1 border-2 border-ink-black shadow-brutal-sm uppercase flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5" /> MODERN AGRI-TECH PLATFORM
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-warm-cream bg-farm-green/80 backdrop-blur-xs border border-paper-white/40 px-2.5 py-0.5">
                  <span className="h-2 w-2 rounded-full bg-terminal-green animate-pulse"></span>
                  124 MT ACTIVE DEMAND NETWORK
                </span>
              </div>

              {/* Massive Bold Headline (Reference Typography) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <SketchAnnotation text="FIELD NOTE: DIRECT POOLING" color="yellow" className="text-sm font-bold tracking-wider -rotate-2" />
                </div>
                <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight uppercase leading-[0.92] text-paper-white">
                  DON'T SELL <br />
                  <span className="text-warm-cream/50 line-through decoration-rust-red decoration-4">TO THE MIDDLEMAN.</span> <br />
                  <span className="text-harvest-yellow inline-block mt-1">
                    SELL TO THE DEMAND.
                  </span>
                  <SketchAnnotation text="FARM → BUYER DIRECT" color="orange" className="text-xl sm:text-2xl ml-3 -rotate-3 inline-block font-black align-middle" />
                </h1>
                <div className="w-24 h-2 bg-harvest-yellow border border-ink-black"></div>
              </div>

              {/* Supporting Subtext - Clear, Unambiguous Agricultural Direct Demand */}
              <p className="font-body text-base sm:text-xl text-warm-cream font-medium max-w-2xl leading-relaxed">
                Buyers post verified commercial demand. We match nearby farmer clusters via assisted onboarding and push direct contracts. Farmers simply tap Accept or Reject. 100% direct bank payout with 0% broker commission.
              </p>

              {/* Visual Flow Indicator: Clean, spacious responsive pipeline */}
              <div className="p-3.5 bg-farm-green-dark/95 border-2 border-paper-white/30 max-w-2xl font-mono text-xs text-warm-cream shadow-brutal-sm">
                <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-paper-white/15 text-[11px]">
                  <span className="text-harvest-yellow font-bold uppercase">DIRECT DEMAND PIPELINE:</span>
                  <span className="text-paper-white/70">5-Stage Frictionless Execution</span>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-between gap-2 text-center sm:text-left">
                  <div className="bg-white/10 px-2 py-1 border border-paper-white/20">
                    <span className="text-[10px] text-harvest-yellow block leading-none">01. SOURCE</span>
                    <strong className="text-paper-white font-bold text-xs">FARMERS</strong>
                  </div>
                  <span className="text-harvest-yellow font-bold hidden sm:inline">→</span>
                  <div className="bg-white/10 px-2 py-1 border border-paper-white/20">
                    <span className="text-[10px] text-harvest-yellow block leading-none">02. SIGNAL</span>
                    <strong className="text-paper-white font-bold text-xs">DEMAND</strong>
                  </div>
                  <span className="text-harvest-yellow font-bold hidden sm:inline">→</span>
                  <div className="bg-white/10 px-2 py-1 border border-paper-white/20">
                    <span className="text-[10px] text-terminal-green block leading-none">03. SMART</span>
                    <strong className="text-paper-white font-bold text-xs">PUSH MATCH</strong>
                  </div>
                  <span className="text-harvest-yellow font-bold hidden sm:inline">→</span>
                  <div className="bg-white/10 px-2 py-1 border border-paper-white/20">
                    <span className="text-[10px] text-citrus-yellow block leading-none">04. TRANSIT</span>
                    <strong className="text-paper-white font-bold text-xs">LOGISTICS</strong>
                  </div>
                  <span className="text-harvest-yellow font-bold hidden sm:inline">→</span>
                  <div className="bg-harvest-yellow text-ink-black px-2 py-1 border border-ink-black font-bold col-span-2 sm:col-span-1">
                    <span className="text-[10px] block leading-none text-ink-black/80">05. PAYOUT</span>
                    <span className="text-xs">100% DIRECT</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="yellow"
                  size="lg"
                  onClick={() => onNavigate('marketplace')}
                  className="flex items-center gap-2 text-sm sm:text-base font-heading font-black min-h-[48px] px-6"
                >
                  <span>FIND DEMAND</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </Button>

                <Button
                  variant="white"
                  size="lg"
                  onClick={onOpenPostDemand}
                  className="flex items-center gap-2 text-sm sm:text-base font-heading font-bold min-h-[48px] px-6"
                >
                  <span>POST REQUIREMENT</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </Button>

                <button
                  onClick={onOpenVideo}
                  className="inline-flex items-center gap-2.5 font-heading text-xs sm:text-sm font-bold text-paper-white hover:text-harvest-yellow transition-colors px-3 py-2 cursor-pointer group"
                >
                  <span className="w-9 h-9 bg-harvest-yellow text-ink-black border-2 border-ink-black flex items-center justify-center group-hover:scale-105 transition-transform shadow-brutal-sm shrink-0">
                    <Play className="w-4 h-4 fill-ink-black ml-0.5" />
                  </span>
                  <span>WATCH CO-OP STORY</span>
                </button>
              </div>

            </div>

            {/* Right 4 Cols: Clean Progressive Proof & Dispatch Telemetry */}
            <div className="lg:col-span-4 flex flex-col gap-4 relative">
              
              {/* Floating Farmer Video Card with Scrapbook Washi Tape & Rubber Stamp */}
              <div className="bg-paper-white border-brutal-thick p-3.5 shadow-brutal-lg max-w-sm lg:ml-auto w-full relative transform sm:rotate-1 hover:rotate-0 transition-transform duration-300">
                <WashiTape color="yellow" className="-top-3 left-10 z-20" />
                <RubberStamp text="CO-OP VERIFIED" variant="green" className="absolute -bottom-2 -left-2 z-20" />
                
                <div className="relative h-44 w-full border border-ink-black overflow-hidden group cursor-pointer" onClick={onOpenVideo}>
                  <img
                    src="/farmer_video_thumb.jpg"
                    alt="Elderly smiling Indian farmer in traditional turban"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 bg-harvest-yellow text-ink-black border-2 border-ink-black flex items-center justify-center shadow-brutal-sm">
                      <Play className="w-5 h-5 fill-ink-black ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-ink-black text-harvest-yellow text-[9px] font-mono font-bold px-1.5 py-0.5 border border-ink-black">
                    HD // 02:40
                  </div>
                </div>

                <div className="pt-3 font-mono text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="font-heading font-black text-sm uppercase text-ink-black">
                      CHEVELLA FPO STORY
                    </strong>
                    <Badge variant="green" size="sm">FARMER CO-OP</Badge>
                  </div>
                  <p className="text-[11px] text-gray-700 leading-tight">
                    "We stopped selling to village brokers. Pooling 2,400 KG tomatoes gave us 28% higher farm-gate price."
                  </p>
                </div>
              </div>

              {/* Floating Layered Demand Pill 1: Live Demand (Progressive disclosure friendly) */}
              <div className="bg-harvest-yellow border-2 border-ink-black p-3.5 shadow-brutal max-w-sm lg:ml-auto w-full font-mono text-xs space-y-1 relative transform sm:-rotate-1 hover:rotate-0 transition-transform">
                <WashiTape color="blue" className="-top-2.5 right-6 z-20" />
                <div className="flex items-center justify-between text-[10px] font-bold pb-1 border-b border-ink-black">
                  <span className="flex items-center gap-1 text-ink-black uppercase">
                    <Radio className="w-3 h-3 text-rust-red animate-pulse" />
                    LIVE DEMAND
                  </span>
                  <span className="text-ink-black">HYDERABAD HUB</span>
                </div>
                <strong className="font-heading font-black text-base uppercase text-ink-black block">
                  800 KG TOMATOES REQUIRED
                </strong>
                <div className="flex items-center justify-between text-[11px] text-ink-black/80 font-bold pt-1">
                  <span>3 FARMERS MATCHED</span>
                  <span className="text-farm-green">14 KM RADIUS</span>
                </div>
                <div className="text-right">
                  <SketchAnnotation text="DEMAND MATCHED" color="orange" className="text-xs font-bold -rotate-1 inline-block" />
                </div>
              </div>

              {/* Floating Layered Demand Pill 2: Route Optimized */}
              <div className="bg-paper-white border-2 border-ink-black p-3 shadow-brutal-sm max-w-sm lg:ml-auto w-full font-mono text-xs flex items-center justify-between gap-3 relative">
                <WashiTape color="red" className="-top-2 left-6 z-20" />
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-farm-green text-harvest-yellow flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-ink-black block uppercase text-[11px]">
                      ROUTE OPTIMIZED
                    </span>
                    <span className="text-[10px] text-gray-500">1 Truck • 3 Pickups</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-farm-green bg-green-50 border border-green-300 px-1.5 py-0.5">
                  DIRECT BUYER ✓
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM LAYERED YELLOW GUARANTEE BANNER (Direct Reference Mirror) */}
      <div className="bg-harvest-yellow text-ink-black border-t-3 border-ink-black py-4 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          
          {/* Item 1: Thumbnail + Title */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-14 h-11 border-2 border-ink-black overflow-hidden shadow-brutal-sm shrink-0">
              <img
                src="/hero_indian_agriculture.jpg"
                alt="Farmland landscape thumbnail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <strong className="font-heading font-black text-sm uppercase text-ink-black block leading-tight">
                DIRECT AGRI-DEMAND INFRASTRUCTURE
              </strong>
              <span className="text-[11px] text-ink-black/80">
                Coordinated Harvest • Cold-Chain Transport • Direct Settlement
              </span>
            </div>
          </div>

          {/* Item 2: Square Seal Guarantee */}
          <div className="flex items-center gap-2.5 shrink-0 bg-paper-white border-2 border-ink-black px-3 py-1.5 shadow-brutal-sm">
            <div className="w-6 h-6 bg-farm-green text-harvest-yellow flex items-center justify-center font-black text-[10px] border border-ink-black">
              ✓
            </div>
            <div>
              <span className="font-bold text-[10px] block leading-none text-gray-600">ZERO COMMISSION</span>
              <strong className="font-heading font-black text-xs uppercase text-farm-green">
                100% DIRECT TO FARMER
              </strong>
            </div>
          </div>

          {/* Item 3: Metrics + Avatars */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div>
              <strong className="font-heading font-black text-base text-ink-black block leading-none">
                <AnimatedCounter value={18} suffix=".5 MT" />
              </strong>
              <span className="text-[10px] text-ink-black/80 font-bold">
                ACTIVE CLUSTER PO VOLUME
              </span>
            </div>

            <div className="h-7 w-px bg-ink-black/30 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <div className="w-7 h-7 border-2 border-ink-black overflow-hidden bg-white">
                  <img src="/farmer_video_thumb.jpg" alt="Farmer" className="w-full h-full object-cover" />
                </div>
                <div className="w-7 h-7 border-2 border-ink-black overflow-hidden bg-white">
                  <img src="/farmer_harvest_crate.jpg" alt="Farmer" className="w-full h-full object-cover" />
                </div>
                <div className="w-7 h-7 border-2 border-ink-black overflow-hidden bg-farm-green text-harvest-yellow text-[9px] font-bold flex items-center justify-center">
                  +14
                </div>
              </div>
              <span className="text-[11px] font-bold text-ink-black hidden sm:inline">
                Village Clusters Live
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
