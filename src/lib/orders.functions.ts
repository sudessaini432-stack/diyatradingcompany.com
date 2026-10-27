import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];

const STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof STATUSES)[number];

export type OrderDTO = {
  id: string;
  orderNo: number;
  customerName: string;
  phone: string;
  bagType: string;
  quantity: string;
  size: string | null;
  colour: string | null;
  printing: string | null;
  deliveryLocation: string | null;
  message: string | null;
  status: OrderStatus;
  adminNote: string | null;
  createdAt: string;
};

function toDTO(row: OrderRow): OrderDTO {
  return {
    id: row.id,
    orderNo: row.order_no,
    customerName: row.customer_name,
    phone: row.phone,
    bagType: row.bag_type,
    quantity: row.quantity,
    size: row.size,
    colour: row.colour,
    printing: row.printing,
    deliveryLocation: row.delivery_location,
    message: row.message,
    status: row.status as OrderStatus,
    adminNote: row.admin_note,
    createdAt: row.created_at,
  };
}

export type NewOrderInput = {
  customerName: string;
  phone: string;
  bagType: string;
  quantity: string;
  size?: string;
  colour?: string;
  printing?: string;
  deliveryLocation?: string;
  message?: string;
};

export const createOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: NewOrderInput) => d)
  .handler(async ({ data, context }) => {
    const customerName = data.customerName.trim();
    const phone = data.phone.trim();
    const bagType = data.bagType.trim();
    const quantity = data.quantity.trim();
    if (!customerName || customerName.length > 100)
      return { ok: false as const, error: "Please enter your name." };
    if (!/^[0-9+\s-]{10,15}$/.test(phone))
      return { ok: false as const, error: "Please enter a valid phone number." };
    if (!bagType || !quantity)
      return { ok: false as const, error: "Bag type and quantity are required." };

    // Status is intentionally not set: the database trigger forces every new
    // order to "pending" for non-admin users, so a caller cannot fake it.
    const { data: inserted, error } = await context.supabase
      .from("orders")
      .insert({
        customer_name: customerName,
        phone,
        bag_type: bagType.slice(0, 60),
        quantity: quantity.slice(0, 40),
        size: data.size?.trim().slice(0, 60) || null,
        colour: data.colour?.trim().slice(0, 60) || null,
        printing: data.printing?.trim().slice(0, 120) || null,
        delivery_location: data.deliveryLocation?.trim().slice(0, 100) || null,
        message: data.message?.trim().slice(0, 800) || null,
      })
      .select("order_no")
      .single();

    if (error || !inserted)
      return {
        ok: false as const,
        error: "Could not save your order online. Your WhatsApp enquiry will still reach us.",
      };
    return { ok: true as const, orderNo: inserted.order_no };
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ orders: OrderDTO[]; error?: string }> => {
    // RLS on orders filters to the caller's own rows; admins see all.
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return { orders: [], error: "Could not load your orders." };
    return { orders: data.map(toDTO) };
  });

async function isAdmin(context: { supabase: ReturnType<typeof createClient<Database>>; userId: string }) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId);
  if (error || !data) return false;
  return data.some((r) => r.role === "admin");
}

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ orders: OrderDTO[]; error?: string }> => {
    if (!(await isAdmin(context))) return { orders: [], error: "Admin access required." };
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return { orders: [], error: "Could not load orders." };
    return { orders: data.map(toDTO) };
  });

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: string }) => d)
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context))) return { ok: false as const, error: "Admin access required." };
    if (!STATUSES.includes(data.status as OrderStatus))
      return { ok: false as const, error: "Invalid status." };
    const { error } = await context.supabase
      .from("orders")
      .update({ status: data.status as OrderStatus })
      .eq("id", data.id);
    if (error) return { ok: false as const, error: "Could not update the order status." };
    return { ok: true as const };
  });
