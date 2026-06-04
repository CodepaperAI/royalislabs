"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Minus, Plus, Trash2 } from "lucide-react";
import {
  calculateShipping,
  CART_STORAGE_KEY,
  type CartLine,
  parseStoredCart
} from "@/lib/cart";
import { getProduct, money } from "@/lib/data";
import { productThumbnail } from "@/lib/product-images";

export function CartClient() {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    function loadCart() {
      setItems(parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY)));
      setHydrated(true);
    }

    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("royalis-cart-updated", loadCart);
    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("royalis-cart-updated", loadCart);
    };
  }, []);

  function persist(next: CartLine[]) {
    setItems(next);
    if (next.length) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
    window.dispatchEvent(new Event("royalis-cart-updated"));
  }

  const cartItems = items
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { product, qty: item.qty } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.price * item.qty, 0),
    [cartItems]
  );
  const shipping = calculateShipping(subtotal);

  function updateQty(slug: string, delta: number) {
    persist(
      items.map((item) =>
        item.slug === slug ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  function removeItem(slug: string) {
    persist(items.filter((item) => item.slug !== slug));
  }

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center md:px-8">
        <p className="font-display text-3xl leading-tight text-carbon md:text-5xl">Loading cart.</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-lab">
          Pulling your selected Royalis products into checkout.
        </p>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center md:px-8">
        <p className="font-display text-3xl leading-tight text-carbon md:text-5xl">Your cart is empty.</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-lab">
          Browse current products or check testing details before adding research materials.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/catalogue" className="rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper hover:bg-arctic">
            View catalogue
          </Link>
          <Link href="/coa-library" className="rounded-lab border border-arctic px-5 py-3 text-sm font-medium text-arctic hover:bg-arctic hover:text-paper">
            Testing details
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 lg:grid-cols-[1fr_380px] lg:px-8">
      <div className="grid gap-3">
        {cartItems.map(({ product, qty }) => (
          <article key={product.slug} className="grid gap-4 border border-carbon/15 bg-paper p-4 md:grid-cols-[140px_1fr_auto]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-image border border-arctic/10 bg-paper">
              <Image
                src={productThumbnail(product.image)}
                alt={`${product.name} product image`}
                fill
                sizes="140px"
                className="object-contain p-2"
              />
            </div>
            <div>
              <p className="text-xs text-lab">{product.category}</p>
              <h2 className="mt-1 font-display text-3xl leading-tight text-carbon">{product.name}</h2>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-5">
                <div>
                  <p className="text-lab">Batch</p>
                  <p className="font-medium text-carbon">{product.batch}</p>
                </div>
                <div>
                  <p className="text-lab">Purity</p>
                  <p className="font-medium text-carbon">{product.purity}</p>
                </div>
                <div>
                  <p className="text-lab">Mass</p>
                  <p className="font-medium text-carbon">{product.assayedMass}</p>
                </div>
                <div>
                  <p className="text-lab">Lab result</p>
                  <p className="font-medium text-carbon">{product.lab}</p>
                </div>
                <div>
                  <p className="text-lab">Format</p>
                  <p className="font-medium text-carbon">{product.format}</p>
                </div>
              </div>
              <Link
                href={`/coa-library?batch=${product.batch}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-arctic"
              >
                <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
                Testing details
              </Link>
            </div>
            <div className="flex items-center justify-between gap-4 md:block md:text-right">
              <p className="text-lg font-semibold text-carbon tabular-nums">{money(product.price * qty)}</p>
              <div className="mt-0 flex items-center gap-1 md:mt-4">
                <button
                  type="button"
                  onClick={() => updateQty(product.slug, -1)}
                  className="grid h-9 w-9 place-items-center rounded-lab border border-carbon/20"
                  aria-label={`Decrease ${product.name}`}
                >
                  <Minus size={15} strokeWidth={1.75} aria-hidden="true" />
                </button>
                <span className="grid h-9 w-10 place-items-center border border-carbon/20 bg-bone text-sm tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQty(product.slug, 1)}
                  className="grid h-9 w-9 place-items-center rounded-lab border border-carbon/20"
                  aria-label={`Increase ${product.name}`}
                >
                  <Plus size={15} strokeWidth={1.75} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(product.slug)}
                  className="grid h-9 w-9 place-items-center rounded-lab border border-carbon/20 text-lab"
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 size={15} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit border border-carbon/15 bg-paper p-5 lg:sticky lg:top-24">
        <h2 className="font-display text-3xl leading-tight">Order confidence</h2>
        <div className="mt-5 grid gap-3 border-y border-carbon/10 py-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-lab">Subtotal</span>
            <span className="font-medium text-carbon tabular-nums">{money(subtotal)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-lab">Shipping estimate</span>
            <span className="font-medium text-carbon tabular-nums">
              {shipping === 0 ? "Free" : money(shipping)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-lab">Total estimate</span>
            <span className="font-semibold text-carbon tabular-nums">{money(subtotal + shipping)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-lab">Packaging</span>
            <span className="font-medium text-carbon">Discreet, tracked</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-lab">Payment</span>
            <span className="font-medium text-carbon">E-transfer</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-5 inline-flex w-full justify-center rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper hover:bg-arctic"
        >
          Checkout
        </Link>
        <button
          type="button"
          onClick={() => persist([])}
          className="mt-3 inline-flex w-full justify-center rounded-lab border border-carbon/20 px-5 py-3 text-sm text-lab hover:text-carbon"
        >
          Clear cart
        </button>
      </aside>
    </section>
  );
}
