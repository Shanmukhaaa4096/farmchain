import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ShieldCheck, ArrowRight, IndianRupee, Truck, Calendar } from 'lucide-react';

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropName: string;
  farmerName: string;
  listedPricePerKg: number;
  availableKg: number;
  onSubmitOffer: (data: {
    crop: string;
    offeredRate: number;
    quantityKg: number;
    deliveryDate: string;
    notes: string;
  }) => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  isOpen,
  onClose,
  cropName,
  farmerName,
  listedPricePerKg,
  availableKg,
  onSubmitOffer,
}) => {
  const [offeredRate, setOfferedRate] = useState<number>(listedPricePerKg);
  const [quantityKg, setQuantityKg] = useState<number>(Math.min(availableKg, 1000));
  const [deliveryDate, setDeliveryDate] = useState('2026-10-02');
  const [notes, setNotes] = useState('Require Grade A sorted lot. Free village gate pickup scheduled via Reefer truck.');

  const totalValue = quantityKg * offeredRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOffer({
      crop: cropName,
      offeredRate,
      quantityKg,
      deliveryDate,
      notes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Make Direct Purchase Offer"
      subtitle={`Proposing purchase contract to ${farmerName}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-[#2F4A3A]">
        <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#2F4A3A]/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-[#536458] block">Produce Lot</span>
            <strong className="font-serif text-base text-[#2F4A3A]">{cropName}</strong>
            <span className="text-xs text-[#536458] block">{availableKg.toLocaleString()} KG Available</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono uppercase text-[#536458] block">Farmer Expected</span>
            <strong className="text-base text-emerald-700 font-mono">₹{listedPricePerKg}/KG</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#536458] mb-1">
              Your Offered Rate (₹/KG) *
            </label>
            <input
              type="number"
              step="0.5"
              min={1}
              value={offeredRate}
              onChange={(e) => setOfferedRate(Number(e.target.value))}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#2F4A3A]/15 text-sm font-mono font-bold text-[#2F4A3A] focus:outline-none focus:border-[#C77B58]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#536458] mb-1">
              Quantity Needed (KG) *
            </label>
            <input
              type="number"
              min={50}
              max={availableKg}
              value={quantityKg}
              onChange={(e) => setQuantityKg(Number(e.target.value))}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#2F4A3A]/15 text-sm font-mono font-bold text-[#2F4A3A] focus:outline-none focus:border-[#C77B58]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase font-bold text-[#536458] mb-1">
            Target Village Pickup Date *
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#2F4A3A]/15 text-sm text-[#2F4A3A] focus:outline-none focus:border-[#C77B58]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase font-bold text-[#536458] mb-1">
            Logistics & Quality Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 rounded-xl bg-white border border-[#2F4A3A]/15 text-xs text-[#2F4A3A] focus:outline-none focus:border-[#C77B58]"
          />
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Escrow Contract Total:</span>
          </div>
          <span className="font-mono font-bold text-sm text-emerald-800">
            ₹{totalValue.toLocaleString('en-IN')} (0% Broker Fee)
          </span>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#2F4A3A]/10">
          <Button variant="ghost" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            <span>Send Direct Offer</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </form>
    </Modal>
  );
};
