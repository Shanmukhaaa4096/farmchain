import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin,
  Sprout,
  Package,
  Layers,
  Tag,
  ShoppingBag,
  Wheat,
  CheckCircle2
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
  { name: 'Tomatoes', icon: Sprout, variety: 'US-440 Hybrid', avgMandiPrice: 22 },
  { name: 'Onions', icon: Package, variety: 'Pink Medium', avgMandiPrice: 26 },
  { name: 'Potatoes', icon: Layers, variety: 'Chips Grade', avgMandiPrice: 18 },
  { name: 'Green Chilli', icon: Tag, variety: 'G4 Slender', avgMandiPrice: 45 },
  { name: 'Bell Peppers', icon: ShoppingBag, variety: 'Indra Hybrid', avgMandiPrice: 55 },
  { name: 'Basmati Rice', icon: Wheat, variety: '1121 Steam', avgMandiPrice: 80 },
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
  const SelectedIcon = selectedCropInfo.icon;

  const handleSelectCrop = (cropName: string, cropVariety: string, price: number) => {
    setCrop(cropName);
    setVariety(cropVariety);
    setExpectedPrice(String(price + 2)); // Default to fair floor price
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
      title="Add Your Crop for Sale"
      subtitle={`Phase ${step} of 3 • ${step === 1 ? 'Select Harvest Crop' : step === 2 ? 'Yield & Price Standard' : 'Dispatch Date & Farm Location'}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        
        {/* Step Progression Bar (ReUI Style) */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-center transition-all ${
            step >= 1 ? 'border-farm-green/30 bg-farm-green/10 text-farm-green font-bold' : 'border-dark-text/10 bg-paper-bg text-dark-text/40'
          }`}>
            <span>01</span>
            <span className="hidden sm:inline">CROP</span>
          </div>
          <div className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-center transition-all ${
            step >= 2 ? 'border-farm-green/30 bg-farm-green/10 text-farm-green font-bold' : 'border-dark-text/10 bg-paper-bg text-dark-text/40'
          }`}>
            <span>02</span>
            <span className="hidden sm:inline">QUANTITY & PRICE</span>
          </div>
          <div className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-center transition-all ${
            step === 3 ? 'border-farm-green/30 bg-farm-green/10 text-farm-green font-bold' : 'border-dark-text/10 bg-paper-bg text-dark-text/40'
          }`}>
            <span>03</span>
            <span className="hidden sm:inline">LOCATION</span>
          </div>
        </div>

        {/* STEP 1: CHOOSE CROP */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-serif text-base font-bold text-dark-text mb-1">
                Select Your Crop
              </label>
              <p className="text-xs text-dark-text/60">
                Choose the produce you have in current cultivation or ready for harvesting.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COMMON_CROPS.map((c) => {
                const isSelected = crop === c.name;
                const CropIcon = c.icon;
                return (
                  <button
                    type="button"
                    key={c.name}
                    onClick={() => handleSelectCrop(c.name, c.variety, c.avgMandiPrice)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[105px] ${
                      isSelected
                        ? 'border-farm-green bg-pure-white shadow-soft-sm ring-2 ring-farm-green/15 -translate-y-0.5'
                        : 'border-dark-text/10 bg-paper-bg/50 hover:bg-pure-white hover:border-dark-text/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-farm-green text-paper-bg' : 'bg-dark-text/5 text-dark-text/70'
                      }`}>
                        <CropIcon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-farm-green" />
                      )}
                    </div>
                    <div className="mt-3">
                      <strong className="font-serif font-bold text-sm block text-dark-text">
                        {c.name}
                      </strong>
                      <span className="font-mono text-[10px] text-dark-text/50 block">
                        Mandi: ₹{c.avgMandiPrice}/KG
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Crop Input */}
            <div className="pt-2">
              <label className="block text-xs font-mono text-dark-text/60 uppercase mb-1">
                Or enter custom crop / specialty:
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="e.g. Cauliflower, Ginger, Papaya..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-sm font-medium transition-all"
              />
            </div>
          </div>
        )}

        {/* STEP 2: QUANTITY & PRICE */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-farm-green/10 text-farm-green flex items-center justify-center">
                <SelectedIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-dark-text">
                  {crop} Specifications
                </h3>
                <p className="text-xs text-dark-text/60">
                  Specify available weight and your target rate per kilogram.
                </p>
              </div>
            </div>

            {/* Quantity Input with Quick Presets */}
            <div className="p-5 rounded-2xl border border-dark-text/10 bg-pure-white space-y-3 shadow-soft-sm">
              <label className="block text-xs font-mono uppercase tracking-wider text-dark-text/60 font-semibold">
                Available Harvest (in Kilograms)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="50"
                  step="50"
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 font-serif font-bold text-2xl text-dark-text pr-16"
                  placeholder="1000"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-bold text-dark-text/40 text-sm">
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
                    className={`px-3 py-1 rounded-full border transition-all ${
                      quantity === preset
                        ? 'border-farm-green bg-farm-green text-paper-bg font-bold'
                        : 'border-dark-text/15 bg-paper-bg hover:bg-dark-text/5 text-dark-text'
                    }`}
                  >
                    {preset} KG
                  </button>
                ))}
              </div>
            </div>

            {/* Price per KG Input */}
            <div className="p-5 rounded-2xl border border-dark-text/10 bg-pure-white space-y-3 shadow-soft-sm">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-dark-text/60 font-semibold">
                  Expected Rate Per KG
                </label>
                <span className="font-mono text-xs text-farm-green font-semibold">
                  Benchmark: ₹{selectedCropInfo.avgMandiPrice}/KG
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  min="5"
                  step="1"
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 font-serif font-bold text-2xl text-dark-text pr-20"
                  placeholder="24"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-bold text-dark-text/40 text-sm">
                  ₹ / KG
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs font-mono text-dark-text/60 pt-1">
                <span>Estimated Money in Bank:</span>
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
              <h3 className="font-serif font-bold text-lg text-dark-text">
                Dispatch Schedule & Village Gate
              </h3>
              <p className="text-xs text-dark-text/60">
                Specify when harvest will be crated and your village pickup point.
              </p>
            </div>

            {/* Ready Date Chips */}
            <div className="p-5 rounded-2xl border border-dark-text/10 bg-pure-white space-y-3 shadow-soft-sm">
              <label className="block text-xs font-mono uppercase tracking-wider text-dark-text/60 font-semibold">
                Estimated Readiness
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
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
                    className={`p-3 rounded-xl border text-left font-medium transition-all ${
                      availableDate === d
                        ? 'border-farm-green bg-farm-green/10 text-farm-green font-bold'
                        : 'border-dark-text/10 bg-paper-bg/60 hover:bg-paper-bg text-dark-text'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Location */}
            <div className="p-5 rounded-2xl border border-dark-text/10 bg-pure-white space-y-3 shadow-soft-sm">
              <label className="block text-xs font-mono uppercase tracking-wider text-dark-text/60 font-semibold">
                Farm Gate / Village Collection Point
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-farm-green absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-text/15 bg-paper-bg/40 focus:bg-pure-white focus:border-farm-green focus:ring-2 focus:ring-farm-green/10 text-xs font-medium"
                  placeholder="Village, Taluk / District"
                />
              </div>
              <p className="text-[11px] text-dark-text/50">
                Scheduled reefer collection loops pick up crated produce directly from village hubs.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl border border-dark-text/10 bg-paper-bg/70 text-xs space-y-1.5 font-mono">
              <div className="font-bold text-dark-text flex items-center justify-between font-serif text-sm">
                <span>{crop} • {quantity} KG</span>
                <span className="text-farm-green font-bold">₹{expectedPrice}/KG</span>
              </div>
              <div className="text-dark-text/60">
                Pickup: {availableDate} • {location}
              </div>
              <div className="text-farm-green font-semibold pt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 0% Broker Fees • 100% Safe Payment in your Bank
              </div>
            </div>
          </div>
        )}

        {/* Modal Controls */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-dark-text/10">
          {step > 1 ? (
            <Button
              variant="white"
              size="md"
              type="button"
              onClick={handleBack}
              className="text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </Button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-dark-text/60 hover:text-dark-text underline px-2 py-1"
            >
              Cancel
            </button>
          )}

          <Button
            variant="clay"
            size="md"
            type="button"
            onClick={handleNext}
            className="shadow-soft-terracotta text-xs px-6 ml-auto"
          >
            <span>{step === 3 ? 'Publish Produce Lot' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

      </div>
    </Modal>
  );
};
