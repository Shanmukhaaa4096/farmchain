/**
 * FarmChain Pilot Statistics — Single Source of Truth
 *
 * ALL counters shown anywhere in the UI must come from this file.
 * Do NOT type numbers directly in components, pages or translation strings.
 *
 * These are pilot-scale numbers (sample data). They are clearly labelled in the UI.
 * Rules:
 *   Farmers:         200–900
 *   Buyers:          300–1,500
 *   Villages:        10–60
 *   Districts:       3–8
 *   Crops for sale:  60–400
 *   Orders:          300–2,000
 *   Money formatted: Intl.NumberFormat("en-IN")
 */

export const PILOT_STATS = {
  verifiedFarmers: 380,
  activeBuyers: 620,
  villagesConnected: 42,
  districtsServed: 6,
  cropsListed: 148,
  completedOrders: 724,
  /** ₹18.4 lakh = 1,840,000 */
  directDepositsRupees: 1840000,
  brokerFeePercent: 0,
  pilotLabel: 'Pilot data (sample)',
} as const;

/**
 * Format rupee amount with Indian number system (e.g. ₹18,40,000).
 */
export function formatINR(amount: number, compact = false): string {
  if (compact && amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)}L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Compute a total order value. Always derive from quantity × price to avoid
 * hand-typed totals drifting out of sync.
 */
export function computeTotal(quantityKg: number, pricePerKg: number): number {
  return Math.round(quantityKg * pricePerKg);
}

/**
 * Extra farmer earnings vs mandi, clamped to the allowed 15–25% range.
 */
export function extraEarningsPercent(
  farmchainPrice: number,
  mandiPrice: number,
): number {
  const raw = ((farmchainPrice - mandiPrice) / mandiPrice) * 100;
  return Math.min(Math.max(Math.round(raw), 15), 25);
}
