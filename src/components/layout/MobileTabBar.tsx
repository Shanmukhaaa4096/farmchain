import React from 'react';
import { Home, ShoppingBag, TrendingUp, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface MobileTabBarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
}) => {
  const { itemCount } = useCart();
  const { isAuthenticated, currentUser } = useAuth();

  const handleAccountClick = () => {
    if (isAuthenticated) {
      if (currentUser?.role === 'buyer') {
        onNavigate('buyer');
      } else if (currentUser?.role === 'admin') {
        onNavigate('admin');
      } else {
        onNavigate('farmer');
      }
    } else {
      onOpenAuth('signin');
    }
  };

  const isAccountActive = ['farmer', 'buyer', 'admin', 'orders'].includes(currentView);

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FBF8F2]/95 backdrop-blur-md border-t border-[#2F4A3A]/15 shadow-soft-lg pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-5 items-center justify-around px-1 py-1 text-center font-sans">
        
        {/* 1. HOME */}
        <button
          onClick={() => onNavigate('landing')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl transition-all ${
            currentView === 'landing'
              ? 'text-[#2F4A3A] font-bold'
              : 'text-[#536458] hover:text-[#2F4A3A]'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${currentView === 'landing' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
          {currentView === 'landing' && (
            <span className="w-1 h-1 rounded-full bg-[#C77B58] mt-0.5" />
          )}
        </button>

        {/* 2. MARKET */}
        <button
          onClick={() => onNavigate('marketplace')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl transition-all ${
            currentView === 'marketplace' || currentView === 'crop'
              ? 'text-[#2F4A3A] font-bold'
              : 'text-[#536458] hover:text-[#2F4A3A]'
          }`}
          aria-label="Buy Fresh Crops"
        >
          <ShoppingBag className={`w-5 h-5 ${currentView === 'marketplace' || currentView === 'crop' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Market</span>
          {(currentView === 'marketplace' || currentView === 'crop') && (
            <span className="w-1 h-1 rounded-full bg-[#C77B58] mt-0.5" />
          )}
        </button>

        {/* 3. PRICES */}
        <button
          onClick={() => onNavigate('prices')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl transition-all ${
            currentView === 'prices'
              ? 'text-[#2F4A3A] font-bold'
              : 'text-[#536458] hover:text-[#2F4A3A]'
          }`}
          aria-label="Today's Prices"
        >
          <TrendingUp className={`w-5 h-5 ${currentView === 'prices' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Prices</span>
          {currentView === 'prices' && (
            <span className="w-1 h-1 rounded-full bg-[#C77B58] mt-0.5" />
          )}
        </button>

        {/* 4. CART */}
        <button
          onClick={() => onNavigate('cart')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl relative transition-all ${
            currentView === 'cart'
              ? 'text-[#2F4A3A] font-bold'
              : 'text-[#536458] hover:text-[#2F4A3A]'
          }`}
          aria-label="Shopping Cart"
        >
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 ${currentView === 'cart' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#C77B58] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs animate-in zoom-in-75">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Cart</span>
          {currentView === 'cart' && (
            <span className="w-1 h-1 rounded-full bg-[#C77B58] mt-0.5" />
          )}
        </button>

        {/* 5. ACCOUNT */}
        <button
          onClick={handleAccountClick}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl transition-all ${
            isAccountActive
              ? 'text-[#2F4A3A] font-bold'
              : 'text-[#536458] hover:text-[#2F4A3A]'
          }`}
          aria-label={isAuthenticated ? 'Account Dashboard' : 'Sign In'}
        >
          <div className="relative">
            <User className={`w-5 h-5 ${isAccountActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {isAuthenticated && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-600 border border-white" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">
            {isAuthenticated ? (currentUser?.role === 'buyer' ? 'Buyer' : currentUser?.role === 'admin' ? 'Admin' : 'Farmer') : 'Account'}
          </span>
          {isAccountActive && (
            <span className="w-1 h-1 rounded-full bg-[#C77B58] mt-0.5" />
          )}
        </button>

      </div>
    </nav>
  );
};
