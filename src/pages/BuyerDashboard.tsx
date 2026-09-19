import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Layers, 
  FileText, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Search,
  Scale,
  DollarSign,
  Heart,
  Package,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DemandRequirement, UserRole } from '../types';
import { MakeOfferModal } from '../components/modals/MakeOfferModal';
import { VoiceSearchButton } from '../components/ui/VoiceSearchButton';
import { useCart } from '../context/CartContext';
import { SAMPLE_LISTINGS, SampleListing } from '../data/sampleHomepageData';

interface BuyerDashboardProps {
  demands: DemandRequirement[];
  onOpenPostDemand: () => void;
  onSelectDemand: (demand: DemandRequirement, initialTab?: 'specs' | 'farmers' | 'negotiate') => void;
  onNavigate: (view: string) => void;
  requireAuth?: (role: UserRole, action: () => void, promptMessage: string) => void;
  isAuthenticated?: boolean;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  demands,
  onOpenPostDemand,
  onSelectDemand,
  onNavigate,
  requireAuth,
  isAuthenticated = false
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'saved' | 'bulk' | 'cart'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<'ALL' | 'Grade A' | 'Grade B' | 'Export Quality'>('ALL');
  const [isMakeOfferOpen, setIsMakeOfferOpen] = useState(false);
  const [activeOfferTarget, setActiveOfferTarget] = useState<{
    crop: string;
    farmer: string;
    rate: number;
    qty: number;
  }>({
    crop: 'Tomatoes (Grade A)',
    farmer: 'Ramesh Reddy (Chevella FPO)',
    rate: 24,
    qty: 1500,
  });

  const { items: cartItems, totalAmount, itemCount } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 3 Seeded Buyer Orders in different statuses
  const seededOrders = [
    {
      id: 'FC-ORD-901',
      crop: 'Organic Red Tomatoes',
      farmer: 'Ramesh Reddy',
      village: 'Chevella, RR Dist',
      quantity: '20 kg',
      mode: 'Buy for Home',
      pricePerKg: 24,
      totalAmount: 480,
      status: 'Packed & Awaiting Pickup',
      statusColor: 'bg-[#E5B94A]/20 text-[#8C6B1C]',
      orderDate: 'Today, 08:30 AM',
      eta: 'Tomorrow Morning',
      safePaymentStatus: 'Held Safely in Bank',
    },
    {
      id: 'FC-ORD-884',
      crop: 'Fresh Red Onions',
      farmer: 'Suresh Rao',
      village: 'Pargi, Vikarabad',
      quantity: '50 kg',
      mode: 'Small Shop Pack',
      pricePerKg: 22,
      totalAmount: 1100,
      status: 'In Transit to Your Doorstep',
      statusColor: 'bg-[#2F4A3A]/10 text-[#2F4A3A]',
      orderDate: 'Yesterday, 04:15 PM',
      eta: 'Out for delivery today',
      safePaymentStatus: 'Held Safely in Bank',
    },
    {
      id: 'FC-ORD-810',
      crop: 'Green Chillies (G4)',
      farmer: 'Babu Rao Mandava',
      village: 'Moinabad',
      quantity: '10 kg',
      mode: 'Buy for Home',
      pricePerKg: 48,
      totalAmount: 480,
      status: 'Delivered & Verified',
      statusColor: 'bg-emerald-100 text-emerald-800',
      orderDate: '15 Sep 2026',
      eta: 'Delivered',
      safePaymentStatus: 'Released to Farmer (Verified ✓)',
    }
  ];

  // 3 Seeded Saved Crops
  const savedCrops: SampleListing[] = SAMPLE_LISTINGS.slice(0, 3);

  const buyerDemands = demands.filter(d => {
    const matchesSearch = d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'ALL' || d.qualityGrade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleOfferSubmitted = (data: {
    crop: string;
    offeredRate: number;
    quantityKg: number;
    deliveryDate: string;
    notes: string;
  }) => {
    setToastMessage(`Offer of ₹${data.offeredRate}/kg for ${data.quantityKg} kg ${data.crop} sent directly to farmer!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F4EFE6] min-h-dvh text-[#2F4A3A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Buyer Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2F4A3A]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#2F4A3A]/70 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2F4A3A] text-[#FBF8F2] text-[10px] font-mono uppercase tracking-wider font-semibold">
                Buyer Account
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#2F4A3A] border border-[#2F4A3A]/15 text-[10px] font-mono uppercase font-semibold">
                Households, Kitchens &amp; Bulk Buyers
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5B94A]/20 text-[#2F4A3A] text-[10px] font-bold">
                Sample data
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#2F4A3A]">
              My Buyer Orders &amp; Demands
            </h1>
            <p className="text-sm sm:text-base text-[#536458] mt-2 max-w-2xl leading-relaxed">
              Buy directly from verified family farms and grower groups. Pay with Safe Payment so your money is protected until delivery inspection.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('marketplace')}
              className="text-xs tracking-wider uppercase font-semibold min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5 text-[#C77B58]" />
              <span>Buy Fresh Crops</span>
            </Button>
            <Button
              variant="clay"
              size="lg"
              onClick={onOpenPostDemand}
              className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold min-h-[44px]"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Ask for a Bulk Price</span>
            </Button>
          </div>
        </div>

        {/* Action Toast */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 shadow-soft-sm">
            <div className="text-xs font-mono text-[#536458] uppercase">Active Orders</div>
            <div className="font-serif text-2xl font-bold text-[#2F4A3A] mt-1">2 Ongoing</div>
            <div className="text-[11px] text-[#536458] mt-0.5">1 Delivered</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 shadow-soft-sm">
            <div className="text-xs font-mono text-[#536458] uppercase">Safe Payment Held</div>
            <div className="font-serif text-2xl font-bold text-[#2F4A3A] mt-1">₹1,580</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Protected in Bank</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 shadow-soft-sm">
            <div className="text-xs font-mono text-[#536458] uppercase">Saved Crops</div>
            <div className="font-serif text-2xl font-bold text-[#2F4A3A] mt-1">3 Crops</div>
            <div className="text-[11px] text-[#536458] mt-0.5">From 3 Verified Farmers</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 shadow-soft-sm">
            <div className="text-xs font-mono text-[#536458] uppercase">In Your Cart</div>
            <div className="font-serif text-2xl font-bold text-[#C77B58] mt-1">{itemCount} Items</div>
            <button 
              onClick={() => onNavigate('cart')}
              className="text-[11px] text-[#C77B58] font-bold hover:underline mt-0.5 flex items-center gap-1"
            >
              View Cart (₹{totalAmount}) →
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#2F4A3A]/10 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all min-h-[44px] flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                : 'bg-white border border-[#2F4A3A]/15 text-[#2F4A3A]/70 hover:bg-[#FBF8F2]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Orders (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all min-h-[44px] flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                : 'bg-white border border-[#2F4A3A]/15 text-[#2F4A3A]/70 hover:bg-[#FBF8F2]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Crops (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all min-h-[44px] flex items-center gap-2 ${
              activeTab === 'bulk'
                ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                : 'bg-white border border-[#2F4A3A]/15 text-[#2F4A3A]/70 hover:bg-[#FBF8F2]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Bulk Orders &amp; Demands ({buyerDemands.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all min-h-[44px] flex items-center gap-2 ${
              activeTab === 'cart'
                ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                : 'bg-white border border-[#2F4A3A]/15 text-[#2F4A3A]/70 hover:bg-[#FBF8F2]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart Preview ({itemCount})</span>
          </button>
        </div>

        {/* TAB 1: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-2xl text-[#2F4A3A]">
                Recent Direct Orders
              </h2>
              <span className="font-mono text-xs text-[#536458]">
                Protected by Safe Payment
              </span>
            </div>

            {seededOrders.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-[#2F4A3A]/10 text-center space-y-4">
                <Package className="w-12 h-12 mx-auto text-[#536458]/40" />
                <h3 className="font-serif font-bold text-xl text-[#2F4A3A]">No orders yet</h3>
                <p className="text-sm text-[#536458] max-w-md mx-auto">
                  Browse fresh harvest crops from local farmers and place your first order.
                </p>
                <Button 
                  variant="clay" 
                  onClick={() => onNavigate('marketplace')}
                  className="shadow-soft-terracotta"
                >
                  Buy Fresh Crops
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {seededOrders.map((ord) => (
                  <div 
                    key={ord.id}
                    className="p-6 rounded-3xl bg-white border border-[#2F4A3A]/10 shadow-soft-sm hover:border-[#2F4A3A]/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
                        <span className="font-bold text-[#2F4A3A]">{ord.id}</span>
                        <span>•</span>
                        <span className="text-[#536458]">{ord.orderDate}</span>
                        <span>•</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#C77B58]/10 text-[#C77B58] font-bold text-[10px]">
                          {ord.mode}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${ord.statusColor}`}>
                          {ord.status}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2F4A3A]">
                        {ord.crop} — {ord.quantity}
                      </h3>

                      <div className="text-xs text-[#536458] flex items-center gap-4 flex-wrap">
                        <span>Farmer: <strong className="text-[#2F4A3A]">{ord.farmer}</strong> ({ord.village})</span>
                        <span>Rate: <strong className="text-[#2F4A3A]">₹{ord.pricePerKg}/kg</strong></span>
                        <span>Total: <strong className="text-[#2F4A3A] font-serif text-sm">₹{ord.totalAmount}</strong></span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#FBF8F2] border border-[#2F4A3A]/10 text-xs font-mono text-[#536458] flex items-center gap-2 max-w-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Safe Payment: <strong className="text-[#2F4A3A]">{ord.safePaymentStatus}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate('orders')}
                        className="text-xs min-h-[44px]"
                      >
                        Track Delivery →
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onNavigate('help')}
                        className="text-xs text-[#536458] hover:text-[#2F4A3A] min-h-[44px]"
                      >
                        Help with Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED CROPS */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-2xl text-[#2F4A3A]">
                Crops You Bookmarked
              </h2>
              <span className="font-mono text-xs text-[#536458]">
                Direct from Farm
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedCrops.map((crop: SampleListing) => (
                <div 
                  key={crop.id}
                  className="p-5 rounded-3xl bg-white border border-[#2F4A3A]/10 shadow-soft-sm hover:border-[#2F4A3A]/20 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <img 
                      src={crop.photoUrl} 
                      alt={crop.crop} 
                      className="w-full h-36 object-cover rounded-2xl"
                    />
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono uppercase bg-[#2F4A3A]/10 text-[#2F4A3A] px-2 py-0.5 rounded-full font-bold">
                        {crop.category}
                      </span>
                      <span className="font-serif font-bold text-lg text-[#2F4A3A]">
                        ₹{crop.pricePerKg}/kg
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#2F4A3A]">{crop.crop} ({crop.variety})</h3>
                    <p className="text-xs text-[#536458]">
                      By {crop.farmerName} • {crop.village}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#2F4A3A]/10">
                    <Button 
                      variant="clay" 
                      size="sm" 
                      onClick={() => onNavigate(`crop/${crop.id}`)}
                      className="w-full text-xs shadow-soft-terracotta min-h-[44px]"
                    >
                      View Crop Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BULK DEMANDS (Original requirements view cleaned of jargon) */}
        {activeTab === 'bulk' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#2F4A3A]/15 bg-white p-6 md:p-8 shadow-soft-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2F4A3A]/10">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#2F4A3A] uppercase tracking-wider block">
                    SAMPLE BULK PO // FULFILLMENT BREAKDOWN
                  </span>
                  <h2 className="font-serif font-bold text-2xl text-[#2F4A3A] mt-1">
                    Matched Cluster Supply: 24 Quintals Tomatoes (2,400 kg)
                  </h2>
                  <p className="text-xs text-[#536458] mt-0.5">
                    1 quintal = 100 kg • Picked up together to save transport cost
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2F4A3A]/10 text-[#2F4A3A] border border-[#2F4A3A]/20 font-mono text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Requirement 100% Fulfilled
                </span>
              </div>

              {/* Cluster Farm Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#2F4A3A]">FARM A (CHEVALLA)</span>
                    <span className="text-[#2F4A3A] font-bold">8 Quintals (800 kg)</span>
                  </div>
                  <p className="text-[11px] text-[#536458] font-sans">Ramesh Reddy • Hybrid • Grade A</p>
                  <div className="text-[10px] text-[#536458]/70 pt-1">Pickup ETA: 07:15 AM (Loaded ✓)</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#2F4A3A]">FARM B (SHANKARPALLY)</span>
                    <span className="text-[#2F4A3A] font-bold">6 Quintals (600 kg)</span>
                  </div>
                  <p className="text-[11px] text-[#536458] font-sans">Kavitha Patel • Greenhouse • Grade A</p>
                  <div className="text-[10px] text-[#536458]/70 pt-1">Pickup ETA: 07:55 AM (Loaded ✓)</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/10 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#2F4A3A]">FARM C (MOINABAD)</span>
                    <span className="text-[#2F4A3A] font-bold">10 Quintals (1,000 kg)</span>
                  </div>
                  <p className="text-[11px] text-[#536458] font-sans">Babu Rao Mandava • Grade A</p>
                  <div className="text-[10px] text-[#536458]/70 pt-1">Pickup ETA: 08:30 AM (Loaded ✓)</div>
                </div>
              </div>

              {/* Total Sum Bar */}
              <div className="p-5 rounded-2xl bg-[#2F4A3A] text-[#FBF8F2] flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-soft-sm">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[#FBF8F2]/60 block text-[10px] uppercase">Total Consolidated</span>
                    <strong className="font-serif text-xl font-bold text-[#FBF8F2]">24 Quintals</strong>
                  </div>
                  <div>
                    <span className="text-[#FBF8F2]/60 block text-[10px] uppercase">Direct Farm Value</span>
                    <strong className="font-serif text-xl font-bold text-[#FBF8F2]">₹57,600</strong>
                  </div>
                  <div>
                    <span className="text-[#FBF8F2]/60 block text-[10px] uppercase">Direct Transport</span>
                    <strong className="font-serif text-xl font-bold text-[#FBF8F2]">₹3.00 / kg</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button 
                    variant="clay" 
                    size="sm" 
                    onClick={() => onNavigate('how-it-works')}
                    className="text-xs tracking-wider uppercase font-semibold shadow-soft-terracotta min-h-[44px]"
                  >
                    <Truck className="w-3.5 h-3.5 mr-1.5" /> See Pickup Details →
                  </Button>
                </div>
              </div>
            </div>

            {/* Sourcing Search & Filter Strip */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative flex items-center w-full sm:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2F4A3A]/40 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by crop or delivery city..."
                    className="w-full pl-11 pr-14 py-2.5 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#2F4A3A] focus:ring-2 focus:ring-[#2F4A3A]/10 shadow-soft-sm"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <VoiceSearchButton onResult={(text) => setSearchQuery(text)} />
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto font-mono text-xs">
                  {(['ALL', 'Grade A', 'Grade B', 'Export Quality'] as const).map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`px-3 py-1.5 rounded-full uppercase font-bold transition-all whitespace-nowrap min-h-[44px] ${
                        selectedGrade === grade
                          ? 'bg-[#2F4A3A] text-[#FBF8F2] shadow-soft-sm'
                          : 'bg-white border border-[#2F4A3A]/15 text-[#2F4A3A]/70 hover:bg-[#FBF8F2]'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Requirements List */}
              <div className="space-y-4">
                {buyerDemands.map((demand) => {
                  const percent = Math.min(100, Math.round((demand.matchedQuantityKg / demand.quantityKg) * 100));
                  const isFulfilled = percent >= 100;

                  return (
                    <div 
                      key={demand.id} 
                      className="rounded-2xl border border-[#2F4A3A]/10 bg-white p-6 hover:border-[#2F4A3A]/30 transition-all shadow-soft-sm"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
                            <span className="font-bold text-[#2F4A3A]/60">{demand.id}</span>
                            <span>•</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              isFulfilled ? 'bg-[#2F4A3A]/10 text-[#2F4A3A] border border-[#2F4A3A]/20' : 'bg-[#E5B94A]/20 text-[#2F4A3A]'
                            }`}>
                              {isFulfilled ? 'FULFILLED' : `${percent}% MATCHED`}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-[#2F4A3A]">{demand.qualityGrade}</span>
                          </div>

                          <h4 className="font-serif font-bold text-2xl text-[#2F4A3A]">
                            {demand.crop} : {demand.quantityKg.toLocaleString()} kg ({(demand.quantityKg / 100).toFixed(0)} Quintals)
                          </h4>
                          <p className="text-xs text-[#536458]">
                            Delivery City: <strong className="text-[#2F4A3A]">{demand.deliveryLocation}</strong> • By: <strong className="text-[#2F4A3A]">{demand.requiredDate}</strong>
                          </p>

                          <div className="pt-2 max-w-md font-mono text-xs">
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-[#536458]">FARMER POOLING:</span>
                              <span className="font-bold text-[#2F4A3A]">
                                {demand.matchedQuantityKg.toLocaleString()} / {demand.quantityKg.toLocaleString()} kg
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-[#2F4A3A]/10 overflow-hidden">
                              <div 
                                className={`h-full transition-all ${isFulfilled ? 'bg-[#2F4A3A]' : 'bg-[#C77B58]'}`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2 shrink-0">
                          <Button
                            variant="clay"
                            size="sm"
                            onClick={() => onSelectDemand(demand, 'farmers')}
                            className="text-xs px-4 shadow-soft-terracotta min-h-[44px]"
                          >
                            View Matched Farmers ({demand.matchedFarmersCount}) →
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const openChat = () => onSelectDemand(demand, 'negotiate');
                              if (!isAuthenticated && requireAuth) {
                                requireAuth(
                                  'buyer',
                                  openChat,
                                  `Buyer login required to enter price negotiation for ${demand.crop}.`
                                );
                              } else {
                                openChat();
                              }
                            }}
                            className="text-xs min-h-[44px]"
                          >
                            <MessageSquare className="w-3.5 h-3.5 mr-1" /> Direct Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CART PREVIEW */}
        {activeTab === 'cart' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-2xl text-[#2F4A3A]">
                Your Shopping Cart ({itemCount} items)
              </h2>
              <span className="font-mono text-xs text-[#536458]">
                Fixed Price per kg
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-[#2F4A3A]/10 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#536458]/40" />
                <h3 className="font-serif font-bold text-xl text-[#2F4A3A]">Your cart is empty</h3>
                <p className="text-sm text-[#536458] max-w-md mx-auto">
                  Add fresh tomatoes, onions, grains, or spices directly from farmer listings.
                </p>
                <Button 
                  variant="clay" 
                  onClick={() => onNavigate('marketplace')}
                  className="shadow-soft-terracotta"
                >
                  Buy Fresh Crops
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={item.listingId}
                      className="p-4 rounded-2xl bg-white border border-[#2F4A3A]/10 flex items-center justify-between gap-4 shadow-soft-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.photoUrl} 
                          alt={item.crop} 
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#2F4A3A]">{item.crop}</h4>
                          <p className="text-xs text-[#536458]">
                            Farmer: {item.farmerName} • ₹{item.pricePerKg}/kg
                          </p>
                          <span className="text-xs font-mono font-bold text-[#C77B58]">
                            Qty: {item.quantityKg} kg
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif font-bold text-lg text-[#2F4A3A]">
                          ₹{item.pricePerKg * item.quantityKg}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#2F4A3A]/10 shadow-soft-sm space-y-4 h-fit">
                  <h3 className="font-serif font-bold text-xl text-[#2F4A3A]">Order Summary</h3>
                  <div className="space-y-2 text-sm text-[#536458]">
                    <div className="flex justify-between">
                      <span>Total produce</span>
                      <span className="text-[#2F4A3A] font-bold">₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Direct farm transport</span>
                      <span className="text-[#2F4A3A] font-bold">₹60</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Broker fee</span>
                      <span className="text-emerald-700 font-bold">₹0 (Free)</span>
                    </div>
                    <div className="pt-2 border-t border-[#2F4A3A]/10 flex justify-between font-serif font-bold text-lg text-[#2F4A3A]">
                      <span>Final total</span>
                      <span>₹{totalAmount + 60}</span>
                    </div>
                  </div>

                  <Button 
                    variant="clay" 
                    onClick={() => onNavigate('cart')}
                    className="w-full shadow-soft-terracotta min-h-[44px] text-xs uppercase font-bold"
                  >
                    Proceed to Safe Checkout →
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal for Direct Offers */}
        <MakeOfferModal
          isOpen={isMakeOfferOpen}
          onClose={() => setIsMakeOfferOpen(false)}
          cropName={activeOfferTarget.crop}
          farmerName={activeOfferTarget.farmer}
          listedPricePerKg={activeOfferTarget.rate}
          availableKg={activeOfferTarget.qty}
          onSubmitOffer={handleOfferSubmitted}
        />

      </div>
    </div>
  );
};
