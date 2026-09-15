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
  if (!demand) return null;

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
      title={`${demand.crop} // ${demand.quantityKg.toLocaleString()} KG`}
      subtitle={`DEMAND ID: ${demand.id} • ${demand.buyerName}`}
      maxWidth="2xl"
    >
      <div className="space-y-5">
        
        {/* Sub Navigation Tabs (Horizontally scrollable on mobile) */}
        <div className="flex border-b-2 border-ink-black font-mono text-xs overflow-x-auto whitespace-nowrap bg-warm-cream">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3.5 sm:px-4 py-2.5 font-bold uppercase transition-colors border-r-2 border-ink-black shrink-0 ${
              activeTab === 'specs' ? 'bg-harvest-yellow text-ink-black' : 'bg-warm-cream hover:bg-white text-gray-700'
            }`}
          >
            SPECIFICATIONS & QUALITY
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`px-3.5 sm:px-4 py-2.5 font-bold uppercase transition-colors border-r-2 border-ink-black shrink-0 ${
              activeTab === 'farmers' ? 'bg-harvest-yellow text-ink-black' : 'bg-warm-cream hover:bg-white text-gray-700'
            }`}
          >
            PLEDGED FARMERS ({demand.matchedFarmersCount})
          </button>
          <button
            onClick={() => setActiveTab('negotiate')}
            className={`px-3.5 sm:px-4 py-2.5 font-bold uppercase transition-colors shrink-0 ${
              activeTab === 'negotiate' ? 'bg-harvest-yellow text-ink-black' : 'bg-warm-cream hover:bg-white text-gray-700'
            }`}
          >
            DIRECT NEGOTIATION CHAT
          </button>
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-5">
            {/* Key Summary Box */}
            <div className="p-4 bg-warm-cream border-2 border-ink-black grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-center">
              <div>
                <span className="text-gray-600 block text-[10px]">TOTAL NEEDED</span>
                <strong className="font-heading font-black text-lg text-ink-black">{demand.quantityKg.toLocaleString()} KG</strong>
              </div>
              <div>
                <span className="text-gray-600 block text-[10px]">TARGET RATE</span>
                <strong className="font-heading font-black text-lg text-farm-green">₹{demand.targetPricePerKg} / KG</strong>
              </div>
              <div>
                <span className="text-gray-600 block text-[10px]">QUALITY GRADE</span>
                <strong className="font-heading font-black text-lg text-ink-black">{demand.qualityGrade}</strong>
              </div>
              <div>
                <span className="text-gray-600 block text-[10px]">DELIVERY DATE</span>
                <strong className="font-heading font-black text-sm text-ink-black">{demand.requiredDate}</strong>
              </div>
            </div>

            {/* Quality Specification Grid */}
            <div className="border-2 border-ink-black p-4 space-y-3 font-mono text-xs bg-paper-white">
              <h4 className="font-heading font-black text-sm uppercase text-farm-green border-b pb-2">
                STRICT QUALITY PARAMETERS REQUIRED
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800">
                <div className="p-2 bg-warm-cream/70 border border-ink-black">
                  <span className="text-gray-500 block text-[10px]">DESIRED SIZE / CALIBER:</span>
                  <strong>{demand.specifications?.sizeMm || 'Standard Market Size (55-65mm)'}</strong>
                </div>
                <div className="p-2 bg-warm-cream/70 border border-ink-black">
                  <span className="text-gray-500 block text-[10px]">MAX MOISTURE CONTENT:</span>
                  <strong>{demand.specifications?.moisturePercent || 12}%</strong>
                </div>
                <div className="p-2 bg-warm-cream/70 border border-ink-black">
                  <span className="text-gray-500 block text-[10px]">REQUIRED SHELF LIFE:</span>
                  <strong>{demand.specifications?.shelfLifeDays || 7} Days Minimum</strong>
                </div>
                <div className="p-2 bg-warm-cream/70 border border-ink-black">
                  <span className="text-gray-500 block text-[10px]">PACKAGING MANDATE:</span>
                  <strong>{demand.specifications?.packagingType || 'Standard crates'}</strong>
                </div>
              </div>

              {demand.notes && (
                <div className="p-3 bg-yellow-50 border border-harvest-yellow text-gray-800 text-xs">
                  <strong>BUYER NOTE:</strong> {demand.notes}
                </div>
              )}
            </div>

            {/* Aggregation Progress */}
            <div className="p-4 bg-paper-white border-2 border-ink-black font-mono text-xs">
              <div className="flex justify-between mb-1.5 font-bold">
                <span>MULTI-FARMER CO-OP FULFILLMENT:</span>
                <span className="text-farm-green">{percentFulfilled}% ({demand.matchedQuantityKg} / {demand.quantityKg} KG)</span>
              </div>
              <div className="h-4 bg-gray-200 border border-ink-black overflow-hidden">
                <div 
                  className="h-full bg-farm-green transition-all duration-300"
                  style={{ width: `${percentFulfilled}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-600 mt-2">
                3 smallholder farmers in Ranga Reddy district have pledged produce toward this requirement.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Matched Farmers */}
        {activeTab === 'farmers' && (
          <div className="space-y-4">
            <div className="p-3 bg-farm-green text-paper-white font-mono text-xs flex items-center justify-between">
              <span>ACTIVE CO-OP POOLING FOR THIS PO</span>
              <span className="text-harvest-yellow font-bold">3 PRODUCERS PLEDGED</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {MOCK_MATCHES_FOR_TOMATO.map((match, idx) => (
                <div key={match.farmerId} className="p-3 bg-warm-cream border-2 border-ink-black flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-ink-black text-paper-white flex items-center justify-center font-bold">
                      0{idx + 1}
                    </div>
                    <div>
                      <h5 className="font-heading font-black text-sm uppercase">{match.farmerName}</h5>
                      <span className="text-gray-600 text-[11px]">{match.village}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-farm-green">{match.pledgedQuantityKg} KG</span>
                    <div className="text-[10px] text-gray-500">Agreed: ₹{match.ratePerKg}/KG</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-warm-cream border border-ink-black font-mono text-xs text-gray-700">
              <strong>CO-OP LOGISTICS NOTE:</strong> Collection route TS-08 will consolidate all 3 pickups within a 12.4 km circuit on 25 Sep between 07:00 AM and 08:30 AM.
            </div>
          </div>
        )}

        {/* Tab 3: Direct Negotiation Chat */}
        {activeTab === 'negotiate' && (
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto border-2 border-ink-black p-4 space-y-3 bg-warm-cream/40 font-mono text-xs">
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
                    <span className="px-2 py-1 bg-gray-200 border border-gray-400 text-[10px] text-gray-700 text-center">
                      {m.text}
                    </span>
                  ) : (
                    <div className={`max-w-[80%] p-3 border-2 border-ink-black shadow-brutal-sm ${
                      m.sender === 'farmer' ? 'bg-farm-green text-paper-white' : 'bg-harvest-yellow text-ink-black'
                    }`}>
                      <div className="flex items-center justify-between gap-4 text-[10px] font-bold opacity-75 mb-1">
                        <span>{m.sender.toUpperCase()}</span>
                        <span>{m.time}</span>
                      </div>
                      <p className="font-body text-xs">{m.text}</p>
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
                placeholder="Type offer, quality clarification, or terms..."
                className="flex-1 p-2.5 bg-warm-cream border-2 border-ink-black font-mono text-xs focus:outline-hidden focus:bg-white"
              />
              <Button variant="yellow" size="sm" type="submit" className="shrink-0">
                <Send className="w-3.5 h-3.5 mr-1" /> SEND
              </Button>
            </form>
          </div>
        )}

        {/* Modal Bottom CTAs */}
        <div className="pt-4 border-t-2 border-ink-black flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-xs text-gray-600">
            TRANSACTION TYPE: <strong className="text-ink-black uppercase">DIRECT CONTRACT ESCROW</strong>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="white" size="sm" onClick={onClose}>
              CLOSE
            </Button>
            {onPledgeClick && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => {
                  onClose();
                  onPledgeClick(demand);
                }}
              >
                PLEDGE PRODUCE TO THIS PO →
              </Button>
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
};
