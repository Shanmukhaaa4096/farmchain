import { 
  Farmer, 
  Buyer, 
  DemandRequirement, 
  FarmerMatch, 
  LogisticsRoute, 
  MarketPricePoint, 
  ForecastDataPoint 
} from '../types';

export const INITIAL_DEMANDS: DemandRequirement[] = [
  {
    id: 'DEM-2026-081',
    buyerId: 'BUY-101',
    buyerName: 'UrbanFork Kitchens & Fine Dining',
    buyerType: 'Restaurant Chain (18 Outlets)',
    crop: 'Tomatoes',
    quantityKg: 2400,
    qualityGrade: 'Grade A',
    deliveryLocation: 'Hyderabad, Telangana (Gachibowli Hub)',
    requiredDate: '25 Sep 2026',
    status: 'PARTIALLY_MATCHED',
    targetPricePerKg: 24,
    matchedFarmersCount: 3,
    matchedQuantityKg: 2400,
    urgency: 'HIGH',
    specifications: {
      moisturePercent: 11,
      sizeMm: '55-65mm round red',
      shelfLifeDays: 8,
      packagingType: '25kg ventilated plastic crates',
    },
    notes: 'Firm skin required for slicing and culinary reduction. No soft rot.'
  },
  {
    id: 'DEM-2026-082',
    buyerId: 'BUY-102',
    buyerName: 'FreshSprout Retail Supermarkets',
    buyerType: 'Retail Supermarket (34 Stores)',
    crop: 'Onions',
    quantityKg: 5000,
    qualityGrade: 'Grade A',
    deliveryLocation: 'Nashik / Mumbai Central Hub',
    requiredDate: '27 Sep 2026',
    status: 'OPEN',
    targetPricePerKg: 28,
    matchedFarmersCount: 4,
    matchedQuantityKg: 3200,
    urgency: 'HIGH',
    specifications: {
      moisturePercent: 8,
      sizeMm: '45-55mm medium pink',
      shelfLifeDays: 25,
      packagingType: '50kg mesh jute sacks',
    },
    notes: 'Well-cured red skin with minimal moisture. Certified pesticide compliance.'
  },
  {
    id: 'DEM-2026-083',
    buyerId: 'BUY-103',
    buyerName: 'Deccan Agro Foods & Processing',
    buyerType: 'Food Processing Corp',
    crop: 'Potatoes',
    quantityKg: 8500,
    qualityGrade: 'Processing Grade',
    deliveryLocation: 'Pune Industrial Area, Maharashtra',
    requiredDate: '29 Sep 2026',
    status: 'OPEN',
    targetPricePerKg: 19,
    matchedFarmersCount: 4,
    matchedQuantityKg: 5800,
    urgency: 'NORMAL',
    specifications: {
      moisturePercent: 14,
      sizeMm: '60mm+ oval tubers',
      shelfLifeDays: 45,
      packagingType: 'Bulk pallet bins',
    },
    notes: 'High dry-matter content (>20%) suitable for chips & starch processing.'
  },
  {
    id: 'DEM-2026-084',
    buyerId: 'BUY-104',
    buyerName: 'Spiceland Wholesale Traders',
    buyerType: 'Wholesale Trader',
    crop: 'Green Chilli',
    quantityKg: 1800,
    qualityGrade: 'Grade A',
    deliveryLocation: 'Bangalore APMC Gate 4, Karnataka',
    requiredDate: '26 Sep 2026',
    status: 'OPEN',
    targetPricePerKg: 48,
    matchedFarmersCount: 2,
    matchedQuantityKg: 1200,
    urgency: 'HIGH',
    specifications: {
      sizeMm: '8-10cm G4 slender',
      shelfLifeDays: 6,
      packagingType: '10kg breathable cartons',
    },
    notes: 'Crisp green pod, dark emerald sheen, minimum heat unit 35k SHU.'
  },
  {
    id: 'DEM-2026-085',
    buyerId: 'BUY-105',
    buyerName: 'Northern Grain Merchants',
    buyerType: 'Wholesale Trader',
    crop: 'Basmati Rice',
    quantityKg: 15000,
    qualityGrade: 'Export Quality',
    deliveryLocation: 'Delhi NCR Terminal, Haryana',
    requiredDate: '05 Oct 2026',
    status: 'PARTIALLY_MATCHED',
    targetPricePerKg: 82,
    matchedFarmersCount: 5,
    matchedQuantityKg: 11000,
    urgency: 'NORMAL',
    specifications: {
      moisturePercent: 11.5,
      sizeMm: '8.4mm grain length',
      shelfLifeDays: 365,
      packagingType: '25kg laminated poly-woven bags',
    },
    notes: '1121 Steam Basmati aged 12 months minimum. Zero chalky kernels.'
  },
  {
    id: 'DEM-2026-086',
    buyerId: 'BUY-106',
    buyerName: 'Grand Hyatt & Oberoi Procurement',
    buyerType: 'Hospitality/Hotel',
    crop: 'Bell Peppers',
    quantityKg: 950,
    qualityGrade: 'Grade A',
    deliveryLocation: 'Hyderabad Hitec City',
    requiredDate: '24 Sep 2026',
    status: 'OPEN',
    targetPricePerKg: 58,
    matchedFarmersCount: 1,
    matchedQuantityKg: 400,
    urgency: 'MEDIUM',
    specifications: {
      sizeMm: '3-4 lobed blocky 200g+',
      shelfLifeDays: 7,
      packagingType: '5kg cushioned cartons',
    },
    notes: 'Polyhouse grown, shiny thick walls, yellow and red assortment.'
  }
];

export const MOCK_FARMERS: Farmer[] = [
  {
    id: 'FARM-A',
    name: 'Ramesh Reddy (Sri Lakshmi Farm)',
    village: 'Chevella',
    district: 'Ranga Reddy',
    state: 'Telangana',
    fpoAffiliation: 'Chevella Farmers Producer Co-op',
    crops: ['Tomatoes', 'Bell Peppers', 'Green Chilli'],
    availableQuantity: 800,
    verificationStatus: 'verified',
    kisanId: 'TS-RR-902184',
    rating: 4.9,
    distanceKm: 28.4,
    landAcreage: 4.5
  },
  {
    id: 'FARM-B',
    name: 'Kavitha Patel (Annapurna Agro)',
    village: 'Shankarpally',
    district: 'Ranga Reddy',
    state: 'Telangana',
    fpoAffiliation: 'Deccan Green Growers FPO',
    crops: ['Tomatoes', 'Potatoes', 'Onions'],
    availableQuantity: 600,
    verificationStatus: 'fpo_certified',
    kisanId: 'TS-RR-884012',
    rating: 4.8,
    distanceKm: 34.1,
    landAcreage: 3.2
  },
  {
    id: 'FARM-C',
    name: 'Babu Rao Mandava (Mandava Orchards)',
    village: 'Moinabad',
    district: 'Ranga Reddy',
    state: 'Telangana',
    fpoAffiliation: 'Moinabad Horticultural Group',
    crops: ['Tomatoes', 'Green Chilli', 'Papaya'],
    availableQuantity: 1000,
    verificationStatus: 'verified',
    kisanId: 'TS-RR-619420',
    rating: 4.95,
    distanceKm: 22.8,
    landAcreage: 6.0
  },
  {
    id: 'FARM-D',
    name: 'Subhash Deshmukh',
    village: 'Pimpalgaon',
    district: 'Nashik',
    state: 'Maharashtra',
    fpoAffiliation: 'Sahyadri Farmers Producer Co.',
    crops: ['Onions', 'Grapes', 'Tomatoes'],
    availableQuantity: 3200,
    verificationStatus: 'verified',
    kisanId: 'MH-NS-110482',
    rating: 4.9,
    distanceKm: 18.2,
    landAcreage: 8.5
  }
];

export const MOCK_MATCHES_FOR_TOMATO: FarmerMatch[] = [
  {
    farmerId: 'FARM-A',
    farmerName: 'Ramesh Reddy (Chevella)',
    village: 'Chevella (28.4 KM)',
    pledgedQuantityKg: 800,
    distanceKm: 28.4,
    status: 'CONFIRMED',
    ratePerKg: 23.5
  },
  {
    farmerId: 'FARM-B',
    farmerName: 'Kavitha Patel (Shankarpally)',
    village: 'Shankarpally (34.1 KM)',
    pledgedQuantityKg: 600,
    distanceKm: 34.1,
    status: 'CONFIRMED',
    ratePerKg: 23.0
  },
  {
    farmerId: 'FARM-C',
    farmerName: 'Babu Rao (Moinabad)',
    village: 'Moinabad (22.8 KM)',
    pledgedQuantityKg: 1000,
    distanceKm: 22.8,
    status: 'CONFIRMED',
    ratePerKg: 24.0
  }
];

export const MOCK_LOGISTICS_ROUTE: LogisticsRoute = {
  id: 'ROUT-2026-901',
  orderId: 'ORD-TOMATO-HYD',
  crop: 'Tomatoes (Grade A)',
  totalDistanceKm: 42.8,
  pickupStopsCount: 3,
  vehicleCapacityKg: 2600,
  currentLoadKg: 2400,
  vehicleLoadPercent: 91,
  estimatedDuration: '1h 24m',
  routeEfficiencyGain: 27,
  vehiclePlate: 'TS-08-UB-4420 (Tata 407 Reefer)',
  driverName: 'Suresh Kumar (Verified Logistics Partner)',
  driverPhone: '+91 98492 01842',
  status: 'IN_TRANSIT',
  tempCelsius: 13.8,
  waypoints: [
    {
      id: 'WP-1',
      label: 'FARM A : Ramesh Reddy',
      type: 'farm_pickup',
      x: 18,
      y: 28,
      village: 'Chevella Village',
      quantityKg: 800,
      completed: true,
      eta: '07:15 AM (Loaded)'
    },
    {
      id: 'WP-2',
      label: 'FARM B : Kavitha Patel',
      type: 'farm_pickup',
      x: 38,
      y: 62,
      village: 'Shankarpally Way',
      quantityKg: 600,
      completed: true,
      eta: '07:55 AM (Loaded)'
    },
    {
      id: 'WP-3',
      label: 'FARM C : Babu Rao',
      type: 'farm_pickup',
      x: 62,
      y: 35,
      village: 'Moinabad Highway',
      quantityKg: 1000,
      completed: true,
      eta: '08:30 AM (Loaded)'
    },
    {
      id: 'WP-4',
      label: 'BUYER : UrbanFork Central Hub',
      type: 'buyer_delivery',
      x: 88,
      y: 55,
      village: 'Gachibowli Terminal',
      quantityKg: 2400,
      completed: false,
      eta: '09:20 AM (In Transit)'
    }
  ]
};

export const MOCK_MARKET_PRICES: MarketPricePoint[] = [
  {
    id: 'PRC-1',
    crop: 'Tomatoes',
    mandi: 'Bowenpally APMC',
    state: 'Telangana (Hyderabad)',
    indicativeMin: 20,
    indicativeMax: 25,
    indicativeModal: 22.5,
    sevenDayTrendPercent: 12.4,
    demandStatus: 'HIGH',
    updatedAt: 'Today, 06:30 AM'
  },
  {
    id: 'PRC-2',
    crop: 'Onions',
    mandi: 'Lasalgaon Mandi',
    state: 'Maharashtra (Nashik)',
    indicativeMin: 24,
    indicativeMax: 30,
    indicativeModal: 27.0,
    sevenDayTrendPercent: 8.6,
    demandStatus: 'SURGING',
    updatedAt: 'Today, 07:15 AM'
  },
  {
    id: 'PRC-3',
    crop: 'Potatoes (Jyoti)',
    mandi: 'Pune APMC',
    state: 'Maharashtra',
    indicativeMin: 16,
    indicativeMax: 21,
    indicativeModal: 18.5,
    sevenDayTrendPercent: -2.1,
    demandStatus: 'STABLE',
    updatedAt: 'Today, 06:45 AM'
  },
  {
    id: 'PRC-4',
    crop: 'Green Chilli (G4)',
    mandi: 'Yeshwanthpur APMC',
    state: 'Karnataka (Bangalore)',
    indicativeMin: 42,
    indicativeMax: 52,
    indicativeModal: 47.0,
    sevenDayTrendPercent: 15.2,
    demandStatus: 'SURGING',
    updatedAt: 'Today, 08:00 AM'
  },
  {
    id: 'PRC-5',
    crop: 'Basmati Rice (1121)',
    mandi: 'Karnal Grain Market',
    state: 'Haryana',
    indicativeMin: 78,
    indicativeMax: 88,
    indicativeModal: 83.0,
    sevenDayTrendPercent: 3.5,
    demandStatus: 'HIGH',
    updatedAt: 'Yesterday, 05:00 PM'
  },
  {
    id: 'PRC-6',
    crop: 'Bell Peppers (Capsicum)',
    mandi: 'Gaddi Annaram Fruit Market',
    state: 'Telangana',
    indicativeMin: 50,
    indicativeMax: 65,
    indicativeModal: 56.0,
    sevenDayTrendPercent: 9.8,
    demandStatus: 'HIGH',
    updatedAt: 'Today, 07:30 AM'
  }
];

export const MOCK_FORECAST_DATA: ForecastDataPoint[] = [
  { day: 'Mon', date: '21 Sep', historicalDemandKg: 1950, predictedDemandKg: 2050, confidencePercent: 88, lowerBandKg: 1850, upperBandKg: 2200 },
  { day: 'Tue', date: '22 Sep', historicalDemandKg: 2100, predictedDemandKg: 2200, confidencePercent: 86, lowerBandKg: 2000, upperBandKg: 2400 },
  { day: 'Wed', date: '23 Sep', historicalDemandKg: 2450, predictedDemandKg: 2500, confidencePercent: 85, lowerBandKg: 2250, upperBandKg: 2750 },
  { day: 'Thu', date: '24 Sep', historicalDemandKg: undefined, predictedDemandKg: 2850, confidencePercent: 84, lowerBandKg: 2550, upperBandKg: 3100 },
  { day: 'Fri', date: '25 Sep', historicalDemandKg: undefined, predictedDemandKg: 3200, confidencePercent: 82, lowerBandKg: 2900, upperBandKg: 3500 },
  { day: 'Sat', date: '26 Sep', historicalDemandKg: undefined, predictedDemandKg: 3450, confidencePercent: 80, lowerBandKg: 3100, upperBandKg: 3800 },
  { day: 'Sun', date: '27 Sep', historicalDemandKg: undefined, predictedDemandKg: 3100, confidencePercent: 78, lowerBandKg: 2750, upperBandKg: 3450 },
];
