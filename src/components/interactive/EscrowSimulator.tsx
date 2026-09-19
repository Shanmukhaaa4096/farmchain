import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  ShieldCheck, 
  Landmark, 
  Truck, 
  QrCode, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RefreshCw,
  Clock,
  Lock
} from 'lucide-react';

interface EscrowSimulatorProps {
  initialCrop?: string;
  initialQuantityKg?: number;
  initialRatePerKg?: number;
}

export const EscrowSimulator: React.FC<EscrowSimulatorProps> = ({
  initialCrop = 'Tomatoes (Grade A)',
  initialQuantityKg = 2000,
  initialRatePerKg = 24,
}) => {
  const [crop, setCrop] = useState(initialCrop);
  const [quantityKg, setQuantityKg] = useState(initialQuantityKg);
  const [ratePerKg, setRatePerKg] = useState(initialRatePerKg);

  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const totalAmount = quantityKg * ratePerKg;

  const stages = [
    {
      step: 1,
      title: 'Advance Locked in Escrow',
      actor: 'Wholesale Buyer (UrbanFork)',
      desc: 'Buyer deposits 100% purchase amount into automated Escrow Bank Vault upon contract agreement.',
      icon: Lock,
      badge: 'Escrow Secured',
    },
    {
      step: 2,
      title: 'Village Gate Pickup & Weighing',
      actor: 'Logistics Fleet',
      desc: 'Reefer vehicle reaches village cluster dock. Certified digital scale records exact lot weight.',
      icon: Truck,
      badge: 'Dock Weighed',
    },
    {
      step: 3,
      title: 'Quality QR Handshake',
      actor: 'Digital Inspection',
      desc: 'Inspector scans lot QR code and confirms Grade A parameters (moisture, color, firmness).',
      icon: QrCode,
      badge: 'Quality Passed',
    },
    {
      step: 4,
      title: 'Instant 100% Direct Payout',
      actor: 'Farmer Bank Account',
      desc: 'Smart contract vault triggers instant NEFT/UPI disbursal. 0% broker fee deducted. ₹0 delayed credit.',
      icon: Landmark,
      badge: 'Payout Disbursed',
    },
  ];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStage(1);

    setTimeout(() => {
      setActiveStage(2);
      setTimeout(() => {
        setActiveStage(3);
        setTimeout(() => {
          setActiveStage(4);
          setIsSimulating(false);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  return (
    <Card className="p-6 sm:p-8 bg-[#FBF8F2] border border-[#2F4A3A]/15 rounded-[28px] shadow-soft-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2F4A3A]/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Bank Escrow Engine
            </span>
            <Badge variant="neutral">SAMPLE DATA SIMULATOR</Badge>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2F4A3A]">
            Zero-Middleman Escrow Payout Flow
          </h3>
          <p className="text-xs text-[#536458] mt-1 font-sans">
            Guaranteed 100% direct bank payout without commission agent holding, bad debts, or arbitrary cuts.
          </p>
        </div>

        <div className="text-left sm:text-right bg-white p-3.5 rounded-2xl border border-[#2F4A3A]/10 shrink-0">
          <span className="text-[10px] font-mono uppercase text-[#536458] block">
            Simulated Total Payout:
          </span>
          <span className="text-2xl font-serif font-bold text-[#2F4A3A]">
            ₹{totalAmount.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] font-mono text-emerald-700 block font-bold">
            0% Broker Fee • ₹0 Deducted
          </span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-[#2F4A3A]/10">
        <div>
          <label className="block text-[10px] font-mono uppercase font-bold text-[#536458] mb-1">
            Crop & Grade
          </label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            disabled={isSimulating}
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#2F4A3A]/15 text-xs text-[#2F4A3A] font-medium focus:outline-none focus:border-[#C77B58]"
          >
            <option value="Tomatoes (Grade A)">Tomatoes (Grade A)</option>
            <option value="Green Chilli (Export)">Green Chilli (Export)</option>
            <option value="Bell Peppers (Grade A)">Bell Peppers (Grade A)</option>
            <option value="Onions (Grade A)">Onions (Grade A)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase font-bold text-[#536458] mb-1">
            Quantity: <span className="text-[#2F4A3A]">{quantityKg.toLocaleString()} KG</span>
          </label>
          <input
            type="range"
            min={500}
            max={10000}
            step={250}
            value={quantityKg}
            onChange={(e) => setQuantityKg(Number(e.target.value))}
            disabled={isSimulating}
            className="w-full accent-[#C77B58]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase font-bold text-[#536458] mb-1">
            Agreed Rate: <span className="text-[#2F4A3A]">₹{ratePerKg}/KG</span>
          </label>
          <input
            type="range"
            min={15}
            max={60}
            step={1}
            value={ratePerKg}
            onChange={(e) => setRatePerKg(Number(e.target.value))}
            disabled={isSimulating}
            className="w-full accent-[#C77B58]"
          />
        </div>
      </div>

      {/* 4-Stage Visual Escrow Progress Bar */}
      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {stages.map((st) => {
            const isDone = activeStage > st.step;
            const isCurrent = activeStage === st.step;
            const Icon = st.icon;

            return (
              <div
                key={st.step}
                className={`p-4 rounded-2xl border transition-all duration-300 relative ${
                  isCurrent
                    ? 'bg-white border-[#C77B58] ring-2 ring-[#C77B58]/20 shadow-soft-sm'
                    : isDone
                    ? 'bg-emerald-50/60 border-emerald-300/80 text-[#2F4A3A]'
                    : 'bg-white/60 border-[#2F4A3A]/10 text-[#536458]/70 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isCurrent
                      ? 'bg-[#C77B58] text-white animate-pulse'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#F4EFE6] text-[#536458]'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#536458]">
                    Step 0{st.step}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-sm text-[#2F4A3A] leading-snug">
                  {st.title}
                </h4>
                <span className="text-[10px] font-mono text-[#C77B58] font-bold block mt-0.5">
                  {st.actor}
                </span>
                <p className="text-[11px] text-[#536458] mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulator Execution Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2F4A3A]/10">
        <div className="flex items-center gap-2 text-xs text-[#536458]">
          <Clock className="w-4 h-4 text-[#C77B58]" />
          <span>Average dock-to-bank settlement speed: <strong>48 minutes</strong></span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="shadow-soft-sm"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              <span>Simulating Settlement Step {activeStage} of 4...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Run Live Escrow Payout Simulation</span>
            </>
          )}
        </Button>
      </div>

      {/* Live Disbursal Receipt Snapshot (when completed) */}
      {activeStage === 4 && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#2F4A3A] animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-emerald-200/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-serif font-bold text-sm text-emerald-900">
                Direct Bank Payout Receipt Verified
              </span>
            </div>
            <span className="font-mono text-[10px] text-emerald-800 font-bold">
              TXN: FC-IMPS-{Math.floor(10000000 + Math.random() * 90000000)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 text-xs">
            <div>
              <span className="text-[10px] font-mono text-[#536458] block">Farmer Beneficiary:</span>
              <strong className="text-[#2F4A3A]">Ramesh Reddy (Kisan Desk)</strong>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#536458] block">Amount Credited:</span>
              <strong className="text-emerald-700">₹{totalAmount.toLocaleString('en-IN')} (100%)</strong>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#536458] block">Commission / Dalali:</span>
              <strong className="text-emerald-700">₹0.00 (0%)</strong>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#536458] block">Settlement Time:</span>
              <strong className="text-[#2F4A3A]">Instant IMPS Payout</strong>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
