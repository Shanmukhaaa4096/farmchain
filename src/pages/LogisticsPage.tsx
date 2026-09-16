import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Navigation,
  ChevronDown,
  ChevronUp,
  Radio
} from 'lucide-react';
import { LogisticsMap } from '../components/interactive/LogisticsMap';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { UserRole } from '../types';

interface LogisticsPageProps {
  requireAuth?: (role: UserRole, action: () => void, promptMessage: string) => void;
  isAuthenticated?: boolean;
  onPostAvailability?: () => void;
}

const PICKUP_CIRCUITS = [
  {
    id: '#TS-08-HYD',
    crop: 'Tomatoes (Grade A)',
    quantityKg: 2400,
    pickupLocation: 'Chevella Village Farm Gate #1',
    destination: 'UrbanFork Hub (Gachibowli, Hyderabad)',
    date: 'Today, 25 Sep 2026',
    time: '07:15 AM (Loaded)',
    status: 'In Transit',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 98492 01842',
    vehiclePlate: 'TS-08-UB-4420 (Tata 407 Reefer)',
    tempCelsius: '13.8°C'
  },
  {
    id: '#MH-15-NSK',
    crop: 'Onions (Pink Medium)',
    quantityKg: 5000,
    pickupLocation: 'Pimpalgaon Village FPO Yard',
    destination: 'FreshSprout Central (Mumbai)',
    date: 'Tomorrow, 26 Sep 2026',
    time: '06:00 AM (Scheduled)',
    status: 'Scheduled',
    driverName: 'Mohd. Imran',
    driverPhone: '+91 97000 44123',
    vehiclePlate: 'MH-15-AB-7821',
    tempCelsius: 'Ambient'
  },
  {
    id: '#KA-04-BLR',
    crop: 'Green Chilli (G4 Slender)',
    quantityKg: 1800,
    pickupLocation: 'Chintamani Village Hub',
    destination: 'Spiceland Warehouse (Bangalore)',
    date: '27 Sep 2026',
    time: '08:00 AM (Scheduled)',
    status: 'Scheduled',
    driverName: 'Ramesh Gowda',
    driverPhone: '+91 98450 11982',
    vehiclePlate: 'KA-04-E-3309',
    tempCelsius: '14.2°C'
  }
];

export const LogisticsPage: React.FC<LogisticsPageProps> = ({
  requireAuth,
  isAuthenticated = false,
  onPostAvailability,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="py-6 sm:py-10 bg-warm-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Simple Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-ink-black">
          <div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-black">
              DELIVERY & PICKUPS
            </h1>
            <p className="font-body text-xs sm:text-sm text-gray-700 mt-1">
              Coordinated farm-gate vehicle pickups and cold-chain transport.
            </p>
          </div>

          <Button
            variant="yellow"
            size="sm"
            onClick={() => {
              const action = () => {
                if (onPostAvailability) onPostAvailability();
              };

              if (!isAuthenticated && requireAuth) {
                requireAuth(
                  'logistics',
                  action,
                  'Logistics carrier authentication required to register fleet capacity.'
                );
              } else {
                action();
              }
            }}
            className="self-start sm:self-auto font-heading font-black text-xs"
          >
            <Truck className="w-4 h-4 mr-1.5" />
            <span>POST VEHICLE CAPACITY</span>
          </Button>
        </div>

        {/* Farmer-Friendly Delivery Cards (Simple, Stacked, Touch-Friendly) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-gray-600">
            <span>ACTIVE TRANSIT CIRCUITS</span>
            <span className="text-farm-green font-bold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE TRACKING ACTIVE
            </span>
          </div>

          {PICKUP_CIRCUITS.map((circuit) => (
            <Card
              key={circuit.id}
              variant="white"
              className="p-5 border-brutal space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
                <div>
                  <span className="font-mono text-[10px] text-gray-500 font-bold block">
                    CIRCUIT {circuit.id}
                  </span>
                  <strong className="font-heading font-black text-lg sm:text-xl uppercase text-ink-black">
                    {circuit.crop} • {circuit.quantityKg.toLocaleString()} KG
                  </strong>
                </div>

                <div>
                  <span className={`px-2.5 py-1 border font-mono font-bold text-xs uppercase inline-flex items-center gap-1 ${
                    circuit.status === 'In Transit'
                      ? 'bg-citrus-yellow text-ink-black border-ink-black'
                      : 'bg-blue-50 text-blue-900 border-blue-900'
                  }`}>
                    <Truck className="w-3.5 h-3.5" />
                    {circuit.status}
                  </span>
                </div>
              </div>

              {/* Essential Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-gray-800">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-farm-green shrink-0" />
                  <span>Pickup: <strong>{circuit.pickupLocation}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-farm-green shrink-0" />
                  <span>Date/Time: <strong>{circuit.date}, {circuit.time}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <Navigation className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                  <span className="truncate">Destination: <strong>{circuit.destination}</strong></span>
                </div>
              </div>

              {/* Driver Contact & Action */}
              <div className="pt-2 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="text-gray-700">
                  <span>Driver: <strong>{circuit.driverName}</strong> ({circuit.vehiclePlate})</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${circuit.driverPhone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warm-cream border border-ink-black font-bold text-xs hover:bg-citrus-yellow"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>CALL DRIVER</span>
                  </a>
                  <button
                    onClick={() => setShowTechnicalDetails(true)}
                    className="px-3 py-1.5 bg-paper-white border border-ink-black font-bold text-xs hover:bg-gray-100"
                  >
                    VIEW GPS ROUTE →
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* PROGRESSIVE DISCLOSURE: LIVE GPS ROUTE MAP & TECHNICAL TELEMETRY */}
        <div className="pt-6 border-t-2 border-ink-black text-center">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase px-4 py-2.5 bg-paper-white border-2 border-ink-black shadow-brutal-sm hover:bg-citrus-yellow transition-colors"
          >
            <span>
              {showTechnicalDetails
                ? 'HIDE LIVE GPS MAP & FLEET TELEMETRY ▲'
                : 'VIEW LIVE GPS MAP & FLEET TELEMETRY TABLE ▼'}
            </span>
          </button>
        </div>

        {showTechnicalDetails && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-200">
            {/* The Interactive Map */}
            <LogisticsMap requireAuth={requireAuth} isAuthenticated={isAuthenticated} />

            {/* Technical Fleet Telemetry Table */}
            <div className="space-y-2 font-mono text-xs">
              <strong className="font-heading font-bold uppercase text-sm block text-ink-black">
                FULL REGIONAL DISPATCH MANIFEST
              </strong>
              
              <div className="overflow-x-auto border-brutal bg-paper-white shadow-brutal scrollbar-thin">
                <table className="w-full text-left font-mono text-xs border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-ink-black text-paper-white border-b-2 border-ink-black">
                      <th className="p-3 uppercase font-heading font-bold">ROUTE ID</th>
                      <th className="p-3 uppercase font-heading font-bold">CORRIDOR</th>
                      <th className="p-3 uppercase font-heading font-bold">LOAD</th>
                      <th className="p-3 uppercase font-heading font-bold">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-ink-black">
                    {PICKUP_CIRCUITS.map((circuit) => (
                      <tr key={circuit.id} className="hover:bg-warm-cream transition-colors">
                        <td className="p-3 font-bold text-farm-green">{circuit.id}</td>
                        <td className="p-3 text-gray-800">{circuit.pickupLocation.split(' ')[0]} → {circuit.destination.split(' ')[0]}</td>
                        <td className="p-3 font-bold">{circuit.crop} ({circuit.quantityKg} KG)</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-900 border border-yellow-800 font-bold text-[10px]">
                            {circuit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
