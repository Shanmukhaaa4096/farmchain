export type UserRole = 'farmer' | 'buyer' | 'logistics' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface AuthUser {
  id: string;
  username: string;
  mobileNumber: string;
  email?: string;
  role: UserRole;
  name: string;
  identifier: string; // e.g., KISAN: TS-RR-902184, GSTIN: 36AAACU9120K, FLEET: TS-08-NP-2026, ADMIN: FC-SEC-01
  organization?: string;
  location?: string;
  verificationStatus?: VerificationStatus;
  verificationDocUrl?: string;
  createdAt: string;
}

export interface Farmer {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  fpoAffiliation?: string;
  crops: string[];
  availableQuantity: number; // in KG
  verificationStatus: 'verified' | 'pending' | 'fpo_certified';
  kisanId: string;
  rating: number;
  distanceKm: number;
  landAcreage: number;
}

export interface Buyer {
  id: string;
  businessName: string;
  businessType: 'Restaurant Chain' | 'Wholesale Trader' | 'Food Processing Corp' | 'Retail Supermarket' | 'Hospitality/Hotel';
  location: string;
  state: string;
  gstin: string;
  verificationStatus: 'verified' | 'enterprise_gold';
  rating: number;
  totalOrdersFulfilled: number;
}

export interface DemandRequirement {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: string;
  crop: string;
  quantityKg: number;
  qualityGrade: 'Grade A' | 'Grade B' | 'Export Quality' | 'Processing Grade';
  deliveryLocation: string;
  requiredDate: string;
  status: 'OPEN' | 'PARTIALLY_MATCHED' | 'FULFILLED' | 'IN_TRANSIT';
  targetPricePerKg: number;
  matchedFarmersCount: number;
  matchedQuantityKg: number;
  urgency: 'HIGH' | 'MEDIUM' | 'NORMAL';
  specifications: {
    moisturePercent?: number;
    sizeMm?: string;
    shelfLifeDays?: number;
    packagingType?: string;
  };
  notes?: string;
}

export interface FarmerMatch {
  farmerId: string;
  farmerName: string;
  village: string;
  pledgedQuantityKg: number;
  distanceKm: number;
  status: 'CONFIRMED' | 'PENDING_BUYER_ACK' | 'PICKUP_SCHEDULED';
  ratePerKg: number;
}

export interface LogisticsRoute {
  id: string;
  orderId: string;
  crop: string;
  totalDistanceKm: number;
  pickupStopsCount: number;
  vehicleCapacityKg: number;
  currentLoadKg: number;
  vehicleLoadPercent: number;
  estimatedDuration: string;
  routeEfficiencyGain: number; // e.g. +27%
  vehiclePlate: string;
  driverName: string;
  driverPhone: string;
  status: 'PLANNED' | 'DISPATCHED' | 'IN_TRANSIT' | 'COMPLETED';
  tempCelsius?: number;
  waypoints: {
    id: string;
    label: string;
    type: 'farm_pickup' | 'consolidation_hub' | 'buyer_delivery';
    x: number; // 0-100% SVG coordinates
    y: number; // 0-100% SVG coordinates
    village: string;
    quantityKg: number;
    completed: boolean;
    eta: string;
  }[];
}

export interface MarketPricePoint {
  id: string;
  crop: string;
  mandi: string;
  state: string;
  indicativeMin: number;
  indicativeMax: number;
  indicativeModal: number;
  sevenDayTrendPercent: number; // e.g. +12%
  demandStatus: 'SURGING' | 'HIGH' | 'STABLE' | 'MODERATE';
  updatedAt: string;
}

export interface ForecastDataPoint {
  day: string;
  date: string;
  historicalDemandKg?: number;
  predictedDemandKg: number;
  confidencePercent: number;
  lowerBandKg: number;
  upperBandKg: number;
}
