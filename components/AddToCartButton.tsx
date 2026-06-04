"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { addCartLine, CART_STORAGE_KEY, parseStoredCart } from "@/lib/cart";

export function AddToCartButton({
  productSlug,
  label = "Add to cart",
  compact = false,
  className = "",
  redirectToCart = true
}: {
  productSlug: string;
  label?: string;
  compact?: boolean;
  className?: string;
  redirectToCart?: boolean;
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    const current = parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY));
    const next = addCartLine(current, productSlug, 1);
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("royalis-cart-updated"));
    setAdded(true);

    if (redirectToCart) {
      router.push("/cart");
      return;
    }

    window.setTimeout(() => setAdded(false), 1400);
  }

  const Icon = added ? Check : Plus;

  return (
    <button type="button" onClick={handleAdd} className={className}>
      <Icon size={compact ? 15 : 16} strokeWidth={1.75} aria-hidden="true" />
      {added ? "Added" : label}
    </button>
  );
}
