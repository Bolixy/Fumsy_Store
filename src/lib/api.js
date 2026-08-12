import { supabase, isSupabaseConnected } from "./supabaseClient";
import PRODUCTS from "./products-seed";

/**
 * Product name, image, description and sizes are fixed in code.
 * Price and in_stock are the fields an admin can change live, stored
 * in Supabase's `products` table and merged onto the local catalog here.
 * If Supabase isn't connected yet, the app just uses the seed prices.
 */
export async function fetchProducts() {
  if (!isSupabaseConnected) {
    return PRODUCTS;
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, price, in_stock");

  if (error) {
    console.error("[Funmsy] Failed to load live prices, using defaults:", error.message);
    return PRODUCTS;
  }

  const overrides = Object.fromEntries(data.map((row) => [row.id, row]));

  return PRODUCTS.map((product) => ({
    ...product,
    price: overrides[product.id]?.price ?? product.price,
    inStock: overrides[product.id]?.in_stock ?? true,
  }));
}

export async function updateProductPrice(id, price) {
  if (!isSupabaseConnected) {
    throw new Error("Connect Supabase to save price changes (see README).");
  }
  const { error } = await supabase
    .from("products")
    .upsert({ id, price, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function updateProductStock(id, inStock) {
  if (!isSupabaseConnected) {
    throw new Error("Connect Supabase to save stock changes (see README).");
  }
  const { error } = await supabase
    .from("products")
    .upsert({ id, in_stock: inStock, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function createOrder(order) {
  if (!isSupabaseConnected) {
    console.warn("[Funmsy] Supabase not connected — order was not saved to the database.");
    return null;
  }
  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      customer_address: order.customer.address,
      note: order.customer.note || null,
      items: order.items,
      total: order.total,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchOrders() {
  if (!isSupabaseConnected) return [];
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(id, status) {
  if (!isSupabaseConnected) return;
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function logVisit(path) {
  if (!isSupabaseConnected) return;
  try {
    await supabase.from("visits").insert({ path });
  } catch (err) {
    console.warn("[Funmsy] Could not log visit:", err.message);
  }
}

export async function fetchVisitStats() {
  if (!isSupabaseConnected) return { total: 0, last7Days: 0, byPath: [] };

  const { data, error } = await supabase
    .from("visits")
    .select("path, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const last7Days = data.filter((v) => new Date(v.created_at).getTime() >= sevenDaysAgo).length;

  const counts = {};
  data.forEach((v) => {
    counts[v.path || "/"] = (counts[v.path || "/"] || 0) + 1;
  });
  const byPath = Object.entries(counts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);

  return { total: data.length, last7Days, byPath };
}
