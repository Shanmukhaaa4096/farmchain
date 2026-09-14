-- ============================================================================
-- FARMCHAIN PRODUCTION DATABASE ARCHITECTURE (POSTGRESQL 16+)
-- DESIGNED FOR 10,000+ CONCURRENT USERS, MILLIONS OF RECORDS, SUB-10MS LATENCY
-- ZERO-BROKER DEMAND-DRIVEN AGRI-TECH ECOSYSTEM
-- ============================================================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- ENUMS
CREATE TYPE user_role AS ENUM ('FARMER', 'BUYER', 'FPO_COORDINATOR', 'TRANSPORTER', 'ADMIN');
CREATE TYPE user_language AS ENUM ('te', 'hi', 'kn', 'mr', 'ta', 'en');
CREATE TYPE demand_status AS ENUM ('OPEN', 'PARTIALLY_MATCHED', 'ALLOCATED', 'FULFILLED', 'CANCELLED');
CREATE TYPE push_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');
CREATE TYPE order_status AS ENUM ('CONFIRMED', 'PICKUP_SCHEDULED', 'IN_TRANSIT', 'DELIVERED', 'SETTLED', 'DISPUTED');
CREATE TYPE vehicle_type AS ENUM ('TATA_ACE', 'BOLERO_MAX', 'EICHER_REEFER_14FT', 'TRUCK_20FT_REEFER');
CREATE TYPE payment_status AS ENUM ('ESCROW_HELD', 'SETTLED_TO_FARMER', 'REFUNDED');

-- ============================================================================
-- 1. AUTHENTICATION & CORE USERS
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Argon2id / bcrypt standard
    role user_role NOT NULL,
    preferred_language user_language NOT NULL DEFAULT 'en',
    is_phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. ASSISTED ONBOARDING & PROFILES
-- ============================================================================
CREATE TABLE IF NOT EXISTS fpo_coordinators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fpo_name VARCHAR(120) NOT NULL,
    registration_number VARCHAR(60) NOT NULL UNIQUE,
    assigned_district VARCHAR(60) NOT NULL,
    assigned_mandal VARCHAR(60) NOT NULL,
    verified_badge BOOLEAN NOT NULL DEFAULT TRUE,
    total_farmers_onboarded INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS farmer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    kisan_id VARCHAR(50) NOT NULL UNIQUE, -- Government Kisan Credit Card / Agri-Stack ID
    full_name VARCHAR(100) NOT NULL,
    father_or_spouse_name VARCHAR(100),
    village VARCHAR(60) NOT NULL,
    mandal VARCHAR(60) NOT NULL,
    district VARCHAR(60) NOT NULL,
    state VARCHAR(60) NOT NULL DEFAULT 'Telangana',
    pincode VARCHAR(10) NOT NULL,
    geom_location GEOGRAPHY(POINT, 4326) NOT NULL, -- Precise farm plot coordinates
    land_acres NUMERIC(6, 2) NOT NULL CHECK (land_acres > 0),
    primary_crops TEXT[] NOT NULL,
    irrigation_source VARCHAR(50) NOT NULL DEFAULT 'DRIP_BOREWELL',
    bank_account_hash VARCHAR(64) NOT NULL, -- SHA-256 for audit, ciphertext in secure KMS
    upi_vpa VARCHAR(80),
    assisted_by_coordinator_id UUID REFERENCES fpo_coordinators(id),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS buyer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(150) NOT NULL,
    business_type VARCHAR(60) NOT NULL, -- Restaurant Chain, Supermarket, Processor, Wholesaler
    gstin VARCHAR(15) NOT NULL UNIQUE,
    fssai_license VARCHAR(20) NOT NULL,
    hub_delivery_address TEXT NOT NULL,
    geom_hub GEOGRAPHY(POINT, 4326) NOT NULL,
    credit_limit_paise BIGINT NOT NULL DEFAULT 5000000, -- Rs 50,000 default
    escrow_balance_paise BIGINT NOT NULL DEFAULT 0,
    is_kyc_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. DEMAND ENGINE & PUSH-DEMAND DISPATCH
-- ============================================================================
CREATE TABLE IF NOT EXISTS demands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demand_code VARCHAR(30) NOT NULL UNIQUE, -- e.g. DEM-2026-081
    buyer_id UUID NOT NULL REFERENCES buyer_profiles(id),
    crop_name VARCHAR(60) NOT NULL,
    variety VARCHAR(60),
    quality_grade VARCHAR(20) NOT NULL, -- Grade A, Grade B
    required_quantity_kg INT NOT NULL CHECK (required_quantity_kg > 0),
    matched_quantity_kg INT NOT NULL DEFAULT 0 CHECK (matched_quantity_kg <= required_quantity_kg),
    offered_rate_paise_per_kg INT NOT NULL CHECK (offered_rate_paise_per_kg > 0), -- Stored in paise (Rs 24.00 = 2400 paise)
    delivery_hub_address TEXT NOT NULL,
    geom_hub GEOGRAPHY(POINT, 4326) NOT NULL,
    target_delivery_date DATE NOT NULL,
    status demand_status NOT NULL DEFAULT 'OPEN',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PUSH TO FARMER: The farmer doesn't search. The engine pushes demand to farmer.
CREATE TABLE IF NOT EXISTS farmer_demand_pushes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demand_id UUID NOT NULL REFERENCES demands(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES farmer_profiles(id) ON DELETE CASCADE,
    requested_quantity_kg INT NOT NULL CHECK (requested_quantity_kg > 0),
    rate_paise_per_kg INT NOT NULL,
    total_payout_paise BIGINT NOT NULL,
    distance_to_hub_km NUMERIC(6, 2) NOT NULL,
    dispatch_channel VARCHAR(20) NOT NULL DEFAULT 'WHATSAPP_SMS',
    response_status push_status NOT NULL DEFAULT 'PENDING',
    responded_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_demand_farmer_push UNIQUE (demand_id, farmer_id)
);

-- ============================================================================
-- 4. CONTRACTS, AGGREGATED ORDERS & DIRECT ESCROW SETTLEMENT
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code VARCHAR(30) NOT NULL UNIQUE,
    demand_id UUID NOT NULL REFERENCES demands(id),
    buyer_id UUID NOT NULL REFERENCES buyer_profiles(id),
    total_quantity_kg INT NOT NULL,
    total_amount_paise BIGINT NOT NULL,
    escrow_id VARCHAR(64) NOT NULL UNIQUE,
    escrow_status payment_status NOT NULL DEFAULT 'ESCROW_HELD',
    status order_status NOT NULL DEFAULT 'CONFIRMED',
    scheduled_pickup_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES farmer_profiles(id),
    allocated_quantity_kg INT NOT NULL CHECK (allocated_quantity_kg > 0),
    farmer_rate_paise_per_kg INT NOT NULL,
    payout_amount_paise BIGINT NOT NULL,
    pickup_hub_name VARCHAR(100) NOT NULL,
    is_qc_passed BOOLEAN NOT NULL DEFAULT FALSE,
    qc_notes TEXT,
    settlement_reference VARCHAR(64),
    status VARCHAR(30) NOT NULL DEFAULT 'READY_FOR_HARVEST',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. LOGISTICS CLUSTER OPTIMIZATION
-- ============================================================================
CREATE TABLE IF NOT EXISTS logistics_trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_code VARCHAR(30) NOT NULL UNIQUE,
    vehicle_number VARCHAR(20) NOT NULL,
    vehicle_type vehicle_type NOT NULL,
    driver_name VARCHAR(100) NOT NULL,
    driver_phone VARCHAR(15) NOT NULL,
    capacity_kg INT NOT NULL,
    current_load_kg INT NOT NULL DEFAULT 0,
    route_pickup_points JSONB NOT NULL DEFAULT '[]'::jsonb,
    delivery_hub_address TEXT NOT NULL,
    trip_status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    departure_time TIMESTAMPTZ,
    estimated_arrival TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. AUDIT LOGS & HIGH-VOLUME TELEMETRY (PARTITIONED TABLE)
-- Handles millions of sensor & dispatch records without degradation
-- ============================================================================
CREATE TABLE IF NOT EXISTS system_audit_logs (
    id BIGSERIAL,
    event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actor_id UUID,
    actor_role VARCHAR(30),
    ip_address INET,
    action_type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(64),
    payload JSONB,
    PRIMARY KEY (id, event_time)
) PARTITION BY RANGE (event_time);

-- 2026 Partitions
CREATE TABLE IF NOT EXISTS audit_logs_2026_q3 PARTITION OF system_audit_logs
    FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS audit_logs_2026_q4 PARTITION OF system_audit_logs
    FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2027-01-01 00:00:00+00');

-- ============================================================================
-- 7. API KEYS & TOKEN BUCKET RATE LIMITING
-- ============================================================================
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 hash of API token
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rate_limit_per_minute INT NOT NULL DEFAULT 120,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 8. PERFORMANCE INDEXES (OPTIMIZED FOR 10,000+ CONCURRENT USERS)
-- ============================================================================

-- Spatial GIST Index for Sub-Millisecond Distance Radius Calculation (ST_DWithin)
CREATE INDEX IF NOT EXISTS idx_farmer_geom ON farmer_profiles USING GIST (geom_location);
CREATE INDEX IF NOT EXISTS idx_demand_hub_geom ON demands USING GIST (geom_hub);
CREATE INDEX IF NOT EXISTS idx_buyer_hub_geom ON buyer_profiles USING GIST (geom_hub);

-- Partial Indexes for Fast Active Order & Demand Lookups
CREATE INDEX IF NOT EXISTS idx_demands_open ON demands (crop_name, target_delivery_date) 
    WHERE status = 'OPEN';

CREATE INDEX IF NOT EXISTS idx_pushes_pending ON farmer_demand_pushes (farmer_id, response_status) 
    WHERE response_status = 'PENDING';

-- Composite B-Tree Indexes for High-Frequency Filters
CREATE INDEX IF NOT EXISTS idx_farmer_mandal_crop ON farmer_profiles (district, mandal);
CREATE INDEX IF NOT EXISTS idx_order_allocations_farmer ON order_allocations (farmer_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_demand ON orders (demand_id, status);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users (phone_number);

-- BRIN Index for Append-Only Time Series Audit Logs (Minimal Disk Overhead)
CREATE INDEX IF NOT EXISTS idx_audit_time_brin ON system_audit_logs USING BRIN (event_time);

-- ============================================================================
-- 9. ROW-LEVEL SECURITY (RLS) FOR MULTI-TENANT ISOLATION
-- ============================================================================
ALTER TABLE farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmer_demand_pushes ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_allocations ENABLE ROW LEVEL SECURITY;

-- Farmers can only view their own pushes & allocations
CREATE POLICY farmer_self_pushes ON farmer_demand_pushes
    FOR SELECT USING (farmer_id IN (
        SELECT id FROM farmer_profiles WHERE user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
    ));

CREATE POLICY farmer_update_own_push ON farmer_demand_pushes
    FOR UPDATE USING (farmer_id IN (
        SELECT id FROM farmer_profiles WHERE user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
    ));
