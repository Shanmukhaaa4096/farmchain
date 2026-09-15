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
      <Card variant="white" shadow="lg" className="p-6 md:p-10 border-brutal-thick space-y-8 bg-furrow-pattern">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-ink-black">
          <div>
            <Badge variant="dark" size="sm" className="mb-2">
              SECTION 04 // VALUE ATTRIBUTION ENGINE
            </Badge>
            <h3 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-ink-black">
              PRICE TRANSPARENCY CALCULATOR
            </h3>
            <p className="font-body text-xs md:text-sm text-gray-700 mt-1">
              Simulate true farm-gate value versus logistics overhead. Zero hidden broker haircuts.
            </p>
          </div>

          <div className="p-3 bg-farm-green text-harvest-yellow border-2 border-ink-black font-mono text-center shadow-brutal-sm">
            <span className="text-[10px] text-paper-white block">FARMER VALUE CAPTURE</span>
            <strong className="text-2xl font-black">{farmerNetSharePercent}%</strong>
          </div>
        </div>

        {/* The Core Mathematical Breakdown Grid */}
        <div className="p-3.5 sm:p-6 bg-warm-cream border-brutal grid grid-cols-1 md:grid-cols-7 gap-3 sm:gap-4 items-center text-center font-mono">
          
          {/* Component 1: Farm Gate */}
          <div className="p-4 bg-paper-white border-2 border-ink-black shadow-brutal-sm md:col-span-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-soil-brown font-bold uppercase mb-1">
              <Sprout className="w-3.5 h-3.5 text-farm-green" /> FARM GATE REALIZATION
            </div>
            <div className="font-heading font-black text-3xl text-farm-green">
              ₹{farmPrice.toFixed(2)}
              <span className="text-xs font-mono font-normal text-gray-600"> / KG</span>
            </div>
            <div className="text-[10px] text-gray-500 mt-1">Directly into farmer's account</div>
          </div>

          {/* Plus Sign */}
          <div className="font-heading font-black text-2xl text-ink-black flex justify-center">
            +
          </div>

          {/* Component 2: Transport */}
          <div className="p-4 bg-paper-white border-2 border-ink-black shadow-brutal-sm md:col-span-1">
            <span className="text-[11px] text-gray-600 font-bold block uppercase mb-1">
              TRANSPORT
            </span>
            <div className="font-heading font-black text-2xl text-ink-black">
              ₹{transportCost.toFixed(2)}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">Reefer transit</div>
          </div>

          {/* Plus Sign */}
          <div className="font-heading font-black text-2xl text-ink-black flex justify-center">
            +
          </div>

          {/* Component 3: Handling & QC */}
          <div className="p-4 bg-paper-white border-2 border-ink-black shadow-brutal-sm md:col-span-1">
            <span className="text-[11px] text-gray-600 font-bold block uppercase mb-1">
              CRATES & QC
            </span>
            <div className="font-heading font-black text-2xl text-ink-black">
              ₹{handlingCost.toFixed(2)}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">Grading & sort</div>
          </div>

          {/* Equals Sign */}
          <div className="font-heading font-black text-2xl text-ink-black flex justify-center">
            =
          </div>

          {/* Result: Buyer Cost */}
          <div className="p-4 bg-harvest-yellow text-ink-black border-2 border-ink-black shadow-brutal-sm md:col-span-1">
            <span className="text-[11px] font-bold block uppercase mb-1">
              LANDED BUYER COST
            </span>
            <div className="font-heading font-black text-3xl text-ink-black">
              ₹{buyerTotalPerKg.toFixed(2)}
              <span className="text-xs font-mono font-normal"> / KG</span>
            </div>
            <div className="text-[10px] text-ink-black/80 font-bold mt-1">Direct to dock</div>
          </div>

        </div>

        {/* Sliders to Experiment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs">
          
          <div className="space-y-2 p-4 bg-paper-white border-2 border-ink-black">
            <div className="flex justify-between font-bold">
              <span>AGREED FARM PRICE:</span>
              <span className="text-farm-green font-black text-sm">₹{farmPrice} / kg</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={farmPrice}
              onChange={(e) => setFarmPrice(Number(e.target.value))}
              className="w-full accent-farm-green cursor-pointer h-2 bg-gray-200"
            />
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>Min ₹10</span>
              <span>Max ₹60</span>
            </div>
          </div>

          <div className="space-y-2 p-4 bg-paper-white border-2 border-ink-black">
            <div className="flex justify-between font-bold">
              <span>TRANSIT DISTANCE FACTOR:</span>
              <span className="text-ink-black font-black text-sm">₹{transportCost} / kg</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={transportCost}
              onChange={(e) => setTransportCost(Number(e.target.value))}
              className="w-full accent-ink-black cursor-pointer h-2 bg-gray-200"
            />
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>Short loop (₹1)</span>
              <span>Inter-district (₹10)</span>
            </div>
          </div>

          <div className="space-y-2 p-4 bg-paper-white border-2 border-ink-black">
            <div className="flex justify-between font-bold">
              <span>ORDER BATCH SIZE:</span>
              <span className="text-ink-black font-black text-sm">{batchVolumeKg.toLocaleString()} kg ({totalCrates} Crates)</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={batchVolumeKg}
              onChange={(e) => setBatchVolumeKg(Number(e.target.value))}
              className="w-full accent-harvest-yellow cursor-pointer h-2 bg-gray-200"
            />
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>500 KG</span>
              <span>10,000 KG</span>
            </div>
          </div>

        </div>

        {/* Contract Value Summary with Produce Crate Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-8 p-4 bg-ink-black text-paper-white border-brutal flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-gray-400 block">TOTAL DIRECT ORDER SETTLEMENT:</span>
              <strong className="font-heading font-black text-3xl text-harvest-yellow">
                <AnimatedCounter value={totalContractValue} prefix="₹" />
              </strong>
            </div>

            <div className="text-right text-gray-300">
              <p>Direct Farmer Bank Remittance: <strong>₹{(farmPrice * batchVolumeKg).toLocaleString()}</strong></p>
              <p>Logistics Partner Fee: <strong>₹{((transportCost + handlingCost) * batchVolumeKg).toLocaleString()}</strong></p>
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
        <div className="p-4 bg-warm-cream border-2 border-ink-black text-xs font-mono flex items-start gap-2.5">
          <Info className="w-4 h-4 text-ink-black shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold uppercase">NO PRICE FIXING BY FARMCHAIN:</strong>
            <p className="mt-0.5 text-gray-700">
              FarmChain does not determine, dictate, or guarantee final selling prices. The above calculator shows indicative reference structures so farmers and buyers negotiate with full cost-decomposition transparency.
            </p>
          </div>
        </div>

      </Card>

      {/* Live Mandi Benchmark Indicative Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-ink-black">
              APMC MANDI INDICATIVE BENCHMARKS
            </h3>
            <p className="font-mono text-xs text-gray-600">
              REAL-TIME GOV MANDI ARRIVALS // FOR NEGOTIATION BASELINES
            </p>
          </div>
          <Badge variant="green" size="sm" dot>LIVE TELEMETRY</Badge>
        </div>

        <div className="overflow-x-auto border-brutal bg-paper-white shadow-brutal">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-farm-green text-paper-white border-b-2 border-ink-black">
                <th className="p-3.5 uppercase font-heading font-bold">CROP / COMMODITY</th>
                <th className="p-3.5 uppercase font-heading font-bold">MARKET / MANDI</th>
                <th className="p-3.5 uppercase font-heading font-bold">INDICATIVE RANGE</th>
                <th className="p-3.5 uppercase font-heading font-bold">MODAL RATE</th>
                <th className="p-3.5 uppercase font-heading font-bold">7-DAY TREND</th>
                <th className="p-3.5 uppercase font-heading font-bold">DEMAND STATE</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-ink-black">
              {MOCK_MARKET_PRICES.map((item) => (
                <tr key={item.id} className="hover:bg-warm-cream/50 transition-colors">
                  <td className="p-3.5 font-bold text-ink-black font-heading text-sm">
                    {item.crop}
                  </td>
                  <td className="p-3.5 text-gray-700">
                    <div>{item.mandi}</div>
                    <div className="text-[10px] text-gray-500">{item.state}</div>
                  </td>
                  <td className="p-3.5 font-bold">
                    ₹{item.indicativeMin} to ₹{item.indicativeMax} <span className="text-[10px] text-gray-500">/ KG</span>
                  </td>
                  <td className="p-3.5 font-black text-farm-green text-sm">
                    ₹{item.indicativeModal.toFixed(1)} / KG
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 font-bold ${
                      item.sevenDayTrendPercent >= 0 ? 'text-farm-green' : 'text-rust-red'
                    }`}>
                      <TrendingUp className="w-3.5 h-3.5" />
                      {item.sevenDayTrendPercent > 0 ? `+${item.sevenDayTrendPercent}%` : `${item.sevenDayTrendPercent}%`}
                    </span>
                  </td>
                  <td className="p-3.5">
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
