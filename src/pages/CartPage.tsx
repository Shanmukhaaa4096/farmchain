import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  MapPin,
  Phone,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface CartPageProps {
  onNavigate: (view: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { items, updateQuantity, removeFromCart, clearCart, totalAmount, totalWeightKg } = useCart();
  const [address, setAddress] = useState({
    name: 'Priya Sharma',
    phone: '9876543210',
    street: 'Flat 402, Green Acres Apt, Jubilee Hills',
    city: 'Hyderabad',
    pin: '500033',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      onShowToast('Your cart is empty', 'error');
      return;
    }
    const id = `ORD-HOME-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    onShowToast(`Safe Payment Order #${id} simulated successfully!`);
  };

  if (orderPlaced) {
    return (
      <div className="py-12 sm:py-20 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-16 h-16 bg-[#2F4A3A] text-[#FBF8F2] rounded-full flex items-center justify-center mx-auto shadow-soft-lg animate-in zoom-in-75">
            <CheckCircle2 className="w-8 h-8 text-[#A8B89A]" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C77B58] font-bold">
              SAFE PAYMENT SIMULATED // {orderId}
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323]">
              Order Placed Directly with Farmers!
            </h1>
            <p className="font-sans text-sm text-[#536458] max-w-md mx-auto leading-relaxed">
              Your money is secured safely. Village collection trucks will pick up your harvest tomorrow and deliver fresh to {address.city}.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/15 text-left text-xs font-sans space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-[#536458]">Delivery To:</span>
              <strong className="text-[#163323]">{address.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#536458]">Address:</span>
              <span className="text-[#163323] text-right">{address.street}, {address.city} - {address.pin}</span>
            </div>
            <div className="flex justify-between border-t border-[#2F4A3A]/10 pt-2">
              <span className="text-[#536458]">Payment Status:</span>
              <span className="font-bold text-[#2F4A3A]">Safe Escrow Lock (Simulation)</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('orders')}
              className="text-xs uppercase tracking-wider font-semibold min-h-[44px]"
            >
              Track in My Orders →
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setOrderPlaced(false);
                onNavigate('market');
              }}
              className="text-xs uppercase tracking-wider font-semibold min-h-[44px]"
            >
              Continue Buying Fresh Crops
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('market')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2F4A3A]/75 hover:text-[#C77B58] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Buying Fresh Crops</span>
          </button>

          <span className="font-mono text-[11px] uppercase tracking-wider bg-[#FBF8F2] border border-[#2F4A3A]/15 px-3 py-1 rounded-full text-[#536458]">
            Buy for Home // Cart
          </span>
        </div>

        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#163323] tracking-tight">
            Your Farm Fresh Cart
          </h1>
          <p className="text-xs sm:text-sm text-[#536458] mt-1 font-sans">
            Direct harvest from village farmers to your kitchen with 0% broker fee.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-[#FBF8F2] rounded-[32px] border border-[#2F4A3A]/15 p-12 text-center space-y-4 max-w-xl mx-auto">
            <ShoppingCart className="w-12 h-12 text-[#536458]/40 mx-auto" />
            <h2 className="font-editorial text-2xl font-bold text-[#163323]">Your Cart is Empty</h2>
            <p className="text-xs text-[#536458] leading-relaxed">
              Explore our fresh harvest lots directly from verified farmers across 42 villages.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('market')}
              className="text-xs uppercase tracking-wider font-semibold min-h-[44px]"
            >
              Browse Fresh Crops →
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Items List */}
            <div className="lg:col-span-7 space-y-4">
              {items.map((item) => (
                <div
                  key={item.listingId}
                  className="bg-[#FBF8F2] p-4 sm:p-5 rounded-2xl border border-[#2F4A3A]/15 shadow-soft flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.photoUrl}
                      alt={item.crop}
                      className="w-16 h-16 rounded-xl object-cover border border-[#2F4A3A]/10 shrink-0"
                    />
                    <div>
                      <h3 className="font-editorial text-lg font-bold text-[#163323]">
                        {item.crop}
                      </h3>
                      <p className="text-xs text-[#536458] font-sans">
                        {item.variety} • {item.farmerName} ({item.village})
                      </p>
                      <span className="text-xs font-bold text-[#C77B58] block mt-1">
                        ₹{item.pricePerKg} per kg
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#2F4A3A]/20 rounded-xl overflow-hidden bg-[#F4EFE6]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.listingId, item.quantityKg - 1)}
                        className="p-1.5 hover:bg-[#2F4A3A]/10 text-[#2F4A3A] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 font-mono text-xs font-bold text-[#163323] min-w-[36px] text-center">
                        {item.quantityKg} kg
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.listingId, item.quantityKg + 1)}
                        className="p-1.5 hover:bg-[#2F4A3A]/10 text-[#2F4A3A] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-editorial text-base font-bold text-[#163323] w-16 text-right">
                      ₹{item.pricePerKg * item.quantityKg}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.listingId)}
                      className="p-2 text-[#536458]/60 hover:text-[#C77B58] cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Safe Payment simulation banner */}
              <div className="p-4 rounded-2xl bg-[#A8B89A]/20 border border-[#A8B89A]/40 flex items-start gap-3 text-xs font-sans text-[#163323]">
                <ShieldCheck className="w-5 h-5 text-[#2F4A3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Safe Payment Guarantee (Simulation)</strong>
                  <p className="text-[#536458] mt-0.5">
                    For this hackathon demo, payments are simulated without real money charges. Payout to farmer bank accounts is simulated upon digital gate weighing.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Delivery Form & Checkout Summary */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleCheckout}
                className="bg-[#FBF8F2] p-6 sm:p-7 rounded-[32px] border border-[#2F4A3A]/15 shadow-soft-lg space-y-5"
              >
                <div className="border-b border-[#2F4A3A]/10 pb-3">
                  <h3 className="font-editorial text-xl font-bold text-[#163323]">
                    Delivery Address
                  </h3>
                  <p className="text-xs text-[#536458] font-sans">
                    Scheduled refrigerated delivery to your doorstep
                  </p>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="font-bold text-[#163323] block mb-1">Your Name:</label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#163323] block mb-1">Phone Number (+91):</label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#163323] block mb-1">Street Address:</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#163323] block mb-1">City / Town:</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#163323] block mb-1">PIN Code:</label>
                      <input
                        type="text"
                        value={address.pin}
                        onChange={(e) => setAddress({ ...address, pin: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 bg-[#F4EFE6] border border-[#2F4A3A]/20 rounded-xl text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-[#2F4A3A]/10 pt-4 space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-[#536458]">
                    <span>Total Weight:</span>
                    <span className="font-mono font-bold text-[#163323]">{totalWeightKg} kg</span>
                  </div>
                  <div className="flex justify-between text-[#536458]">
                    <span>Subtotal:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-[#536458]">
                    <span>Village Pickup &amp; Delivery:</span>
                    <span className="text-[#2F4A3A] font-bold uppercase">FREE (Pilot Offer)</span>
                  </div>
                  <div className="flex justify-between text-[#536458]">
                    <span>Broker Intermediary Cut:</span>
                    <span className="text-[#C77B58] font-bold">₹0 (0%)</span>
                  </div>
                  <div className="flex justify-between border-t border-[#2F4A3A]/10 pt-2 text-sm font-bold text-[#163323]">
                    <span>Total Safe Settlement:</span>
                    <span className="font-editorial text-2xl text-[#163323]">₹{totalAmount}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  type="submit"
                  className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[48px]"
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  <span>Place Safe Order (Simulation)</span>
                </Button>

                <p className="text-[10px] text-center text-[#536458] font-mono">
                  100% Direct Payout to Farmer Bank Accounts Upon Delivery
                </p>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
