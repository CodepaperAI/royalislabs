import type { Metadata } from "next";
import { CartClient } from "./CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review Royalis Labs cart line items with batch, purity, assayed mass, lab result, and testing links."
};

export default function CartPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-4 text-sm font-semibold text-arctic">Cart</p>
        <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
          Product details stay in the cart.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-lab">
          Line items retain batch number, purity, assayed mass, lab result, and testing access before checkout.
        </p>
      </section>
      <CartClient />
    </>
  );
}
