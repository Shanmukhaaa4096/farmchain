import React, { useState } from 'react';
import { 
  Sprout, 
  Menu, 
  X, 
  UserCheck, 
  ChevronRight,
  TrendingUp,
  Truck,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { UserRole } from '../../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeRole,
  onRoleChange,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'HOW IT WORKS' },
    { id: 'marketplace', label: 'DEMAND BOARD' },
    { id: 'farmer', label: 'FARMER HUB' },
    { id: 'buyer', label: 'BUYER DESK' },
    { id: 'logistics', label: 'LOGISTICS' },
    { id: 'forecast', label: 'PRICE FORECAST' },
    { id: 'prices', label: 'MANDI PRICES' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-warm-cream border-b-brutal">
      {/* Top Digital Futurism Status Bar */}
      <div className="bg-ink-black text-paper-white px-4 py-1.5 text-xs font-mono flex items-center justify-between overflow-x-auto border-b-2 border-ink-black">
        <div className="flex items-center gap-4 shrink-0">
          <span className="flex items-center gap-1.5 text-harvest-yellow">
            <span className="h-2 w-2 rounded-full bg-terminal-green animate-pulse inline-block"></span>
            LIVE DEMAND NETWORK: 18.5 MT ACTIVE
          </span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-gray-300">
            TELANGANA × MAHARASHTRA × KARNATAKA
          </span>
        </div>

        {/* Role Quick Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-gray-400 text-[11px] hidden md:inline">VIEW AS:</span>
          <div className="flex border border-gray-600 bg-gray-900 p-0.5">
            <button
              onClick={() => onRoleChange('farmer')}
              className={`px-2 py-0.5 text-[11px] font-bold uppercase transition-colors ${
                activeRole === 'farmer' ? 'bg-harvest-yellow text-ink-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              FARMER
            </button>
            <button
              onClick={() => onRoleChange('buyer')}
              className={`px-2 py-0.5 text-[11px] font-bold uppercase transition-colors ${
                activeRole === 'buyer' ? 'bg-harvest-yellow text-ink-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              BUYER
            </button>
            <button
              onClick={() => onRoleChange('logistics')}
              className={`px-2 py-0.5 text-[11px] font-bold uppercase transition-colors ${
                activeRole === 'logistics' ? 'bg-harvest-yellow text-ink-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              LOGISTICS
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo & Neo-Brutalist Tag */}
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="h-11 w-11 bg-farm-green text-harvest-yellow border-brutal flex items-center justify-center shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              <Sprout className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-2xl tracking-tighter text-ink-black">
                  FARMCHAIN
                </span>
                <span className="bg-harvest-yellow border-2 border-ink-black text-[10px] font-mono font-bold px-1.5 py-0.2 text-ink-black">
                  v2.6
                </span>
              </div>
              <p className="font-mono text-[10px] text-farm-green font-bold tracking-widest uppercase">
                DEMAND × SUPPLY × LOGISTICS
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 font-heading text-xs font-bold tracking-wider transition-all border-2 ${
                    isActive
                      ? 'bg-ink-black text-paper-white border-ink-black shadow-brutal-sm -translate-y-0.5'
                      : 'border-transparent text-ink-black hover:border-ink-black hover:bg-paper-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="font-heading font-bold text-xs uppercase px-3 py-2 border-2 border-transparent hover:border-ink-black transition-all"
            >
              LOGIN
            </button>
            <Button
              variant="yellow"
              size="sm"
              onClick={() => onNavigate('marketplace')}
              className="flex items-center gap-1.5"
            >
              <span>JOIN FARMCHAIN</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="yellow"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-warm-cream border-t-brutal px-4 py-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 text-left font-heading text-xs font-bold tracking-wider border-brutal ${
                  currentView === item.id ? 'bg-harvest-yellow text-ink-black' : 'bg-paper-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t-2 border-ink-black flex flex-col gap-2">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                onNavigate('marketplace');
                setMobileMenuOpen(false);
              }}
            >
              EXPLORE DEMAND BOARD
            </Button>
            <Button
              variant="white"
              fullWidth
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
            >
              ACCOUNT AND VERIFICATION
            </Button>

            {/* Clickable Mobile Contacts */}
            <div className="pt-2 border-t border-ink-black/20 font-mono text-[11px] flex flex-col gap-1 text-gray-700">
              <a 
                href="tel:+918001234567" 
                className="font-bold text-farm-green hover:underline flex items-center gap-1.5 py-1"
              >
                CALL HELPDESK: +91 800 123 4567
              </a>
              <a 
                href="mailto:support@farmchain.in" 
                className="text-gray-800 hover:underline flex items-center gap-1.5"
              >
                EMAIL: support@farmchain.in
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
