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

  // 4-5 core farmer-first nav items
  const primaryNavItems = [
    { id: 'landing', label: 'HOME', icon: Home },
    { id: 'farmer', label: 'SELL PRODUCE', icon: PlusCircle },
    { id: 'orders', label: 'ORDERS', icon: PackageCheck },
    { id: 'marketplace', label: 'MARKET DEMAND', icon: TrendingUp },
    { id: 'logistics', label: 'DELIVERY', icon: Truck },
  ];

  const secondaryTools = [
    { id: 'prices', label: 'Mandi Prices', desc: 'Govt APMC benchmark rates' },
    { id: 'forecast', label: 'Price Forecast', desc: 'AI 7-day crop demand curves' },
    { id: 'buyer', label: 'Commercial Buyer Desk', desc: 'Restaurant & processor portal' },
    { id: 'database', label: 'System Architecture', desc: 'Scalability & schema documentation' },
  ];

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        return <Sprout className="w-3.5 h-3.5 text-citrus-yellow" />;
      case 'buyer':
        return <Building2 className="w-3.5 h-3.5 text-citrus-yellow" />;
      case 'logistics':
        return <Truck className="w-3.5 h-3.5 text-citrus-yellow" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper-cream border-b-brutal">
        {/* Simple, Uncluttered Top Status Bar */}
        <div className="bg-blue-crate text-paper-white px-3 sm:px-4 py-1 text-xs font-mono flex items-center justify-between border-b-2 border-ink-black select-none">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lettuce-green animate-pulse inline-block shrink-0"></span>
            <span className="font-bold text-citrus-yellow text-[11px] sm:text-xs">
              18.5 MT ACTIVE DEMAND
            </span>
            <span className="text-blue-200/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-paper-white/80 text-[11px]">
              Direct Payout • Zero Middleman Fee
            </span>
          </div>

          {/* Role Quick Selector */}
          <div className="flex items-center gap-2">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-1 bg-green-beans text-paper-white px-2 py-0.5 border border-paper-white/40 text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-citrus-yellow shrink-0" />
                <span className="truncate max-w-[100px] sm:max-w-none">{currentUser.name}</span>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('signin')}
                className="text-citrus-yellow font-bold text-[10px] sm:text-xs hover:underline"
              >
                SIGN IN →
              </button>
            )}

            <span className="text-blue-200/40">|</span>
            
            {/* Quick Profile/Role switcher */}
            <div className="flex border border-blue-900 bg-[#1F265C] p-0.5">
              <button
                onClick={() => onRoleChange('farmer')}
                className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase transition-colors ${
                  activeRole === 'farmer' ? 'bg-citrus-yellow text-ink-black' : 'text-paper-white/70 hover:text-white'
                }`}
                title="Switch to Farmer mode"
              >
                FARMER
              </button>
              <button
                onClick={() => onRoleChange('buyer')}
                className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase transition-colors ${
                  activeRole === 'buyer' ? 'bg-citrus-yellow text-ink-black' : 'text-paper-white/70 hover:text-white'
                }`}
                title="Switch to Buyer mode"
              >
                BUYER
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Brand Logo */}
            <div 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0"
            >
              <div className="h-9 w-9 bg-blue-crate text-citrus-yellow border-2 border-ink-black flex items-center justify-center shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <Sprout className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tighter text-blue-crate block leading-none">
                  FARMCHAIN
                </span>
                <span className="font-mono text-[9px] text-green-beans font-bold tracking-wider uppercase block">
                  DIRECT PRODUCE MARKET
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links (Clean 4-5 Items + More Dropdown) */}
            <nav className="hidden md:flex items-center gap-1 font-heading text-xs font-bold">
              {primaryNavItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-1.5 border-2 transition-all ${
                      isActive
                        ? 'bg-blue-crate text-paper-white border-ink-black shadow-brutal-sm -translate-y-0.5'
                        : 'border-transparent text-ink-black hover:border-ink-black hover:bg-paper-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* More Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreToolsOpen(!moreToolsOpen)}
                  className="px-2.5 py-1.5 border-2 border-transparent hover:border-ink-black hover:bg-paper-white text-ink-black flex items-center gap-1 font-heading text-xs font-bold transition-all"
                >
                  <span>MORE</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {moreToolsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-paper-white border-brutal shadow-brutal-lg p-2 font-mono text-xs space-y-1 z-50">
                    <div className="text-[10px] text-gray-500 font-bold uppercase px-2 py-1 border-b border-gray-200">
                      ADDITIONAL TOOLS
                    </div>
                    {secondaryTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          onNavigate(tool.id);
                          setMoreToolsOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-citrus-yellow transition-colors block"
                      >
                        <strong className="font-heading font-bold text-xs uppercase block text-ink-black">
                          {tool.label}
                        </strong>
                        <span className="text-[10px] text-gray-600 block">
                          {tool.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-2">
              {onOpenSellModal ? (
                <Button
                  variant="yellow"
                  size="sm"
                  onClick={onOpenSellModal}
                  className="flex items-center gap-1.5 font-heading font-black text-xs"
                >
                  <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>SELL PRODUCE</span>
                </Button>
              ) : (
                <Button
                  variant="yellow"
                  size="sm"
                  onClick={() => onNavigate('farmer')}
                  className="flex items-center gap-1.5 font-heading font-black text-xs"
                >
                  <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>SELL PRODUCE</span>
                </Button>
              )}

              {/* User Profile Pill / Auth Button */}
              {isAuthenticated && currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1.5 bg-paper-white border-2 border-ink-black shadow-brutal-sm hover:bg-warm-cream transition-colors"
                  >
                    <div className="w-6 h-6 bg-blue-crate flex items-center justify-center border border-ink-black">
                      {getRoleIcon(currentUser.role)}
                    </div>
                    <span className="font-mono text-xs font-bold text-ink-black max-w-[90px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-paper-white border-brutal shadow-brutal-lg p-3 font-mono text-xs space-y-2 z-50">
                      <div className="pb-2 border-b border-gray-200">
                        <strong className="font-heading font-bold text-sm text-ink-black block">
                          {currentUser.name}
                        </strong>
                        <span className="text-[10px] text-gray-600 block">
                          +91 {currentUser.mobileNumber}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onNavigate('orders');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left p-1.5 hover:bg-citrus-yellow font-bold uppercase block"
                      >
                        VIEW MY ORDERS
                      </button>
                      {onSignOut && (
                        <button
                          onClick={() => {
                            onSignOut();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left p-1.5 text-tomato-red hover:bg-red-50 font-bold uppercase flex items-center gap-1.5 border-t border-gray-200 pt-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>SIGN OUT</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="font-heading font-bold text-xs uppercase px-2.5 py-1.5 border-2 border-ink-black bg-paper-white text-blue-crate hover:bg-citrus-yellow shadow-brutal-sm transition-all"
                >
                  LOGIN
                </button>
              )}
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="flex md:hidden items-center gap-2">
              {onOpenSellModal && (
                <Button
                  variant="yellow"
                  size="sm"
                  onClick={onOpenSellModal}
                  className="font-heading font-black text-xs px-2.5 py-1"
                >
                  + SELL
                </Button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 bg-paper-white border-2 border-ink-black shadow-brutal-sm"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Full Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-paper-cream border-t-brutal px-4 py-4 space-y-3 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
            <div className="text-[10px] font-mono font-bold text-gray-500 uppercase">
              MAIN SECTIONS
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 text-left font-heading text-xs font-bold border-brutal flex items-center gap-2 ${
                      isActive ? 'bg-citrus-yellow text-ink-black' : 'bg-paper-white hover:bg-warm-cream'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] font-mono font-bold text-gray-500 uppercase pt-2">
              MARKET & ANALYTICS TOOLS
            </div>

            <div className="space-y-1.5">
              {secondaryTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onNavigate(tool.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 bg-paper-white border border-ink-black flex items-center justify-between"
                >
                  <div>
                    <strong className="font-heading font-bold text-xs uppercase block text-ink-black">
                      {tool.label}
                    </strong>
                    <span className="font-mono text-[10px] text-gray-600 block">
                      {tool.desc}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>

            {/* Auth section */}
            <div className="pt-2 border-t-2 border-ink-black">
              {isAuthenticated && currentUser ? (
                <div className="flex items-center justify-between p-2.5 bg-paper-white border border-ink-black">
                  <div>
                    <strong className="font-heading font-bold text-xs uppercase block text-ink-black">
                      {currentUser.name}
                    </strong>
                    <span className="font-mono text-[10px] text-gray-600">
                      +91 {currentUser.mobileNumber}
                    </span>
                  </div>
                  {onSignOut && (
                    <button
                      onClick={() => {
                        onSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="text-tomato-red font-mono text-xs font-bold hover:underline"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              ) : (
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    onOpenAuth('signin');
                    setMobileMenuOpen(false);
                  }}
                >
                  SIGN IN / REGISTER →
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Thumb-Friendly for Phones) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper-white border-t-2 border-ink-black shadow-brutal-lg select-none">
        <div className="grid grid-cols-5 h-15">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-1 transition-colors ${
                  isActive ? 'bg-citrus-yellow text-ink-black font-black' : 'text-gray-700 hover:bg-warm-cream'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="font-heading text-[10px] uppercase tracking-tighter mt-0.5 leading-none">
                  {item.label === 'SELL PRODUCE' ? 'SELL' : item.label === 'MARKET DEMAND' ? 'MARKET' : item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
