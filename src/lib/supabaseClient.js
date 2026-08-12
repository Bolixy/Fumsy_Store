import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  // Non-fatal: the app falls back to local seed data (see lib/products-seed.js)
  // so the storefront still works before Supabase is connected.
  console.warn(
    "[Funmsy] Supabase env vars are missing. Copy .env.example to .env and fill in your project URL and anon key."
  );
}

export const supabase = url && key ? createClient(url, key) : null;

export const isSupabaseConnected = Boolean(supabase);
