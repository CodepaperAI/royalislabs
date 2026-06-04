export const CART_STORAGE_KEY = "royalis_cart_v1";
export const FREE_SHIPPING_THRESHOLD = 200;
export const FLAT_SHIPPING_RATE = 20;

export type CartLine = {
  slug: string;
  qty: number;
};

function cleanQty(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(99, Math.max(1, Math.floor(parsed)));
}

export function normalizeCartItems(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  const merged = new Map<string, number>();

  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const slug = "slug" in item ? item.slug : undefined;
    if (typeof slug !== "string" || !slug.trim()) continue;

    const qty = cleanQty("qty" in item ? item.qty : 1);
    merged.set(slug, (merged.get(slug) ?? 0) + qty);
  }

  return Array.from(merged.entries()).map(([slug, qty]) => ({
    slug,
    qty: Math.min(99, qty)
  }));
}

export function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw) return [];

  try {
    return normalizeCartItems(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function addCartLine(items: CartLine[], slug: string, qty = 1): CartLine[] {
  return normalizeCartItems([...items, { slug, qty }]);
}

export function calculateShipping(subtotal: number) {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
}
