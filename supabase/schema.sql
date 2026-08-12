-- Funmsy Store — Supabase schema
-- Run this once in your Supabase project's SQL editor (Database > SQL editor).

-- ---------- PRODUCTS ----------
-- Product name/image/description live in the app's code (src/lib/products-seed.js).
-- This table only holds the parts an admin needs to change live: price + availability.
create table if not exists products (
  id text primary key,
  price numeric not null,
  in_stock boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "Public can read product prices"
  on products for select
  using (true);

create policy "Only signed-in admins can change prices"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------- ORDERS ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  note text,
  items jsonb not null,
  total numeric not null,
  status text not null default 'pending' -- pending | confirmed | fulfilled | cancelled
);

alter table orders enable row level security;

create policy "Anyone can place an order"
  on orders for insert
  with check (true);

create policy "Only signed-in admins can view orders"
  on orders for select
  using (auth.role() = 'authenticated');

create policy "Only signed-in admins can update orders"
  on orders for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------- VISITS ----------
create table if not exists visits (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path text
);

alter table visits enable row level security;

create policy "Anyone can log a visit"
  on visits for insert
  with check (true);

create policy "Only signed-in admins can view visits"
  on visits for select
  using (auth.role() = 'authenticated');

-- ---------- SEED PRICES ----------
-- Keep these ids in sync with src/lib/products-seed.js
insert into products (id, price) values
  ('kids-tbar-buckle', 9500),
  ('croc-slingback-black', 24000),
  ('croc-slingback-nude', 24000),
  ('croc-slingback-wine', 24000),
  ('croc-slingback-white', 24000),
  ('crosswrap-kitten-white', 19500),
  ('crosswrap-kitten-nude', 19500),
  ('crosswrap-kitten-wine', 19500),
  ('sunburst-wedge-white', 17000),
  ('sunburst-wedge-black', 17000),
  ('scallop-wedge-black', 16000),
  ('scallop-wedge-white', 16000),
  ('buckle-stiletto-slingback', 27500),
  ('quilted-bow-ankle-blush', 21000),
  ('quilted-bow-ankle-gold', 23000),
  ('quilted-bow-ankle-black', 21000),
  ('quilted-thong-multi', 18500),
  ('quilted-bow-ankle-wine', 21000),
  ('bow-block-heel-mix', 22500),
  ('bow-block-heel-black', 22500)
on conflict (id) do nothing;
