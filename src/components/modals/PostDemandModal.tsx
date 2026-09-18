import React, { useState } from 'react';
import { PlusCircle, Sparkles, Building, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DemandRequirement } from '../../types';

interface PostDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (demand: Partial<DemandRequirement>) => void;
}

export const PostDemandModal: React.FC<PostDemandModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [crop, setCrop] = useState('Tomatoes');
  const [quantity, setQuantity] = useState('2400');
  const [qualityGrade, setQualityGrade] = useState<'Grade A' | 'Grade B' | 'Export Quality' | 'Processing Grade'>('Grade A');
  const [deliveryLocation, setDeliveryLocation] = useState('Hyderabad (Gachibowli Logistics Hub)');
  const [requiredDate, setRequiredDate] = useState('28 Sep 2026');
  const [targetPrice, setTargetPrice] = useState('24');
  const [notes, setNotes] = useState('');

  // Simulated live algorithmic match calculator
  const qtyNum = Number(quantity) || 0;
  const estimatedFarmersCount = qtyNum > 8000 ? 8 : qtyNum > 3000 ? 5 : qtyNum > 1500 ? 3 : 2;
  const nearbyAvailableKg = Math.round(qtyNum * 1.35);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: `DEM-2026-${Math.floor(100 + Math.random() * 900)}`,
      buyerId: 'BUY-ME',
      buyerName: 'UrbanFork Kitchens & Dining',
      buyerType: 'Restaurant Chain (Verified Buyer)',
      crop,
      quantityKg: qtyNum,
      qualityGrade,
      deliveryLocation,
      requiredDate,
      status: 'OPEN',
      targetPricePerKg: Number(targetPrice) || 24,
      matchedFarmersCount: estimatedFarmersCount,
      matchedQuantityKg: 0,
      urgency: 'HIGH',
      specifications: {
        sizeMm: 'Standard Market Grade',
        shelfLifeDays: 7,
        packagingType: 'Standard crates',
      },
      notes
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Publish Sourcing Requirement"
      subtitle="Commercial buyer procurement • Algorithmic smallholder matching activated"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs text-dark-text">
        
        {/* Real-time Match Forecast Banner */}
        <div className="p-4 rounded-2xl bg-farm-green/10 border border-farm-green/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-farm-green font-bold uppercase font-mono text-[10px]">
              <Sparkles className="w-4 h-4" /> Live Supply Engine Matching
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-green text-paper-bg font-mono font-bold text-[10px]">
              94% MATCH CERTAINTY
            </span>
          </div>
          <p className="text-xs text-dark-text/80 leading-relaxed">
            Identified <strong className="text-farm-green">{estimatedFarmersCount} verified farmers / FPOs</strong> within 35km with approx <strong className="text-farm-green">{nearbyAvailableKg.toLocaleString()} KG</strong> harvest ready.
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Crop Commodity */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Commodity Crop *
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
              required
            >
              <option value="Tomatoes">Tomatoes</option>
              <option value="Onions">Onions</option>
              <option value="Potatoes">Potatoes</option>
              <option value="Green Chilli">Green Chilli</option>
              <option value="Bell Peppers">Bell Peppers</option>
              <option value="Basmati Rice">Basmati Rice</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Required Volume (KG) *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="100"
              step="50"
              placeholder="e.g. 2400"
              className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
              required
            />
          </div>

          {/* Quality Grade */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Quality Grade Mandate *
            </label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
            >
              <option value="Grade A">Grade A (Table / Culinary Premium)</option>
              <option value="Grade B">Grade B (Standard Commercial)</option>
              <option value="Export Quality">Export Quality (Strict GlobalGAP)</option>
              <option value="Processing Grade">Processing Grade (Industrial/Chips)</option>
            </select>
          </div>

          {/* Target Price */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Target Purchase Rate (₹ / KG)
            </label>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="e.g. 24"
              className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
            />
          </div>

          {/* Delivery Location */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Delivery Destination / Receiving Dock *
            </label>
            <input
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="e.g. Gachibowli Logistics Hub, Hyderabad"
              className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
              required
            />
          </div>

          {/* Required Delivery Date */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Required Dock Arrival Date *
            </label>
            <input
              type="text"
              value={requiredDate}
              onChange={(e) => setRequiredDate(e.target.value)}
              placeholder="e.g. 28 Sep 2026"
              className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
              required
            />
          </div>

          {/* Notes */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-[10px] font-mono font-semibold uppercase text-dark-text/60">
              Quality Specs &amp; Crating Guidelines
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. Firm skin required for slicing, no soft rot, packaged in 25kg ventilated plastic crates."
              className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
            />
          </div>

        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-dark-text/10 flex items-center justify-end gap-3">
          <Button variant="white" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="clay" size="md" type="submit" className="shadow-soft-terracotta">
            Broadcast Sourcing Order →
          </Button>
        </div>

      </form>
    </Modal>
  );
};
