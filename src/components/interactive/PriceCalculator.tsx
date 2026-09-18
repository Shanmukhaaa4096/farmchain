import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  TrendingUp, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  Truck,
  PackageCheck,
  Scale,
  Package,
  Sprout
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ProduceCrateIllustration } from '../agricultural/AgriIllustrations';
import { MOCK_MARKET_PRICES } from '../../data/mockData';

export const PriceCalculator: React.FC = () => {
  const [farmPrice, setFarmPrice] = useState<number>(22);
  const [transportCost, setTransportCost] = useState<number>(3);
  const [handlingCost, setHandlingCost] = useState<number>(1.2);
  const [batchVolumeKg, setBatchVolumeKg] = useState<number>(2400);

  const buyerTotalPerKg = Number((farmPrice + transportCost + handlingCost).toFixed(2));
  const totalContractValue = Math.round(buyerTotalPerKg * batchVolumeKg);
  const farmerNetSharePercent = Math.round((farmPrice / buyerTotalPerKg) * 100);
  const totalCrates = Math.round(batchVolumeKg / 25);

  return (
    <div className="space-y-12">
      
      {/* Interactive Price Transparency Breakdown */}
      <div className="p-6 md:p-10 bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft space-y-8">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-dark-text/10">
          <div>
            <div className="inline-block px-2.5 py-1 bg-paper-bg border border-dark-text/15 text-[10px] font-mono uppercase tracking-wider rounded-full mb-2 text-dark-text/80">
              SECTION 04 // VALUE ATTRIBUTION ENGINE
            </div>
            <h3 className="font-serif font-bold text-2xl md:text-3xl tracking-tight text-dark-text">
              PRICE TRANSPARENCY CALCULATOR
            </h3>
            <p className="font-sans text-xs md:text-sm text-dark-text/70 mt-1">
              Simulate true farm-gate value versus logistics overhead. Zero hidden broker haircuts.
            </p>
          </div>

          <div className="p-4 bg-farm-green text-pure-white rounded-2xl border border-farm-green/30 font-mono text-center shadow-soft-sm">
            <span className="text-[10px] text-harvest-yellow block uppercase font-semibold">FARMER VALUE CAPTURE</span>
            <strong className="text-3xl font-serif font-bold block mt-0.5">{farmerNetSharePercent}%</strong>
          </div>
        </div>

        {/* The Core Mathematical Breakdown Grid */}
        <div className="p-4 sm:p-6 bg-paper-bg rounded-2xl border border-dark-text/10 grid grid-cols-1 md:grid-cols-7 gap-3 sm:gap-4 items-center text-center font-mono">
          
          {/* Component 1: Farm Gate */}
          <div className="p-5 bg-pure-white rounded-xl border border-dark-text/10 shadow-soft-sm md:col-span-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-dark-text/70 font-bold uppercase mb-1">
              <Sprout className="w-3.5 h-3.5 text-farm-green" /> FARM GATE REALIZATION
            </div>
            <div className="font-serif font-bold text-3xl text-farm-green">
              ₹{farmPrice.toFixed(2)}
              <span className="text-xs font-mono font-normal text-dark-text/60"> / KG</span>
            </div>
            <div className="text-[10px] text-dark-text/50 mt-1">Directly into farmer's account</div>
          </div>

          {/* Plus Sign */}
          <div className="font-serif font-bold text-2xl text-dark-text/40 flex justify-center">
            +
          </div>

          {/* Component 2: Transport */}
          <div className="p-5 bg-pure-white rounded-xl border border-dark-text/10 shadow-soft-sm md:col-span-1">
            <span className="text-[11px] text-dark-text/70 font-bold block uppercase mb-1">
              TRANSPORT
            </span>
            <div className="font-serif font-bold text-2xl text-dark-text">
              ₹{transportCost.toFixed(2)}
            </div>
            <div className="text-[10px] text-dark-text/50 mt-1">Reefer transit</div>
          </div>

          {/* Plus Sign */}
          <div className="font-serif font-bold text-2xl text-dark-text/40 flex justify-center">
            +
          </div>

          {/* Component 3: Handling & QC */}
          <div className="p-5 bg-pure-white rounded-xl border border-dark-text/10 shadow-soft-sm md:col-span-1">
            <span className="text-[11px] text-dark-text/70 font-bold block uppercase mb-1">
              CRATES & QC
            </span>
            <div className="font-serif font-bold text-2xl text-dark-text">
              ₹{handlingCost.toFixed(2)}
            </div>
            <div className="text-[10px] text-dark-text/50 mt-1">Grading & sort</div>
          </div>

          {/* Equals Sign */}
          <div className="font-serif font-bold text-2xl text-dark-text/40 flex justify-center">
            =
          </div>

          {/* Result: Buyer Cost */}
          <div className="p-5 bg-harvest-yellow/20 rounded-xl border border-accent-yellow/40 shadow-soft-sm md:col-span-1">
            <span className="text-[11px] font-bold text-dark-text block uppercase mb-1">
              LANDED BUYER COST
            </span>
            <div className="font-serif font-bold text-3xl text-dark-text">
              ₹{buyerTotalPerKg.toFixed(2)}
              <span className="text-xs font-mono font-normal"> / KG</span>
            </div>
            <div className="text-[10px] text-dark-text/70 font-bold mt-1">Direct to dock</div>
          </div>

        </div>

        {/* Sliders to Experiment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs">
          
          <div className="space-y-2 p-5 bg-paper-bg rounded-2xl border border-dark-text/10 shadow-soft-sm">
            <div className="flex justify-between font-bold text-dark-text">
              <span>AGREED FARM PRICE:</span>
              <span className="text-farm-green font-bold text-sm">₹{farmPrice} / kg</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={farmPrice}
              onChange={(e) => setFarmPrice(Number(e.target.value))}
              className="w-full accent-farm-green cursor-pointer h-2 bg-dark-text/10 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-dark-text/50">
              <span>Min ₹10</span>
              <span>Max ₹60</span>
            </div>
          </div>

          <div className="space-y-2 p-5 bg-paper-bg rounded-2xl border border-dark-text/10 shadow-soft-sm">
            <div className="flex justify-between font-bold text-dark-text">
              <span>TRANSIT DISTANCE FACTOR:</span>
              <span className="text-dark-text font-bold text-sm">₹{transportCost} / kg</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={transportCost}
              onChange={(e) => setTransportCost(Number(e.target.value))}
              className="w-full accent-dark-text cursor-pointer h-2 bg-dark-text/10 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-dark-text/50">
              <span>Short loop (₹1)</span>
              <span>Inter-district (₹10)</span>
            </div>
          </div>

          <div className="space-y-2 p-5 bg-paper-bg rounded-2xl border border-dark-text/10 shadow-soft-sm">
            <div className="flex justify-between font-bold text-dark-text">
              <span>ORDER BATCH SIZE:</span>
              <span className="text-dark-text font-bold text-sm">{batchVolumeKg.toLocaleString()} kg</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={batchVolumeKg}
              onChange={(e) => setBatchVolumeKg(Number(e.target.value))}
              className="w-full accent-harvest-yellow cursor-pointer h-2 bg-dark-text/10 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-dark-text/50">
              <span>500 KG</span>
              <span>10,000 KG ({totalCrates} Crates)</span>
            </div>
          </div>

        </div>

        {/* Contract Value Summary with Produce Crate Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-8 p-6 bg-dark-text text-pure-white rounded-2xl border border-dark-text/20 shadow-soft flex flex-wrap items-center justify-between gap-6 font-mono text-xs">
            <div>
              <span className="text-pure-white/70 block text-[11px]">TOTAL DIRECT ORDER SETTLEMENT:</span>
              <strong className="font-serif font-bold text-3xl sm:text-4xl text-harvest-yellow block mt-1">
                <AnimatedCounter value={totalContractValue} prefix="₹" />
              </strong>
            </div>

            <div className="text-right text-pure-white/80 space-y-1">
              <p>Direct Farmer Bank Remittance: <strong className="text-pure-white">₹{(farmPrice * batchVolumeKg).toLocaleString()}</strong></p>
              <p>Logistics Partner Fee: <strong className="text-pure-white">₹{((transportCost + handlingCost) * batchVolumeKg).toLocaleString()}</strong></p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <ProduceCrateIllustration 
              crop="Grade A Harvest" 
              quantity={`${totalCrates} Crates (${batchVolumeKg} KG)`}
              grade="100% Direct"
            />
          </div>
        </div>

        {/* Important Platform Legal Note */}
        <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 text-xs font-mono flex items-start gap-2.5">
          <Info className="w-4 h-4 text-farm-green shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold uppercase text-dark-text">NO PRICE FIXING BY FARMCHAIN:</strong>
            <p className="mt-0.5 text-dark-text/70 font-sans">
              FarmChain does not determine, dictate, or guarantee final selling prices. The above calculator shows indicative reference structures so farmers and buyers negotiate with full cost-decomposition transparency.
            </p>
          </div>
        </div>

      </div>

      {/* Live Mandi Benchmark Indicative Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-2xl tracking-tight text-dark-text">
              APMC Mandi Indicative Benchmarks
            </h3>
            <p className="font-mono text-xs text-dark-text/60">
              REAL-TIME GOV MANDI ARRIVALS // FOR NEGOTIATION BASELINES
            </p>
          </div>
          <Badge variant="green" size="sm" dot>LIVE TELEMETRY</Badge>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-dark-text/10 bg-pure-white shadow-soft">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-farm-green text-pure-white border-b border-dark-text/15">
                <th className="p-4 font-serif font-bold">CROP / COMMODITY</th>
                <th className="p-4 font-serif font-bold">MARKET / MANDI</th>
                <th className="p-4 font-serif font-bold">INDICATIVE RANGE</th>
                <th className="p-4 font-serif font-bold">MODAL RATE</th>
                <th className="p-4 font-serif font-bold">7-DAY TREND</th>
                <th className="p-4 font-serif font-bold">DEMAND STATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-text/10">
              {MOCK_MARKET_PRICES.map((item) => (
                <tr key={item.id} className="hover:bg-paper-bg/60 transition-colors">
                  <td className="p-4 font-bold text-dark-text font-serif text-sm">
                    {item.crop}
                  </td>
                  <td className="p-4 text-dark-text/80">
                    <div className="font-medium">{item.mandi}</div>
                    <div className="text-[10px] text-dark-text/50">{item.state}</div>
                  </td>
                  <td className="p-4 font-semibold text-dark-text">
                    ₹{item.indicativeMin} to ₹{item.indicativeMax} <span className="text-[10px] text-dark-text/50 font-normal">/ KG</span>
                  </td>
                  <td className="p-4 font-bold text-farm-green text-sm">
                    ₹{item.indicativeModal.toFixed(1)} / KG
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 font-bold ${
                      item.sevenDayTrendPercent >= 0 ? 'text-farm-green' : 'text-terracotta'
                    }`}>
                      <TrendingUp className="w-3.5 h-3.5" />
                      {item.sevenDayTrendPercent > 0 ? `+${item.sevenDayTrendPercent}%` : `${item.sevenDayTrendPercent}%`}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant={item.demandStatus === 'SURGING' ? 'red' : item.demandStatus === 'HIGH' ? 'yellow' : 'white'}
                      size="sm"
                    >
                      {item.demandStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
