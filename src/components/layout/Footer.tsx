import React from 'react';
import { ShieldCheck, Sprout, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-blue-crate text-paper-white border-t-brutal pt-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Core Direct Payout Promise Banner */}
        <div className="bg-citrus-yellow text-ink-black border-brutal-thick p-5 sm:p-6 mb-12 shadow-brutal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-farm-green stroke-[2.5]" />
              <strong className="font-heading font-black text-lg uppercase tracking-tight">
                OUR PROMISE: 0% BROKER COMMISSION
              </strong>
            </div>
            <p className="font-body text-xs sm:text-sm text-ink-black font-medium leading-relaxed max-w-2xl">
              FarmChain does not buy, markup, or resell your produce. All payments transfer 100% directly from verified buyers into your bank account.
            </p>
          </div>

          <button 
            onClick={() => onNavigate('marketplace')}
            className="btn-brutal btn-brutal-primary px-5 py-2.5 text-xs font-heading font-black uppercase whitespace-nowrap self-start sm:self-auto"
          >
            VIEW DEMAND BOARD →
          </button>
        </div>

        {/* Clean Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-8 border-b border-blue-900 font-mono text-xs">
          
          {/* Col 1: Brand & Contact */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <div 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 cursor-pointer group w-fit"
            >
              <div className="h-8 w-8 bg-harvest-yellow text-ink-black border border-paper-white flex items-center justify-center font-black">
                <Sprout className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-heading font-black text-2xl tracking-tighter text-paper-white">
                FARMCHAIN
              </span>
            </div>
            <p className="text-warm-cream/80 text-[11px] leading-relaxed">
              Simple, transparent direct agricultural marketplace for farmers and wholesale buyers.
            </p>
            <div className="text-[11px] text-warm-cream space-y-1 pt-1">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-citrus-yellow" />
                <span>Helpline: <a href="tel:+918001234567" className="text-citrus-yellow hover:underline">+91 800 123 4567</a></span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-citrus-yellow" />
                <span>Support: <a href="mailto:support@farmchain.in" className="text-citrus-yellow hover:underline">support@farmchain.in</a></span>
              </p>
            </div>
          </div>

          {/* Col 2: Farmer Actions */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-xs text-citrus-yellow uppercase tracking-wider">
              FOR FARMERS
            </h4>
            <ul className="space-y-1.5 font-heading text-xs font-bold text-paper-white/90">
              <li>
                <button onClick={() => onNavigate('farmer')} className="hover:text-citrus-yellow transition-colors">
                  Farmer Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-citrus-yellow transition-colors">
                  My Orders & Pickups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-citrus-yellow transition-colors">
                  Live Market Demand
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('prices')} className="hover:text-citrus-yellow transition-colors">
                  APMC Mandi Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Logistics & Tools */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-xs text-citrus-yellow uppercase tracking-wider">
              OPERATIONS
            </h4>
            <ul className="space-y-1.5 font-heading text-xs font-bold text-paper-white/90">
              <li>
                <button onClick={() => onNavigate('logistics')} className="hover:text-citrus-yellow transition-colors">
                  Delivery Circuits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('forecast')} className="hover:text-citrus-yellow transition-colors">
                  Mandi Price Forecast
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buyer')} className="hover:text-citrus-yellow transition-colors">
                  Buyer Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('database')} className="hover:text-citrus-yellow transition-colors">
                  Database Schema
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Policies */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-xs text-citrus-yellow uppercase tracking-wider">
              LEGAL & SECURITY
            </h4>
            <ul className="space-y-1.5 font-heading text-xs font-bold text-paper-white/90">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-citrus-yellow transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-citrus-yellow transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
            <div className="pt-2 flex flex-wrap gap-1">
              <span className="text-[10px] bg-blue-900 text-citrus-yellow px-1.5 py-0.5 border border-blue-700 font-bold">
                ISO 22000
              </span>
              <span className="text-[10px] bg-blue-900 text-citrus-yellow px-1.5 py-0.5 border border-blue-700 font-bold">
                AGRISTACK
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-warm-cream/60">
          <p>© {new Date().getFullYear()} FarmChain Agri-Tech. All rights reserved.</p>
          <p>Built for Indian Farmers • Direct Demand Infrastructure</p>
        </div>

      </div>
    </footer>
  );
};
