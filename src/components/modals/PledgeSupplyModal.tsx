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
      title="Pledge Harvest Produce"
      subtitle={`Offering toward PO ${demand.id} • ${demand.crop}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs text-dark-text">
        
        {/* Requirement Snapshot */}
        <div className="p-4 rounded-2xl bg-paper-bg/60 border border-dark-text/10 space-y-1.5 font-mono">
          <div className="flex justify-between">
            <span className="text-dark-text/60">BUYER:</span>
            <strong className="text-dark-text font-serif">{demand.buyerName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text/60">CROP &amp; GRADE:</span>
            <strong className="text-dark-text">{demand.crop} ({demand.qualityGrade})</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text/60">BUYER TARGET RATE:</span>
            <strong className="text-farm-green font-bold">₹{demand.targetPricePerKg} / KG</strong>
          </div>
        </div>

        {/* Pledge Inputs */}
        <div className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Quantity You Can Supply (KG) *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="50"
              max={demand.quantityKg}
              step="50"
              className="w-full px-4 py-3 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 font-serif font-bold text-xl text-dark-text"
              required
            />
            <span className="text-[11px] text-dark-text/50 block">
              You can fulfill part of the order. FarmChain coordinates with other local farmers to pool the rest.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Your Proposed Farm-Gate Rate (₹ / KG) *
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min="1"
              step="0.5"
              className="w-full px-4 py-3 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 font-serif font-bold text-xl text-farm-green"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Pickup Farm / Village Location *
            </label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 font-medium"
              required
            />
          </div>

        </div>

        {/* Estimated Money in Bank Banner */}
        <div className="p-5 rounded-2xl bg-farm-green text-paper-bg flex items-center justify-between shadow-soft-sm font-mono">
          <div>
            <span className="text-[10px] text-harvest-yellow uppercase block font-bold tracking-wider">
              ESTIMATED MONEY IN BANK
            </span>
            <strong className="font-serif font-bold text-2xl text-paper-bg">
              ₹{totalPayout.toLocaleString()}
            </strong>
          </div>
          <div className="text-right text-[11px] text-paper-bg/70">
            <span>Direct bank transfer</span>
            <div className="text-harvest-yellow font-bold">0% Broker Deductions</div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-dark-text/10 flex items-center justify-end gap-3">
          <Button variant="white" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="clay" size="md" type="submit" className="shadow-soft-terracotta">
            Confirm Harvest Pledge ✓
          </Button>
        </div>

      </form>
    </Modal>
  );
};
