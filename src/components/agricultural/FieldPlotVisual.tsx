import React, { useState } from 'react';
import { Sprout, Droplets, Sun, MapPin, CheckCircle2, Layers } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const FieldPlotVisual: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<number>(0);

  const plots = [
    {
      id: 'LOT-CHEV-01',
      village: 'Chevella Village',
      farmer: 'Ramesh Reddy (Sri Lakshmi Farm)',
      crop: 'Tomatoes (US-440 Hybrid)',
      acreage: '4.5 Acres',
      soilType: 'Red Loamy Soil (Chalka)',
      moisture: '21% (Optimal Drip)',
      nitrogen: '142 kg/ha (Balanced)',
      harvestWindow: '24-27 Sep 2026',
      yieldEstKg: '1,400 KG Ready',
      cratesReady: 56,
      status: 'HARVEST_ACTIVE'
    },
    {
      id: 'LOT-SHANK-02',
      village: 'Shankarpally Way',
      farmer: 'Kavitha Patel (Annapurna Agro)',
      crop: 'Onions (Pink Medium)',
      acreage: '3.2 Acres',
      soilType: 'Black Clay Loam (Regur)',
      moisture: '17% (Curing Phase)',
      nitrogen: '128 kg/ha (Medium)',
      harvestWindow: '27-30 Sep 2026',
      yieldEstKg: '950 KG Ready',
      cratesReady: 38,
      status: 'CURING_IN_PROGRESS'
    },
    {
      id: 'LOT-MOIN-03',
      village: 'Moinabad Highway',
      farmer: 'Babu Rao Mandava',
      crop: 'Bell Peppers (Greenhouse Indra)',
      acreage: '6.0 Acres',
      soilType: 'Alluvial Greenhouse Bed',
      moisture: '23% (Protected Polyhouse)',
      nitrogen: '165 kg/ha (Fertigated)',
      harvestWindow: '25-28 Sep 2026',
      yieldEstKg: '1,800 KG Ready',
      cratesReady: 72,
      status: 'HARVEST_ACTIVE'
    }
  ];

  const active = plots[selectedPlot];

  return (
    <Card variant="white" shadow="lg" className="p-6 md:p-8 border-brutal-thick space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-ink-black">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-terminal-green animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-farm-green uppercase tracking-wider">
              PRECISION FARMLAND SATELLITE & IOT TELEMETRY
            </span>
          </div>
          <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-ink-black">
            VILLAGE FIELD PLOT REGISTRY
          </h3>
        </div>

        <Badge variant="yellow" size="sm">
          RANGA REDDY AGRI-CLUSTER
        </Badge>
      </div>

      {/* Interactive Farmland Plot Rectangles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plots.map((plot, idx) => {
          const isSelected = selectedPlot === idx;
          return (
            <div
              key={plot.id}
              onClick={() => setSelectedPlot(idx)}
              className={`p-4 border-2 border-ink-black cursor-pointer transition-all duration-150 select-none ${
                isSelected 
                  ? 'bg-harvest-yellow text-ink-black shadow-brutal -translate-y-1' 
                  : 'bg-warm-cream/70 hover:bg-white text-ink-black shadow-brutal-sm'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-2">
                <span>{plot.id}</span>
                <span className="bg-ink-black text-paper-white px-1.5 py-0.2">
                  {plot.acreage}
                </span>
              </div>

              <h4 className="font-heading font-black text-base uppercase leading-tight mb-1">
                {plot.crop.split('(')[0]}
              </h4>
              <p className="font-mono text-xs text-gray-700">
                {plot.village}
              </p>

              <div className="mt-3 pt-2 border-t border-ink-black/20 flex justify-between font-mono text-[11px]">
                <span className="font-bold text-farm-green">{plot.yieldEstKg}</span>
                <span className="text-gray-600">{plot.cratesReady} Crates</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Soil & Agro-Ecological Telemetry for Selected Plot */}
      <div className="p-5 bg-warm-cream border-2 border-ink-black font-mono text-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-ink-black/20">
          <div>
            <strong className="font-heading font-black text-lg uppercase text-ink-black">
              {active.farmer}
            </strong>
            <div className="text-gray-600 text-[11px]">{active.village} • {active.acreage}</div>
          </div>
          <Badge variant="green" size="sm">
            DIRECT ESCROW APPROVED
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-paper-white border border-ink-black">
            <span className="text-[10px] text-gray-500 uppercase block mb-1">SOIL PROFILE</span>
            <strong className="text-soil-brown font-bold">{active.soilType}</strong>
          </div>

          <div className="p-3 bg-paper-white border border-ink-black">
            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase mb-1">
              <Droplets className="w-3 h-3 text-blue-600" /> SOIL MOISTURE
            </div>
            <strong className="text-blue-900 font-bold">{active.moisture}</strong>
          </div>

          <div className="p-3 bg-paper-white border border-ink-black">
            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase mb-1">
              <Sprout className="w-3 h-3 text-farm-green" /> NITROGEN (N-P-K)
            </div>
            <strong className="text-farm-green font-bold">{active.nitrogen}</strong>
          </div>

          <div className="p-3 bg-paper-white border border-ink-black">
            <span className="text-[10px] text-gray-500 uppercase block mb-1">PICKUP HARVEST WINDOW</span>
            <strong className="text-ink-black font-bold">{active.harvestWindow}</strong>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between text-[11px] text-gray-700">
          <span>FIELD RFID GEOFENCE: <strong>17.3128° N, 78.1340° E</strong></span>
          <span className="text-farm-green font-bold">✓ READY FOR SCHEDULED VEHICLE LOOP</span>
        </div>
      </div>

    </Card>
  );
};
