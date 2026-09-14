import React from 'react';
import { Truck, Navigation, Gauge, ShieldCheck, MapPin, Radio } from 'lucide-react';
import { LogisticsMap } from '../components/interactive/LogisticsMap';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const LogisticsPage: React.FC = () => {
  return (
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Logistics Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-brutal">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold">
              <Badge variant="dark" size="sm">LOGISTICS ENGINE</Badge>
              <Badge variant="green" size="sm" dot>COLD-CHAIN TELEMETRY LIVE</Badge>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-black">
              OPTIMIZED RURAL TRANSIT.
            </h1>
            <p className="font-body text-base text-gray-700 mt-2 font-medium max-w-2xl">
              Small farmers rarely have cold storage or delivery vehicles. FarmChain coordinates consolidated, multi-stop pickup circuits to minimize transit degradation and maximize vehicle capacity.
            </p>
          </div>

          <div className="p-3 bg-paper-white border-2 border-ink-black font-mono text-xs shadow-brutal-sm">
            <span className="text-gray-500 block text-[10px]">CURRENT FLEET STATUS</span>
            <strong className="text-farm-green font-bold">14 VANS & REEFERS ACTIVE</strong>
          </div>
        </div>

        {/* The Interactive Map Component */}
        <LogisticsMap />

        {/* Regional Dispatch Manifest Table */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-ink-black">
              TODAY'S REGIONAL DISPATCH LOOPS
            </h3>
            <span className="font-mono text-xs text-gray-600">
              UPDATED LIVE VIA IOT GPS
            </span>
          </div>

          <div className="overflow-x-auto border-brutal bg-paper-white shadow-brutal">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-ink-black text-paper-white border-b-2 border-ink-black">
                  <th className="p-3.5 uppercase font-heading font-bold">ROUTE ID</th>
                  <th className="p-3.5 uppercase font-heading font-bold">CIRCUIT CORRIDOR</th>
                  <th className="p-3.5 uppercase font-heading font-bold">CROP CONSIGNMENT</th>
                  <th className="p-3.5 uppercase font-heading font-bold">CAPACITY LOAD</th>
                  <th className="p-3.5 uppercase font-heading font-bold">EFFICIENCY GAIN</th>
                  <th className="p-3.5 uppercase font-heading font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-ink-black">
                <tr className="bg-yellow-50/50">
                  <td className="p-3.5 font-bold text-farm-green font-heading">
                    #TS-08-HYD
                  </td>
                  <td className="p-3.5 text-gray-800">
                    Chevella → Shankarpally → Moinabad → Gachibowli
                  </td>
                  <td className="p-3.5 font-bold">
                    Tomatoes (2,400 KG)
                  </td>
                  <td className="p-3.5 font-bold text-ink-black">
                    91% (2.4 / 2.6 MT)
                  </td>
                  <td className="p-3.5 font-bold text-farm-green">
                    +27.4%
                  </td>
                  <td className="p-3.5">
                    <Badge variant="green" size="sm" dot>IN TRANSIT</Badge>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-farm-green font-heading">
                    #MH-15-NSK
                  </td>
                  <td className="p-3.5 text-gray-800">
                    Pimpalgaon → Niphad → Lasalgaon → Mumbai Central
                  </td>
                  <td className="p-3.5 font-bold">
                    Onions (5,000 KG)
                  </td>
                  <td className="p-3.5 font-bold text-ink-black">
                    88% (5.0 / 5.7 MT)
                  </td>
                  <td className="p-3.5 font-bold text-farm-green">
                    +31.2%
                  </td>
                  <td className="p-3.5">
                    <Badge variant="yellow" size="sm">LOADING</Badge>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-farm-green font-heading">
                    #KA-04-BLR
                  </td>
                  <td className="p-3.5 text-gray-800">
                    Chintamani → Sidlaghatta → Hoskote → Whitefield
                  </td>
                  <td className="p-3.5 font-bold">
                    Green Chilli (1,800 KG)
                  </td>
                  <td className="p-3.5 font-bold text-ink-black">
                    95% (1.8 / 1.9 MT)
                  </td>
                  <td className="p-3.5 font-bold text-farm-green">
                    +24.0%
                  </td>
                  <td className="p-3.5">
                    <Badge variant="white" size="sm">SCHEDULED</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
