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
  Sparkles, 
  ShieldCheck, 
  LogOut, 
  Key, 
  Building2, 
  User, 
  Phone, 
  ChevronDown, 
  UserPlus 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SketchAnnotation } from '../ui/SketchAccents';
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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeRole,
  onRoleChange,
  onOpenAuth,
  isAuthenticated = false,
  currentUser = null,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'HOW IT WORKS' },
    { id: 'marketplace', label: 'DEMAND BOARD' },
    { id: 'farmer', label: 'FARMER HUB' },
    { id: 'buyer', label: 'BUYER DESK' },
    { id: 'logistics', label: 'LOGISTICS' },
    { id: 'forecast', label: 'PRICE FORECAST' },
    { id: 'prices', label: 'MANDI PRICES' },
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
    <header className="sticky top-0 z-40 bg-paper-cream border-b-brutal">
      {/* Top Agricultural Status Bar (Blue Crate Palette) */}
      <div className="bg-blue-crate text-paper-white px-3 sm:px-4 py-1 text-xs font-mono flex items-center justify-between border-b-2 border-ink-black select-none">
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <span className="flex items-center gap-1.5 text-citrus-yellow font-bold text-[10px] sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-lettuce-green animate-pulse inline-block shrink-0"></span>
            <span className="hidden sm:inline">LIVE NETWORK:</span> 18.5 MT ACTIVE
          </span>
          <span className="text-blue-200/40 hidden md:inline">|</span>
          <span className="hidden md:inline text-paper-white/80 text-[11px]">
            TELANGANA × MAHARASHTRA × KARNATAKA
          </span>
        </div>

        {/* Role Quick Selector & Verified Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-1 bg-green-beans text-paper-white px-2 py-0.5 border border-paper-white/40 text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-citrus-yellow shrink-0" />
              <span className="truncate max-w-[90px] xs:max-w-[130px] sm:max-w-none">{currentUser.identifier}</span>
            </div>
          ) : (
            <span className="text-paper-white/60 text-[10px] hidden lg:inline">PUBLIC GUEST BROWSING</span>
          )}

          <span className="text-blue-200/40 hidden sm:inline">|</span>
          <div className="flex border border-blue-900 bg-[#1F265C] p-0.5">
            <button
              onClick={() => onRoleChange('farmer')}
              className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-bold uppercase transition-colors ${
                activeRole === 'farmer' ? 'bg-citrus-yellow text-ink-black' : 'text-paper-white/70 hover:text-white'
              }`}
              title="Switch to Farmer view"
            >
              FARMER
            </button>
            <button
              onClick={() => onRoleChange('buyer')}
              className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-bold uppercase transition-colors ${
                activeRole === 'buyer' ? 'bg-citrus-yellow text-ink-black' : 'text-paper-white/70 hover:text-white'
              }`}
              title="Switch to Buyer view"
            >
              BUYER
            </button>
            <button
              onClick={() => onRoleChange('logistics')}
              className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-bold uppercase transition-colors ${
                activeRole === 'logistics' ? 'bg-citrus-yellow text-ink-black' : 'text-paper-white/70 hover:text-white'
              }`}
              title="Switch to Logistics view"
            >
              LOGISTICS
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo & Neo-Brutalist Tag */}
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="h-9 w-9 sm:h-11 sm:w-11 bg-blue-crate text-citrus-yellow border-brutal flex items-center justify-center shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform shrink-0">
              <Sprout className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tighter text-blue-crate">
                  FARMCHAIN
                </span>
                <span className="bg-citrus-yellow border-2 border-ink-black text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.2 text-ink-black">
                  PRODUCE DEMAND
                </span>
                <SketchAnnotation text="NO MIDDLEMAN" color="orange" className="hidden xl:inline-block ml-1 text-sm -rotate-3" />
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-green-beans font-bold tracking-widest uppercase truncate max-w-[200px] sm:max-w-none">
                DEMAND × AGGREGATION × DIRECT CONTRACTS
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
                      ? 'bg-blue-crate text-paper-white border-ink-black shadow-brutal-sm -translate-y-0.5'
                      : 'border-transparent text-ink-black hover:border-ink-black hover:bg-paper-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Auth Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isAuthenticated && currentUser ? (
              <div className="relative">
                {/* User Profile Pill */}
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 bg-paper-white border-2 border-ink-black shadow-brutal-sm hover:bg-warm-cream transition-colors text-left"
                >
                  <div className="w-7 h-7 bg-blue-crate flex items-center justify-center border border-ink-black">
                    {getRoleIcon(currentUser.role)}
                  </div>
                  <div className="font-mono text-xs pr-1">
                    <span className="font-bold text-ink-black block leading-none truncate max-w-[110px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-farm-green font-bold uppercase">
                      {currentUser.role} VERIFIED ✓
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-paper-white border-brutal-thick shadow-brutal-lg p-3 font-mono text-xs space-y-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="pb-2 border-b border-ink-black/20">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">AUTHENTICATED IDENTITY</div>
                      <strong className="font-heading font-black text-sm text-ink-black block">
                        {currentUser.name}
                      </strong>
                      <span className="text-[11px] text-gray-600 block">
                        @{currentUser.username} • +91 {currentUser.mobileNumber}
                      </span>
                      <div className="mt-1 bg-warm-cream p-1 border border-ink-black font-bold text-[10px] text-blue-crate">
                        {currentUser.identifier}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          onNavigate(currentUser.role === 'farmer' ? 'farmer' : currentUser.role === 'buyer' ? 'buyer' : 'logistics');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left p-1.5 hover:bg-citrus-yellow font-bold uppercase flex items-center justify-between"
                      >
                        <span>GO TO {currentUser.role.toUpperCase()} DESK</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {onSignOut && (
                        <button
                          onClick={() => {
                            onSignOut();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left p-1.5 text-tomato-red hover:bg-red-50 font-bold uppercase flex items-center gap-1.5 border-t border-ink-black/10 pt-2 mt-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>SIGN OUT OF FARMSYSTEM</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="font-heading font-bold text-xs uppercase px-3 py-2 border-2 border-ink-black bg-paper-white text-blue-crate hover:bg-citrus-yellow hover:text-ink-black shadow-brutal-sm transition-all flex items-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>LOGIN</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="font-heading font-bold text-xs uppercase px-3 py-2 border-2 border-ink-black bg-citrus-yellow text-ink-black hover:bg-harvest-yellow shadow-brutal-sm transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>SIGN UP</span>
                </button>
              </div>
            )}

            <Button
              variant="yellow"
              size="sm"
              onClick={() => onNavigate('marketplace')}
              className="flex items-center gap-1.5"
            >
              <span className="hidden md:inline">DEMAND</span>
              <span>BOARD</span>
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
        <div className="lg:hidden bg-paper-cream border-t-brutal px-4 py-5 space-y-3 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          {/* Mobile Navigation Grid */}
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 text-left font-heading text-xs font-bold tracking-wider border-brutal transition-colors ${
                  currentView === item.id ? 'bg-citrus-yellow text-ink-black' : 'bg-paper-white hover:bg-warm-cream'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Account / Auth Area */}
          <div className="pt-2 border-t-2 border-ink-black flex flex-col gap-2">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                onNavigate('marketplace');
                setMobileMenuOpen(false);
              }}
            >
              EXPLORE DEMAND BOARD →
            </Button>

            {isAuthenticated && currentUser ? (
              <div className="p-3 bg-paper-white border-2 border-ink-black shadow-brutal-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-crate flex items-center justify-center text-citrus-yellow">
                      {getRoleIcon(currentUser.role)}
                    </div>
                    <div>
                      <strong className="font-heading font-black text-sm uppercase text-ink-black block leading-tight">
                        {currentUser.name}
                      </strong>
                      <span className="font-mono text-[10px] text-gray-600">
                        @{currentUser.username} • +91 {currentUser.mobileNumber}
                      </span>
                    </div>
                  </div>
                  <Badge variant="lettuce" size="sm">
                    {currentUser.role.toUpperCase()} ✓
                  </Badge>
                </div>

                <div className="p-1.5 bg-warm-cream border border-ink-black font-mono text-[10px] font-bold text-ink-black">
                  CREDENTIAL: {currentUser.identifier}
                </div>

                {onSignOut && (
                  <button
                    onClick={() => {
                      onSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-red-50 border border-tomato-red text-tomato-red font-mono text-xs font-bold uppercase hover:bg-tomato-red hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>SIGN OUT OF ACCOUNT</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="white"
                  fullWidth
                  onClick={() => {
                    onOpenAuth('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold"
                >
                  <Key className="w-3.5 h-3.5 mr-1" /> LOGIN
                </Button>

                <Button
                  variant="yellow"
                  fullWidth
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1" /> SIGN UP
                </Button>
              </div>
            )}

            {/* Clickable Mobile Contacts */}
            <div className="pt-2 border-t border-ink-black/20 font-mono text-[11px] flex flex-col gap-1 text-gray-700">
              <a 
                href="tel:+918001234567" 
                className="font-bold text-blue-crate hover:underline flex items-center gap-1.5 py-1"
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
