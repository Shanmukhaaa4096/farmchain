import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
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
import { INITIAL_DEMANDS } from './data/mockData';
import { DemandRequirement, UserRole, AuthUser } from './types';
import { authService } from './services/authService';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');
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

  // Synchronize activeRole with current session on mount if available
  useEffect(() => {
    const session = authService.getCurrentSession();
    if (session) {
      setCurrentUser(session);
      setIsAuthenticated(true);
      setActiveRole(session.role);
    }
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
   * If unauthenticated, displays the AuthModal with custom prompt and stores action for execution on login.
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
    showToast(`Access granted: Welcome ${user.name}! Verified as ${user.role.toUpperCase()} (${user.identifier})`);

    // Execute pending gated action immediately upon successful authentication
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
    showToast('Signed out of FarmChain. Public guest browsing mode active.');
  };

  // Dynamic Page Title Strategy
  useEffect(() => {
    const titles: Record<string, string> = {
      landing: 'FarmChain : Demand-Driven Agricultural Marketplace',
      marketplace: 'Live Demand Board : FarmChain',
      farmer: 'Farmer Hub & Assisted Onboarding : FarmChain',
      buyer: 'Commercial Buyer Desk : FarmChain',
      logistics: 'Coordinated Rural Fleet Logistics : FarmChain',
      forecast: 'Demand & Price Forecasting : FarmChain',
      prices: 'APMC Mandi Price Benchmark : FarmChain',
      database: 'Database Architecture & Scalability : FarmChain',
      privacy: 'Privacy Policy : FarmChain',
      terms: 'Terms and Conditions : FarmChain',
      notfound: 'Page Not Found : FarmChain'
    };
    document.title = titles[currentView] || 'FarmChain : Demand-Driven Agri-Tech Platform';
  }, [currentView]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
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
    showToast(`New demand for ${created.quantityKg} KG ${created.crop} published! Algorithmic matching initiated.`);
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

    showToast(`Successfully pledged ${quantityKg} KG harvest at ₹${agreedRate}/KG! Added to collection loop.`);
  };

  const handleOpenPostDemand = () => {
    requireAuth(
      'buyer',
      () => setIsPostDemandOpen(true),
      'Commercial buyer authentication required to create and post a purchase order. Please verify your buyer credentials to publish demand.'
    );
  };

  const handlePledgeDemand = (demand: DemandRequirement) => {
    requireAuth(
      'farmer',
      () => setPledgeTargetDemand(demand),
      `Farmer authentication required to pledge harvest for ${demand.crop} (${demand.id}). Please sign in with your Kisan ID / Registered mobile.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream font-body text-ink-black antialiased selection:bg-harvest-yellow">
      
      {/* Neo-Brutalist Global Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        activeRole={activeRole}
        onRoleChange={(role) => {
          setActiveRole(role);
          showToast(`Switched active view profile to: ${role.toUpperCase()}`);
        }}
        onOpenAuth={(mode) => {
          setAuthPromptMessage(undefined);
          setAuthModalMode(mode || 'signin');
          setIsAuthOpen(true);
        }}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Floating Action Toast Notification (Success / Error) */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 text-paper-white border-brutal-thick p-4 shadow-brutal-lg max-w-md flex items-start justify-between gap-3 animate-in slide-in-from-bottom-4 ${
          toast.type === 'error' ? 'bg-rust-red' : 'bg-farm-green'
        }`}>
          <div className="flex items-start gap-2.5 font-mono text-xs">
            {toast.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-harvest-yellow shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-harvest-yellow shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="text-harvest-yellow block uppercase font-bold">
                {toast.type === 'error' ? 'SYSTEM ALERT:' : 'NETWORK EVENT:'}
              </strong>
              <p className="mt-0.5 text-paper-white">{toast.message}</p>
            </div>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-paper-white hover:text-harvest-yellow"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
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
            requireAuth={requireAuth}
            isAuthenticated={isAuthenticated}
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

        {!['landing', 'marketplace', 'farmer', 'buyer', 'logistics', 'forecast', 'prices', 'database', 'privacy', 'terms'].includes(currentView) && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Modals */}
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

      {/* Bold Neo-Brutalist Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
};

export default App;
