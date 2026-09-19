import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Thermometer, 
  Gauge, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Radio, 
  Play, 
  RotateCcw, 
  Sprout, 
  Package 
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MOCK_LOGISTICS_ROUTE } from '../../data/mockData';
import { UserRole } from '../../types';

interface LogisticsMapProps {
  requireAuth?: (role: UserRole, action: () => void, promptMessage: string) => void;
  isAuthenticated?: boolean;
}

export const LogisticsMap: React.FC<LogisticsMapProps> = ({
  requireAuth,
  isAuthenticated = false
}) => {
  const [route, setRoute] = useState(MOCK_LOGISTICS_ROUTE);
  const [selectedWaypoint, setSelectedWaypoint] = useState(route.waypoints[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [truckPos, setTruckPos] = useState({ x: 42, y: 55 });

  const toggleWaypointStatus = (id: string) => {
    setRoute(prev => ({
      ...prev,
      waypoints: prev.waypoints.map(wp => 
        wp.id === id ? { ...wp, completed: !wp.completed } : wp
      )
    }));
  };

  const handleToggleWaypoint = (id: string) => {
    if (!isAuthenticated && requireAuth) {
      requireAuth(
        'logistics',
        () => toggleWaypointStatus(id),
        'Logistics carrier authentication required to verify and check off farm collection waypoints.'
      );
    } else {
      toggleWaypointStatus(id);
    }
  };

  const simulateTransit = () => {
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) setTruckPos({ x: 20, y: 30 });
      else if (step === 2) setTruckPos({ x: 38, y: 62 });
      else if (step === 3) setTruckPos({ x: 55, y: 45 });
      else if (step === 4) setTruckPos({ x: 75, y: 50 });
      else if (step >= 5) {
        setTruckPos({ x: 88, y: 55 });
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 800);
  };

  return (
    <div className="space-y-8">
      
      {/* Route Header Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
        <div className="p-5 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft-sm">
          <div className="flex items-center gap-1.5 text-xs text-dark-text/60 mb-1">
            <Navigation className="w-3.5 h-3.5 text-farm-green" /> TOTAL DISTANCE
          </div>
          <div className="font-serif font-bold text-2xl text-dark-text">
            {route.totalDistanceKm} <span className="text-xs font-mono font-normal">KM</span>
          </div>
          <div className="text-[10px] text-farm-green font-bold mt-1">Single loop consolidation</div>
        </div>

        <div className="p-5 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft-sm">
          <div className="flex items-center gap-1.5 text-xs text-dark-text/60 mb-1">
            <MapPin className="w-3.5 h-3.5 text-farm-green" /> PICKUP STOPS
          </div>
          <div className="font-serif font-bold text-2xl text-dark-text">
            {route.pickupStopsCount} <span className="text-xs font-mono font-normal">FARMS</span>
          </div>
          <div className="text-[10px] text-dark-text/60 mt-1">96 Crates loaded</div>
        </div>

        <div className="p-5 bg-harvest-yellow/20 rounded-2xl border border-accent-yellow/30 shadow-soft-sm">
          <div className="flex items-center gap-1.5 text-xs text-dark-text/80 mb-1 font-semibold">
            <Gauge className="w-3.5 h-3.5" /> VEHICLE LOAD
          </div>
          <div className="font-serif font-bold text-2xl text-dark-text">
            {route.vehicleLoadPercent}%
          </div>
          <div className="text-[10px] text-dark-text/70 font-bold mt-1">
            {route.currentLoadKg} / {route.vehicleCapacityKg} KG
          </div>
        </div>

        <div className="p-5 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft-sm">
          <div className="flex items-center gap-1.5 text-xs text-dark-text/60 mb-1">
            <Clock className="w-3.5 h-3.5 text-farm-green" /> TRANSIT DURATION
          </div>
          <div className="font-serif font-bold text-2xl text-dark-text">
            {route.estimatedDuration}
          </div>
          <div className="text-[10px] text-farm-green font-bold mt-1">Direct to kitchen dock</div>
        </div>

        <div className="p-5 bg-farm-green text-pure-white rounded-2xl border border-farm-green/30 shadow-soft-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs text-harvest-yellow mb-1 font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> ROUTE EFFICIENCY
          </div>
          <div className="font-serif font-bold text-2xl text-harvest-yellow">
            +{route.routeEfficiencyGain}%
          </div>
          <div className="text-[10px] text-pure-white/70 mt-1">vs separate mandi trips</div>
        </div>
      </div>

      {/* Main Interactive Map & Route Controls Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Interactive Map (8 cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-dark-text/10 shadow-soft overflow-hidden relative bg-pure-white">
            
            {/* Map Top Bar */}
            <div className="px-6 py-4 bg-dark-text text-pure-white flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-farm-green animate-ping"></span>
                <span>LIVE GPS ROUTE // HYDERABAD RURAL CORRIDOR TS-08</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={simulateTransit}
                  disabled={isSimulating}
                  className="py-1 px-3 text-[11px]"
                >
                  <Play className="w-3 h-3 mr-1" /> {isSimulating ? 'TRACKING LIVE...' : 'SIMULATE ROUTE'}
                </Button>
              </div>
            </div>

            {/* Map Canvas with SVG Farmland Topography & Road Networks */}
            <div className="relative w-full h-[340px] sm:h-[460px] bg-[#EBE5D8] select-none overflow-hidden">
              
              {/* Agricultural Farmland Patch Polygons in SVG */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Cultivated Field Patches (Farmland Plots) */}
                <polygon points="12,18 28,15 32,38 15,42" fill="#DDD6C7" opacity="0.6" stroke="#315C3A" strokeWidth="0.4" strokeDasharray="1 1" />
                <polygon points="34,12 55,10 52,30 36,28" fill="#C5D4C0" opacity="0.5" stroke="#315C3A" strokeWidth="0.4" />
                <polygon points="30,55 48,50 46,75 26,72" fill="#D5CBB9" opacity="0.6" stroke="#315C3A" strokeWidth="0.4" />
                <polygon points="56,25 78,22 75,48 58,45" fill="#C5D4C0" opacity="0.5" stroke="#315C3A" strokeWidth="0.4" />
                <polygon points="52,60 76,55 78,80 50,78" fill="#DDD6C7" opacity="0.6" stroke="#315C3A" strokeWidth="0.4" />
                <polygon points="80,40 96,38 95,70 82,68" fill="#E8DDC6" opacity="0.7" stroke="#17231A" strokeWidth="0.4" />

                {/* Field Crop Furrow Lines */}
                <path d="M 14 20 L 30 38" stroke="#315C3A" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />
                <path d="M 17 20 L 31 36" stroke="#315C3A" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />
                <path d="M 58 28 L 74 44" stroke="#315C3A" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />

                {/* Primary Optimized Route Path */}
                <path
                  d="M 18 28 L 38 62 L 62 35 L 88 55"
                  fill="none"
                  stroke="#17231A"
                  strokeWidth="3.2"
                />
                <path
                  d="M 18 28 L 38 62 L 62 35 L 88 55"
                  fill="none"
                  stroke="#E5B94A"
                  strokeWidth="2"
                  className="animate-route-flow"
                />
              </svg>

              {/* Waypoint Markers */}
              {route.waypoints.map((wp, idx) => {
                const isSelected = selectedWaypoint.id === wp.id;
                const isBuyer = wp.type === 'buyer_delivery';
                
                return (
                  <div
                    key={wp.id}
                    onClick={() => setSelectedWaypoint(wp)}
                    style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <div className="absolute -inset-2.5 bg-harvest-yellow/50 rounded-full animate-ping pointer-events-none"></div>
                    )}

                    <div className={`p-2 rounded-full border border-dark-text/20 shadow-soft-sm transition-transform group-hover:scale-110 ${
                      isBuyer 
                        ? 'bg-farm-green text-pure-white' 
                        : wp.completed 
                          ? 'bg-harvest-yellow text-dark-text font-bold' 
                          : 'bg-pure-white text-dark-text font-semibold'
                    }`}>
                      {isBuyer ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="font-mono text-xs px-1">
                          0{idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Popover Waypoint Tag */}
                    <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] px-2.5 py-1 rounded-full border border-dark-text/10 shadow-soft-sm font-semibold ${
                      isBuyer ? 'bg-farm-green text-pure-white' : 'bg-pure-white text-dark-text'
                    }`}>
                      {wp.label.split(':')[0]}
                      <span className="ml-1 opacity-70">({wp.quantityKg} KG)</span>
                    </div>
                  </div>
                );
              })}

              {/* Animated Vehicle / Reefer Truck Marker */}
              <div 
                style={{ left: `${truckPos.x}%`, top: `${truckPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ease-in-out pointer-events-none"
              >
                <div className="bg-dark-text text-harvest-yellow border border-harvest-yellow/50 rounded-xl p-2 shadow-soft flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span className="text-[9px] font-mono font-bold text-farm-green">LIVE</span>
                </div>
                <div className="bg-harvest-yellow text-dark-text text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-dark-text/20 -mt-1 text-center whitespace-nowrap shadow-soft-sm">
                  TATA 407 REEFER
                </div>
              </div>

            </div>

            {/* Bottom Map Details Status Strip */}
            <div className="p-4 bg-paper-bg border-t border-dark-text/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <Thermometer className="w-4 h-4 text-farm-green" />
                <span>REEFER CABIN TEMP: <strong className="text-farm-green">{route.tempCelsius}°C (OPTIMAL FOR TOMATOES)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-dark-text/60">DISPATCH VEHICLE:</span>
                <strong className="text-dark-text">{route.vehiclePlate}</strong>
              </div>
            </div>

          </div>
        </div>

        {/* Waypoint Detail & Driver Manifest (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Selected Waypoint Card */}
          <div className="p-6 bg-pure-white rounded-3xl border border-dark-text/10 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dark-text/10">
              <span className="font-mono text-xs font-semibold uppercase text-dark-text/60">
                WAYPOINT INSPECTION
              </span>
              <Badge variant={selectedWaypoint.completed ? "green" : "yellow"} size="sm">
                {selectedWaypoint.completed ? "LOADED" : "PENDING"}
              </Badge>
            </div>

            <div>
              <h4 className="font-serif font-bold text-xl text-dark-text">
                {selectedWaypoint.label}
              </h4>
              <p className="font-mono text-xs text-dark-text/60 mt-0.5">
                {selectedWaypoint.village}
              </p>
            </div>

            <div className="p-4 bg-paper-bg rounded-2xl border border-dark-text/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-dark-text/70">CONSIGNMENT:</span>
                <strong className="text-dark-text">{selectedWaypoint.quantityKg} KG (GRADE A)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-text/70">CRATE ALLOCATION:</span>
                <strong className="text-farm-green">{Math.round(selectedWaypoint.quantityKg / 25)} Crates</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-text/70">SCHEDULED ETA:</span>
                <strong className="text-dark-text">{selectedWaypoint.eta}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-text/70">WEIGHBRIDGE STATUS:</span>
                <span className="text-farm-green font-bold">DIGITALLY VERIFIED ✓</span>
              </div>
            </div>

            <Button
              variant={selectedWaypoint.completed ? "outline" : "primary"}
              fullWidth
              size="sm"
              onClick={() => handleToggleWaypoint(selectedWaypoint.id)}
            >
              {selectedWaypoint.completed ? "MARK AS UNCONFIRMED" : "CONFIRM LOADING CHECKLIST ✓"}
            </Button>
          </div>

          {/* Driver Manifest Card */}
          <div className="p-6 bg-paper-bg rounded-3xl border border-dark-text/10 shadow-soft space-y-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-dark-text font-bold border-b border-dark-text/10 pb-3">
              <Shield className="w-4 h-4 text-farm-green" />
              <span className="font-serif text-base">Driver & Compliance Manifest</span>
            </div>

            <div className="space-y-2 text-dark-text/80 font-sans">
              <p><strong className="font-mono text-dark-text">DRIVER:</strong> {route.driverName}</p>
              <p><strong className="font-mono text-dark-text">CONTACT:</strong> {route.driverPhone}</p>
              <p><strong className="font-mono text-dark-text">E-WAY BILL:</strong> #EWB-2026-9912-TS</p>
              <p><strong className="font-mono text-dark-text">TRANSIT PERMIT:</strong> DIRECT FARM EXEMPTION APPROVED</p>
            </div>

            <div className="pt-2">
              <div className="p-3.5 bg-pure-white rounded-xl border border-dark-text/10 text-[11px] text-dark-text/70 font-sans leading-relaxed">
                <strong className="text-dark-text">ZERO DETOUR POLICY:</strong> The vehicle route is geofenced. Deviation beyond 1.5km triggers an automated logistics alert to both farmer and buyer.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Badge variant="green" size="sm" dot>DIRECT TRANSIT ACTIVE</Badge>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
