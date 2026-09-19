-- FarmChain Database Schema & Security Architecture
-- Smart India Hackathon: Direct Farmer-to-Buyer Marketplace (Zero Middlemen)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  mobile_number text not null unique,
  name text not null,
  role text not null default 'farmer' check (role in ('farmer', 'buyer', 'logistics', 'admin')),
  identifier text, -- e.g. KISAN: TS-RR-902184, GSTIN: 36AAACU9120K, FLEET: TS-08-NP-2026, ADMIN: FC-SEC-01
  organization text,
  location text,
  district text,
  state text,
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'pending', 'verified', 'rejected')),
  verification_doc_url text,
  rejection_reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Produce Listings Table
create table if not exists public.listings (
  id uuid default gen_random_uuid() primary key,
  farmer_id uuid references public.profiles(id) on delete cascade not null,
  crop text not null,
  variety text,
  quantity_kg numeric not null check (quantity_kg > 0),
  expected_price_per_kg numeric not null check (expected_price_per_kg > 0),
  available_date date not null,
  location text not null,
  district text,
  state text,
  photos text[] default array[]::text[],
  status text not null default 'active' check (status in ('active', 'matched', 'sold', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Commercial Demands Table (Wholesale Buyers)
create table if not exists public.demands (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  crop text not null,
  quantity_kg numeric not null check (quantity_kg > 0),
  quality_grade text not null default 'Grade A',
  target_price_per_kg numeric not null check (target_price_per_kg > 0),
  delivery_location text not null,
  required_date date not null,
  urgency text not null default 'NORMAL' check (urgency in ('NORMAL', 'MEDIUM', 'HIGH')),
  status text not null default 'OPEN' check (status in ('OPEN', 'PARTIALLY_MATCHED', 'FULFILLED', 'IN_TRANSIT')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Direct Offers & Price Negotiations Table
create table if not exists public.offers (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete cascade,
  demand_id uuid references public.demands(id) on delete cascade,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  farmer_id uuid references public.profiles(id) on delete cascade not null,
  offered_price_per_kg numeric not null check (offered_price_per_kg > 0),
  quantity_kg numeric not null check (quantity_kg > 0),
  counter_price_per_kg numeric,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'countered')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Fulfilled Orders & Direct Payout Tracker
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  offer_id uuid references public.offers(id) on delete set null,
  farmer_id uuid references public.profiles(id) not null,
  buyer_id uuid references public.profiles(id) not null,
  crop text not null,
  quantity_kg numeric not null check (quantity_kg > 0),
  agreed_rate_per_kg numeric not null check (agreed_rate_per_kg > 0),
  total_payout numeric not null check (total_payout > 0),
  stage text not null default 'Offered' check (stage in ('Offered', 'Accepted', 'Pickup scheduled', 'Delivered', 'Paid')),
  escrow_status text not null default 'held' check (escrow_status in ('held', 'verified', 'disbursed')),
  pickup_date date,
  delivery_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Peer Ratings & Reviews
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) not null,
  target_user_id uuid references public.profiles(id) not null,
  rating numeric not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Private Document Verification Storage Bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('verifications', 'verifications', false, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;

-- Enable Row Level Security (RLS) across all tables
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.demands enable row level security;
alter table public.offers enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;

-- Helper security function: Check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- PROFILES POLICIES
-- Anyone authenticated can view public profiles
create policy "Public profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

-- Users can insert their initial profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Users can update basic profile fields, but CANNOT self-elevate role or verification_status
create policy "Users can update their own profile details"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and (
      -- Regular user cannot change role or verification_status
      (role = (select role from public.profiles where id = auth.uid()) and
       verification_status = (select verification_status from public.profiles where id = auth.uid()))
      or public.is_admin()
    )
  );

-- Admins can update any profile (e.g. approve verification, change role)
create policy "Admins can update any profile"
  on public.profiles for update
  to authenticated
  using (public.is_admin());

-- LISTINGS POLICIES
-- Anyone can view active listings
create policy "Active listings are viewable by everyone"
  on public.listings for select
  using (status = 'active' or auth.uid() = farmer_id or public.is_admin());

-- Farmers can create listings only if their account exists
create policy "Farmers can insert listings"
  on public.listings for insert
  to authenticated
  with check (auth.uid() = farmer_id);

-- Farmers can update or delete their own listings
create policy "Farmers can update own listings"
  on public.listings for update
  to authenticated
  using (auth.uid() = farmer_id or public.is_admin());

create policy "Farmers can delete own listings"
  on public.listings for delete
  to authenticated
  using (auth.uid() = farmer_id or public.is_admin());

-- DEMANDS POLICIES
create policy "Demands viewable by authenticated users"
  on public.demands for select
  to authenticated
  using (true);

create policy "Buyers can insert demands"
  on public.demands for insert
  to authenticated
  with check (auth.uid() = buyer_id);

create policy "Buyers can update own demands"
  on public.demands for update
  to authenticated
  using (auth.uid() = buyer_id or public.is_admin());

-- OFFERS POLICIES
-- Offers visible only to involved parties (buyer, farmer, admin)
create policy "Offers visible to involved parties and admin"
  on public.offers for select
  to authenticated
  using (auth.uid() = buyer_id or auth.uid() = farmer_id or public.is_admin());

create policy "Buyers can create offers"
  on public.offers for insert
  to authenticated
  with check (auth.uid() = buyer_id);

create policy "Involved parties can update offers"
  on public.offers for update
  to authenticated
  using (auth.uid() = buyer_id or auth.uid() = farmer_id or public.is_admin());

-- ORDERS POLICIES
create policy "Orders visible to involved parties and admin"
  on public.orders for select
  to authenticated
  using (auth.uid() = buyer_id or auth.uid() = farmer_id or public.is_admin());

create policy "Admins and buyers can insert orders"
  on public.orders for insert
  to authenticated
  with check (auth.uid() = buyer_id or public.is_admin());

create policy "Involved parties can update order status"
  on public.orders for update
  to authenticated
  using (auth.uid() = buyer_id or auth.uid() = farmer_id or public.is_admin());

-- REVIEWS POLICIES
create policy "Reviews viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Order participants can insert reviews"
  on public.reviews for insert
  to authenticated
  with check (auth.uid() = reviewer_id);

-- STORAGE BUCKET POLICIES (Verifications Bucket)
create policy "Users can upload verification docs to own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'verifications'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view own verification docs"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'verifications'
    and (
      auth.uid()::text = (storage.foldername(name))[1]
      or public.is_admin()
    )
  );
