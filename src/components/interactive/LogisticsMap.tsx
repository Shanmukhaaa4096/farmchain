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

export const LogisticsMap: React.FC = () => {
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
        <Card variant="white" shadow="sm" className="p-4 border-brutal">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Navigation className="w-3.5 h-3.5 text-farm-green" /> TOTAL DISTANCE
          </div>
          <div className="font-heading font-black text-2xl text-ink-black">
            {route.totalDistanceKm} <span className="text-xs font-mono font-normal">KM</span>
          </div>
          <div className="text-[10px] text-farm-green font-bold mt-1">Single loop consolidation</div>
        </Card>

        <Card variant="white" shadow="sm" className="p-4 border-brutal">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <MapPin className="w-3.5 h-3.5 text-farm-green" /> PICKUP STOPS
          </div>
          <div className="font-heading font-black text-2xl text-ink-black">
            {route.pickupStopsCount} <span className="text-xs font-mono font-normal">FARMS</span>
          </div>
          <div className="text-[10px] text-gray-600 mt-1">96 Crates loaded</div>
        </Card>

        <Card variant="yellow" shadow="sm" className="p-4 border-brutal">
          <div className="flex items-center gap-2 text-xs text-ink-black mb-1">
            <Gauge className="w-3.5 h-3.5" /> VEHICLE LOAD
          </div>
          <div className="font-heading font-black text-2xl text-ink-black">
            {route.vehicleLoadPercent}%
          </div>
          <div className="text-[10px] text-ink-black font-bold mt-1">
            {route.currentLoadKg} / {route.vehicleCapacityKg} KG
          </div>
        </Card>

        <Card variant="white" shadow="sm" className="p-4 border-brutal">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Clock className="w-3.5 h-3.5 text-farm-green" /> TRANSIT DURATION
          </div>
          <div className="font-heading font-black text-2xl text-ink-black">
            {route.estimatedDuration}
          </div>
          <div className="text-[10px] text-farm-green font-bold mt-1">Direct to kitchen dock</div>
        </Card>

        <Card variant="green" shadow="sm" className="p-4 border-brutal col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-xs text-harvest-yellow mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> ROUTE EFFICIENCY
          </div>
          <div className="font-heading font-black text-2xl text-harvest-yellow">
            +{route.routeEfficiencyGain}%
          </div>
          <div className="text-[10px] text-paper-white mt-1">vs separate mandi trips</div>
        </Card>
      </div>

      {/* Main Interactive Map & Route Controls Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Interactive Map (8 cols) */}
        <div className="lg:col-span-8">
          <Card variant="white" shadow="lg" className="border-brutal-thick overflow-hidden relative">
            
            {/* Map Top Bar */}
            <div className="px-5 py-3.5 bg-ink-black text-paper-white flex items-center justify-between border-b-2 border-ink-black font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-terminal-green animate-ping"></span>
                <span>GPS TELEMETRY // HYDERABAD RURAL CORRIDOR TS-08</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="yellow" 
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
            <div className="relative w-full h-[460px] bg-[#E8E2D5] bg-topo-pattern select-none overflow-hidden">
              
              {/* Agricultural Farmland Patch Polygons in SVG */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Cultivated Field Patches (Farmland Plots) */}
                <polygon points="12,18 28,15 32,38 15,42" fill="#D9D2C3" opacity="0.6" stroke="#4A3525" strokeWidth="0.4" strokeDasharray="1 1" />
                <polygon points="34,12 55,10 52,30 36,28" fill="#C5D3C1" opacity="0.5" stroke="#173B2B" strokeWidth="0.4" />
                <polygon points="30,55 48,50 46,75 26,72" fill="#D2C5B3" opacity="0.6" stroke="#4A3525" strokeWidth="0.4" />
                <polygon points="56,25 78,22 75,48 58,45" fill="#C5D3C1" opacity="0.5" stroke="#173B2B" strokeWidth="0.4" />
                <polygon points="52,60 76,55 78,80 50,78" fill="#D9D2C3" opacity="0.6" stroke="#4A3525" strokeWidth="0.4" />
                <polygon points="80,40 96,38 95,70 82,68" fill="#EADFC9" opacity="0.7" stroke="#111111" strokeWidth="0.4" />

                {/* Field Crop Furrow Lines */}
                <path d="M 14 20 L 30 38" stroke="#4A3525" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />
                <path d="M 17 20 L 31 36" stroke="#4A3525" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />
                <path d="M 58 28 L 74 44" stroke="#173B2B" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />

                {/* Primary Optimized Route Path */}
                <path
                  d="M 18 28 L 38 62 L 62 35 L 88 55"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="3.2"
                />
                <path
                  d="M 18 28 L 38 62 L 62 35 L 88 55"
                  fill="none"
                  stroke="#F4C542"
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

                    <div className={`p-1.5 border-2 border-ink-black shadow-brutal-sm transition-transform group-hover:scale-110 ${
                      isBuyer 
                        ? 'bg-farm-green text-harvest-yellow' 
                        : wp.completed 
                          ? 'bg-harvest-yellow text-ink-black' 
                          : 'bg-paper-white text-ink-black'
                    }`}>
                      {isBuyer ? (
                        <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <span className="font-heading font-black text-xs px-1.5">
                          0{idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Popover Waypoint Tag */}
                    <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] px-2 py-0.5 border border-ink-black shadow-brutal-sm font-bold ${
                      isBuyer ? 'bg-farm-green text-paper-white' : 'bg-paper-white text-ink-black'
                    }`}>
                      {wp.label.split(':')[0]}
                      <span className="ml-1 opacity-75">({wp.quantityKg} KG)</span>
                    </div>
                  </div>
                );
              })}

              {/* Animated Vehicle / Reefer Truck Marker */}
              <div 
                style={{ left: `${truckPos.x}%`, top: `${truckPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ease-in-out pointer-events-none"
              >
                <div className="bg-ink-black text-harvest-yellow border-2 border-harvest-yellow p-2 shadow-brutal flex items-center gap-1">
                  <Truck className="w-5 h-5" />
                  <span className="text-[9px] font-mono font-bold text-terminal-green">LIVE</span>
                </div>
                <div className="bg-harvest-yellow text-ink-black text-[9px] font-mono font-bold px-1.5 border border-ink-black -mt-1 text-center whitespace-nowrap">
                  TATA 407 REEFER
                </div>
              </div>

            </div>

            {/* Bottom Map Details Status Strip */}
            <div className="p-4 bg-warm-cream border-t-2 border-ink-black flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <Thermometer className="w-4 h-4 text-farm-green" />
                <span>REEFER CABIN TEMP: <strong className="text-farm-green">{route.tempCelsius}°C (OPTIMAL FOR TOMATOES)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">DISPATCH VEHICLE:</span>
                <strong className="text-ink-black">{route.vehiclePlate}</strong>
              </div>
            </div>

          </Card>
        </div>

        {/* Waypoint Detail & Driver Manifest (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Selected Waypoint Card */}
          <Card variant="white" shadow="default" className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <span className="font-mono text-xs font-bold uppercase text-gray-600">
                WAYPOINT INSPECTION
              </span>
              <Badge variant={selectedWaypoint.completed ? "green" : "yellow"} size="sm">
                {selectedWaypoint.completed ? "LOADED" : "PENDING"}
              </Badge>
            </div>

            <div>
              <h4 className="font-heading font-black text-lg uppercase text-ink-black">
                {selectedWaypoint.label}
              </h4>
              <p className="font-mono text-xs text-gray-600 mt-0.5">
                {selectedWaypoint.village}
              </p>
            </div>

            <div className="p-3 bg-warm-cream border-2 border-ink-black space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span>CONSIGNMENT:</span>
                <strong>{selectedWaypoint.quantityKg} KG (GRADE A)</strong>
              </div>
              <div className="flex justify-between">
                <span>CRATE ALLOCATION:</span>
                <strong className="text-farm-green">{Math.round(selectedWaypoint.quantityKg / 25)} Crates</strong>
              </div>
              <div className="flex justify-between">
                <span>SCHEDULED ETA:</span>
                <strong>{selectedWaypoint.eta}</strong>
              </div>
              <div className="flex justify-between">
                <span>WEIGHBRIDGE STATUS:</span>
                <span className="text-farm-green font-bold">DIGITALLY VERIFIED ✓</span>
              </div>
            </div>

            <Button
              variant={selectedWaypoint.completed ? "outline" : "primary"}
              fullWidth
              size="sm"
              onClick={() => toggleWaypointStatus(selectedWaypoint.id)}
            >
              {selectedWaypoint.completed ? "MARK AS UNCONFIRMED" : "CONFIRM LOADING CHECKLIST ✓"}
            </Button>
          </Card>

          {/* Driver Manifest Card */}
          <Card variant="cream" shadow="default" className="p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-ink-black font-bold border-b border-ink-black pb-2">
              <Shield className="w-4 h-4 text-farm-green" />
              <span>DRIVER & COMPLIANCE MANIFEST</span>
            </div>

            <div className="space-y-1.5 text-gray-800">
              <p><strong>DRIVER:</strong> {route.driverName}</p>
              <p><strong>CONTACT:</strong> {route.driverPhone}</p>
              <p><strong>E-WAY BILL:</strong> #EWB-2026-9912-TS</p>
              <p><strong>TRANSIT PERMIT:</strong> APMC DIRECT TRACE APPROVED</p>
            </div>

            <div className="pt-2">
              <div className="p-2.5 bg-paper-white border border-ink-black text-[11px] text-gray-700">
                <strong>ZERO DETOUR POLICY:</strong> The vehicle route is geofenced. Deviation beyond 1.5km triggers an automated logistics alert to both farmer and buyer.
              </div>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
};
