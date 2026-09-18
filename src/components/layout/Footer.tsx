import React, { useState } from 'react';
import { ShieldCheck, Sprout, ArrowRight, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '../ui/Button';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-dark-text text-paper-bg border-t border-pure-white/10 pt-16 pb-24 md:pb-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Core Direct Payout Promise Banner (Soft rounded card with hairline border) */}
        <div className="bg-pure-white/5 backdrop-blur-sm rounded-3xl border border-pure-white/10 p-6 sm:p-8 mb-12 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-soft-green/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-soft-green stroke-[2.2]" />
              </div>
              <strong className="font-editorial font-bold text-xl sm:text-2xl text-pure-white tracking-tight">
                Our Promise: 0% Broker Commission
              </strong>
            </div>
            <p className="font-sans text-xs sm:text-sm text-paper-bg/75 leading-relaxed max-w-2xl">
              FarmChain does not buy, markup, or resell your produce. All payments transfer 100% directly from verified buyers into your bank account.
            </p>
          </div>

          <Button 
            variant="clay"
            size="md"
            onClick={() => onNavigate('marketplace')}
            className="text-xs tracking-[0.14em] whitespace-nowrap self-start sm:self-auto shadow-soft-terracotta"
          >
            <span>VIEW DEMAND BOARD</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        {/* Compact Newsletter Input (Pill / Underline style with circular arrow submit) */}
        <div className="py-10 border-y border-pure-white/10 my-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-1.5 max-w-md">
            <span className="font-sans text-xs font-semibold text-accent-yellow uppercase tracking-[0.18em] block">
              JOIN THE HARVEST BULLETIN
            </span>
            <p className="font-editorial text-2xl sm:text-3xl text-pure-white font-bold leading-tight">
              Thoughtful notes on seasonal arrivals &amp; direct mandi corridors.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-3 w-full max-w-md">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder={subscribed ? "Thank you for subscribing!" : "ENTER EMAIL ADDRESS..."}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                required
                className="w-full bg-transparent border-b-2 border-pure-white/30 focus:border-accent-yellow py-3 px-2 text-xs font-sans text-pure-white placeholder-pure-white/40 outline-none transition-colors uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className="w-11 h-11 rounded-full bg-accent-yellow text-dark-text flex items-center justify-center hover:bg-pure-white transition-all shadow-soft shrink-0 group disabled:opacity-75 cursor-pointer"
              title="Subscribe"
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        {/* Clean Link Columns (Editorial 4-Column Directory) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-pure-white/10 font-sans text-xs">
          
          {/* Col 1: Brand & Contact */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <div 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <div className="h-9 w-9 rounded-full bg-soft-green/20 text-accent-yellow border border-pure-white/20 flex items-center justify-center shadow-soft">
                <Sprout className="w-5 h-5 stroke-[2.2] text-accent-yellow" />
              </div>
              <div>
                <span className="font-editorial font-bold text-2xl tracking-tight text-pure-white block leading-none">
                  FarmChain
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-paper-bg/60 block mt-0.5">
                  Natural Demand
                </span>
              </div>
            </div>

            <p className="text-paper-bg/70 text-xs leading-relaxed">
              Transparent, direct agricultural marketplace connecting Indian farmers directly with commercial wholesale demand.
            </p>

            <div className="text-xs text-paper-bg/85 space-y-1.5 pt-1 font-sans">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent-yellow" />
                <span>Helpline: <a href="tel:+918001234567" className="text-accent-yellow hover:underline">+91 800 123 4567</a></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-yellow" />
                <span>Support: <a href="mailto:support@farmchain.in" className="text-accent-yellow hover:underline">support@farmchain.in</a></span>
              </p>
            </div>

            {/* Social Icons in Circles */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="#instagram" 
                className="w-9 h-9 rounded-full border border-pure-white/20 flex items-center justify-center hover:border-accent-yellow hover:text-accent-yellow hover:bg-pure-white/5 transition-all text-paper-bg/80"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="#twitter" 
                className="w-9 h-9 rounded-full border border-pure-white/20 flex items-center justify-center hover:border-accent-yellow hover:text-accent-yellow hover:bg-pure-white/5 transition-all text-paper-bg/80"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="#network" 
                className="w-9 h-9 rounded-full border border-pure-white/20 flex items-center justify-center hover:border-accent-yellow hover:text-accent-yellow hover:bg-pure-white/5 transition-all text-paper-bg/80"
                aria-label="Network"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Farmer Actions */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-accent-yellow uppercase tracking-[0.16em]">
              FOR FARMERS
            </h4>
            <ul className="space-y-2.5 text-xs text-paper-bg/80 font-medium">
              <li>
                <button onClick={() => onNavigate('farmer')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Farmer Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  My Orders &amp; Pickups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Live Market Demand
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('prices')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  APMC Mandi Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Operations & Tools */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-accent-yellow uppercase tracking-[0.16em]">
              OPERATIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-paper-bg/80 font-medium">
              <li>
                <button onClick={() => onNavigate('logistics')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Delivery Circuits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('forecast')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Mandi Price Forecast
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buyer')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Buyer Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('database')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Database Schema
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Policies */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-accent-yellow uppercase tracking-[0.16em]">
              LEGAL &amp; STANDARDS
            </h4>
            <ul className="space-y-2.5 text-xs text-paper-bg/80 font-medium">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-accent-yellow transition-colors uppercase tracking-wider text-[11px]">
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-[10px] bg-pure-white/10 text-pure-white px-3 py-1 rounded-full border border-pure-white/15 font-semibold tracking-wider uppercase">
                ISO 22000
              </span>
              <span className="text-[10px] bg-pure-white/10 text-pure-white px-3 py-1 rounded-full border border-pure-white/15 font-semibold tracking-wider uppercase">
                AGRISTACK
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-paper-bg/60">
          <p>© {new Date().getFullYear()} FarmChain Agri-Tech. All rights reserved.</p>
          <p className="tracking-wide">Built for Indian Farmers • Direct Demand Infrastructure</p>
        </div>

      </div>
    </footer>
  );
};
