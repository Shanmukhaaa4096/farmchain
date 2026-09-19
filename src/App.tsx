import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';

// Lazy loaded secondary views for code splitting and instant initial paint
const MarketplacePage = lazy(() => import('./pages/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const FarmerDashboard = lazy(() => import('./pages/FarmerDashboard').then(m => ({ default: m.FarmerDashboard })));
const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard').then(m => ({ default: m.BuyerDashboard })));
const OrdersPage = lazy(() => import('./pages/OrdersPage').then(m => ({ default: m.OrdersPage })));
const LogisticsPage = lazy(() => import('./pages/LogisticsPage').then(m => ({ default: m.LogisticsPage })));
const ForecastPage = lazy(() => import('./pages/ForecastPage').then(m => ({ default: m.ForecastPage })));
const MarketPricesPage = lazy(() => import('./pages/MarketPricesPage').then(m => ({ default: m.MarketPricesPage })));
const DatabasePage = lazy(() => import('./pages/DatabasePage').then(m => ({ default: m.DatabasePage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage').then(m => ({ default: m.OnboardingPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

// New Core Pages for Part A
const CropDetailPage = lazy(() => import('./pages/CropDetailPage').then(m => ({ default: m.CropDetailPage })));
const FarmerProfilePage = lazy(() => import('./pages/FarmerProfilePage').then(m => ({ default: m.FarmerProfilePage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const HelpPage = lazy(() => import('./pages/HelpPage').then(m => ({ default: m.HelpPage })));
const TechPage = lazy(() => import('./pages/TechPage').then(m => ({ default: m.TechPage })));

import { AuthModal } from './pages/AuthModal';
import { DemandDetailModal } from './components/modals/DemandDetailModal';
import { PostDemandModal } from './components/modals/PostDemandModal';
import { PledgeSupplyModal } from './components/modals/PledgeSupplyModal';
import { SimpleListProduceModal } from './components/modals/SimpleListProduceModal';
import { INITIAL_DEMANDS } from './data/mockData';
import { DemandRequirement, UserRole, AuthUser } from './types';
import { authService } from './services/authService';
import { CheckCircle2, AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DataSaverProvider } from './context/DataSaverContext';
import { ToastProvider } from './components/ui/Toast';
import { Button } from './components/ui/Button';
import { MobileTabBar } from './components/layout/MobileTabBar';

interface ParsedRoute {
  view: string;
  param?: string;
}

const parseRoute = (path: string): ParsedRoute => {
  const clean = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'landing') return { view: 'landing' };

  if (clean === 'market' || clean === 'marketplace') return { view: 'marketplace' };
  if (clean === 'cart') return { view: 'cart' };
  if (clean === 'how-it-works') return { view: 'how-it-works' };
  if (clean === 'help') return { view: 'help' };
  if (clean === 'tech') return { view: 'tech' };

  const cropMatch = clean.match(/^crop\/([^/]+)$/);
  if (cropMatch) return { view: 'crop', param: cropMatch[1] };

  const farmerMatch = clean.match(/^farmer\/([^/]+)$/);
  if (farmerMatch && farmerMatch[1] !== 'dashboard') {
    return { view: 'farmer-profile', param: farmerMatch[1] };
  }

  const validViews = [
    'marketplace', 'farmer', 'orders', 'buyer', 'logistics', 
    'forecast', 'prices', 'database', 'privacy', 'terms', 
    'onboarding', 'admin', 'cart', 'how-it-works', 'help', 'tech'
  ];
  if (validViews.includes(clean)) return { view: clean };

  return { view: 'notfound' };
};

const getSlugFromView = (view: string, param?: string): string => {
  if (view === 'landing') return '/';
  if (view === 'marketplace') return '/market';
  if (view === 'crop' && param) return `/crop/${param}`;
  if (view === 'farmer-profile' && param) return `/farmer/${param}`;
  if (view === 'cart') return '/cart';
  if (view === 'how-it-works') return '/how-it-works';
  if (view === 'help') return '/help';
  if (view === 'tech') return '/tech';
  if (view === 'notfound') return '/404';
  return `/${view}`;
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseRoute(window.location.pathname).view;
    }
    return 'landing';
  });

  const [routeParam, setRouteParam] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      return parseRoute(window.location.pathname).param;
    }
    return undefined;
  });

  const [activeRole, setActiveRole] = useState<UserRole>('farmer');
  const [demands, setDemands] = useState<DemandRequirement[]>(INITIAL_DEMANDS);
  
  // Authentication & Role-based Access State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return authService.getCurrentSession() !== null;
  });
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    return authService.getCurrentSession();
  });
  const [authPromptMessage, setAuthPromptMessage] = useState<string | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Modals
  const [selectedDemand, setSelectedDemand] = useState<DemandRequirement | null>(null);
  const [demandModalInitialTab, setDemandModalInitialTab] = useState<'specs' | 'farmers' | 'negotiate'>('specs');
  const [isPostDemandOpen, setIsPostDemandOpen] = useState<boolean>(false);
  const [pledgeTargetDemand, setPledgeTargetDemand] = useState<DemandRequirement | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isSellProduceOpen, setIsSellProduceOpen] = useState<boolean>(false);

  // Synchronize activeRole with current session on mount if available
  useEffect(() => {
    const session = authService.getCurrentSession();
    if (session) {
      setCurrentUser(session);
      setIsAuthenticated(true);
      setActiveRole(session.role);
    }
  }, []);

  // Synchronize view with browser back/forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const parsed = parseRoute(window.location.pathname);
        setCurrentView(parsed.view);
        setRouteParam(parsed.param);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Toast Notification System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  /**
   * Action Gating Helper:
   * Protects any action requiring farmer, buyer, or logistics authentication.
   */
  const requireAuth = (role: UserRole, action: () => void, promptMessage: string) => {
    if (isAuthenticated && currentUser?.role === role) {
      action();
    } else {
      setActiveRole(role);
      setAuthPromptMessage(promptMessage);
      setPendingAction(() => action);
      setAuthModalMode('signin');
      setIsAuthOpen(true);
    }
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setActiveRole(user.role);
    setAuthPromptMessage(undefined);
    showToast(`Welcome ${user.name}! Logged in as ${user.role.toUpperCase()}`);

    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 200);
    }
  };

  const handleSignOut = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPendingAction(null);
    setAuthPromptMessage(undefined);
    showToast('Signed out of FarmChain.');
  };

  // Dynamic Page Title Strategy
  useEffect(() => {
    const titles: Record<string, string> = {
      landing: 'FarmChain : Direct Farm-to-Buyer Marketplace',
      marketplace: 'Buy Fresh Crops : FarmChain',
      farmer: 'My Farm & Crops : FarmChain',
      orders: 'My Orders & Pickups : FarmChain',
      buyer: 'Buyer Orders & Sourcing : FarmChain',
      logistics: 'Pickup & Delivery : FarmChain',
      forecast: 'Best Time to Sell : FarmChain',
      prices: 'Today\'s Prices : FarmChain',
      database: 'System Architecture : FarmChain',
      privacy: 'Privacy Policy : FarmChain',
      terms: 'Terms and Conditions : FarmChain',
      onboarding: 'Get Verified Tick : FarmChain',
      admin: 'Admin Verification Queue : FarmChain',
      cart: 'Your Shopping Cart : FarmChain',
      'how-it-works': 'How FarmChain Works : Zero Broker Fee',
      help: 'Farmer & Buyer Help Center : FarmChain',
      tech: 'Tech & Architecture : FarmChain',
      crop: 'Crop Details : FarmChain',
      'farmer-profile': 'Farmer Profile : FarmChain',
      notfound: 'Page Not Found : FarmChain'
    };
    document.title = titles[currentView] || 'FarmChain : Direct Farm-to-Buyer Marketplace';

    // Synchronize canonical link tag with current view
    const slug = getSlugFromView(currentView, routeParam);
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute('href', `https://farmchain-gamma.vercel.app${slug === '/' ? '' : slug}`);
    }
  }, [currentView, routeParam]);

  const handleNavigate = (view: string) => {
    const parsed = parseRoute(view.startsWith('/') ? view : `/${view}`);
    setCurrentView(parsed.view);
    setRouteParam(parsed.param);

    const slug = getSlugFromView(parsed.view, parsed.param);
    if (typeof window !== 'undefined' && window.location.pathname !== slug) {
      window.history.pushState({ view: parsed.view, param: parsed.param }, '', slug);
    }
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute('href', `https://farmchain-gamma.vercel.app${slug === '/' ? '' : slug}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateDemand = (newDemandData: Partial<DemandRequirement>) => {
    const created: DemandRequirement = {
      id: newDemandData.id || `DEM-2026-${Math.floor(100 + Math.random() * 900)}`,
      buyerId: newDemandData.buyerId || 'BUY-101',
      buyerName: newDemandData.buyerName || 'UrbanFork Kitchens',
      buyerType: newDemandData.buyerType || 'Restaurant Chain',
      crop: newDemandData.crop || 'Tomatoes',
      quantityKg: newDemandData.quantityKg || 2000,
      qualityGrade: newDemandData.qualityGrade || 'Grade A',
      deliveryLocation: newDemandData.deliveryLocation || 'Hyderabad Central Hub',
      requiredDate: newDemandData.requiredDate || '30 Sep 2026',
      status: 'OPEN',
      targetPricePerKg: newDemandData.targetPricePerKg || 25,
      matchedFarmersCount: 3,
      matchedQuantityKg: 0,
      urgency: 'HIGH',
      specifications: newDemandData.specifications || {},
      notes: newDemandData.notes || '',
    };

    setDemands(prev => [created, ...prev]);
    showToast(`New requirement for ${created.quantityKg} kg ${created.crop} published!`);
  };

  const handleConfirmPledge = (demandId: string, quantityKg: number, agreedRate: number) => {
    setDemands(prev => prev.map(d => {
      if (d.id === demandId) {
        const newMatched = Math.min(d.quantityKg, d.matchedQuantityKg + quantityKg);
        return {
          ...d,
          matchedQuantityKg: newMatched,
          matchedFarmersCount: d.matchedFarmersCount + 1,
          status: newMatched >= d.quantityKg ? 'FULFILLED' : 'PARTIALLY_MATCHED',
        };
      }
      return d;
    }));

    showToast(`Pledged ${quantityKg} kg harvest at ₹${agreedRate}/kg! Scheduled for pickup.`);
  };

  const handleOpenPostDemand = () => {
    requireAuth(
      'buyer',
      () => setIsPostDemandOpen(true),
      'Buyer login required to post a bulk requirement.'
    );
  };

  const handlePledgeDemand = (demand: DemandRequirement) => {
    requireAuth(
      'farmer',
      () => setPledgeTargetDemand(demand),
      `Farmer login required to pledge harvest for ${demand.crop}.`
    );
  };

  const handleOpenSellModal = () => {
    setIsSellProduceOpen(true);
  };

  const handleProduceSubmitted = (produce: {
    crop: string;
    variety: string;
    quantityKg: number;
    expectedPricePerKg: number;
    availableDate: string;
    location: string;
  }) => {
    showToast(`Successfully listed ${produce.quantityKg.toLocaleString()} kg of ${produce.crop} at ₹${produce.expectedPricePerKg}/kg!`);
    handleNavigate('farmer');
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <DataSaverProvider>
            <ToastProvider>
              <div className="min-h-dvh flex flex-col bg-[#F4EFE6] font-sans text-[#2F4A3A] antialiased selection:bg-[#A8B89A]/30">
        
              {/* Role-based Navbar */}
              <Navbar
                currentView={currentView}
                onNavigate={handleNavigate}
                activeRole={activeRole}
                onRoleChange={(role) => {
                  setActiveRole(role);
                  showToast(`Switched view to: ${role.toUpperCase()}`);
                }}
                onOpenAuth={(mode) => {
                  setAuthPromptMessage(undefined);
                  setAuthModalMode(mode || 'signin');
                  setIsAuthOpen(true);
                }}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                onSignOut={handleSignOut}
                onOpenSellModal={handleOpenSellModal}
              />

              {/* Toast Notification System */}
              {toast && (
                <div className="fixed bottom-6 right-4 sm:right-6 z-50 rounded-2xl border border-[#2F4A3A]/15 bg-white p-4 shadow-soft-lg max-w-md flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                      toast.type === 'error' ? 'bg-[#C77B58]/15 text-[#C77B58]' : 'bg-[#2F4A3A]/15 text-[#2F4A3A]'
                    }`}>
                      {toast.type === 'error' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#536458]">
                        {toast.type === 'error' ? 'Notice' : 'Success'}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-[#2F4A3A]">{toast.message}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setToast(null)}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[#536458] hover:bg-[#2F4A3A]/5 hover:text-[#2F4A3A] transition-colors"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Main Routed View Container */}
              <main className="flex-1 pb-16 sm:pb-0">
                <Suspense fallback={
                  <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-4">
                    <div className="w-10 h-10 border-3 border-[#C77B58]/30 border-t-[#C77B58] rounded-full animate-spin mb-4" />
                    <p className="text-sm font-serif italic text-[#536458]">Loading FarmChain...</p>
                  </div>
                }>
                  {currentView === 'landing' && (
                    <LandingPage
                      onNavigate={handleNavigate}
                      onOpenPostDemand={handleOpenPostDemand}
                      onSelectDemand={(demand) => {
                        setSelectedDemand(demand);
                        setDemandModalInitialTab('specs');
                      }}
                      onOpenSellModal={handleOpenSellModal}
                      onShowToast={showToast}
                    />
                  )}

                  {currentView === 'marketplace' && (
                    <MarketplacePage
                      demands={demands}
                      onSelectDemand={(demand) => {
                        setSelectedDemand(demand);
                        setDemandModalInitialTab('specs');
                      }}
                      onOpenPostDemand={handleOpenPostDemand}
                      onPledgeDemand={handlePledgeDemand}
                      onNavigate={handleNavigate}
                      userRole={activeRole}
                      onShowToast={showToast}
                    />
                  )}

                  {currentView === 'crop' && (
                    <CropDetailPage
                      cropId={routeParam || 'lot-101'}
                      onNavigate={handleNavigate}
                      onShowToast={showToast}
                    />
                  )}

                  {currentView === 'farmer-profile' && (
                    <FarmerProfilePage
                      farmerId={routeParam || 'farmer-1'}
                      onNavigate={handleNavigate}
                      onShowToast={showToast}
                    />
                  )}

                  {currentView === 'cart' && (
                    <CartPage
                      onNavigate={handleNavigate}
                      onShowToast={showToast}
                    />
                  )}

                  {currentView === 'how-it-works' && (
                    <HowItWorksPage
                      onNavigate={handleNavigate}
                    />
                  )}

                  {currentView === 'help' && (
                    <HelpPage
                      onNavigate={handleNavigate}
                      onShowToast={showToast}
                    />
                  )}

                  {currentView === 'tech' && (
                    <TechPage
                      onNavigate={handleNavigate}
                    />
                  )}

                  {currentView === 'farmer' && (
                    <FarmerDashboard
                      demands={demands}
                      onSelectDemand={(demand) => {
                        setSelectedDemand(demand);
                        setDemandModalInitialTab('specs');
                      }}
                      onPledgeDemand={handlePledgeDemand}
                      onNavigate={handleNavigate}
                      onOpenSellModal={handleOpenSellModal}
                      requireAuth={requireAuth}
                      isAuthenticated={isAuthenticated}
                    />
                  )}

                  {currentView === 'orders' && (
                    <OrdersPage
                      onNavigate={handleNavigate}
                      onOpenSellModal={handleOpenSellModal}
                    />
                  )}

                  {currentView === 'buyer' && (
                    <BuyerDashboard
                      demands={demands}
                      onOpenPostDemand={handleOpenPostDemand}
                      onSelectDemand={(demand, tab = 'specs') => {
                        setSelectedDemand(demand);
                        setDemandModalInitialTab(tab);
                      }}
                      onNavigate={handleNavigate}
                      requireAuth={requireAuth}
                      isAuthenticated={isAuthenticated}
                    />
                  )}

                  {currentView === 'logistics' && (
                    <LogisticsPage 
                      requireAuth={requireAuth}
                      isAuthenticated={isAuthenticated}
                      onPostAvailability={() => {
                        showToast('Vehicle registered for regional pickup loops!');
                      }}
                    />
                  )}

                  {currentView === 'forecast' && (
                    <ForecastPage />
                  )}

                  {currentView === 'prices' && (
                    <MarketPricesPage />
                  )}

                  {currentView === 'database' && (
                    <DatabasePage />
                  )}

                  {currentView === 'privacy' && (
                    <PrivacyPolicyPage onNavigate={handleNavigate} />
                  )}

                  {currentView === 'terms' && (
                    <TermsPage onNavigate={handleNavigate} />
                  )}

                  {currentView === 'onboarding' && (
                    <OnboardingPage onNavigate={handleNavigate} />
                  )}

                  {currentView === 'admin' && (
                    currentUser?.role === 'admin' ? (
                      <AdminPage onNavigate={handleNavigate} />
                    ) : (
                      <div className="py-20 px-4 text-center max-w-lg mx-auto space-y-4">
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#C77B58]/15 flex items-center justify-center text-[#C77B58]">
                          <ShieldAlert className="w-7 h-7" />
                        </div>
                        <h2 className="font-serif font-bold text-2xl text-[#2F4A3A]">Admin Area Restricted</h2>
                        <p className="text-sm text-[#536458]">
                          Verification requests and platform supervision require an admin account.
                        </p>
                        <div className="flex justify-center gap-3 pt-2">
                          <Button 
                            variant="outline"
                            onClick={() => handleNavigate('landing')}
                          >
                            Return Home
                          </Button>
                          <Button 
                            variant="clay"
                            onClick={() => {
                              setAuthPromptMessage('Please sign in with your Admin credentials.');
                              setIsAuthOpen(true);
                            }}
                          >
                            Sign In as Admin
                          </Button>
                        </div>
                      </div>
                    )
                  )}

                  {!['landing', 'marketplace', 'crop', 'farmer-profile', 'cart', 'how-it-works', 'help', 'tech', 'farmer', 'orders', 'buyer', 'logistics', 'forecast', 'prices', 'database', 'privacy', 'terms', 'onboarding', 'admin'].includes(currentView) && (
                    <NotFoundPage onNavigate={handleNavigate} />
                  )}
                </Suspense>
              </main>

              {/* Global Modals */}
              <SimpleListProduceModal
                isOpen={isSellProduceOpen}
                onClose={() => setIsSellProduceOpen(false)}
                onSubmit={handleProduceSubmitted}
              />

              <DemandDetailModal
                isOpen={selectedDemand !== null}
                onClose={() => setSelectedDemand(null)}
                demand={selectedDemand}
                onPledgeClick={(demand) => handlePledgeDemand(demand)}
                userRole={activeRole}
                initialTab={demandModalInitialTab}
                userName={currentUser?.name}
              />

              <PostDemandModal
                isOpen={isPostDemandOpen}
                onClose={() => setIsPostDemandOpen(false)}
                onSubmit={handleCreateDemand}
              />

              <PledgeSupplyModal
                isOpen={pledgeTargetDemand !== null}
                onClose={() => setPledgeTargetDemand(null)}
                demand={pledgeTargetDemand}
                onConfirmPledge={handleConfirmPledge}
              />

              <AuthModal
                isOpen={isAuthOpen}
                onClose={() => {
                  setIsAuthOpen(false);
                  setAuthPromptMessage(undefined);
                  setPendingAction(null);
                }}
                activeRole={activeRole}
                onRoleChange={(role) => setActiveRole(role)}
                promptMessage={authPromptMessage}
                onLoginSuccess={handleLoginSuccess}
                initialMode={authModalMode}
              />

              {/* Footer */}
              <Footer onNavigate={handleNavigate} />

              {/* Mobile Bottom Tab Bar (Part C #2) */}
              <MobileTabBar 
                currentView={currentView}
                onNavigate={handleNavigate}
                onOpenAuth={(mode) => {
                  setAuthPromptMessage(undefined);
                  setAuthModalMode(mode || 'signin');
                  setIsAuthOpen(true);
                }}
              />

            </div>
          </ToastProvider>
        </DataSaverProvider>
      </CartProvider>
    </AuthProvider>
  </LanguageProvider>
);
};

export default App;
