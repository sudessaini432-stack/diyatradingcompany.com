import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

function createPublicClient(): ReturnType<typeof createClient<Database>> | null {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return null;
  // New opaque keys are not JWTs: PostgREST wants them as apikey, not Bearer.
  const fetchShim: typeof fetch = (input, init) => {
    const headers = new Headers(init?.headers);
    headers.delete("Authorization");
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
  return createClient<Database>(url, key, {
    global: { fetch: fetchShim },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export type PublicProduct = {
  slug: string;
  name: string;
  description: string;
  custom: string[];
  imagePath: string | null;
  imageUrl: string | null;
  price: number | null;
  priceUnit: string;
  available: boolean;
};

export type PublicSettings = {
  heroTitle: string;
  heroSubtitle: string;
  showPrices: boolean;
  acceptingOrders: boolean;
  announcement: string;
};

// Signed image links stay valid for 7 days; pages refetch on each visit.
const IMAGE_TTL_SECONDS = 604800;

export const getPublicProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ products: PublicProduct[] }> => {
    const client = createPublicClient();
    if (!client) return { products: [] };
    const { data, error } = await client
      .from("products")
      .select("slug, name, description, custom, image_path, price, price_unit, available, sort_order")
      .eq("available", true)
      .order("sort_order");
    if (error || !data) return { products: [] };
    const products: PublicProduct[] = [];
    for (const p of data) {
      let imageUrl: string | null = null;
      if (p.image_path) {
        const { data: signed } = await client.storage
          .from("product-images")
          .createSignedUrl(p.image_path, IMAGE_TTL_SECONDS);
        imageUrl = signed?.signedUrl ?? null;
      }
      products.push({
        slug: p.slug,
        name: p.name,
        description: p.description,
        custom: p.custom ?? [],
        imagePath: p.image_path,
        imageUrl,
        price: p.price,
        priceUnit: p.price_unit,
        available: p.available,
      });
    }
    return { products };
  },
);

export const getPublicSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicSettings | null> => {
    const client = createPublicClient();
    if (!client) return null;
    const { data } = await client
      .from("site_settings")
      .select("hero_title, hero_subtitle, show_prices, accepting_orders, announcement")
      .eq("id", 1)
      .single();
    if (!data) return null;
    return {
      heroTitle: data.hero_title,
      heroSubtitle: data.hero_subtitle,
      showPrices: data.show_prices,
      acceptingOrders: data.accepting_orders,
      announcement: data.announcement,
    };
  },
);

async function isAdmin(context: { supabase: ReturnType<typeof createClient<Database>>; userId: string }) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId);
  if (error || !data) return false;
  return data.some((r) => r.role === "admin");
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => ({ admin: await isAdmin(context) }));

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  custom: string[];
  price: number | null;
  priceUnit: string;
  available: boolean;
  imagePath: string | null;
  sortOrder: number;
};

export const adminListProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ products: AdminProduct[]; error?: string }> => {
    if (!(await isAdmin(context))) return { products: [], error: "Admin access required." };
    const { data, error } = await context.supabase
      .from("products")
      .select("id, slug, name, description, custom, price, price_unit, available, image_path, sort_order")
      .order("sort_order");
    if (error || !data) return { products: [], error: "Could not load products." };
    return {
      products: data.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: p.description,
        custom: p.custom ?? [],
        price: p.price,
        priceUnit: p.price_unit,
        available: p.available,
        imagePath: p.image_path,
        sortOrder: p.sort_order,
      })),
    };
  });

export type AdminProductInput = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  custom: string[];
  price: number | null;
  priceUnit: string;
  available: boolean;
  imagePath: string | null;
  sortOrder: number;
};

export const adminUpsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: AdminProductInput) => d)
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context))) return { ok: false as const, error: "Admin access required." };
    const name = data.name.trim().slice(0, 120);
    if (!name) return { ok: false as const, error: "Product name is required." };
    const row = {
      slug:
        data.slug
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 80) || `product-${Date.now()}`,
      name,
      description: data.description.trim().slice(0, 1000),
      custom: data.custom.map((c) => c.trim()).filter(Boolean).slice(0, 12),
      price: typeof data.price === "number" && Number.isFinite(data.price) && data.price >= 0 ? data.price : null,
      price_unit: data.priceUnit.trim().slice(0, 40) || "per kg",
      available: data.available,
      image_path: data.imagePath,
      sort_order: Number.isInteger(data.sortOrder) ? data.sortOrder : 0,
    };
    const result = data.id
      ? await context.supabase.from("products").update(row).eq("id", data.id)
      : await context.supabase.from("products").insert(row);
    if (result.error) return { ok: false as const, error: "Could not save the product." };
    return { ok: true as const };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context))) return { ok: false as const, error: "Admin access required." };
    const { error } = await context.supabase.from("products").delete().eq("id", data.id);
    if (error) return { ok: false as const, error: "Could not delete the product." };
    return { ok: true as const };
  });

export type AdminSettingsInput = {
  heroTitle: string;
  heroSubtitle: string;
  announcement: string;
  showPrices: boolean;
  acceptingOrders: boolean;
};

export const adminUpdateSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: AdminSettingsInput) => d)
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context))) return { ok: false as const, error: "Admin access required." };
    const { error } = await context.supabase
      .from("site_settings")
      .update({
        hero_title: data.heroTitle.trim().slice(0, 160) || "Premium Quality Non-Woven Bags",
        hero_subtitle: data.heroSubtitle.trim().slice(0, 160) || "Customized Sizes • Colours • Printing",
        announcement: data.announcement.trim().slice(0, 300),
        show_prices: data.showPrices,
        accepting_orders: data.acceptingOrders,
      })
      .eq("id", 1);
    if (error) return { ok: false as const, error: "Could not save the settings." };
    return { ok: true as const };
  });
