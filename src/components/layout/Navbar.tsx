import React, { useState } from 'react';
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
  ShieldCheck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import { UserRole, AuthUser } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../i18n/translations';

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
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreToolsOpen, setMoreToolsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const primaryNavItems = [
    { id: 'landing', label: t.nav.home, icon: Home },
    { id: 'farmer', label: t.nav.forFarmers, icon: Sprout },
    { id: 'buyer', label: t.nav.forBuyers, icon: Building2 },
    { id: 'how-it-works', label: t.nav.howItWorks, icon: TrendingUp },
  ];

  const secondaryTools = [
    { id: 'orders', label: t.nav.orders, desc: 'Track active & past contracts' },
    { id: 'marketplace', label: t.nav.marketplace, desc: 'Browse live produce & buyer demands' },
    { id: 'logistics', label: 'Logistics Circuits', desc: 'Fleet telemetry & village milk-runs' },
    { id: 'prices', label: t.nav.prices, desc: 'APMC mandi benchmarks vs direct prices' },
    { id: 'forecast', label: 'AI Demand Forecast', desc: 'Agri-LSTM price curves' },
    { id: 'onboarding', label: 'KYC Verification', desc: 'Submit farmer/buyer trade credentials' },
    { id: 'admin', label: 'Security Desk', desc: 'Admin KYC & compliance audit queue' },
    { id: 'database', label: 'System Architecture', desc: 'PostgreSQL schema & scalability' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'how-it-works') {
      if (currentView === 'landing') {
        const journeyEl = document.getElementById('how-it-works') || document.getElementById('farm-to-market-journey');
        if (journeyEl) {
          journeyEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }
    onNavigate(id);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        return <Sprout className="w-3.5 h-3.5 text-[#E5B94A]" />;
      case 'buyer':
        return <Building2 className="w-3.5 h-3.5 text-[#E5B94A]" />;
      case 'logistics':
        return <Truck className="w-3.5 h-3.5 text-[#E5B94A]" />;
      case 'admin':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#E5B94A]" />;
    }
  };

  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'EN',
    hi: 'हिन्दी',
    te: 'తెలుగు',
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F4EFE6]/95 border-b border-[#2F4A3A]/10 backdrop-blur-md">
        {/* Minimal Editorial Top Ticker */}
        <div className="bg-[#163323] text-[#FBF8F2] px-4 sm:px-6 py-1.5 text-xs font-mono flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5B94A] animate-pulse shrink-0"></span>
            <span className="font-bold text-[#E5B94A] text-[11px] tracking-wider uppercase">
              18.5 MT ACTIVE WHOLESALE DEMAND
            </span>
            <span className="text-[#FBF8F2]/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-[#FBF8F2]/90 text-[11px]">
              Direct Farm-Gate Payout • 0% Broker Fee
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Language Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase text-[#E5B94A] hover:text-[#FBF8F2] transition-colors cursor-pointer"
                aria-label="Change language"
              >
                <Globe className="w-3 h-3" />
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
                Signed in as <strong className="text-[#E5B94A]">{currentUser.name}</strong>
              </span>
            ) : (
              <button
                onClick={() => onOpenAuth('signin')}
                className="text-[#E5B94A] font-bold hover:underline"
              >
                {t.nav.signIn} →
              </button>
            )}
          </div>
        </div>

        {/* Main Centered Minimal Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Nav Links */}
            <nav className="hidden lg:flex items-center gap-7 font-sans text-xs uppercase tracking-[0.15em] font-semibold text-[#2F4A3A]">
              <button
                onClick={() => handleNavClick('farmer')}
                className={`transition-colors py-1 hover:text-[#C77B58] border-b-2 pb-0.5 cursor-pointer ${
                  currentView === 'farmer' ? 'border-[#C77B58] text-[#C77B58]' : 'border-transparent'
                }`}
              >
                {t.nav.forFarmers}
              </button>
              <button
                onClick={() => handleNavClick('buyer')}
                className={`transition-colors py-1 hover:text-[#C77B58] border-b-2 pb-0.5 cursor-pointer ${
                  currentView === 'buyer' ? 'border-[#C77B58] text-[#C77B58]' : 'border-transparent'
                }`}
              >
                {t.nav.forBuyers}
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className="transition-colors py-1 hover:text-[#C77B58] border-b-2 border-transparent pb-0.5 cursor-pointer"
              >
                {t.nav.howItWorks}
              </button>

              {/* More Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreToolsOpen(!moreToolsOpen)}
                  className="uppercase tracking-[0.15em] text-[#2F4A3A]/80 hover:text-[#2F4A3A] flex items-center gap-1 py-1 transition-colors cursor-pointer"
                >
                  <span>MORE</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {moreToolsOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-[#FBF8F2] border border-[#2F4A3A]/15 rounded-2xl shadow-soft-lg p-3 font-sans text-xs space-y-1 z-50">
                    <div className="text-[10px] text-[#2F4A3A]/60 font-mono font-bold uppercase px-2 py-1 border-b border-[#2F4A3A]/10">
                      PLATFORM MODULES
                    </div>
                    {secondaryTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          onNavigate(tool.id);
                          setMoreToolsOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-[#F4EFE6] transition-colors block cursor-pointer"
                      >
                        <strong className="font-editorial text-sm font-bold text-[#163323] block">
                          {tool.label}
                        </strong>
                        <span className="text-[11px] text-[#2F4A3A]/70 block">
                          {tool.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#163323] hover:text-[#C77B58]"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo (Centered) */}
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

            {/* Right Action CTAs */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden lg:flex items-center gap-6 font-sans text-xs uppercase tracking-[0.15em] font-semibold text-[#2F4A3A]">
                <button
                  onClick={() => onNavigate('marketplace')}
                  className={`transition-colors py-1 hover:text-[#C77B58] border-b-2 pb-0.5 cursor-pointer ${
                    currentView === 'marketplace' ? 'border-[#C77B58] text-[#C77B58]' : 'border-transparent'
                  }`}
                >
                  {t.nav.marketplace}
                </button>
                <button
                  onClick={() => onNavigate('prices')}
                  className={`transition-colors py-1 hover:text-[#C77B58] border-b-2 pb-0.5 cursor-pointer ${
                    currentView === 'prices' ? 'border-[#C77B58] text-[#C77B58]' : 'border-transparent'
                  }`}
                >
                  {t.nav.prices}
                </button>
              </div>

              {isAuthenticated && currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 min-h-[44px] px-3.5 py-1.5 bg-[#FBF8F2] border border-[#2F4A3A]/15 rounded-full shadow-soft-sm hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-[#2F4A3A] rounded-full flex items-center justify-center">
                      {getRoleIcon(currentUser.role)}
                    </div>
                    <span className="font-sans text-xs font-semibold text-[#163323] max-w-[100px] truncate">
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
                      <button
                        onClick={() => {
                          onNavigate(currentUser.role === 'buyer' ? 'buyer' : 'farmer');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left py-1.5 hover:text-[#C77B58] block cursor-pointer"
                      >
                        {t.nav.dashboard} →
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('orders');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left py-1.5 hover:text-[#C77B58] block cursor-pointer"
                      >
                        {t.nav.orders} →
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
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="min-h-[44px] px-3 py-2 text-xs font-sans font-semibold tracking-[0.14em] text-[#163323] uppercase hover:text-[#C77B58] transition-colors cursor-pointer"
                  >
                    {t.nav.signIn}
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenAuth('signup')}
                    className="text-[11px]"
                  >
                    {t.nav.join}
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Accessible Slide-Over Sheet Mobile Drawer */}
      <Sheet
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="FarmChain Navigation"
        side="left"
      >
        <div className="space-y-6 font-sans">
          
          {/* Language Selector in Drawer */}
          <div className="space-y-2 pb-4 border-b border-[#2F4A3A]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C77B58]">
              Select Language / भाषा / భాష
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`min-h-[44px] px-2 rounded-xl text-xs font-bold border ${language === 'en' ? 'bg-[#2F4A3A] text-[#FBF8F2] border-[#2F4A3A]' : 'bg-[#FBF8F2] text-[#2F4A3A] border-[#2F4A3A]/15'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`min-h-[44px] px-2 rounded-xl text-xs font-bold border ${language === 'hi' ? 'bg-[#2F4A3A] text-[#FBF8F2] border-[#2F4A3A]' : 'bg-[#FBF8F2] text-[#2F4A3A] border-[#2F4A3A]/15'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`min-h-[44px] px-2 rounded-xl text-xs font-bold border ${language === 'te' ? 'bg-[#2F4A3A] text-[#FBF8F2] border-[#2F4A3A]' : 'bg-[#FBF8F2] text-[#2F4A3A] border-[#2F4A3A]/15'}`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F4A3A]/60">
              Quick Links
            </span>
            <div className="space-y-1.5">
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
                    className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border text-left font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${
                      isActive
                        ? 'bg-[#2F4A3A] text-[#FBF8F2] border-[#2F4A3A] shadow-soft'
                        : 'bg-[#FBF8F2] text-[#163323] border-[#2F4A3A]/10 hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Tools */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F4A3A]/60">
              Platform Modules
            </span>
            <div className="grid grid-cols-2 gap-2">
              {secondaryTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onNavigate(tool.id);
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[44px] p-3 rounded-xl bg-[#FBF8F2] border border-[#2F4A3A]/10 text-left hover:bg-[#F4EFE6] transition-colors"
                >
                  <strong className="text-xs font-bold text-[#163323] block truncate">
                    {tool.label}
                  </strong>
                </button>
              ))}
            </div>
          </div>

          {/* Auth Action */}
          <div className="pt-4 border-t border-[#2F4A3A]/10">
            {isAuthenticated && currentUser ? (
              <div className="space-y-2">
                <div className="text-xs text-[#2F4A3A]">
                  Logged in as <strong>{currentUser.name}</strong> ({currentUser.role})
                </div>
                {onSignOut && (
                  <button
                    onClick={() => {
                      onSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full min-h-[44px] py-2.5 rounded-full border border-[#C77B58] text-[#C77B58] font-bold uppercase tracking-wider text-xs"
                  >
                    {t.nav.signOut}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    onOpenAuth('signin');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t.nav.signIn}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t.nav.join}
                </Button>
              </div>
            )}
          </div>

        </div>
      </Sheet>
    </>
  );
};
