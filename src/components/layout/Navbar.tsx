import React, { useState } from 'react';
import { 
  Sprout, 
  Menu, 
  X, 
  ChevronRight, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  LogOut, 
  Key, 
  Building2, 
  ChevronDown, 
  UserPlus,
  PackageCheck,
  PlusCircle,
  Home,
  SlidersHorizontal,
  MoreVertical
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { UserRole, AuthUser } from '../../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  isAuthenticated?: boolean;
  currentUser?: AuthUser | null;
  onSignOut?: () => void;
  onOpenSellModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeRole,
  onRoleChange,
  onOpenAuth,
  isAuthenticated = false,
  currentUser = null,
  onSignOut,
  onOpenSellModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreToolsOpen, setMoreToolsOpen] = useState(false);

  // Minimal clean editorial navigation items
  const primaryNavItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'farmer', label: 'For Farmers', icon: Sprout },
    { id: 'buyer', label: 'For Buyers', icon: Building2 },
    { id: 'how-it-works', label: 'How It Works', icon: TrendingUp },
  ];

  const secondaryTools = [
    { id: 'orders', label: 'Orders Ledger', desc: 'Track active & past contracts' },
    { id: 'marketplace', label: 'Market Demand', desc: 'Browse live buyer requirements' },
    { id: 'logistics', label: 'Delivery & Logistics', desc: 'Fleet telemetry & dispatch' },
    { id: 'prices', label: 'Mandi Prices', desc: 'Govt APMC benchmark rates' },
    { id: 'forecast', label: 'Price Forecast', desc: 'AI 7-day crop demand curves' },
    { id: 'database', label: 'System Architecture', desc: 'Schema & scalability docs' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'how-it-works') {
      if (currentView === 'landing') {
        const journeyEl = document.getElementById('farm-to-market-journey') || document.getElementById('journey');
        if (journeyEl) {
          journeyEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      onNavigate('about');
      return;
    }
    onNavigate(id);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        return <Sprout className="w-3.5 h-3.5 text-accent-yellow" />;
      case 'buyer':
        return <Building2 className="w-3.5 h-3.5 text-accent-yellow" />;
      case 'logistics':
        return <Truck className="w-3.5 h-3.5 text-accent-yellow" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper-bg/95 border-b border-dark-text/10 backdrop-blur-md">
        {/* Minimal Editorial Top Ticker */}
        <div className="bg-primary-green text-pure-white px-4 sm:px-6 py-1.5 text-xs font-mono flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow animate-pulse shrink-0"></span>
            <span className="font-bold text-accent-yellow text-[11px] tracking-wider uppercase">
              18.5 MT ACTIVE WHOLESALE DEMAND
            </span>
            <span className="text-pure-white/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-pure-white/90 text-[11px]">
              Direct Farm-Gate Payout • 0% Broker Intermediary Fees
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            {isAuthenticated && currentUser ? (
              <span className="text-pure-white/90 font-mono text-[10px] hidden sm:inline">
                Signed in as <strong className="text-accent-yellow">{currentUser.name}</strong>
              </span>
            ) : (
              <button
                onClick={() => onOpenAuth('signin')}
                className="text-accent-yellow font-bold hover:underline"
              >
                SIGN IN →
              </button>
            )}
          </div>
        </div>

        {/* Main Centered Minimal Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Nav Links: FOR FARMERS | FOR BUYERS | HOW IT WORKS */}
            <nav className="hidden lg:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.15em] font-semibold text-dark-text/80">
              <button
                onClick={() => handleNavClick('farmer')}
                className={`transition-colors py-1 hover:text-primary-green border-b pb-0.5 ${
                  currentView === 'farmer' ? 'border-primary-green text-primary-green' : 'border-transparent'
                }`}
              >
                FOR FARMERS
              </button>
              <button
                onClick={() => handleNavClick('buyer')}
                className={`transition-colors py-1 hover:text-primary-green border-b pb-0.5 ${
                  currentView === 'buyer' ? 'border-primary-green text-primary-green' : 'border-transparent'
                }`}
              >
                FOR BUYERS
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className="transition-colors py-1 hover:text-primary-green border-b border-transparent pb-0.5"
              >
                HOW IT WORKS
              </button>

              {/* More Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreToolsOpen(!moreToolsOpen)}
                  className="uppercase tracking-[0.15em] text-dark-text/70 hover:text-dark-text flex items-center gap-1 py-1 transition-colors"
                >
                  <span>MORE</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {moreToolsOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-pure-white border border-dark-text/15 rounded-2xl shadow-soft p-3 font-sans text-xs space-y-1.5 z-50">
                    <div className="text-[10px] text-mandi-charcoal-muted font-mono font-bold uppercase px-2 py-1 border-b border-dark-text/10">
                      APPLICATION TOOLS & LEDGERS
                    </div>
                    {secondaryTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          onNavigate(tool.id);
                          setMoreToolsOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-paper-bg transition-colors block"
                      >
                        <strong className="font-editorial text-sm font-bold text-dark-text block">
                          {tool.label}
                        </strong>
                        <span className="text-[11px] text-mandi-charcoal-muted block">
                          {tool.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button (Left on mobile) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-dark-text hover:text-primary-green"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo (Centered in chunky retro Fraunces serif) */}
            <div 
              onClick={() => onNavigate('landing')}
              className="flex flex-col items-center justify-center cursor-pointer select-none group"
            >
              <span className="font-editorial font-bold text-2xl sm:text-3xl tracking-tight text-dark-text leading-none group-hover:text-primary-green transition-colors">
                FarmChain
              </span>
              <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-dark-text/50 mt-1">
                — NATURAL DEMAND —
              </span>
            </div>

            {/* Right Action CTAs: MARKETPLACE | PRICES | LOGIN | JOIN */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden lg:flex items-center gap-7 font-sans text-xs uppercase tracking-[0.15em] font-semibold text-dark-text/80">
                <button
                  onClick={() => onNavigate('marketplace')}
                  className={`transition-colors py-1 hover:text-primary-green border-b pb-0.5 ${
                    currentView === 'marketplace' ? 'border-primary-green text-primary-green' : 'border-transparent'
                  }`}
                >
                  MARKETPLACE
                </button>
                <button
                  onClick={() => onNavigate('prices')}
                  className={`transition-colors py-1 hover:text-primary-green border-b pb-0.5 ${
                    currentView === 'prices' ? 'border-primary-green text-primary-green' : 'border-transparent'
                  }`}
                >
                  PRICES
                </button>
              </div>

              {isAuthenticated && currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-pure-white border border-dark-text/15 rounded-full shadow-soft-sm hover:bg-paper-bg transition-colors"
                  >
                    <div className="w-5 h-5 bg-primary-green rounded-full flex items-center justify-center">
                      {getRoleIcon(currentUser.role)}
                    </div>
                    <span className="font-sans text-xs font-semibold text-dark-text max-w-[100px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-dark-text/60" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-pure-white border border-dark-text/15 rounded-2xl shadow-soft-lg p-3 font-sans text-xs space-y-2 z-50">
                      <div className="pb-2 border-b border-dark-text/10">
                        <strong className="font-editorial font-bold text-sm text-dark-text block">
                          {currentUser.name}
                        </strong>
                        <span className="text-[10px] text-primary-green uppercase font-bold">
                          {currentUser.role} Account
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onNavigate(currentUser.role === 'buyer' ? 'buyer' : 'farmer');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-primary-green block"
                      >
                        Dashboard →
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('orders');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-primary-green block"
                      >
                        My Orders →
                      </button>
                      {onSignOut && (
                        <button
                          onClick={() => {
                            onSignOut();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left py-1 text-terracotta hover:underline block pt-2 border-t border-dark-text/10"
                        >
                          Sign Out
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="px-3 py-1.5 text-xs font-sans font-semibold tracking-[0.14em] text-dark-text uppercase hover:text-primary-green transition-colors"
                  >
                    SIGN IN
                  </button>

                  <Button
                    variant="clay"
                    size="sm"
                    onClick={() => onOpenAuth('signup')}
                    className="text-[11px]"
                  >
                    JOIN
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Full Drawer Menu (Soft Retro Editorial) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-paper-bg border-t border-dark-text/10 px-5 py-6 space-y-5 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto font-sans">
            <div className="text-xs font-semibold text-primary-green uppercase tracking-[0.18em]">
              MAIN SECTIONS
            </div>
            
            <div className="grid grid-cols-2 gap-2.5">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavClick(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3.5 text-left font-sans text-xs font-semibold uppercase tracking-wider rounded-2xl border transition-all flex items-center gap-2.5 ${
                      isActive 
                        ? 'bg-primary-green text-pure-white border-primary-green shadow-soft' 
                        : 'bg-pure-white text-dark-text border-dark-text/10 hover:bg-pure-white/80 shadow-soft-sm'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-semibold text-primary-green uppercase tracking-[0.18em] pt-2">
              MARKET &amp; ANALYTICS TOOLS
            </div>

            <div className="space-y-2">
              {secondaryTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onNavigate(tool.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-3.5 bg-pure-white rounded-2xl border border-dark-text/10 flex items-center justify-between shadow-soft-sm hover:border-dark-text/30 transition-colors"
                >
                  <div>
                    <strong className="font-editorial font-bold text-sm text-dark-text block">
                      {tool.label}
                    </strong>
                    <span className="font-sans text-xs text-mandi-charcoal-muted block mt-0.5">
                      {tool.desc}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-dark-text/40" />
                </button>
              ))}
            </div>

            {/* Auth section */}
            <div className="pt-4 border-t border-dark-text/10">
              {isAuthenticated && currentUser ? (
                <div className="flex items-center justify-between p-4 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft-sm">
                  <div>
                    <strong className="font-editorial font-bold text-base block text-dark-text">
                      {currentUser.name}
                    </strong>
                    <span className="font-sans text-[11px] text-primary-green font-semibold uppercase tracking-wider">
                      {currentUser.role} Account
                    </span>
                  </div>
                  {onSignOut && (
                    <button
                      onClick={() => {
                        onSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="text-terracotta font-sans text-xs font-semibold uppercase tracking-wider hover:underline"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onOpenAuth('signin');
                      setMobileMenuOpen(false);
                    }}
                    className="py-3 text-center text-xs font-sans font-semibold uppercase tracking-wider rounded-full bg-pure-white border border-dark-text/15 text-dark-text shadow-soft"
                  >
                    SIGN IN
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="py-3 text-center text-xs font-sans font-semibold uppercase tracking-wider rounded-full bg-primary-green text-pure-white shadow-soft"
                  >
                    JOIN
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Pill-shaped floating/docked thumb navigation) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-pure-white/95 backdrop-blur-md border-t border-dark-text/10 shadow-soft-lg select-none">
        <div className="grid grid-cols-4 h-15 max-w-md mx-auto">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center py-2 transition-colors ${
                  isActive ? 'text-primary-green font-bold' : 'text-dark-text/70 hover:text-dark-text'
                }`}
              >
                <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-soft-green/25' : ''}`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5] text-primary-green' : 'stroke-2'}`} />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-wider mt-0.5 leading-none font-semibold">
                  {item.id === 'how-it-works' ? 'JOURNEY' : item.label.replace('For ', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
