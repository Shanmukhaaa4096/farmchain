import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  Phone, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  FileText,
  AlertCircle,
  Package,
  Store,
  Sparkles,
  Star,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { RatingModal } from '../components/modals/RatingModal';
import { EscrowSimulator } from '../components/interactive/EscrowSimulator';

export type OrderStage = 'Offered' | 'Accepted' | 'Pickup scheduled' | 'Delivered' | 'Paid';

export interface FarmerOrder {
  id: string;
  orderNumber: string;
  product: string;
  quantityKg: number;
  buyer: string;
  buyerType: string;
  stage: OrderStage;
  stageIndex: number; // 0 to 4
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  ratePerKg: number;
  totalPayout: number;
  driverName?: string;
  driverPhone?: string;
  vehiclePlate?: string;
  notes?: string;
  hasReviewed?: boolean;
}

const ORDER_STAGES: { stage: OrderStage; label: string }[] = [
  { stage: 'Offered', label: 'Offered' },
  { stage: 'Accepted', label: 'Accepted' },
  { stage: 'Pickup scheduled', label: 'Pickup Scheduled' },
  { stage: 'Delivered', label: 'Delivered' },
  { stage: 'Paid', label: 'Paid' },
];

const INITIAL_ORDERS: FarmerOrder[] = [
  {
    id: 'ORD-001',
    orderNumber: '#FC-2026-891',
    product: 'Tomatoes (Grade A)',
    quantityKg: 800,
    buyer: 'UrbanFork Kitchens',
    buyerType: 'Restaurant Chain',
    stage: 'Pickup scheduled',
    stageIndex: 2,
    pickupDate: 'Today, 25 Sep 2026',
    pickupTime: '07:15 AM',
    pickupLocation: 'Chevella Village Farm Gate #1',
    ratePerKg: 24,
    totalPayout: 19200,
    driverName: 'Suresh Kumar',
    driverPhone: '+91 98492 01842',
    vehiclePlate: 'TS-08-UB-4420 (Tata 407 Reefer)',
    notes: 'Standardized 25kg crates weighed and tagged at village gate. Automated digital escrow payout released upon dock weighbridge verification.'
  },
  {
    id: 'ORD-002',
    orderNumber: '#FC-2026-892',
    product: 'Green Chilli (G4 Hot)',
    quantityKg: 200,
    buyer: 'Spiceland Wholesale Traders',
    buyerType: 'Wholesale Buyer',
    stage: 'Accepted',
    stageIndex: 1,
    pickupDate: 'Tomorrow, 26 Sep 2026',
    pickupTime: '08:30 AM',
    pickupLocation: 'Chevella Village Farm Gate #1',
    ratePerKg: 48,
    totalPayout: 9600,
    driverName: 'Ravi Teja',
    driverPhone: '+91 94401 23819',
    vehiclePlate: 'TS-07-EA-9912',
    notes: 'Morning picking scheduled. Clean, sorted moisture-free packaging in food-grade crates.'
  },
  {
    id: 'ORD-003',
    orderNumber: '#FC-2026-879',
    product: 'Bell Peppers (Yellow/Red)',
    quantityKg: 400,
    buyer: 'Grand Hyatt Procurement',
    buyerType: 'Luxury Hotel',
    stage: 'Offered',
    stageIndex: 0,
    pickupDate: '28 Sep 2026',
    pickupTime: '09:00 AM',
    pickupLocation: 'Chevella Village Hub',
    ratePerKg: 58,
    totalPayout: 23200,
    notes: 'Buyer purchase order locked with advance escrow hold. Crating supplies dispatched to village point.'
  },
  {
    id: 'ORD-004',
    orderNumber: '#FC-2026-840',
    product: 'Onions (Pink Medium)',
    quantityKg: 1500,
    buyer: 'FreshSprout Supermarkets',
    buyerType: 'Supermarket Chain',
    stage: 'Paid',
    stageIndex: 4,
    pickupDate: '20 Sep 2026',
    pickupTime: '06:45 AM',
    pickupLocation: 'Chevella Village Hub',
    ratePerKg: 28,
    totalPayout: 42000,
    driverName: 'Mohd. Imran',
    driverPhone: '+91 97000 44123',
    vehiclePlate: 'MH-12-BQ-5501',
    hasReviewed: false,
    notes: 'Delivered and signed off at Madhapur dock. Full payment of ₹42,000 released directly to farmer account ending in ...8412 via instant IMPS.'
  }
];

interface OrdersPageProps {
  onNavigate: (view: string) => void;
  onOpenSellModal?: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigate, onOpenSellModal }) => {
  const [orders, setOrders] = useState<FarmerOrder[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedOrder, setSelectedOrder] = useState<FarmerOrder | null>(null);
  const [ratingTargetOrder, setRatingTargetOrder] = useState<FarmerOrder | null>(null);
  const [showEscrowSimulator, setShowEscrowSimulator] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') return order.stage !== 'Paid';
    if (activeTab === 'completed') return order.stage === 'Paid' || order.stage === 'Delivered';
    return true;
  });

  const handleReviewSubmitted = (data: { orderId: string; rating: number; comment: string; tags: string[] }) => {
    setOrders(prev => prev.map(o => o.id === data.orderId ? { ...o, hasReviewed: true } : o));
    setToastMessage(`Thank you! Your ${data.rating}★ verified trade review has been published.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="py-8 sm:py-12 bg-paper-bg min-h-screen text-dark-text">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Editorial Orders Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-dark-text/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-dark-text/60">
              <span className="px-2.5 py-0.5 rounded-full bg-farm-green text-paper-bg text-[10px] uppercase tracking-wider font-semibold">
                Direct Dispatch Ledger
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-pure-white text-dark-text border border-dark-text/15 text-[10px] uppercase font-semibold">
                5-Stage Escrow Tracker
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark-text">
              Orders &amp; Dispatch Status
            </h1>
            <p className="text-xs sm:text-base text-dark-text/70 mt-1 max-w-2xl">
              Track multi-stage order lifecycles: <strong>Offered → Accepted → Pickup scheduled → Delivered → Paid</strong> with instant dock escrow release.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowEscrowSimulator(!showEscrowSimulator)}
              className="text-xs tracking-wider uppercase font-semibold"
            >
              <Landmark className="w-3.5 h-3.5 mr-1" />
              {showEscrowSimulator ? 'Hide Simulator' : 'Escrow Simulator'}
            </Button>
            {onOpenSellModal && (
              <Button
                variant="clay"
                size="md"
                onClick={onOpenSellModal}
                className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold"
              >
                + Sell Produce
              </Button>
            )}
          </div>
        </div>

        {/* Action Toast */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Collapsible Escrow Simulator Component */}
        {showEscrowSimulator && (
          <div className="animate-in fade-in duration-300">
            <EscrowSimulator />
          </div>
        )}

        {/* Filter Tabs: All, Active, Completed */}
        <div className="flex items-center gap-2 border-b border-dark-text/10 pb-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-farm-green text-paper-bg shadow-soft-sm'
                : 'bg-pure-white text-dark-text border border-dark-text/15 hover:bg-paper-bg'
            }`}
          >
            ALL ORDERS ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'active'
                ? 'bg-farm-green text-paper-bg shadow-soft-sm'
                : 'bg-pure-white text-dark-text border border-dark-text/15 hover:bg-paper-bg'
            }`}
          >
            ACTIVE ({orders.filter(o => o.stage !== 'Paid').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-farm-green text-paper-bg shadow-soft-sm'
                : 'bg-pure-white text-dark-text border border-dark-text/15 hover:bg-paper-bg'
            }`}
          >
            COMPLETED / PAID ({orders.filter(o => o.stage === 'Paid' || o.stage === 'Delivered').length})
          </button>
        </div>

        {/* Orders Cards List */}
        <div className="space-y-5">
          {filteredOrders.length === 0 ? (
            <EmptyState
              type="orders"
              title="NO ORDERS IN THIS VIEW"
              description="No harvest purchase orders match the selected filter. Browse open buyer lots in the marketplace to lock in direct contracts."
              actionLabel="View Marketplace"
              onAction={() => onNavigate('marketplace')}
            />
          ) : (
            filteredOrders.map((order) => {
              const isPaid = order.stage === 'Paid';

              return (
                <div
                  key={order.id}
                  className="rounded-3xl border border-dark-text/10 bg-pure-white p-6 shadow-soft-sm hover:border-farm-green/30 hover:shadow-soft-md transition-all space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="font-bold text-dark-text/50">{order.orderNumber}</span>
                        <span>•</span>
                        <span className="text-farm-green font-bold">₹{order.ratePerKg}/KG</span>
                        <span>•</span>
                        <span className="text-dark-text/60">Total: ₹{order.totalPayout.toLocaleString()}</span>
                      </div>

                      <h3 className="font-serif font-bold text-2xl text-dark-text">
                        {order.product}
                      </h3>
                      <p className="text-xs text-dark-text/70 font-sans">
                        Buyer: <strong className="text-dark-text">{order.buyer}</strong> ({order.buyerType})
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
                        isPaid 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-harvest-yellow/20 text-dark-text border border-harvest-yellow/30'
                      }`}>
                        {order.stage}
                      </span>

                      {isPaid && !order.hasReviewed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRatingTargetOrder(order);
                          }}
                          className="text-xs"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" />
                          Rate Trade
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* 5-Stage Lifecycle Stepper */}
                  <div className="pt-2 border-t border-dark-text/10">
                    <div className="mb-2 flex items-center justify-between text-[11px] font-mono uppercase text-dark-text/50 font-semibold">
                      <span>Status Progression</span>
                      <span className="text-farm-green font-bold">Stage {order.stageIndex + 1} of 5</span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {ORDER_STAGES.map((s, idx) => {
                        const isPast = idx < order.stageIndex;
                        const isCurrent = idx === order.stageIndex;

                        return (
                          <div key={s.stage} className="flex flex-col items-center text-center">
                            <div className={`h-2 w-full rounded-full transition-all ${
                              isPast || isCurrent
                                ? 'bg-farm-green'
                                : 'bg-dark-text/10'
                            }`} />
                            <span className={`mt-1.5 hidden sm:block text-[10px] font-mono leading-none ${
                              isCurrent
                                ? 'font-bold text-farm-green'
                                : isPast
                                  ? 'text-dark-text/70'
                                  : 'text-dark-text/30'
                            }`}>
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs font-mono text-dark-text/70">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-farm-green shrink-0" />
                      <span>Scheduled: <strong className="text-dark-text">{order.pickupDate}</strong> at {order.pickupTime}</span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-farm-green font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Dispatch Slip</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Order Details Dispatch Slip Modal */}
        {selectedOrder && (
          <Modal
            isOpen={selectedOrder !== null}
            onClose={() => setSelectedOrder(null)}
            title={`Dispatch Slip // ${selectedOrder.orderNumber}`}
            subtitle={`${selectedOrder.product} • ${selectedOrder.quantityKg.toLocaleString()} KG`}
            maxWidth="md"
          >
            <div className="space-y-5 text-xs">
              
              {/* Status Stepper Banner */}
              <div className="p-4 rounded-2xl bg-paper-bg/80 border border-dark-text/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-dark-text/50 font-mono uppercase tracking-wider block">CURRENT STAGE</span>
                  <span className="mt-1 font-serif text-lg font-bold text-farm-green block">
                    {selectedOrder.stage}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-dark-text/50 font-mono uppercase tracking-wider block">CONTRACT VALUE</span>
                  <strong className="font-serif text-xl font-bold text-farm-green">
                    ₹{selectedOrder.totalPayout.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* 5-Stage Visual Stepper */}
              <div className="p-4 rounded-2xl border border-dark-text/10 bg-pure-white space-y-3">
                <span className="font-mono text-[10px] text-dark-text/50 uppercase tracking-wider font-semibold block">
                  LIFECYCLE TIMELINE
                </span>
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  {ORDER_STAGES.map((s, idx) => {
                    const isPassed = idx <= selectedOrder.stageIndex;
                    return (
                      <div key={s.stage} className="space-y-1">
                        <div className={`h-2 rounded-full ${isPassed ? 'bg-farm-green' : 'bg-dark-text/10'}`} />
                        <span className={`text-[9px] font-mono block truncate ${isPassed ? 'text-dark-text font-bold' : 'text-dark-text/30'}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Core Details Table */}
              <div className="p-4 rounded-2xl border border-dark-text/10 bg-pure-white space-y-2.5 font-mono">
                <div className="flex justify-between py-1 border-b border-dark-text/10">
                  <span className="text-dark-text/60">Product Lot:</span>
                  <strong className="text-dark-text">{selectedOrder.product}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-dark-text/10">
                  <span className="text-dark-text/60">Crated Quantity:</span>
                  <strong className="text-dark-text">{selectedOrder.quantityKg.toLocaleString()} KG</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-dark-text/10">
                  <span className="text-dark-text/60">Locked Rate:</span>
                  <strong className="text-farm-green">₹{selectedOrder.ratePerKg} / KG</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-dark-text/10">
                  <span className="text-dark-text/60">Buyer:</span>
                  <strong className="text-dark-text">{selectedOrder.buyer} ({selectedOrder.buyerType})</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-dark-text/10">
                  <span className="text-dark-text/60">Pickup Window:</span>
                  <strong className="text-dark-text">{selectedOrder.pickupDate}, {selectedOrder.pickupTime}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-dark-text/60">Gate Location:</span>
                  <strong className="text-dark-text text-right max-w-[220px]">{selectedOrder.pickupLocation}</strong>
                </div>
              </div>

              {/* Vehicle & Driver Info if assigned */}
              {selectedOrder.driverName && (
                <div className="p-4 rounded-2xl bg-paper-bg/70 border border-dark-text/10 space-y-2">
                  <div className="flex items-center gap-2 font-serif font-bold text-dark-text text-sm">
                    <Truck className="w-4 h-4 text-farm-green" />
                    <span>Assigned Collection Vehicle</span>
                  </div>
                  <div className="text-xs text-dark-text/80 space-y-0.5">
                    <p>Driver: <strong>{selectedOrder.driverName}</strong></p>
                    <p>Vehicle: <strong>{selectedOrder.vehiclePlate}</strong></p>
                  </div>
                  {selectedOrder.driverPhone && (
                    <a
                      href={`tel:${selectedOrder.driverPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dark-text/15 bg-pure-white font-semibold text-xs text-dark-text hover:bg-dark-text/5 mt-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-farm-green" />
                      <span>Call Driver ({selectedOrder.driverPhone})</span>
                    </a>
                  )}
                </div>
              )}

              {/* Notes / Payout Guarantee */}
              <div className="p-4 rounded-2xl border border-farm-green/20 bg-farm-green/5 text-xs text-dark-text/80 leading-relaxed">
                <strong className="text-farm-green block mb-0.5">Direct Payment Assurance:</strong>
                {selectedOrder.notes}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-dark-text/10">
                <Button
                  variant="white"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
                <Button
                  variant="clay"
                  size="sm"
                  onClick={() => {
                    setSelectedOrder(null);
                    onNavigate('logistics');
                  }}
                  className="shadow-soft-terracotta"
                >
                  Track Reefer Route →
                </Button>
              </div>

            </div>
          </Modal>
        )}

        {/* Rating Modal */}
        {ratingTargetOrder && (
          <RatingModal
            isOpen={ratingTargetOrder !== null}
            onClose={() => setRatingTargetOrder(null)}
            orderId={ratingTargetOrder.id}
            counterpartName={ratingTargetOrder.buyer}
            crop={ratingTargetOrder.product}
            onSubmit={handleReviewSubmitted}
          />
        )}

      </div>
    </div>
  );
};
