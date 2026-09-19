import React, { useState } from 'react';
import { ShieldCheck, Sprout, ArrowRight, Phone, Mail, Globe, Heart } from 'lucide-react';
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
    <footer className="bg-[#163323] text-[#FBF8F2] border-t border-[#FBF8F2]/10 pt-16 pb-24 md:pb-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Core Direct Payout Promise Banner */}
        <div className="bg-[#FBF8F2]/5 backdrop-blur-sm rounded-3xl border border-[#FBF8F2]/10 p-6 sm:p-8 mb-12 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#A8B89A]/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#A8B89A] stroke-[2.2]" />
              </div>
              <strong className="font-editorial font-bold text-xl sm:text-2xl text-[#FBF8F2] tracking-tight">
                Our Promise: 0% Broker Commission
              </strong>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#FBF8F2]/75 leading-relaxed max-w-2xl">
              FarmChain does not buy, markup, or speculate on your crops. 100% of the agreed harvest price transfers directly to farmer bank accounts with village-gate pickup.
            </p>
          </div>

          <Button 
            variant="primary"
            size="md"
            onClick={() => onNavigate('market')}
            className="text-xs tracking-[0.14em] whitespace-nowrap self-start sm:self-auto shadow-soft-terracotta"
          >
            <span>BUY FRESH CROPS</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        {/* Newsletter Input */}
        <div className="py-10 border-y border-[#FBF8F2]/10 my-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-1.5 max-w-md">
            <span className="font-sans text-xs font-semibold text-[#E5B94A] uppercase tracking-[0.18em] block">
              VILLAGE HARVEST UPDATES
            </span>
            <p className="font-editorial text-2xl sm:text-3xl text-[#FBF8F2] font-bold leading-tight">
              Weekly notes on fresh crop arrivals &amp; direct farm prices.
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
                className="w-full bg-transparent border-b-2 border-[#FBF8F2]/30 focus:border-[#E5B94A] py-3 px-2 text-xs font-sans text-[#FBF8F2] placeholder-[#FBF8F2]/40 outline-none transition-colors uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className="w-11 h-11 rounded-full bg-[#E5B94A] text-[#163323] flex items-center justify-center hover:bg-[#FBF8F2] transition-all shadow-soft shrink-0 group disabled:opacity-75 cursor-pointer"
              title="Subscribe"
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-[#FBF8F2]/10 font-sans text-xs">
          
          {/* Col 1: Brand & Contact */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <div 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <div className="h-9 w-9 rounded-full bg-[#A8B89A]/20 text-[#E5B94A] border border-[#FBF8F2]/20 flex items-center justify-center shadow-soft">
                <Sprout className="w-5 h-5 stroke-[2.2] text-[#E5B94A]" />
              </div>
              <div>
                <span className="font-editorial font-bold text-2xl tracking-tight text-[#FBF8F2] block leading-none">
                  FarmChain
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A8B89A] block mt-0.5">
                  Direct From Farm
                </span>
              </div>
            </div>

            <p className="text-[#FBF8F2]/70 text-xs leading-relaxed">
              Direct farm-to-buyer marketplace for households, shops, restaurants, and wholesale buyers with zero broker fee.
            </p>

            <div className="text-xs text-[#FBF8F2]/85 space-y-1.5 pt-1 font-sans">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E5B94A]" />
                <span>Toll-Free: <a href="tel:18001024096" className="text-[#E5B94A] hover:underline font-mono">1800-102-4096</a></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E5B94A]" />
                <span>Support: <a href="mailto:help@farmchain.in" className="text-[#E5B94A] hover:underline">help@farmchain.in</a></span>
              </p>
            </div>
          </div>

          {/* Col 2: For Farmers & Buyers */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-[#E5B94A] uppercase tracking-[0.16em]">
              MARKETPLACE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FBF8F2]/80 font-medium">
              <li>
                <button onClick={() => onNavigate('market')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  Buy Fresh Crops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('prices')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  Today's Prices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cart')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  Your Cart
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Farmer Hub */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-[#E5B94A] uppercase tracking-[0.16em]">
              FOR PRODUCERS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FBF8F2]/80 font-medium">
              <li>
                <button onClick={() => onNavigate('farmer')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  My Farm Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  My Orders &amp; Pickups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('onboarding')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  Get Verified Tick
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Legal & Tech */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-[#E5B94A] uppercase tracking-[0.16em]">
              TRUST &amp; TECH
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FBF8F2]/80 font-medium">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-[#E5B94A] transition-colors uppercase tracking-wider text-[11px] cursor-pointer">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                {/* As requested: Tech & Design linked only from footer */}
                <button onClick={() => onNavigate('tech')} className="text-[#E5B94A] hover:underline font-bold uppercase tracking-wider text-[11px] cursor-pointer">
                  Tech &amp; Design →
                </button>
              </li>
            </ul>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-[10px] bg-[#FBF8F2]/10 text-[#FBF8F2] px-2.5 py-0.5 rounded-full border border-[#FBF8F2]/15 font-mono">
                SIH 2024–2026
              </span>
              <span className="text-[10px] bg-[#FBF8F2]/10 text-[#A8B89A] px-2.5 py-0.5 rounded-full border border-[#FBF8F2]/15 font-mono">
                0% BROKER FEE
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#FBF8F2]/60">
          <p>© {new Date().getFullYear()} FarmChain. Connecting Farmers Directly to Consumers.</p>
          <p className="tracking-wide">Village Pickup • Safe Payment • 0% Broker Fee</p>
        </div>

      </div>
    </footer>
  );
};
