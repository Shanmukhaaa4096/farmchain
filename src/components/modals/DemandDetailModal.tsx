import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Truck,
  ArrowRight,
  Package
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { DemandRequirement, FarmerMatch } from '../../types';
import { MOCK_MATCHES_FOR_TOMATO } from '../../data/mockData';

interface DemandDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: DemandRequirement | null;
  onPledgeClick?: (demand: DemandRequirement) => void;
  userRole?: string;
  initialTab?: 'specs' | 'farmers' | 'negotiate';
  userName?: string;
}

export const DemandDetailModal: React.FC<DemandDetailModalProps> = ({
  isOpen,
  onClose,
  demand,
  onPledgeClick,
  userRole = 'farmer',
  initialTab = 'specs',
  userName
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'farmers' | 'negotiate'>(initialTab);
  const [messages, setMessages] = useState<{ sender: 'farmer' | 'buyer' | 'system'; text: string; time: string; name?: string }[]>([
    { sender: 'system', text: 'Direct secure negotiation channel opened between Buyer and Matched Farmers.', time: '09:00 AM' },
    { sender: 'buyer', text: 'Hello! We need 2,400 KG Tomatoes Grade A with firm skin for culinary slicing. Can you deliver by 25 Sep morning?', time: '09:05 AM', name: 'UrbanFork Kitchens' },
    { sender: 'farmer', text: 'Greetings. Ramesh Reddy from Chevella here. I have 800 KG harvested yesterday evening under shade. Quality is Grade A verified.', time: '09:12 AM', name: 'Ramesh Reddy' },
  ]);
  const [inputText, setInputText] = useState('');

  // Sync active tab whenever modal opens or initialTab changes
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!demand) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages(prev => [
      ...prev,
      { 
        sender: userRole === 'buyer' ? 'buyer' : 'farmer', 
        text: inputText.trim(), 
        time: 'Just now',
        name: userName || (userRole === 'buyer' ? 'Buyer Desk' : 'Farmer Partner')
      }
    ]);
    setInputText('');
  };

  const percentFulfilled = Math.min(100, Math.round((demand.matchedQuantityKg / demand.quantityKg) * 100));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${demand.crop} • ${demand.quantityKg.toLocaleString()} KG`}
      subtitle={`PO ${demand.id} • ${demand.buyerName}`}
      maxWidth="2xl"
    >
      <div className="space-y-6 text-xs text-dark-text">
        
        {/* Segmented Tab Controls */}
        <div className="flex rounded-2xl bg-paper-bg/80 p-1 border border-dark-text/10 font-mono">
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'specs' ? 'bg-pure-white text-dark-text shadow-soft-sm' : 'text-dark-text/60 hover:text-dark-text'
            }`}
          >
            SPECIFICATIONS
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'farmers' ? 'bg-pure-white text-dark-text shadow-soft-sm' : 'text-dark-text/60 hover:text-dark-text'
            }`}
          >
            PLEDGED FARMERS ({demand.matchedFarmersCount})
          </button>
          <button
            onClick={() => setActiveTab('negotiate')}
            className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'negotiate' ? 'bg-pure-white text-dark-text shadow-soft-sm' : 'text-dark-text/60 hover:text-dark-text'
            }`}
          >
            NEGOTIATION CHAT
          </button>
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-5">
            {/* Key Summary Box */}
            <div className="p-5 rounded-2xl bg-paper-bg/60 border border-dark-text/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
              <div>
                <span className="text-dark-text/50 block text-[10px] uppercase">Target Volume</span>
                <strong className="font-serif text-xl text-dark-text block mt-1">{demand.quantityKg.toLocaleString()} KG</strong>
              </div>
              <div>
                <span className="text-dark-text/50 block text-[10px] uppercase">Locked Rate</span>
                <strong className="font-serif text-xl text-farm-green block mt-1">₹{demand.targetPricePerKg} / KG</strong>
              </div>
              <div>
                <span className="text-dark-text/50 block text-[10px] uppercase">Grade</span>
                <strong className="font-serif text-base text-dark-text block mt-1">{demand.qualityGrade}</strong>
              </div>
              <div>
                <span className="text-dark-text/50 block text-[10px] uppercase">Dock Arrival</span>
                <strong className="font-serif text-base text-dark-text block mt-1">{demand.requiredDate}</strong>
              </div>
            </div>

            {/* Quality Specification Grid */}
            <div className="p-5 rounded-2xl border border-dark-text/10 bg-pure-white space-y-3 font-mono">
              <h4 className="font-serif text-sm font-bold text-farm-green uppercase tracking-wider border-b border-dark-text/10 pb-2">
                Strict Quality Parameters Mandate
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-paper-bg/40 border border-dark-text/10">
                  <span className="text-dark-text/50 block text-[10px] uppercase">Desired Size / Caliber:</span>
                  <strong className="text-dark-text">{demand.specifications?.sizeMm || 'Standard Market Size (55-65mm)'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-paper-bg/40 border border-dark-text/10">
                  <span className="text-dark-text/50 block text-[10px] uppercase">Max Moisture Index:</span>
                  <strong className="text-dark-text">{demand.specifications?.moisturePercent || 12}%</strong>
                </div>
                <div className="p-3 rounded-xl bg-paper-bg/40 border border-dark-text/10">
                  <span className="text-dark-text/50 block text-[10px] uppercase">Required Shelf Life:</span>
                  <strong className="text-dark-text">{demand.specifications?.shelfLifeDays || 7} Days Minimum</strong>
                </div>
                <div className="p-3 rounded-xl bg-paper-bg/40 border border-dark-text/10">
                  <span className="text-dark-text/50 block text-[10px] uppercase">Packaging Standard:</span>
                  <strong className="text-dark-text">{demand.specifications?.packagingType || 'Standard crates'}</strong>
                </div>
              </div>

              {demand.notes && (
                <div className="p-3 rounded-xl bg-harvest-yellow/15 border border-harvest-yellow/25 text-dark-text text-xs">
                  <strong className="text-dark-text font-bold">Buyer Note:</strong> {demand.notes}
                </div>
              )}
            </div>

            {/* Aggregation Progress */}
            <div className="p-5 rounded-2xl border border-dark-text/10 bg-pure-white font-mono space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-dark-text/60">Cluster Fulfillment:</span>
                <span className="text-farm-green font-bold">{percentFulfilled}% ({demand.matchedQuantityKg} / {demand.quantityKg} KG)</span>
              </div>
              <div className="h-2.5 rounded-full bg-dark-text/10 overflow-hidden">
                <div 
                  className="h-full bg-farm-green transition-all duration-300"
                  style={{ width: `${percentFulfilled}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-dark-text/50 pt-1">
                Verified producer clusters in Chevella and Shankarpally committed toward this purchase order.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Matched Farmers */}
        {activeTab === 'farmers' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-farm-green text-paper-bg font-mono text-xs flex items-center justify-between">
              <span>ACTIVE CLUSTER POOLING</span>
              <span className="text-harvest-yellow font-bold">3 PRODUCERS PLEDGED</span>
            </div>

            <div className="space-y-2.5 font-mono">
              {MOCK_MATCHES_FOR_TOMATO.map((match, idx) => (
                <div key={match.farmerId} className="p-4 rounded-2xl bg-pure-white border border-dark-text/10 flex items-center justify-between shadow-soft-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-farm-green/10 text-farm-green flex items-center justify-center font-bold">
                      0{idx + 1}
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-sm text-dark-text">{match.farmerName}</h5>
                      <span className="text-dark-text/50 text-[11px] font-sans">{match.village}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-farm-green">{match.pledgedQuantityKg} KG</span>
                    <div className="text-[11px] text-dark-text/50">Agreed: ₹{match.ratePerKg}/KG</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-paper-bg/70 border border-dark-text/10 text-xs text-dark-text/70 leading-relaxed font-sans">
              <strong className="text-dark-text font-mono">CO-OP LOGISTICS NOTE:</strong> Collection route TS-08 will consolidate all 3 pickups within a 12.4 km circuit on 25 Sep morning.
            </div>
          </div>
        )}

        {/* Tab 3: Direct Negotiation Chat */}
        {activeTab === 'negotiate' && (
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto rounded-2xl border border-dark-text/10 p-4 space-y-3 bg-paper-bg/40 font-sans text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    m.sender === 'system'
                      ? 'items-center'
                      : m.sender === userRole
                        ? 'items-end'
                        : 'items-start'
                  }`}
                >
                  {m.sender === 'system' ? (
                    <span className="px-3 py-1 rounded-full bg-dark-text/5 text-dark-text/60 font-mono text-[10px] text-center">
                      {m.text}
                    </span>
                  ) : (
                    <div className={`max-w-[80%] p-3.5 rounded-2xl shadow-soft-sm ${
                      m.sender === 'farmer' ? 'bg-farm-green text-paper-bg' : 'bg-pure-white text-dark-text border border-dark-text/10'
                    }`}>
                      <div className="flex items-center justify-between gap-4 text-[10px] font-mono opacity-75 mb-1">
                        <span>{m.sender.toUpperCase()}</span>
                        <span>{m.time}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type offer, quality clarification, or delivery terms..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-dark-text/15 bg-pure-white text-xs focus:outline-none focus:border-farm-green focus:ring-2 focus:ring-farm-green/10"
              />
              <Button variant="clay" size="sm" type="submit" className="shrink-0 shadow-soft-terracotta">
                <Send className="w-3.5 h-3.5 mr-1" /> Send
              </Button>
            </form>
          </div>
        )}

        {/* Modal Bottom CTAs */}
        <div className="pt-4 border-t border-dark-text/10 flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-xs text-dark-text/60">
            Escrow Status: <strong className="text-farm-green">Direct Bank Settlement</strong>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="white" size="sm" onClick={onClose}>
              Close
            </Button>
            {onPledgeClick && (
              <Button 
                variant="clay" 
                size="sm" 
                onClick={() => {
                  onClose();
                  onPledgeClick(demand);
                }}
                className="shadow-soft-terracotta"
              >
                Pledge Produce to this PO →
              </Button>
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
};
