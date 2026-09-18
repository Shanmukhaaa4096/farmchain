import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { OrdersPage } from './pages/OrdersPage';
import { LogisticsPage } from './pages/LogisticsPage';
import { ForecastPage } from './pages/ForecastPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { DatabasePage } from './pages/DatabasePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthModal } from './pages/AuthModal';
import { DemandDetailModal } from './components/modals/DemandDetailModal';
import { PostDemandModal } from './components/modals/PostDemandModal';
import { PledgeSupplyModal } from './components/modals/PledgeSupplyModal';
import { SimpleListProduceModal } from './components/modals/SimpleListProduceModal';
import { INITIAL_DEMANDS } from './data/mockData';
import { DemandRequirement, UserRole, AuthUser } from './types';
import { authService } from './services/authService';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

const getViewFromPath = (path: string): string => {
  const clean = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'landing') return 'landing';
  const validViews = ['marketplace', 'farmer', 'orders', 'buyer', 'logistics', 'forecast', 'prices', 'database', 'privacy', 'terms'];
  if (validViews.includes(clean)) return clean;
  return 'notfound';
};

const getSlugFromView = (view: string): string => {
  if (view === 'landing') return '/';
  if (view === 'notfound') return '/404';
  return `/${view}`;
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getViewFromPath(window.location.pathname);
    }
    return 'landing';
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
        setCurrentView(getViewFromPath(window.location.pathname));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Toast Notification System (Supports Success & Error)
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
    showToast(`Welcome ${user.name}! Verified as ${user.role.toUpperCase()}`);

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
      landing: 'FarmChain : Direct Farm-to-Buyer Market',
      marketplace: 'Market Demand : FarmChain',
      farmer: 'Sell Produce & Farmer Hub : FarmChain',
      orders: 'My Orders & Pickups : FarmChain',
      buyer: 'Commercial Buyer Desk : FarmChain',
      logistics: 'Delivery & Pickups : FarmChain',
      forecast: '7-Day Price Forecast : FarmChain',
      prices: 'Mandi Price Benchmarks : FarmChain',
      database: 'System Architecture : FarmChain',
      privacy: 'Privacy Policy : FarmChain',
      terms: 'Terms and Conditions : FarmChain',
      notfound: 'Page Not Found : FarmChain'
    };
    document.title = titles[currentView] || 'FarmChain : Direct Agri-Tech Platform';

    // Synchronize canonical link tag with current view
    const slug = getSlugFromView(currentView);
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute('href', `https://farmchain-gamma.vercel.app${slug === '/' ? '' : slug}`);
    }
  }, [currentView]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    const slug = getSlugFromView(view);
    if (typeof window !== 'undefined' && window.location.pathname !== slug) {
      window.history.pushState({ view }, '', slug);
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
    showToast(`New requirement for ${created.quantityKg} KG ${created.crop} published!`);
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

    showToast(`Pledged ${quantityKg} KG harvest at ₹${agreedRate}/KG! Scheduled for pickup.`);
  };

  const handleOpenPostDemand = () => {
    requireAuth(
      'buyer',
      () => setIsPostDemandOpen(true),
      'Commercial buyer login required to create a purchase order.'
    );
  };

  const handlePledgeDemand = (demand: DemandRequirement) => {
    requireAuth(
      'farmer',
      () => setPledgeTargetDemand(demand),
      `Farmer sign-in required to pledge harvest for ${demand.crop}.`
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
    showToast(`Successfully listed ${produce.quantityKg.toLocaleString()} KG of ${produce.crop} at ₹${produce.expectedPricePerKg}/KG! We are matching nearby buyers.`);
    setCurrentView('farmer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-bg font-sans text-dark-text antialiased selection:bg-harvest-yellow/30">
      
      {/* Streamlined Farmer-First Navbar */}
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

      {/* Floating Action Toast Notification (Sonner/shadcn inspired) */}
      {toast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 rounded-2xl border border-dark-text/15 bg-pure-white p-4 shadow-soft-lg max-w-md flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
              toast.type === 'error' ? 'bg-terracotta/15 text-terracotta' : 'bg-farm-green/15 text-farm-green'
            }`}>
              {toast.type === 'error' ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-dark-text/50">
                {toast.type === 'error' ? 'System Notice' : 'Verified Event'}
              </p>
              <p className="mt-0.5 text-sm font-medium text-dark-text">{toast.message}</p>
            </div>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-dark-text/40 hover:bg-dark-text/5 hover:text-dark-text transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Routed View Container */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenPostDemand={handleOpenPostDemand}
            liveDemands={demands}
            onSelectDemand={(demand) => {
              setSelectedDemand(demand);
              setDemandModalInitialTab('specs');
            }}
            onOpenSellModal={handleOpenSellModal}
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
              showToast('Vehicle registered for regional collection loops!');
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

        {!['landing', 'marketplace', 'farmer', 'orders', 'buyer', 'logistics', 'forecast', 'prices', 'database', 'privacy', 'terms'].includes(currentView) && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
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

    </div>
  );
};

export default App;
