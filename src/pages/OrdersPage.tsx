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
  X
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { DemandRequirement } from '../types';

export interface FarmerOrder {
  id: string;
  orderNumber: string;
  product: string;
  quantityKg: number;
  buyer: string;
  buyerType: string;
  status: 'New' | 'Confirmed' | 'Ready' | 'Completed';
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  ratePerKg: number;
  totalPayout: number;
  driverName?: string;
  driverPhone?: string;
  vehiclePlate?: string;
  notes?: string;
}

const INITIAL_ORDERS: FarmerOrder[] = [
  {
    id: 'ORD-001',
    orderNumber: '#FC-2026-891',
    product: 'Tomatoes (Grade A)',
    quantityKg: 800,
    buyer: 'UrbanFork Kitchens',
    buyerType: 'Restaurant Chain',
    status: 'Ready',
    pickupDate: 'Today, 25 Sep 2026',
    pickupTime: '07:15 AM',
    pickupLocation: 'Chevella Village Farm Gate #1',
    ratePerKg: 24,
    totalPayout: 19200,
    driverName: 'Suresh Kumar',
    driverPhone: '+91 98492 01842',
    vehiclePlate: 'TS-08-UB-4420 (Tata 407 Reefer)',
    notes: 'Ventilated crates loaded and weighed at village weighbridge. Payout released automatically on dock scan.'
  },
  {
    id: 'ORD-002',
    orderNumber: '#FC-2026-892',
    product: 'Green Chilli (G4 Hot)',
    quantityKg: 200,
    buyer: 'Spiceland Wholesale Traders',
    buyerType: 'Wholesale Buyer',
    status: 'Confirmed',
    pickupDate: 'Tomorrow, 26 Sep 2026',
    pickupTime: '08:30 AM',
    pickupLocation: 'Chevella Village Farm Gate #1',
    ratePerKg: 48,
    totalPayout: 9600,
    driverName: 'Ravi Teja',
    driverPhone: '+91 94401 23819',
    vehiclePlate: 'TS-07-EA-9912',
    notes: 'Harvest scheduled for early morning picking. Clean moisture-free packing.'
  },
  {
    id: 'ORD-003',
    orderNumber: '#FC-2026-879',
    product: 'Bell Peppers (Yellow/Red)',
    quantityKg: 400,
    buyer: 'Grand Hyatt Procurement',
    buyerType: 'Luxury Hotel',
    status: 'New',
    pickupDate: '28 Sep 2026',
    pickupTime: '09:00 AM',
    pickupLocation: 'Chevella Village Hub',
    ratePerKg: 58,
    totalPayout: 23200,
    notes: 'New buyer order matching your listed harvest. Please confirm availability.'
  },
  {
    id: 'ORD-004',
    orderNumber: '#FC-2026-840',
    product: 'Onions (Pink Medium)',
    quantityKg: 1500,
    buyer: 'FreshSprout Retail Supermarkets',
    buyerType: 'Supermarket Chain',
    status: 'Completed',
    pickupDate: '20 Sep 2026',
    pickupTime: '06:45 AM',
    pickupLocation: 'Chevella Village Hub',
    ratePerKg: 28,
    totalPayout: 42000,
    driverName: 'Mohd. Imran',
    driverPhone: '+91 97000 44123',
    vehiclePlate: 'MH-12-BQ-5501',
    notes: 'Delivered and verified. Full payment of ₹42,000 credited to SBI Account ending in ...8412.'
  }
];

interface OrdersPageProps {
  onNavigate: (view: string) => void;
  onOpenSellModal?: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigate, onOpenSellModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedOrder, setSelectedOrder] = useState<FarmerOrder | null>(null);

  const filteredOrders = INITIAL_ORDERS.filter(order => {
    if (activeTab === 'active') return order.status !== 'Completed';
    if (activeTab === 'completed') return order.status === 'Completed';
    return true;
  });

  const getStatusBadge = (status: FarmerOrder['status']) => {
    switch (status) {
      case 'New':
        return (
          <span className="px-2.5 py-1 bg-blue-100 text-blue-900 border border-blue-900 font-mono font-black text-xs uppercase">
            New
          </span>
        );
      case 'Confirmed':
        return (
          <span className="px-2.5 py-1 bg-green-100 text-green-900 border border-green-900 font-mono font-black text-xs uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'Ready':
        return (
          <span className="px-2.5 py-1 bg-citrus-yellow text-ink-black border border-ink-black font-mono font-black text-xs uppercase flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> Ready
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-1 bg-gray-200 text-gray-800 border border-gray-600 font-mono font-black text-xs uppercase flex items-center gap-1">
            ✓ Completed
          </span>
        );
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-warm-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Simple Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-ink-black">
          <div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-black">
              MY ORDERS
            </h1>
            <p className="font-body text-xs sm:text-sm text-gray-700 mt-1">
              Track your harvest pickups, buyer confirmations, and direct payouts.
            </p>
          </div>

          {onOpenSellModal && (
            <Button
              variant="yellow"
              size="sm"
              onClick={onOpenSellModal}
              className="self-start sm:self-auto font-heading font-black text-xs"
            >
              + SELL MORE PRODUCE
            </Button>
          )}
        </div>

        {/* Filter Tabs: All, Active, Completed */}
        <div className="flex border-b-2 border-ink-black gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-bold border-t-2 border-x-2 border-ink-black transition-colors ${
              activeTab === 'all'
                ? 'bg-ink-black text-paper-white -mb-[2px]'
                : 'bg-paper-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            ALL ORDERS ({INITIAL_ORDERS.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 font-bold border-t-2 border-x-2 border-ink-black transition-colors ${
              activeTab === 'active'
                ? 'bg-ink-black text-paper-white -mb-[2px]'
                : 'bg-paper-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            ACTIVE PICKUPS ({INITIAL_ORDERS.filter(o => o.status !== 'Completed').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 font-bold border-t-2 border-x-2 border-ink-black transition-colors ${
              activeTab === 'completed'
                ? 'bg-ink-black text-paper-white -mb-[2px]'
                : 'bg-paper-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            COMPLETED ({INITIAL_ORDERS.filter(o => o.status === 'Completed').length})
          </button>
        </div>

        {/* Order Cards List (Mobile-Optimized Stacked Cards) */}
        <div className="space-y-3.5">
          {filteredOrders.length === 0 ? (
            <Card variant="white" className="p-8 text-center border-brutal font-mono text-xs text-gray-600">
              No orders found in this category.
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card
                key={order.id}
                variant="white"
                interactive
                onClick={() => setSelectedOrder(order)}
                className="p-4 sm:p-5 border-brutal hover:border-farm-green transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Left: Essential Fields (Product, Qty, Buyer, Pickup) */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-lg sm:text-xl uppercase text-ink-black">
                        {order.product}
                      </span>
                      <span className="font-heading font-black text-base text-farm-green">
                        • {order.quantityKg.toLocaleString()} KG
                      </span>
                    </div>

                    <div className="font-mono text-xs text-gray-700 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>Buyer: <strong>{order.buyer}</strong></span>
                      <span className="text-gray-400 hidden sm:inline">|</span>
                      <span>Payout: <strong className="text-farm-green">₹{order.totalPayout.toLocaleString()}</strong> (₹{order.ratePerKg}/KG)</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-gray-600 pt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-farm-green shrink-0" />
                      <span>Pickup: <strong>{order.pickupDate}</strong> at {order.pickupTime}</span>
                    </div>
                  </div>

                  {/* Right: Status Badge and View Details CTA */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                    <div>{getStatusBadge(order.status)}</div>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="font-heading font-bold text-xs text-farm-green hover:underline flex items-center gap-1"
                    >
                      <span>VIEW DETAILS</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </Card>
            ))
          )}
        </div>

        {/* Order Details Modal (Progressive Disclosure) */}
        {selectedOrder && (
          <Modal
            isOpen={selectedOrder !== null}
            onClose={() => setSelectedOrder(null)}
            title={`ORDER DETAILS // ${selectedOrder.orderNumber}`}
            subtitle={`${selectedOrder.product} • ${selectedOrder.quantityKg} KG`}
            maxWidth="md"
          >
            <div className="space-y-4 font-mono text-xs">
              
              {/* Status Banner */}
              <div className="p-3.5 bg-warm-cream border-2 border-ink-black flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">CURRENT STATUS</span>
                  <div className="mt-0.5">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">TOTAL VALUE</span>
                  <strong className="font-heading font-black text-xl text-farm-green">
                    ₹{selectedOrder.totalPayout.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Core Details Table */}
              <div className="p-3 bg-paper-white border border-ink-black space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-600">Product:</span>
                  <strong className="text-ink-black">{selectedOrder.product}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-600">Quantity:</span>
                  <strong className="text-ink-black">{selectedOrder.quantityKg.toLocaleString()} KG</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-600">Agreed Rate:</span>
                  <strong className="text-farm-green">₹{selectedOrder.ratePerKg} / KG</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-600">Buyer:</span>
                  <strong className="text-ink-black">{selectedOrder.buyer} ({selectedOrder.buyerType})</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-600">Pickup Date & Time:</span>
                  <strong className="text-ink-black">{selectedOrder.pickupDate}, {selectedOrder.pickupTime}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Pickup Location:</span>
                  <strong className="text-ink-black text-right max-w-[200px]">{selectedOrder.pickupLocation}</strong>
                </div>
              </div>

              {/* Vehicle & Driver Info if assigned */}
              {selectedOrder.driverName && (
                <div className="p-3 bg-blue-50 border border-blue-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-blue-950 uppercase">
                    <Truck className="w-4 h-4 text-blue-800" />
                    <span>ASSIGNED COLLECTION VEHICLE</span>
                  </div>
                  <div className="text-[11px] text-gray-700">
                    <p>Driver: <strong>{selectedOrder.driverName}</strong></p>
                    <p>Vehicle: <strong>{selectedOrder.vehiclePlate}</strong></p>
                  </div>
                  {selectedOrder.driverPhone && (
                    <a
                      href={`tel:${selectedOrder.driverPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper-white border border-ink-black font-bold text-xs text-ink-black hover:bg-citrus-yellow mt-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>CALL DRIVER ({selectedOrder.driverPhone})</span>
                    </a>
                  )}
                </div>
              )}

              {/* Notes / Payout Guarantee */}
              <div className="p-3 bg-yellow-50 border border-harvest-yellow text-[11px] text-gray-800">
                <strong>DIRECT PAYMENT ASSURANCE:</strong> {selectedOrder.notes}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-ink-black">
                <Button
                  variant="white"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  CLOSE
                </Button>
                <Button
                  variant="yellow"
                  size="sm"
                  onClick={() => {
                    setSelectedOrder(null);
                    onNavigate('logistics');
                  }}
                >
                  TRACK DELIVERY VEHICLE →
                </Button>
              </div>

            </div>
          </Modal>
        )}

      </div>
    </div>
  );
};
