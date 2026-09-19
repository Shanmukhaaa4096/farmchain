/**
 * FarmChain Sample Data for Smart India Hackathon Prototype.
 * All listings, price benchmarks, impact metrics, and farmer stories below
 * are explicitly designated as SAMPLE DATA for demonstration purposes.
 */

export interface SampleListing {
  id: string;
  crop: string;
  variety: string;
  category: 'vegetables' | 'grains' | 'fruits' | 'pulses' | 'spices';
  farmerName: string;
  village: string;
  district: string;
  state: string;
  quantity: string;
  quantityKg: number;
  pricePerKg: number;
  mandiPricePerKg: number;
  mspPricePerKg?: number;
  harvestDate: string;
  photoUrl: string;
  verified: boolean;
  grade: string;
  moisturePercent: number;
}

export const SAMPLE_LISTINGS: SampleListing[] = [
  {
    id: 'lot-101',
    crop: 'Tomato',
    variety: 'Desi Hybrid (Shivam)',
    category: 'vegetables',
    farmerName: 'Ramesh Reddy',
    village: 'Chevella',
    district: 'Ranga Reddy',
    state: 'Telangana',
    quantity: '4,500 KG',
    quantityKg: 4500,
    pricePerKg: 32,
    mandiPricePerKg: 22,
    harvestDate: 'Tomorrow Morning',
    photoUrl: '/farmer_hands_produce.jpg',
    verified: true,
    grade: 'Grade A Firm',
    moisturePercent: 18,
  },
  {
    id: 'lot-102',
    crop: 'Onion',
    variety: 'Nashik Red Semi-Pungent',
    category: 'vegetables',
    farmerName: 'Balaji Kulkarni',
    village: 'Lasalgaon Outskirts',
    district: 'Nashik',
    state: 'Maharashtra',
    quantity: '6,200 KG',
    quantityKg: 6200,
    pricePerKg: 28,
    mandiPricePerKg: 19,
    harvestDate: 'In 2 Days',
    photoUrl: '/wholesale_produce_dock.jpg',
    verified: true,
    grade: 'Medium Pink (45mm+)',
    moisturePercent: 13,
  },
  {
    id: 'lot-103',
    crop: 'Green Chilli',
    variety: 'G4 Hot Export Quality',
    category: 'vegetables',
    farmerName: 'Suresh Gowda',
    village: 'Mandya Rural',
    district: 'Mandya',
    state: 'Karnataka',
    quantity: '1,800 KG',
    quantityKg: 1800,
    pricePerKg: 54,
    mandiPricePerKg: 38,
    harvestDate: 'Ready for Pickup',
    photoUrl: '/farmer_harvest_crate.jpg',
    verified: true,
    grade: 'Grade 1 Deep Green',
    moisturePercent: 12,
  },
  {
    id: 'lot-104',
    crop: 'Wheat',
    variety: 'Sharbati Gold Premium',
    category: 'grains',
    farmerName: 'Vikram Singh',
    village: 'Hoshangabad Mandi Belt',
    district: 'Narmadapuram',
    state: 'Madhya Pradesh',
    quantity: '12,000 KG',
    quantityKg: 12000,
    pricePerKg: 31,
    mandiPricePerKg: 24.5,
    mspPricePerKg: 22.75,
    harvestDate: 'Bags Stacked at Hub',
    photoUrl: '/hero_tractor_farmland.jpg',
    verified: true,
    grade: 'Lustrous Bold Kernel',
    moisturePercent: 10.5,
  },
  {
    id: 'lot-105',
    crop: 'Potato',
    variety: 'Kufri Jyoti Soil-Free',
    category: 'vegetables',
    farmerName: 'Harjit Sandhu',
    village: 'Samrala',
    district: 'Ludhiana',
    state: 'Punjab',
    quantity: '8,000 KG',
    quantityKg: 8000,
    pricePerKg: 23,
    mandiPricePerKg: 16,
    harvestDate: 'Ready for Dispatch',
    photoUrl: '/wholesale_produce_dock.jpg',
    verified: true,
    grade: 'Table Grade (55mm+)',
    moisturePercent: 16,
  },
  {
    id: 'lot-106',
    crop: 'Turmeric',
    variety: 'Salem High Curcumin (4.8%)',
    category: 'spices',
    farmerName: 'Muthusamy K.',
    village: 'Erode Valley',
    district: 'Erode',
    state: 'Tamil Nadu',
    quantity: '2,500 KG',
    quantityKg: 2500,
    pricePerKg: 142,
    mandiPricePerKg: 110,
    harvestDate: 'Cured & Polished Finger',
    photoUrl: '/farmer_hands_produce.jpg',
    verified: true,
    grade: 'Double Polished Bulbs',
    moisturePercent: 9.2,
  }
];

export interface ImpactCounterItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext: string;
}

export const SAMPLE_IMPACT_COUNTERS: ImpactCounterItem[] = [
  {
    value: 4820,
    suffix: '+',
    label: 'Verified Farmers Onboarded',
    subtext: 'Individual smallholders & 38 registered FPO cooperatives',
  },
  {
    value: 14600,
    suffix: ' MT',
    label: 'Produce Directly Contracted',
    subtext: 'Committed in advance with zero speculative distress selling',
  },
  {
    value: 24,
    prefix: '+',
    suffix: '%',
    label: 'Average Extra Farmer Earnings',
    subtext: 'Over local APMC yard take-home after eliminating 0% broker fee',
  },
  {
    value: 184,
    suffix: ' Villages',
    label: 'Direct Pickup Coverage',
    subtext: 'Scheduled cold-chain milk runs across 6 agricultural states',
  }
];

export interface CategoryTileItem {
  id: string;
  name: string;
  hindi: string;
  telugu: string;
  itemCount: string;
  avgGain: string;
  photoUrl: string;
}

export const SAMPLE_CATEGORIES: CategoryTileItem[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    hindi: 'सब्जियां',
    telugu: 'కూరగాయలు',
    itemCount: '48 Active Lots',
    avgGain: '+26% vs Mandi',
    photoUrl: '/farmer_hands_produce.jpg',
  },
  {
    id: 'grains',
    name: 'Grains & Cereals',
    hindi: 'अनाज',
    telugu: 'ధాన్యాలు',
    itemCount: '34 Active Lots',
    avgGain: '+19% vs Mandi',
    photoUrl: '/hero_tractor_farmland.jpg',
  },
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    hindi: 'फल',
    telugu: 'పండ్లు',
    itemCount: '22 Active Lots',
    avgGain: '+31% vs Mandi',
    photoUrl: '/farmer_harvest_crate.jpg',
  },
  {
    id: 'pulses',
    name: 'Pulses & Lentils',
    hindi: 'दालें',
    telugu: 'పప్పులు',
    itemCount: '19 Active Lots',
    avgGain: '+22% vs Mandi',
    photoUrl: '/wholesale_produce_dock.jpg',
  },
  {
    id: 'spices',
    name: 'Spices & Condiments',
    hindi: 'मसाले',
    telugu: 'మసాలాలు',
    itemCount: '15 Active Lots',
    avgGain: '+28% vs Mandi',
    photoUrl: '/farmer_hands_produce.jpg',
  }
];

export interface FarmerStoryItem {
  id: string;
  name: string;
  village: string;
  district: string;
  crop: string;
  quote: string;
  earningsGain: string;
  photoUrl: string;
}

export const SAMPLE_FARMER_STORIES: FarmerStoryItem[] = [
  {
    id: 'story-1',
    name: 'G. Yadaiah',
    village: 'Shankarpally',
    district: 'Ranga Reddy, Telangana',
    crop: 'Shimla Mirch (Capsicum)',
    quote: 'Earlier, we spent ₹2,800 on tempo freight to Bowenpally auction, waited till 4 AM, and the dalal took 8% commission plus ₹40 per crate hamali. With FarmChain, the refrigerated truck collected 85 crates right from our village gate at ₹34/kg locked in advance. Full money reached my SBI account by evening.',
    earningsGain: '+₹38,400 Extra Take-Home per Acre',
    photoUrl: '/farmer_hands_produce.jpg',
  },
  {
    id: 'story-2',
    name: 'Sunita Patil',
    village: 'Niphad',
    district: 'Nashik, Maharashtra',
    crop: 'Red Onion (Garva)',
    quote: 'Wholesale buyers in Mumbai and Pune placed purchase orders two weeks before our harvest. We did not have to dump onions on the road during harvest glut. We weighed on calibrated digital scales, checked quality tags, and received verified escrow payments.',
    earningsGain: '+28% Net Realization vs Local Mandi',
    photoUrl: '/farmer_harvest_crate.jpg',
  },
  {
    id: 'story-3',
    name: 'Kuldeep Maan',
    village: 'Shahbad',
    district: 'Kurukshetra, Haryana',
    crop: 'Basmati Paddy (PB 1121)',
    quote: 'Commercial food processors need verified moisture under 12% and zero chalkiness. FarmChain gave us direct specs. Because we met the grade, we received ₹4,100 per quintal directly with no middlemen deductions.',
    earningsGain: '₹1.15 Lakhs Saved in Middlemen Cuts',
    photoUrl: '/hero_tractor_farmland.jpg',
  }
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SAMPLE_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How is FarmChain completely 0% commission for farmers?',
    answer: 'Traditional APMC mandis deduct 6% to 10% in commission fees (arthiya/dalal cuts), market cess, and hamali labor fees directly from the farmer’s payout. FarmChain operates as a direct procurement infrastructure platform funded by institutional wholesale buyers through streamlined logistics and enterprise demand software. Farmers receive 100% of their agreed farm-gate harvest price with zero deduction.'
  },
  {
    id: 'faq-2',
    question: 'How does village pickup work for smallholder farmers?',
    answer: 'You do not need to hire expensive individual transport. When multiple farmers in a cluster or village pledge harvest lots for the same dispatch window, FarmChain schedules a refrigerated milk-run vehicle to collect directly from your village aggregation point or gate at a scheduled hour.'
  },
  {
    id: 'faq-3',
    question: 'How does the simulated Escrow payment guarantee protect both parties?',
    answer: 'When a wholesale buyer accepts an offer or posts a purchase contract, 100% of the funds are deposited into a secure escrow account. The farmer knows the money is locked before packing produce. Once the truck arrives, digital scales verify weight and refractometers verify moisture, triggering an automatic direct bank transfer to the farmer within 2 hours.'
  },
  {
    id: 'faq-4',
    question: 'What happens if the produce does not match the agreed quality grade?',
    answer: 'Every listing specifies transparent Grade parameters (e.g. 50mm+ diameter, Grade A soil-free, moisture below 15%). Calibration is done transparently at pickup with digital tools. If a discrepancy arises, counter-offers or fair grade-adjusted pricing can be settled instantly in-app without distress dumping.'
  },
  {
    id: 'faq-5',
    question: 'How do I get the Verified Farmer or Verified Buyer badge?',
    answer: 'Farmers upload an Aadhaar card, Kisan Credit Card (KCC), or village Patta land record passbook. Buyers upload their business registration or GST certificate. Our admin desk verifies records within 24 hours to ensure a 100% trusted trading environment with zero anonymous brokers.'
  }
];
