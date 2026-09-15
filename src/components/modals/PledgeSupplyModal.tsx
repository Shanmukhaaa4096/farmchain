import React, { useState } from 'react';
import { Sprout, CheckCircle2, DollarSign, MapPin } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DemandRequirement } from '../../types';

interface PledgeSupplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: DemandRequirement | null;
  onConfirmPledge: (demandId: string, quantityKg: number, agreedRate: number) => void;
}

export const PledgeSupplyModal: React.FC<PledgeSupplyModalProps> = ({
  isOpen,
  onClose,
  demand,
  onConfirmPledge
}) => {
  const [quantity, setQuantity] = useState('600');
  const [rate, setRate] = useState(demand?.targetPricePerKg?.toString() || '25');
  const [village, setVillage] = useState('Chevella Village (Ranga Reddy)');
  const [harvestDate, setHarvestDate] = useState('Ready for 24-25 Sep Pickup');

  if (!demand) return null;

  const qtyNum = Number(quantity) || 0;
  const rateNum = Number(rate) || 0;
  const totalPayout = Math.round(qtyNum * rateNum);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmPledge(demand.id, qtyNum, rateNum);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="PLEDGE HARVEST PRODUCE"
      subtitle={`OFFERING TOWARDS PO: ${demand.id} (${demand.crop})`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
        
        {/* Requirement Snapshot */}
        <div className="p-3 bg-warm-cream border-2 border-ink-black space-y-1">
          <div className="flex justify-between font-bold">
            <span>BUYER:</span>
            <span className="text-ink-black">{demand.buyerName}</span>
          </div>
          <div className="flex justify-between">
            <span>CROP & GRADE:</span>
            <strong>{demand.crop} ({demand.qualityGrade})</strong>
          </div>
          <div className="flex justify-between">
            <span>BUYER TARGET PRICE:</span>
            <strong className="text-farm-green">₹{demand.targetPricePerKg} / KG</strong>
          </div>
        </div>

        {/* Pledge Inputs */}
        <div className="space-y-4">
          
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              QUANTITY YOU CAN SUPPLY (KG) *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="50"
              max={demand.quantityKg}
              step="50"
              className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold text-base focus:outline-hidden"
              required
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              You can fulfill part of the order. FarmChain coordinates with other farmers.
            </span>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              YOUR PROPOSED FARM-GATE RATE (₹ / KG) *
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min="1"
              step="0.5"
              className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold text-base focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              PICKUP FARM / VILLAGE LOCATION *
            </label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden"
              required
            />
          </div>

        </div>

        {/* Estimated Direct Payout Banner */}
        <div className="p-4 bg-farm-green text-paper-white border-brutal flex items-center justify-between">
          <div>
            <span className="text-[10px] text-harvest-yellow uppercase block font-bold">
              ESTIMATED DIRECT SETTLEMENT
            </span>
            <strong className="font-heading font-black text-2xl text-paper-white">
              ₹{totalPayout.toLocaleString()}
            </strong>
          </div>
          <div className="text-right text-[10px] text-gray-300">
            <span>Direct bank transfer</span>
            <div className="text-harvest-yellow font-bold">0% Middleman Deduction</div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 border-t-2 border-ink-black flex items-center justify-end gap-3">
          <Button variant="white" size="sm" type="button" onClick={onClose}>
            CANCEL
          </Button>
          <Button variant="yellow" size="md" type="submit">
            CONFIRM HARVEST PLEDGE ✓
          </Button>
        </div>

      </form>
    </Modal>
  );
};
