import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface SimpleListProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (produce: {
    crop: string;
    variety: string;
    quantityKg: number;
    expectedPricePerKg: number;
    availableDate: string;
    location: string;
  }) => void;
}

const COMMON_CROPS = [
  { name: 'Tomatoes', icon: '🍅', variety: 'US-440 Hybrid', avgMandiPrice: 22 },
  { name: 'Onions', icon: '🧅', variety: 'Pink Medium', avgMandiPrice: 26 },
  { name: 'Potatoes', icon: '🥔', variety: 'Chips Grade', avgMandiPrice: 18 },
  { name: 'Green Chilli', icon: '🌶️', variety: 'G4 Slender', avgMandiPrice: 45 },
  { name: 'Bell Peppers', icon: '🫑', variety: 'Indra Hybrid', avgMandiPrice: 55 },
  { name: 'Basmati Rice', icon: '🌾', variety: '1121 Steam', avgMandiPrice: 80 },
];

export const SimpleListProduceModal: React.FC<SimpleListProduceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form data
  const [crop, setCrop] = useState('Tomatoes');
  const [variety, setVariety] = useState('US-440 Hybrid');
  const [quantity, setQuantity] = useState('1000');
  const [expectedPrice, setExpectedPrice] = useState('24');
  const [availableDate, setAvailableDate] = useState('Ready in 3 Days');
  const [location, setLocation] = useState('Chevella, Ranga Reddy');

  const selectedCropInfo = COMMON_CROPS.find(c => c.name === crop) || COMMON_CROPS[0];

  const handleSelectCrop = (cropName: string, cropVariety: string, price: number) => {
    setCrop(cropName);
    setVariety(cropVariety);
    setExpectedPrice(String(price + 2)); // Default to slightly above mandi
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      // Final submit
      onSubmit({
        crop,
        variety,
        quantityKg: Number(quantity) || 500,
        expectedPricePerKg: Number(expectedPrice) || 20,
        availableDate,
        location,
      });
      // Reset state for next time
      setStep(1);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setStep(1);
        onClose();
      }}
      title="SELL PRODUCE"
      subtitle={`STEP ${step} OF 3 // ${step === 1 ? 'CHOOSE CROP' : step === 2 ? 'QUANTITY & PRICE' : 'HARVEST DATE & LOCATION'}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        
        {/* Step Progress Pills */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-ink-black font-mono text-xs">
          <div className={`flex-1 text-center py-1.5 border-2 border-ink-black font-bold transition-all ${
            step >= 1 ? 'bg-citrus-yellow text-ink-black shadow-brutal-sm' : 'bg-warm-cream text-gray-400'
          }`}>
            1. CROP
          </div>
          <span className="text-gray-400 font-bold">→</span>
          <div className={`flex-1 text-center py-1.5 border-2 border-ink-black font-bold transition-all ${
            step >= 2 ? 'bg-citrus-yellow text-ink-black shadow-brutal-sm' : 'bg-warm-cream text-gray-400'
          }`}>
            2. QUANTITY & PRICE
          </div>
          <span className="text-gray-400 font-bold">→</span>
          <div className={`flex-1 text-center py-1.5 border-2 border-ink-black font-bold transition-all ${
            step === 3 ? 'bg-citrus-yellow text-ink-black shadow-brutal-sm' : 'bg-warm-cream text-gray-400'
          }`}>
            3. LOCATION & DATE
          </div>
        </div>

        {/* STEP 1: CHOOSE CROP */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-heading font-black text-sm uppercase text-ink-black mb-1">
                Select Your Crop
              </label>
              <p className="font-body text-xs text-gray-600">
                Tap the crop you are ready to sell.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COMMON_CROPS.map((c) => {
                const isSelected = crop === c.name;
                return (
                  <button
                    type="button"
                    key={c.name}
                    onClick={() => handleSelectCrop(c.name, c.variety, c.avgMandiPrice)}
                    className={`p-3.5 border-2 border-ink-black text-left flex flex-col justify-between transition-all rounded-none min-h-[95px] ${
                      isSelected
                        ? 'bg-citrus-yellow shadow-brutal-sm -translate-y-0.5'
                        : 'bg-paper-white hover:bg-warm-cream'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl">{c.icon}</span>
                      {isSelected && (
                        <span className="w-5 h-5 bg-ink-black text-citrus-yellow flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                    <div>
                      <strong className="font-heading font-bold text-sm block text-ink-black mt-1">
                        {c.name}
                      </strong>
                      <span className="font-mono text-[10px] text-gray-600 block">
                        Mandi: ₹{c.avgMandiPrice}/KG
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Crop Input */}
            <div className="pt-2">
              <label className="block font-mono text-[11px] font-bold text-gray-600 uppercase mb-1">
                Or enter custom crop name:
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="e.g. Cauliflower, Ginger..."
                className="w-full p-2.5 bg-warm-cream border-2 border-ink-black font-heading font-bold text-sm"
              />
            </div>
          </div>
        )}

        {/* STEP 2: QUANTITY & PRICE */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{selectedCropInfo.icon}</span>
                <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                  {crop} Details
                </h3>
              </div>
              <p className="font-body text-xs text-gray-600">
                Enter how much you have and your expected price.
              </p>
            </div>

            {/* Quantity Input with Quick Presets */}
            <div className="p-4 bg-paper-white border-2 border-ink-black space-y-2">
              <label className="block font-heading font-bold text-xs uppercase text-ink-black">
                Available Quantity (in Kilograms)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="50"
                  step="50"
                  className="w-full p-3 bg-warm-cream border-2 border-ink-black font-heading font-black text-2xl text-ink-black pr-16"
                  placeholder="1000"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-bold text-gray-500 text-sm">
                  KG
                </span>
              </div>
              
              {/* Quick presets */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {['500', '1000', '2000', '5000'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className={`px-2.5 py-1 border border-ink-black font-bold ${
                      quantity === preset ? 'bg-ink-black text-paper-white' : 'bg-warm-cream hover:bg-gray-200'
                    }`}
                  >
                    {preset} KG
                  </button>
                ))}
              </div>
            </div>

            {/* Price per KG Input */}
            <div className="p-4 bg-paper-white border-2 border-ink-black space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-heading font-bold text-xs uppercase text-ink-black">
                  Expected Price Per KG
                </label>
                <span className="font-mono text-[11px] text-farm-green font-bold">
                  Mandi Benchmark: ₹{selectedCropInfo.avgMandiPrice}/KG
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  min="5"
                  step="1"
                  className="w-full p-3 bg-warm-cream border-2 border-ink-black font-heading font-black text-2xl text-ink-black pr-20"
                  placeholder="24"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-bold text-gray-500 text-sm">
                  ₹ / KG
                </span>
              </div>
              
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-600">
                <span>Estimated Total Payout:</span>
                <strong className="text-farm-green font-bold text-sm">
                  ₹{((Number(quantity) || 0) * (Number(expectedPrice) || 0)).toLocaleString()}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION & AVAILABLE DATE */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                Pickup Date & Farm Location
              </h3>
              <p className="font-body text-xs text-gray-600">
                Where and when should the collection vehicle arrive?
              </p>
            </div>

            {/* Ready Date Chips */}
            <div className="p-4 bg-paper-white border-2 border-ink-black space-y-2">
              <label className="block font-heading font-bold text-xs uppercase text-ink-black">
                When is it ready for pickup?
              </label>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {[
                  'Ready Today',
                  'Ready in 3 Days',
                  'Ready in 7 Days',
                  'Next Week (10 Days)'
                ].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setAvailableDate(d)}
                    className={`p-2.5 border-2 border-ink-black text-left font-bold transition-all ${
                      availableDate === d ? 'bg-citrus-yellow shadow-brutal-sm' : 'bg-warm-cream hover:bg-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Location */}
            <div className="p-4 bg-paper-white border-2 border-ink-black space-y-2">
              <label className="block font-heading font-bold text-xs uppercase text-ink-black">
                Farm / Village Pickup Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-farm-green absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 pl-9 bg-warm-cream border-2 border-ink-black font-mono text-xs font-bold"
                  placeholder="Village, Taluk / District"
                />
              </div>
              <p className="text-[10px] font-mono text-gray-500">
                Coordinated collection trucks pick up produce directly from your village hub.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-3.5 bg-yellow-50 border-2 border-ink-black font-mono text-xs space-y-1">
              <div className="font-bold uppercase text-ink-black flex items-center justify-between">
                <span>{crop} • {quantity} KG</span>
                <span className="text-farm-green font-black">₹{expectedPrice}/KG</span>
              </div>
              <div className="text-[11px] text-gray-600">
                Pickup: {availableDate} • {location}
              </div>
              <div className="text-[10px] text-farm-green font-bold pt-1">
                ✓ 0% Broker Fee • 100% Direct Bank Transfer
              </div>
            </div>
          </div>
        )}

        {/* Modal Controls (Back & Next/Submit) */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-ink-black">
          {step > 1 ? (
            <Button
              variant="white"
              size="md"
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK</span>
            </Button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs font-bold text-gray-600 hover:text-ink-black underline px-2 py-1"
            >
              Cancel
            </button>
          )}

          <Button
            variant="yellow"
            size="md"
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 text-xs font-heading font-black px-6 ml-auto"
          >
            <span>{step === 3 ? 'LIST PRODUCE NOW' : 'NEXT STEP'}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Button>
        </div>

      </div>
    </Modal>
  );
};
