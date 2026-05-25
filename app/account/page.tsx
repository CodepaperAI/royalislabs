import type { Metadata } from "next";
import Link from "next/link";
import { FileText, RotateCcw, ShieldCheck } from "lucide-react";
import { getProduct } from "@/lib/data";

export const metadata: Metadata = {
  title: "Account",
  description: "Royalis Labs account area for order history, reorders, saved testing details, and support requests."
};

const accountProducts = ["retatrutide-20mg", "tb-500-10mg", "selank-10mg"]
  .map((slug) => getProduct(slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export default function AccountPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-4 text-sm font-semibold text-arctic">Account</p>
        <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
          Private continuity, not rewards theatre.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-lab">
          Order history doubles as a traceability archive: product, batch, purity, assayed mass, lab result,
          tracking, invoice, and testing detail stay attached to the record.
        </p>
      </section>

      <section className="border-y border-carbon/15 bg-paper">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-8 md:grid-cols-3 md:px-8">
          {[
            ["Orders", "6"],
            ["Saved testing records", "11"],
            ["Open support requests", "0"]
          ].map(([label, value]) => (
            <div key={label} className="border border-carbon/15 bg-bone p-5">
              <p className="text-sm text-lab">{label}</p>
              <p className="mt-2 font-display text-4xl leading-tight text-carbon tabular-nums">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-display text-4xl leading-tight">Order history</h2>
            <Link href="/contact" className="text-sm font-medium text-arctic">
              Start support request
            </Link>
          </div>
          <div className="grid gap-3">
            {accountProducts.map((product, index) => (
              <article key={product.slug} className="border border-arctic/10 bg-paper p-4 shadow-[0_12px_34px_rgba(10,45,94,0.05)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs text-lab">Order RI-2605-{312 + index}</p>
                    <h3 className="mt-1 font-display text-2xl leading-tight text-carbon">{product.name}</h3>
                  </div>
                  <span className="w-fit rounded-lab border border-arctic/20 bg-bone px-2 py-1 text-xs font-medium text-carbon">
                    Delivered
                  </span>
                </div>
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-5">
                  {[
                    ["Batch", product.batch],
                    ["Purity", product.purity],
                    ["Mass", product.assayedMass],
                    ["Lab result", product.lab],
                    ["Testing", product.reportStatus === "available" ? "Linked" : "Pending"]
                  ].map(([label, value]) => (
                    <div key={label} className="border border-arctic/10 bg-bone/60 p-2">
                      <dt className="text-xs text-lab">{label}</dt>
                      <dd className="mt-1 font-medium leading-5 text-carbon">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/coa-library?batch=${product.batch}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-arctic">
                  <FileText size={14} strokeWidth={1.75} aria-hidden="true" />
                  Testing details
                </Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
          <div className="border border-carbon/15 bg-paper p-5">
            <RotateCcw size={18} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl leading-tight">Reorder with current batch review.</h2>
            <p className="mt-3 text-sm leading-6 text-lab">
              Reorder actions send users back through the product page so the current
              batch is reviewed before adding to cart.
            </p>
            <Link href="/catalogue" className="mt-5 inline-flex rounded-lab bg-carbon px-4 py-3 text-sm font-medium text-paper hover:bg-arctic">
              Browse reorder catalogue
            </Link>
          </div>

          <div className="border border-carbon/15 bg-paper p-5">
            <ShieldCheck size={18} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl leading-tight">Saved testing details</h2>
            <p className="mt-3 text-sm leading-6 text-lab">
              Purchase-associated testing details remain available for account review after shipment.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
