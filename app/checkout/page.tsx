import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Royalis Labs e-transfer checkout with research-use confirmation and final product review."
};

export default function CheckoutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-4 text-sm font-semibold text-arctic">Checkout</p>
        <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
          E-transfer checkout.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-lab">
          Place the order first, then send the e-transfer with only your order number
          in the message section. Do not add anything else. Orders remain payment pending until accepted.
        </p>
      </section>

      <CheckoutClient />
    </>
  );
}
