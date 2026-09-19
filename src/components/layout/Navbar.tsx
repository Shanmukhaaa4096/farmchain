import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Menu, 
  X, 
  TrendingUp, 
  Truck, 
  Building2, 
  ChevronDown, 
  Home, 
  Globe,
  ShieldCheck,
  ShoppingCart,
  HelpCircle,
  Clock,
  Package,
  CheckCircle2,
  FileCheck2,
  ListOrdered
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import { UserRole, AuthUser } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../i18n/translations';
import { useCart } from '../../context/CartContext';
import { useDataSaver } from '../../context/DataSaverContext';
import { Zap, ZapOff } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: { id?: string }) => void;
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
  const { language, setLanguage, t } = useLanguage();
  const { itemCount } = useCart();
  const { isDataSaver, toggleDataSaver } = useDataSaver();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Close mobile menu whenever view changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView]);

  // Determine current user effective role
  const effectiveRole: UserRole | 'logged_out' = 
    isAuthenticated && currentUser ? currentUser.role : 'logged_out';

  // Build role-based nav items strictly adhering to user instructions:
  // Logged out: Buy Fresh Crops, Today's Prices, How it Works, Help, Login
  // Farmer: My Farm, My Crops, My Orders, Today's Prices, Best Time to Sell
  // Buyer: Buy Fresh Crops, My Orders, Cart, Today's Prices
  // Admin: Verification Requests, All Orders
  const getNavItems = () => {
    if (!isAuthenticated || !currentUser) {
      return [
        { id: 'market', label: t.nav.buyFreshCrops, sub: t.nav.buyFreshCropsSub, icon: Sprout },
        { id: 'prices', label: t.nav.todaysPrices, sub: t.nav.todaysPricesSub, icon: TrendingUp },
        { id: 'how-it-works', label: t.nav.howItWorks, sub: t.nav.howItWorksSub, icon: CheckCircle2 },
        { id: 'help', label: t.nav.help, sub: t.nav.helpSub, icon: HelpCircle },
      ];
    }

    if (currentUser.role === 'farmer') {
      return [
        { id: 'farmer', label: t.nav.myFarm, sub: 'Your farm hub & active offers', icon: Sprout },
        { id: 'farmer', label: t.nav.myCrops, sub: 'Manage crops for sale', icon: Package },
        { id: 'orders', label: t.nav.myOrders, sub: t.nav.myOrdersSub, icon: ListOrdered },
        { id: 'prices', label: t.nav.todaysPrices, sub: t.nav.todaysPricesSub, icon: TrendingUp },
        { id: 'prices', label: t.nav.bestTimeToSell, sub: t.nav.bestTimeToSellSub, icon: Clock },
      ];
    }

    if (currentUser.role === 'buyer') {
      return [
        { id: 'market', label: t.nav.buyFreshCrops, sub: t.nav.buyFreshCropsSub, icon: Sprout },
        { id: 'orders', label: t.nav.myOrders, sub: t.nav.myOrdersSub, icon: ListOrdered },
        { id: 'cart', label: `${t.nav.cart}${itemCount > 0 ? ` (${itemCount})` : ''}`, sub: 'Review selected fresh crops', icon: ShoppingCart },
        { id: 'prices', label: t.nav.todaysPrices, sub: t.nav.todaysPricesSub, icon: TrendingUp },
      ];
    }

    if (currentUser.role === 'admin') {
      return [
        { id: 'admin', label: t.nav.verificationRequests, sub: 'Review farmer & buyer documents', icon: FileCheck2 },
        { id: 'orders', label: t.nav.allOrders, sub: 'Oversee full network dispatch', icon: ListOrdered },
      ];
    }

    // Default fallback
    return [
      { id: 'market', label: t.nav.buyFreshCrops, sub: t.nav.buyFreshCropsSub, icon: Sprout },
      { id: 'prices', label: t.nav.todaysPrices, sub: t.nav.todaysPricesSub, icon: TrendingUp },
      { id: 'orders', label: t.nav.myOrders, sub: t.nav.myOrdersSub, icon: ListOrdered },
    ];
  };

  const navItems = getNavItems();

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'EN',
    hi: 'हिन्दी',
    te: 'తెలుగు',
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F4EFE6]/95 border-b border-[#2F4A3A]/10 backdrop-blur-md">
        
        {/* Editorial Top Ticker */}
        <div className="bg-[#163323] text-[#FBF8F2] px-4 sm:px-6 py-1.5 text-xs font-mono flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5B94A] animate-pulse shrink-0" />
            <span className="font-bold text-[#E5B94A] text-[11px] tracking-wider uppercase">
              100% DIRECT FROM FARM
            </span>
            <span className="text-[#FBF8F2]/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-[#FBF8F2]/90 text-[11px]">
              0% Broker Fee • Direct Bank Deposit • Village Pickup
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Language Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase text-[#E5B94A] hover:text-[#FBF8F2] transition-colors cursor-pointer min-h-[32px]"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{languageLabels[language]}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-[#FBF8F2] border border-[#2F4A3A]/15 rounded-xl shadow-soft p-1 z-50 text-[#163323] font-sans">
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1 text-xs rounded-lg transition-colors ${language === 'en' ? 'bg-[#2F4A3A] text-[#FBF8F2] font-bold' : 'hover:bg-[#F4EFE6]'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1 text-xs rounded-lg transition-colors ${language === 'hi' ? 'bg-[#2F4A3A] text-[#FBF8F2] font-bold' : 'hover:bg-[#F4EFE6]'}`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => { setLanguage('te'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1 text-xs rounded-lg transition-colors ${language === 'te' ? 'bg-[#2F4A3A] text-[#FBF8F2] font-bold' : 'hover:bg-[#F4EFE6]'}`}
                  >
                    తెలుగు
                  </button>
                </div>
              )}
            </div>

            {isAuthenticated && currentUser ? (
              <span className="text-[#FBF8F2]/90 font-mono text-[10px] hidden sm:inline">
                Signed in as <strong className="text-[#E5B94A]">{currentUser.name}</strong> ({currentUser.role})
              </span>
            ) : (
              <button
                onClick={() => onOpenAuth('signin')}
                className="text-[#E5B94A] font-bold hover:underline cursor-pointer"
              >
                {t.nav.login} →
              </button>
            )}
          </div>
        </div>

        {/* Main Desktop Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#163323] hover:text-[#C77B58] cursor-pointer"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div 
              onClick={() => onNavigate('landing')}
              className="flex flex-col items-center justify-center cursor-pointer select-none group"
            >
              <span className="font-editorial font-bold text-2xl sm:text-3xl tracking-tight text-[#163323] leading-none group-hover:text-[#C77B58] transition-colors">
                FarmChain
              </span>
              <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[#2F4A3A]/60 mt-1">
                — ZERO MIDDLEMEN —
              </span>
            </div>

            {/* Role-Based Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 font-sans text-xs uppercase tracking-[0.14em] font-semibold text-[#2F4A3A]">
              {navItems.map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 hover:text-[#C77B58] border-b-2 pb-0.5 cursor-pointer min-h-[44px] flex items-center ${
                    currentView === item.id ? 'border-[#C77B58] text-[#C77B58]' : 'border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Action Section */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Cart Icon Quick Access */}
              <button
                onClick={() => onNavigate('cart')}
                className="relative min-h-[44px] min-w-[44px] flex items-center justify-center text-[#163323] hover:text-[#C77B58] transition-colors cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C77B58] text-[#FBF8F2] text-[10px] font-mono font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Data Saver Mode Toggle (Part C #5) */}
              <button
                onClick={toggleDataSaver}
                className={`hidden sm:flex items-center gap-1.5 min-h-[44px] px-3 py-1 rounded-full text-[11px] font-mono font-bold border transition-all cursor-pointer ${
                  isDataSaver 
                    ? 'bg-[#2F4A3A] text-[#E5B94A] border-[#2F4A3A] shadow-soft-sm' 
                    : 'bg-[#FBF8F2] text-[#536458] border-[#2F4A3A]/15 hover:text-[#2F4A3A]'
                }`}
                title={isDataSaver ? 'Data Saver Active: images and animations reduced' : 'Enable Data Saver for weak networks'}
                aria-label="Toggle Data Saver"
              >
                {isDataSaver ? <Zap className="w-3.5 h-3.5 text-[#E5B94A]" /> : <ZapOff className="w-3.5 h-3.5 text-[#536458]" />}
                <span>{isDataSaver ? 'Data Saver ON' : 'Data Saver'}</span>
              </button>

              {/* Farmer Quick Action: Sell Produce */}
              {(!isAuthenticated || currentUser?.role === 'farmer') && onOpenSellModal && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenSellModal}
                  className="hidden sm:inline-flex text-[11px] uppercase tracking-wider font-semibold min-h-[40px] px-4"
                >
                  <Sprout className="w-3.5 h-3.5 mr-1" />
                  <span>Sell Crop</span>
                </Button>
              )}

              {/* User Session Menu / Login CTA */}
              {isAuthenticated && currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 min-h-[44px] px-3.5 py-1.5 bg-[#FBF8F2] border border-[#2F4A3A]/15 rounded-full shadow-soft-sm hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-[#2F4A3A] rounded-full flex items-center justify-center text-[#E5B94A] text-xs font-bold font-mono">
                      {currentUser.name[0]}
                    </div>
                    <span className="font-sans text-xs font-semibold text-[#163323] max-w-[90px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#2F4A3A]/60" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#FBF8F2] border border-[#2F4A3A]/15 rounded-2xl shadow-soft-lg p-3 font-sans text-xs space-y-2 z-50">
                      <div className="pb-2 border-b border-[#2F4A3A]/10">
                        <strong className="font-editorial font-bold text-sm text-[#163323] block">
                          {currentUser.name}
                        </strong>
                        <span className="text-[10px] text-[#C77B58] uppercase font-bold">
                          {currentUser.role} Account
                        </span>
                      </div>

                      {currentUser.role === 'farmer' && (
                        <button
                          onClick={() => {
                            onNavigate('farmer');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left py-1.5 hover:text-[#C77B58] block cursor-pointer"
                        >
                          {t.nav.myFarm} →
                        </button>
                      )}

                      {currentUser.role === 'buyer' && (
                        <button
                          onClick={() => {
                            onNavigate('buyer');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left py-1.5 hover:text-[#C77B58] block cursor-pointer"
                        >
                          Commercial Buyer Desk →
                        </button>
                      )}

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            onNavigate('admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left py-1.5 text-[#C77B58] font-bold block cursor-pointer"
                        >
                          {t.nav.verificationRequests} →
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onNavigate('orders');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left py-1.5 hover:text-[#C77B58] block cursor-pointer"
                      >
                        {t.nav.myOrders} →
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('onboarding');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left py-1.5 hover:text-[#C77B58] block cursor-pointer text-[#2F4A3A]"
                      >
                        {t.nav.getVerifiedTick} →
                      </button>

                      {onSignOut && (
                        <button
                          onClick={() => {
                            onSignOut();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left py-1.5 text-[#C77B58] font-semibold hover:underline block pt-2 border-t border-[#2F4A3A]/10 cursor-pointer"
                        >
                          {t.nav.signOut}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="min-h-[44px] px-3 py-2 text-xs font-sans font-semibold tracking-[0.14em] text-[#163323] uppercase hover:text-[#C77B58] transition-colors cursor-pointer"
                  >
                    {t.nav.login}
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenAuth('signup')}
                    className="text-[11px] uppercase tracking-wider font-semibold min-h-[40px] px-4"
                  >
                    Join
                  </Button>
                </div>
              )}

            </div>

          </div>
        </div>

      </header>

      {/* Mobile Drawer Navigation Sheet (At most 6 single-line items, 44px tap targets, closes on route change) */}
      <Sheet
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="FarmChain Navigation"
      >
        <div className="space-y-6 pt-2">
          
          {/* User Session Banner if logged in */}
          {isAuthenticated && currentUser && (
            <div className="p-3.5 rounded-2xl bg-[#2F4A3A] text-[#FBF8F2] space-y-1">
              <span className="text-[10px] font-mono text-[#E5B94A] uppercase block">
                Signed in as
              </span>
              <strong className="font-editorial text-base block text-[#FBF8F2]">
                {currentUser.name}
              </strong>
              <span className="text-xs text-[#A8B89A] block uppercase font-mono">
                {currentUser.role} Account
              </span>
            </div>
          )}

          {/* Role-based Menu Items (At most 6 single-line items with 44px+ tap targets) */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#536458] font-bold px-2 block mb-2">
              MENU
            </span>
            {navItems.slice(0, 6).map((item, idx) => (
              <button
                key={`mobile-${item.id}-${idx}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors font-sans text-sm font-semibold cursor-pointer ${
                  currentView === item.id 
                    ? 'bg-[#2F4A3A] text-[#FBF8F2]' 
                    : 'text-[#163323] hover:bg-[#F4EFE6]'
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span className="text-xs text-[#536458]/70 text-right text-[11px] font-normal truncate ml-2">
                  {item.sub}
                </span>
              </button>
            ))}
          </div>

          {/* Data Saver Toggle in Mobile Menu */}
          <div className="pt-2 pb-1">
            <button
              onClick={toggleDataSaver}
              className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-2xl border transition-all text-xs font-mono font-bold ${
                isDataSaver
                  ? 'bg-[#2F4A3A] text-[#E5B94A] border-[#2F4A3A]'
                  : 'bg-white text-[#2F4A3A] border-[#2F4A3A]/15'
              }`}
            >
              <div className="flex items-center gap-2">
                {isDataSaver ? <Zap className="w-4 h-4 text-[#E5B94A]" /> : <ZapOff className="w-4 h-4 text-[#536458]" />}
                <span>Data Saver Mode</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                isDataSaver ? 'bg-[#E5B94A]/20 text-[#E5B94A]' : 'bg-[#2F4A3A]/10 text-[#536458]'
              }`}>
                {isDataSaver ? 'ACTIVE' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Quick Actions in Mobile Menu */}
          <div className="pt-4 border-t border-[#2F4A3A]/10 space-y-2">
            {(!isAuthenticated || currentUser?.role === 'farmer') && onOpenSellModal && (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSellModal();
                }}
                className="min-h-[44px] text-xs uppercase tracking-wider font-semibold"
              >
                <Sprout className="w-4 h-4 mr-2" />
                <span>Sell Your Crop</span>
              </Button>
            )}

            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="min-h-[44px] text-xs font-semibold uppercase"
                >
                  {t.nav.login}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="min-h-[44px] text-xs font-semibold uppercase"
                >
                  Join
                </Button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onSignOut) onSignOut();
                }}
                className="w-full min-h-[44px] text-center text-xs font-bold text-[#C77B58] hover:underline uppercase pt-2 cursor-pointer"
              >
                {t.nav.signOut}
              </button>
            )}
          </div>

        </div>
      </Sheet>
    </>
  );
};
