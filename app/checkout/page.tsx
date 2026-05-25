import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, FileText, PackageCheck } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";
import { getProduct, money } from "@/lib/data";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Royalis Labs checkout with research-use confirmation, discreet shipping, and final product review."
};

const orderProducts = ["retatrutide-20mg", "semax-10mg-2"]
  .map((slug) => getProduct(slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export default function CheckoutPage() {
  const subtotal = orderProducts.reduce((total, product) => total + product.price, 0);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-4 text-sm font-semibold text-arctic">Checkout</p>
        <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
          Controlled, compact, clear.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-lab">
          Shipping, payment, and final batch review stay on one mobile-first path.
          Testing details remain available without taking over checkout.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-16 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="grid gap-6">
          <form className="border border-carbon/15 bg-paper p-5">
            <h2 className="font-display text-3xl leading-tight">Contact and shipping</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {["Email", "Full name", "Address", "City", "Province", "Postal code"].map((label) => (
                <label key={label} className="block text-sm font-medium text-carbon">
                  {label}
                  <input className="mt-2 w-full rounded-lab border border-carbon/20 bg-bone px-3 py-3 text-sm" />
                </label>
              ))}
            </div>
            <div className="mt-5 grid gap-3 border border-carbon/15 bg-bone p-4 text-sm leading-6 text-lab">
              <span className="inline-flex items-center gap-2 font-medium text-carbon">
                <PackageCheck size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
                Discreet tracked delivery
              </span>
              Exterior packaging is neutral. Current-batch testing access remains in account history.
            </div>
          </form>

          <form className="border border-carbon/15 bg-paper p-5">
            <h2 className="font-display text-3xl leading-tight">Payment</h2>
            <div className="mt-5 grid gap-3">
              <label className="flex items-center gap-3 border border-arctic bg-arctic/10 p-4 text-sm">
                <input type="radio" name="payment" defaultChecked className="accent-arctic" />
                <CreditCard size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
                Store payment method
              </label>
            </div>
            <p className="mt-4 text-sm leading-6 text-lab">
              Payment options should follow the active Royalis Labs store configuration.
            </p>
          </form>
        </div>

        <aside className="h-fit border border-carbon/15 bg-paper p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-3xl leading-tight">Order review</h2>
          <div className="mt-5 grid gap-4">
            {orderProducts.map((product) => (
              <article key={product.slug} className="border-b border-carbon/10 pb-4 last:border-b-0">
                <div className="grid grid-cols-[64px_1fr_auto] gap-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-image border border-arctic/10 bg-paper">
                    <Image src={product.image} alt={`${product.name} product image`} fill sizes="64px" className="object-contain p-1" />
                  </div>
                  <div>
                    <p className="font-medium text-carbon">{product.name}</p>
                    <p className="text-sm text-lab">{product.format}</p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums">{money(product.price)}</p>
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
                  <div className="col-span-2">
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
              <span className="font-medium text-carbon">Calculated</span>
            </div>
          </div>
          <div className="mt-5">
            <ResearchNotice tight />
          </div>
          <div className="mt-5 border border-arctic bg-arctic/10 p-4 text-sm leading-6 text-carbon">
            <p className="font-medium">Confirmation preview</p>
            <p className="mt-2 text-lab">
              Order number, tracking expectations, support contact, and testing access are shown
              immediately after payment.
            </p>
          </div>
          <button className="mt-5 w-full rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper hover:bg-arctic" type="button">
            Place order
          </button>
        </aside>
      </section>
    </>
  );
}
