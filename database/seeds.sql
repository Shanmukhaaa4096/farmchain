-- ============================================================================
-- FARMCHAIN PRODUCTION SEED DATA
-- REALISTIC TELANGANA & MAHARASHTRA AGRI-CORRIDOR RECORDS
-- ============================================================================

-- 1. Insert Initial System Users
INSERT INTO users (id, phone_number, password_hash, role, preferred_language, is_phone_verified)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', '9849012345', '$argon2id$v=19$m=65536,t=3,p=4$v8h...coordinator', 'FPO_COORDINATOR', 'te', TRUE),
  ('a0000000-0000-0000-0000-000000000002', '9849012346', '$argon2id$v=19$m=65536,t=3,p=4$v8h...farmerA', 'FARMER', 'te', TRUE),
  ('a0000000-0000-0000-0000-000000000003', '9849012347', '$argon2id$v=19$m=65536,t=3,p=4$v8h...farmerB', 'FARMER', 'te', TRUE),
  ('a0000000-0000-0000-0000-000000000004', '9849012348', '$argon2id$v=19$m=65536,t=3,p=4$v8h...farmerC', 'FARMER', 'te', TRUE),
  ('a0000000-0000-0000-0000-000000000005', '9849012349', '$argon2id$v=19$m=65536,t=3,p=4$v8h...buyer', 'BUYER', 'en', TRUE)
ON CONFLICT (phone_number) DO NOTHING;

-- 2. Insert FPO Coordinator Profile
INSERT INTO fpo_coordinators (id, user_id, fpo_name, registration_number, assigned_district, assigned_mandal, total_farmers_onboarded)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'Chevella Rythu Mithra FPO',
  'FPO-TS-RR-2021-084',
  'Ranga Reddy',
  'Chevella',
  142
) ON CONFLICT DO NOTHING;

-- 3. Insert Verified Farmer Profiles (Assisted Onboarding)
INSERT INTO farmer_profiles (
  id, user_id, kisan_id, full_name, father_or_spouse_name, village, mandal, district, state, pincode,
  geom_location, land_acres, primary_crops, irrigation_source, bank_account_hash, upi_vpa, assisted_by_coordinator_id, is_verified
) VALUES 
(
  'c0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000002',
  'KISAN-TS-RR-902184',
  'Ramesh Reddy Mandadi',
  'Narasimha Reddy',
  'Mirzapur',
  'Chevella',
  'Ranga Reddy',
  'Telangana',
  '501503',
  ST_SetSRID(ST_MakePoint(78.1340, 17.3128), 4326),
  4.5,
  ARRAY['Tomatoes', 'Green Chillies', 'Okra'],
  'DRIP_BOREWELL',
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'ramesh.reddy@upi',
  'b0000000-0000-0000-0000-000000000001',
  TRUE
),
(
  'c0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000003',
  'KISAN-TS-RR-902195',
  'Kavitha Patel',
  'Suresh Patel',
  'Shankarpally Khurd',
  'Shankarpally',
  'Ranga Reddy',
  'Telangana',
  '501203',
  ST_SetSRID(ST_MakePoint(78.1820, 17.4485), 4326),
  3.2,
  ARRAY['Tomatoes', 'Capsicum', 'Coriander'],
  'DRIP_IRRIGATION',
  'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
  'kavitha.agro@upi',
  'b0000000-0000-0000-0000-000000000001',
  TRUE
),
(
  'c0000000-0000-0000-0000-000000000003',
  'a0000000-0000-0000-0000-000000000004',
  'KISAN-TS-VK-401120',
  'Babu Rao Mandava',
  'Laxmaiah Mandava',
  'Pudur',
  'Pudur',
  'Vikarabad',
  'Telangana',
  '501501',
  ST_SetSRID(ST_MakePoint(78.0125, 17.2912), 4326),
  5.0,
  ARRAY['Tomatoes', 'Red Gram', 'Potatoes'],
  'CANAL_BOREWELL',
  '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  'baburao.kisan@upi',
  'b0000000-0000-0000-0000-000000000001',
  TRUE
) ON CONFLICT (kisan_id) DO NOTHING;

-- 4. Insert Verified Commercial Buyer
INSERT INTO buyer_profiles (
  id, user_id, business_name, business_type, gstin, fssai_license, hub_delivery_address, geom_hub, credit_limit_paise, escrow_balance_paise, is_kyc_approved
) VALUES (
  'd0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000005',
  'UrbanFork Kitchens Pvt Ltd',
  'Commercial Cloud Kitchen Chain',
  '36AABCU9603R1ZM',
  '13621014000329',
  'Plot 42, Gachibowli Financial District Cold Hub, Hyderabad',
  ST_SetSRID(ST_MakePoint(78.3498, 17.4401), 4326),
  25000000, -- Rs 2,50,000
  12000000, -- Rs 1,20,000 active escrow
  TRUE
) ON CONFLICT (gstin) DO NOTHING;

-- 5. Insert Live Verified Demand
INSERT INTO demands (
  id, demand_code, buyer_id, crop_name, variety, quality_grade, required_quantity_kg, matched_quantity_kg,
  offered_rate_paise_per_kg, delivery_hub_address, geom_hub, target_delivery_date, status, notes
) VALUES (
  'e0000000-0000-0000-0000-000000000001',
  'DEM-2026-081',
  'd0000000-0000-0000-0000-000000000001',
  'Tomatoes',
  'Hybrid 1057',
  'Grade A',
  2400,
  1900,
  2400, -- Rs 24.00 / KG
  'UrbanFork Central Cold Hub, Gachibowli, Hyderabad',
  ST_SetSRID(ST_MakePoint(78.3498, 17.4401), 4326),
  '2026-09-28',
  'PARTIALLY_MATCHED',
  'Firm, uniform red ripeness, zero skin cracks, crates only.'
) ON CONFLICT (demand_code) DO NOTHING;

-- 6. Insert Push Dispatches to Farmers (Push-Demand Model)
INSERT INTO farmer_demand_pushes (
  id, demand_id, farmer_id, requested_quantity_kg, rate_paise_per_kg, total_payout_paise, distance_to_hub_km, dispatch_channel, response_status, responded_at
) VALUES 
(
  'f0000000-0000-0000-0000-000000000001',
  'e0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  800,
  2400,
  1920000, -- Rs 19,200
  14.2,
  'WHATSAPP_SMS',
  'ACCEPTED',
  NOW() - INTERVAL '3 hours'
),
(
  'f0000000-0000-0000-0000-000000000002',
  'e0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000002',
  600,
  2400,
  1440000, -- Rs 14,400
  11.8,
  'WHATSAPP_SMS',
  'ACCEPTED',
  NOW() - INTERVAL '2 hours'
),
(
  'f0000000-0000-0000-0000-000000000003',
  'e0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000003',
  500,
  2400,
  1200000, -- Rs 12,000
  18.6,
  'WHATSAPP_SMS',
  'ACCEPTED',
  NOW() - INTERVAL '1 hour'
) ON CONFLICT DO NOTHING;
