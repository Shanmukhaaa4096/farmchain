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
  Radio,
  ThermometerSnowflake
} from 'lucide-react';
import { LogisticsMap } from '../components/interactive/LogisticsMap';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
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
    <div className="py-8 sm:py-12 bg-paper-bg min-h-screen text-dark-text">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Editorial Logistics Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-dark-text/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-dark-text/60">
              <span className="px-2.5 py-0.5 rounded-full bg-farm-green text-paper-bg text-[10px] uppercase tracking-wider font-semibold">
                Temperature-Controlled Fleet
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-pure-white text-dark-text border border-dark-text/15 text-[10px] uppercase font-semibold">
                Direct Farm Exemption Verified
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark-text">
              Pickup &amp; Delivery: Village Farm-Gate Dispatch
            </h1>
            <p className="text-xs sm:text-base text-dark-text/70 mt-1 max-w-2xl">
              Scheduled farm-gate vehicle pickups and temperature-controlled direct delivery straight from village hubs to buyer kitchens and depots.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="clay"
              size="md"
              onClick={() => {
                const action = () => {
                  if (onPostAvailability) onPostAvailability();
                };

                if (!isAuthenticated && requireAuth) {
                  requireAuth(
                    'logistics',
                    action,
                    'Logistics carrier sign-in required to register vehicle capacity.'
                  );
                } else {
                  action();
                }
              }}
              className="shadow-soft-terracotta text-xs tracking-wider uppercase font-semibold"
            >
              <Truck className="w-4 h-4 mr-1.5" />
              <span>Register Pickup Vehicle</span>
            </Button>
          </div>
        </div>

        {/* Live Pickup Routes Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-dark-text/60">
            <span>ACTIVE PICKUP &amp; DELIVERY ROUTES</span>
            <span className="text-farm-green font-semibold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse text-terracotta" /> Live GPS &amp; Truck Tracking
            </span>
          </div>

          {PICKUP_CIRCUITS.map((circuit) => {
            const isTransit = circuit.status === 'In Transit';

            return (
              <div
                key={circuit.id}
                className="rounded-3xl border border-dark-text/10 bg-pure-white p-6 shadow-soft-sm hover:border-farm-green/30 hover:shadow-soft-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-text/10">
                  <div>
                    <span className="font-mono text-[10px] text-dark-text/50 font-bold block uppercase tracking-wider">
                      ROUTE {circuit.id}
                    </span>
                    <strong className="font-serif font-bold text-xl text-dark-text">
                      {circuit.crop} • {circuit.quantityKg.toLocaleString()} KG
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {circuit.tempCelsius !== 'Ambient' && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono font-semibold flex items-center gap-1">
                        <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-600" />
                        {circuit.tempCelsius}
                      </span>
                    )}

                    <span className={`px-3 py-1 rounded-full font-mono font-bold text-xs uppercase flex items-center gap-1.5 ${
                      isTransit
                        ? 'bg-terracotta/15 text-terracotta border border-terracotta/25'
                        : 'bg-farm-green/10 text-farm-green border border-farm-green/20'
                    }`}>
                      <Truck className="w-3.5 h-3.5" />
                      {circuit.status}
                    </span>
                  </div>
                </div>

                {/* Circuit Routing Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-dark-text/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-farm-green shrink-0" />
                    <span>Pickup: <strong className="text-dark-text">{circuit.pickupLocation}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-farm-green shrink-0" />
                    <span>Scheduled: <strong className="text-dark-text">{circuit.date}, {circuit.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <Navigation className="w-4 h-4 text-farm-green shrink-0" />
                    <span className="truncate">Destination: <strong className="text-dark-text">{circuit.destination}</strong></span>
                  </div>
                </div>

                {/* Driver Contact & Action */}
                <div className="pt-3 border-t border-dark-text/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-dark-text/70 font-mono">
                    <span>Driver: <strong className="text-dark-text">{circuit.driverName}</strong> ({circuit.vehiclePlate})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${circuit.driverPhone}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-dark-text/15 bg-paper-bg/60 font-semibold text-xs text-dark-text hover:bg-paper-bg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-farm-green" />
                      <span>Call Driver</span>
                    </a>
                    <button
                      onClick={() => setShowTechnicalDetails(true)}
                      className="px-3.5 py-1.5 rounded-full border border-dark-text/15 bg-pure-white font-semibold text-xs text-farm-green hover:bg-paper-bg transition-colors shadow-soft-sm"
                    >
                      View GPS Route →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live GPS Route Map & Manifest Toggle */}
        <div className="pt-6 border-t border-dark-text/10 text-center">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="inline-flex items-center gap-2 font-mono font-semibold text-xs uppercase px-5 py-2.5 rounded-full border border-dark-text/15 bg-pure-white shadow-soft-sm hover:bg-paper-bg transition-colors text-dark-text"
          >
            <span>
              {showTechnicalDetails
                ? 'Hide Live GPS Map & Fleet Manifest ▲'
                : 'View Live GPS Map & Fleet Manifest Table ▼'}
            </span>
          </button>
        </div>

        {showTechnicalDetails && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-200">
            {/* The Interactive Map */}
            <LogisticsMap requireAuth={requireAuth} isAuthenticated={isAuthenticated} />

            {/* Fleet Manifest Table */}
            <div className="space-y-3 font-mono text-xs">
              <strong className="font-serif text-lg font-bold text-dark-text block">
                Full Regional Dispatch Manifest
              </strong>
              
              <div className="overflow-x-auto rounded-2xl border border-dark-text/10 bg-pure-white shadow-soft-sm">
                <table className="w-full text-left font-mono text-xs border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-farm-green text-paper-bg border-b border-dark-text/10">
                      <th className="p-3.5 uppercase font-semibold">ROUTE ID</th>
                      <th className="p-3.5 uppercase font-semibold">CORRIDOR</th>
                      <th className="p-3.5 uppercase font-semibold">LOAD</th>
                      <th className="p-3.5 uppercase font-semibold">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-text/10">
                    {PICKUP_CIRCUITS.map((circuit) => (
                      <tr key={circuit.id} className="hover:bg-paper-bg/50 transition-colors">
                        <td className="p-3.5 font-semibold text-farm-green">{circuit.id}</td>
                        <td className="p-3.5 text-dark-text">{circuit.pickupLocation.split(' ')[0]} → {circuit.destination.split(' ')[0]}</td>
                        <td className="p-3.5 font-bold text-dark-text">{circuit.crop} ({circuit.quantityKg.toLocaleString()} KG)</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-farm-green/10 text-farm-green border border-farm-green/20 font-semibold text-[10px]">
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
