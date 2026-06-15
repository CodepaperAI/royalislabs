"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CreditCard, FileText, PackageCheck } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";
import {
  calculateShipping,
  CART_STORAGE_KEY,
  type CartLine,
  parseStoredCart
} from "@/lib/cart";
import { getProduct, money } from "@/lib/data";
import { productThumbnail } from "@/lib/product-images";

type CheckoutForm = {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
};

type OrderResponse = {
  orderNumber: number;
  status: "Payment pending";
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
  etransfer: {
    payee: string;
    email: string;
  };
};

const initialForm: CheckoutForm = {
  email: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: ""
};

export function CheckoutClient() {
  const [items, setItems] = useState<CartLine[]>([]);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<OrderResponse | null>(null);

  useEffect(() => {
    setItems(parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY)));
    setHydrated(true);
  }, []);

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
  const total = subtotal + shipping;

  function updateField(name: keyof CheckoutForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!cartItems.length) {
      setError("Your cart is empty. Add products before placing an order.");
      return;
    }

    setSubmitting(true);

    try {
      const address = {
        name: form.fullName,
        address: form.address,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode,
        country: "Canada"
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            email: form.email,
            fullName: form.fullName,
            phone: form.phone
          },
          billingAddress: address,
          shippingAddress: address,
          items: cartItems.map(({ product, qty }) => ({ slug: product.slug, qty })),
          paymentMethod: "etransfer"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to place order. Please review the form and try again.");
      }

      window.localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new Event("royalis-cart-updated"));
      setItems([]);
      setConfirmation(data as OrderResponse);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to place order.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center md:px-8">
        <p className="font-display text-3xl leading-tight text-carbon md:text-5xl">Loading checkout.</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-lab">
          Preparing your cart and payment details.
        </p>
      </section>
    );
  }

  if (confirmation) {
    return (
      <section className="mx-auto grid max-w-[1120px] gap-6 px-4 py-12 md:px-8 md:py-16">
        <div className="border border-arctic/20 bg-paper p-5 shadow-product md:p-8">
          <CheckCircle2 size={34} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
          <p className="mt-5 text-sm font-semibold text-arctic">Order #{confirmation.orderNumber}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-carbon md:text-6xl">
            Payment pending.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-lab">
            Your order has been received. Please send the e-transfer using the instructions below.
            A confirmation email has been prepared with the same details. Royalis will match
            payment by the order number in the transfer comment.
          </p>

          <div className="mt-6 border-2 border-arctic bg-arctic/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-arctic">
              Required transfer comment
            </p>
            <p className="mt-3 font-display text-5xl leading-none text-carbon md:text-7xl">
              {confirmation.orderNumber}
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-carbon">
              Enter only this order number in the Interac e-transfer message section.
              Do not add anything else, including product names, notes, or extra text.
            </p>
          </div>

          <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
            {[
              ["Payee", confirmation.etransfer.payee],
              ["E-transfer email", confirmation.etransfer.email],
              ["Status", confirmation.status]
            ].map(([label, value]) => (
              <div key={label} className="border border-arctic/10 bg-mist p-4">
                <p className="text-lab">{label}</p>
                <p className="mt-1 font-semibold text-carbon">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-carbon/10 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-lab">Subtotal</span>
              <span className="font-medium tabular-nums">{money(confirmation.totals.subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between gap-4">
              <span className="text-lab">Shipping</span>
              <span className="font-medium tabular-nums">
                {confirmation.totals.shipping === 0 ? "Free" : money(confirmation.totals.shipping)}
              </span>
            </div>
            <div className="mt-2 flex justify-between gap-4 text-base">
              <span className="font-semibold text-carbon">Total</span>
              <span className="font-semibold text-carbon tabular-nums">{money(confirmation.totals.total)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalogue" className="inline-flex min-h-11 items-center justify-center rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper hover:bg-arctic">
              Continue shopping
            </Link>
            <Link href="/coa-library" className="inline-flex min-h-11 items-center justify-center rounded-lab border border-arctic px-5 py-3 text-sm font-medium text-arctic hover:bg-arctic hover:text-paper">
              Review lab results
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center md:px-8">
        <p className="font-display text-3xl leading-tight text-carbon md:text-5xl">Checkout needs a cart.</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-lab">
          Add Royalis products before starting the e-transfer order flow.
        </p>
        <Link href="/catalogue" className="mt-8 inline-flex rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper hover:bg-arctic">
          View catalogue
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-16 lg:grid-cols-[1fr_420px] lg:px-8">
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="border-2 border-arctic bg-arctic/10 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-arctic">
            Payment first
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-carbon">E-transfer instructions</h2>
          <label className="mt-5 flex items-center gap-3 border border-arctic bg-paper p-4 text-sm font-medium text-carbon">
            <input type="radio" name="payment" value="etransfer" defaultChecked className="accent-arctic" />
            <CreditCard size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
            E-transfer
          </label>
          <div className="mt-4 grid gap-2 text-sm leading-6 text-lab">
            <p>Send payment to info@royalislabs.com after placing the order.</p>
            <p className="border border-arctic/20 bg-paper px-3 py-2 font-semibold text-carbon">
              In the Interac e-transfer message section, enter only the generated order number. Do not add anything else.
            </p>
            <p>Payment acceptance is usually confirmed within 24 hours or less.</p>
          </div>
        </div>

        <div className="border border-carbon/15 bg-paper p-5">
          <h2 className="font-display text-3xl leading-tight">Contact and shipping</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["email", "Email", "email"],
              ["fullName", "Full name", "text"],
              ["phone", "Phone", "tel"],
              ["address", "Address", "text"],
              ["city", "City", "text"],
              ["province", "Province", "text"],
              ["postalCode", "Postal code", "text"]
            ].map(([name, label, type]) => (
              <label key={name} className="block text-sm font-medium text-carbon">
                {label}
                <input
                  required
                  type={type}
                  value={form[name as keyof CheckoutForm]}
                  onChange={(event) => updateField(name as keyof CheckoutForm, event.target.value)}
                  className="mt-2 w-full rounded-lab border border-carbon/20 bg-bone px-3 py-3 text-sm"
                />
              </label>
            ))}
          </div>
          <div className="mt-5 grid gap-3 border border-carbon/15 bg-bone p-4 text-sm leading-6 text-lab">
            <span className="inline-flex items-center gap-2 font-medium text-carbon">
              <PackageCheck size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
              Canada Post tracked delivery
            </span>
            Exterior packaging is neutral. Orders ship by Canada Post after e-transfer payment has been accepted.
          </div>
        </div>

        {error ? (
          <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          disabled={submitting}
          className="w-full rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper transition-colors duration-200 ease-lab hover:bg-arctic disabled:cursor-not-allowed disabled:bg-carbon/35"
          type="submit"
        >
          {submitting ? "Placing order..." : "Place e-transfer order"}
        </button>
      </form>

      <aside className="h-fit border border-carbon/15 bg-paper p-5 lg:sticky lg:top-24">
        <h2 className="font-display text-3xl leading-tight">Order review</h2>
        <div className="mt-5 grid gap-4">
          {cartItems.map(({ product, qty }) => (
            <article key={product.slug} className="border-b border-carbon/10 pb-4 last:border-b-0">
              <div className="grid grid-cols-[64px_1fr_auto] gap-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-image border border-arctic/10 bg-paper">
                  <Image
                    src={productThumbnail(product.image)}
                    alt={`${product.name} product image`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <p className="font-medium text-carbon">{product.name}</p>
                  <p className="text-sm text-lab">Qty {qty}</p>
                </div>
                <p className="text-sm font-semibold tabular-nums">{money(product.price * qty)}</p>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-lab">Batch</dt>
                  <dd className="font-medium text-carbon">{product.batch}</dd>
                </div>
                <div>
                  <dt className="text-lab">Purity</dt>
                  <dd className="font-medium text-carbon">{product.purity}</dd>
                </div>
                <div>
                  <dt className="text-lab">Mass</dt>
                  <dd className="font-medium text-carbon">{product.assayedMass}</dd>
                </div>
                <div>
                  <dt className="text-lab">Lab result</dt>
                  <dd className="font-medium text-carbon">{product.lab}</dd>
                </div>
              </dl>
              <Link
                href={`/coa-library?batch=${product.batch}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-arctic"
              >
                <FileText size={14} strokeWidth={1.75} aria-hidden="true" />
                Testing details
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-5 border-t border-carbon/15 pt-5 text-sm">
          <div className="flex justify-between">
            <span className="text-lab">Subtotal</span>
            <span className="font-medium text-carbon tabular-nums">{money(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-lab">Shipping</span>
            <span className="font-medium text-carbon tabular-nums">{shipping === 0 ? "Free" : money(shipping)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-carbon/10 pt-3 text-base">
            <span className="font-semibold text-carbon">Total</span>
            <span className="font-semibold text-carbon tabular-nums">{money(total)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-lab">Payment method</span>
            <span className="font-medium text-carbon">E-transfer</span>
          </div>
        </div>
        <div className="mt-5">
          <ResearchNotice tight />
        </div>
      </aside>
    </section>
  );
}
