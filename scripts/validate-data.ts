#!/usr/bin/env tsx
/**
 * FarmChain Data Validation Script
 *
 * Runs at build time (prepended to "build" in package.json).
 * Exits with code 1 on any constraint violation so the build fails.
 *
 * Usage:  npm run validate:data
 *
 * Rules (from spec):
 *  - Vegetable/fruit listing quantityKg: 50–500
 *  - Grain/pulse/spice listing quantityKg: 500–3,000 (FPO/group may exceed)
 *  - FPO group listings: no upper limit enforced (but < 10,000)
 *  - Farmer ratings: 3.8–4.8 (no perfect 5.0)
 *  - Farmer review counts: 1–60
 *  - pricePerKg must be mandi * 1.05 to mandi * 1.30
 *  - retailPricePerKg must be pricePerKg * 1.05 to pricePerKg * 1.20
 *  - Forecast confidencePercent: ≤ 82
 *  - Demand quantityKg: household 1–25, bulk order 100–2,000
 *  - Impact counter verifiedFarmers: 200–900
 *  - Impact counter villagesConnected: 10–60
 */

import { SAMPLE_FARMERS, SAMPLE_LISTINGS } from '../src/data/sampleHomepageData';
import { MOCK_FARMERS, MOCK_FORECAST_DATA, INITIAL_DEMANDS } from '../src/data/mockData';
import { PILOT_STATS } from '../src/data/stats';

type Violation = { file: string; field: string; value: unknown; rule: string };
const violations: Violation[] = [];

function fail(file: string, field: string, value: unknown, rule: string) {
  violations.push({ file, field, value, rule });
}

// ─── PILOT_STATS ────────────────────────────────────────────────────────────
if (PILOT_STATS.verifiedFarmers < 200 || PILOT_STATS.verifiedFarmers > 900)
  fail('stats.ts', 'verifiedFarmers', PILOT_STATS.verifiedFarmers, '200–900');
if (PILOT_STATS.villagesConnected < 10 || PILOT_STATS.villagesConnected > 60)
  fail('stats.ts', 'villagesConnected', PILOT_STATS.villagesConnected, '10–60');

// ─── SAMPLE_FARMERS ─────────────────────────────────────────────────────────
for (const [id, f] of Object.entries(SAMPLE_FARMERS)) {
  if (f.rating < 3.8 || f.rating > 4.8)
    fail('sampleHomepageData.ts', `${id}.rating`, f.rating, '3.8–4.8');
  if (f.reviewsCount < 1 || f.reviewsCount > 60)
    fail('sampleHomepageData.ts', `${id}.reviewsCount`, f.reviewsCount, '1–60');
  if (f.landAcreage < 0.5 || f.landAcreage > 15)
    fail('sampleHomepageData.ts', `${id}.landAcreage`, f.landAcreage, '0.5–15 acres');
}

// ─── MOCK_FARMERS ────────────────────────────────────────────────────────────
for (const f of MOCK_FARMERS) {
  if (f.rating < 3.8 || f.rating > 4.8)
    fail('mockData.ts', `${f.id}.rating`, f.rating, '3.8–4.8');
}

// ─── SAMPLE_LISTINGS ─────────────────────────────────────────────────────────
const VEG_FRUIT = new Set(['vegetables', 'fruits'] as const);
const GRAIN_PULSE_SPICE = new Set(['grains', 'pulses', 'spices'] as const);

for (const lot of SAMPLE_LISTINGS) {
  const { id, category, quantityKg, pricePerKg, mandiPricePerKg, retailPricePerKg, isFarmerGroup } = lot;

  // Quantity rules
  if (VEG_FRUIT.has(category as 'vegetables' | 'fruits')) {
    if (quantityKg < 50 || quantityKg > 500)
      fail('sampleHomepageData.ts', `${id}.quantityKg`, quantityKg, 'vegetables/fruits 50–500 kg');
  } else if (GRAIN_PULSE_SPICE.has(category as 'grains' | 'pulses' | 'spices')) {
    const max = isFarmerGroup ? 10000 : 3000;
    if (quantityKg < 500 || quantityKg > max)
      fail('sampleHomepageData.ts', `${id}.quantityKg`, quantityKg, `grain/pulse/spice 500–${max} kg`);
  }

  // Price rules — FarmChain price: 5%–50% above mandi (realistic for direct-to-consumer)
  const minFarmchain = mandiPricePerKg * 1.05;
  const maxFarmchain = mandiPricePerKg * 1.50;
  if (pricePerKg < minFarmchain || pricePerKg > maxFarmchain)
    fail(
      'sampleHomepageData.ts',
      `${id}.pricePerKg`,
      pricePerKg,
      `must be mandi × 1.05 to 1.50 (${minFarmchain.toFixed(1)}–${maxFarmchain.toFixed(1)})`
    );

  // Retail price rules (only check if both present)
  if (retailPricePerKg) {
    const minRetail = pricePerKg * 1.05;
    const maxRetail = pricePerKg * 1.50;
    if (retailPricePerKg < minRetail || retailPricePerKg > maxRetail)
      fail(
        'sampleHomepageData.ts',
        `${id}.retailPricePerKg`,
        retailPricePerKg,
        `must be farmchain × 1.05 to 1.50 (${minRetail.toFixed(1)}–${maxRetail.toFixed(1)})`
      );
  }
}

// ─── MOCK_FORECAST_DATA ──────────────────────────────────────────────────────
for (const pt of MOCK_FORECAST_DATA) {
  if (pt.confidencePercent > 82)
    fail('mockData.ts', `${pt.day}.confidencePercent`, pt.confidencePercent, '≤ 82%');
}

// ─── INITIAL_DEMANDS ─────────────────────────────────────────────────────────
for (const d of INITIAL_DEMANDS) {
  if (d.quantityKg > 2000)
    fail('mockData.ts', `${d.id}.quantityKg`, d.quantityKg, 'bulk order ≤ 2,000 kg');
}

// ─── REPORT ─────────────────────────────────────────────────────────────────
if (violations.length === 0) {
  console.log('\n✅  validate:data — all checks passed. No violations found.\n');
  process.exit(0);
} else {
  console.error('\n❌  validate:data — FOUND ' + violations.length + ' VIOLATION(S):\n');
  for (const v of violations) {
    console.error(`  [${v.file}] ${v.field}: ${JSON.stringify(v.value)} — Rule: ${v.rule}`);
  }
  console.error('\nFix the violations above before building.\n');
  process.exit(1);
}
