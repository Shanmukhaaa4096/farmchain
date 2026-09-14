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
      title="POST NEW REQUIREMENT"
      subtitle="BUYER SOURCING DESK // ALGORITHMIC MATCHING ACTIVATED"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
        
        {/* Real-time Match Forecast Banner */}
        <div className="p-4 bg-farm-green text-paper-white border-brutal space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-harvest-yellow font-bold uppercase">
              <Sparkles className="w-4 h-4" /> LIVE SUPPLY ENGINE MATCHING
            </span>
            <Badge variant="yellow" size="sm">94% MATCH CERTAINTY</Badge>
          </div>
          <p className="text-[11px] text-gray-200">
            Identified <strong className="text-harvest-yellow">{estimatedFarmersCount} verified farmers / FPOs</strong> within 35km with approx <strong className="text-harvest-yellow">{nearbyAvailableKg.toLocaleString()} KG</strong> ready harvest.
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Crop Commodity */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              COMMODITY CROP *
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden"
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
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              TOTAL REQUIRED QUANTITY (KG) *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="100"
              step="50"
              placeholder="e.g. 2400"
              className="w-full p-2 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden text-sm"
              required
            />
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              QUALITY GRADE MANDATE *
            </label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value as any)}
              className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden"
            >
              <option value="Grade A">Grade A (Table / Culinary Premium)</option>
              <option value="Grade B">Grade B (Standard Market)</option>
              <option value="Export Quality">Export Quality (Strict Global Gap)</option>
              <option value="Processing Grade">Processing Grade (Industrial/Chips)</option>
            </select>
          </div>

          {/* Target Price */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              TARGET PURCHASE RATE (₹ / KG)
            </label>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="e.g. 24"
              className="w-full p-2 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden text-sm"
            />
          </div>

          {/* Delivery Location */}
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              DELIVERY DESTINATION / RECEIVING DOCK *
            </label>
            <input
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="e.g. Gachibowli Logistics Hub, Hyderabad"
              className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden"
              required
            />
          </div>

          {/* Required Delivery Date */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              REQUIRED DELIVERY DATE *
            </label>
            <input
              type="text"
              value={requiredDate}
              onChange={(e) => setRequiredDate(e.target.value)}
              placeholder="e.g. 28 Sep 2026"
              className="w-full p-2 bg-warm-cream border-2 border-ink-black font-bold focus:outline-hidden"
              required
            />
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
              QUALITY SPECIFICATIONS & PACKAGING NOTES
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. Firm skin required for slicing, no soft rot, packaged in 25kg ventilated plastic crates."
              className="w-full p-2.5 bg-warm-cream border-2 border-ink-black focus:outline-hidden"
            />
          </div>

        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t-2 border-ink-black flex items-center justify-end gap-3">
          <Button variant="white" size="sm" type="button" onClick={onClose}>
            CANCEL
          </Button>
          <Button variant="yellow" size="md" type="submit">
            FIND FARMERS & BROADCAST →
          </Button>
        </div>

      </form>
    </Modal>
  );
};
