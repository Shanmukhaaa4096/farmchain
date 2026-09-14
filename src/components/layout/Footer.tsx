import React from 'react';
import { ShieldCheck, Sprout, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { RubberStamp, SketchAnnotation } from '../ui/SketchAccents';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-blue-crate text-paper-white border-t-brutal pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Differentiator Banner (Citrus Yellow with Scrapbook Rubber Stamp) */}
        <div className="bg-citrus-yellow text-ink-black border-brutal-thick p-6 md:p-8 mb-16 shadow-brutal-lg relative">
          <RubberStamp text="0% BROKERAGE" variant="red" className="absolute -top-3 right-6" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider bg-ink-black text-paper-white px-2 py-0.5">
                  CRITICAL ARCHITECTURE PRINCIPLE
                </span>
                <SketchAnnotation text="NO MIDDLEMAN" color="orange" className="text-sm font-bold -rotate-2 ml-2" />
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl tracking-tight uppercase">
                FARMCHAIN DOES NOT BUY OR RESELL FARMERS' PRODUCE.
              </h3>
              <p className="font-body text-sm font-medium mt-2 text-ink-black leading-relaxed">
                Farmers and buyers negotiate directly. Payment transfers directly from buyer to farmer/FPO bank accounts. FarmChain provides the algorithmic demand pooling, price transparency telemetry, and coordinated transport execution. Zero predatory broker cuts.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => onNavigate('marketplace')}
                className="btn-brutal btn-brutal-primary px-5 py-3 text-xs w-full sm:w-auto"
              >
                CHECK MARKET DEMAND →
              </button>
            </div>
          </div>
        </div>

        {/* 12-Column Swiss Grid Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b-2 border-blue-900">
          
          {/* Brand Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="h-10 w-10 bg-harvest-yellow text-ink-black border-2 border-paper-white flex items-center justify-center font-black group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-heading font-black text-3xl tracking-tighter">
                FARMCHAIN
              </span>
            </div>
            
            <p className="font-heading font-bold text-base text-harvest-yellow uppercase tracking-tight">
              FROM FRAGMENTED SUPPLY TO COORDINATED DEMAND.
            </p>
            <p className="font-body text-xs text-warm-cream leading-relaxed max-w-md">
              The next-generation agricultural demand infrastructure. Assisted farmer onboarding, 1-tap accept/reject contracts, and machine-optimized rural transit networks.
            </p>

            {/* Clickable Direct Support Contacts */}
            <div className="pt-2 font-mono text-xs space-y-1 text-warm-cream">
              <p>
                HELPDESK: <a href="tel:+918001234567" className="text-harvest-yellow font-bold hover:underline">+91 800 123 4567</a>
              </p>
              <p>
                OFFICIAL INQUIRIES: <a href="mailto:support@farmchain.in" className="text-harvest-yellow font-bold hover:underline">support@farmchain.in</a>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 font-mono text-[10px]">
              <Badge variant="dark" size="sm">ISO 22000 TRACEABLE</Badge>
              <Badge variant="yellow" size="sm">AGRISTACK COMPLIANT</Badge>
              <Badge variant="white" size="sm">0% BROKER CUT</Badge>
            </div>
          </div>

          {/* Nav Categories (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold text-harvest-yellow uppercase tracking-wider">
              PARTICIPANTS
            </h4>
            <ul className="space-y-2 font-heading text-xs font-bold">
              <li>
                <button onClick={() => onNavigate('farmer')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1">
                  Farmer Hub <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buyer')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1">
                  Commercial Buyers <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('logistics')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1">
                  Fleet Transporters <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1">
                  FPO Aggregators <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Intelligence & Architecture (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold text-harvest-yellow uppercase tracking-wider">
              DATA AND SYSTEM
            </h4>
            <ul className="space-y-2 font-heading text-xs font-bold">
              <li>
                <button onClick={() => onNavigate('prices')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1">
                  Mandi Benchmarks <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('forecast')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1">
                  Demand Forecasting <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('logistics')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1">
                  Route Optimization <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1 text-gray-300">
                  Privacy Policy <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-harvest-yellow transition-colors flex items-center gap-1 text-gray-300">
                  Terms and Conditions <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Telemetry (3 cols) */}
          <div className="md:col-span-3 space-y-3 bg-[#1F265C] border-2 border-blue-800 p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-citrus-yellow font-bold">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> NETWORK TELEMETRY
              </span>
              <span className="text-[10px] bg-blue-crate text-lettuce-green px-1.5 py-0.5 border border-blue-700">v2.6 LIVE</span>
            </div>
            <div className="space-y-1.5 text-gray-300 text-[11px]">
              <div className="flex justify-between">
                <span>ACTIVE CLUSTER DEMAND:</span>
                <span className="text-paper-white font-bold">18.6 METRIC TONS</span>
              </div>
              <div className="flex justify-between">
                <span>CONNECTED VILLAGES:</span>
                <span className="text-paper-white font-bold">14 VILLAGES</span>
              </div>
              <div className="flex justify-between">
                <span>FARM-GATE TO DOCK:</span>
                <span className="text-citrus-yellow font-bold">&lt; 12 HOURS</span>
              </div>
              <div className="flex justify-between">
                <span>SETTLEMENT METHOD:</span>
                <span className="text-paper-white font-bold">DIRECT ESCROW / UPI</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-400">
          <p>© 2026 FARMCHAIN INFRASTRUCTURE LABS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-xs font-bold text-warm-cream">
            <button onClick={() => onNavigate('privacy')} className="hover:underline">PRIVACY POLICY</button>
            <span>/</span>
            <button onClick={() => onNavigate('terms')} className="hover:underline">TERMS OF SERVICE</button>
            <span>/</span>
            <button onClick={() => onNavigate('database')} className="hover:underline">DATABASE STATUS</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
