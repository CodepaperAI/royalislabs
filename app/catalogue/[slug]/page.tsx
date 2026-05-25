import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Plus } from "lucide-react";
import { COAFrame } from "@/components/COAFrame";
import { ProductPhoto } from "@/components/ProductPhoto";
import { ResearchNotice } from "@/components/ResearchNotice";
import { coas, getProduct, money, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description:
      product.reportStatus === "available"
        ? `${product.name}. ${product.purity} purity. Direct ${product.lab} report linked.`
        : `${product.name}. Royalis product record with lab result status shown clearly.`
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const coa = coas.find((record) => record.batch === product.batch);
  if (!coa) notFound();

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
        <Link
          href="/catalogue"
          className="inline-flex min-h-11 items-center gap-2 rounded-lab text-sm font-medium text-arctic transition-colors duration-200 ease-lab hover:text-carbon"
        >
          <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
          Catalogue
        </Link>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-12 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <ProductPhoto
          src={product.image}
          alt={`${product.name} Royalis product image`}
          priority
          className="min-h-[520px] shadow-product md:min-h-[720px]"
        />

        <div className="reveal-stagger flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold text-arctic">{product.category}</p>
          <h1 className="font-display text-4xl leading-none text-carbon sm:text-6xl md:text-7xl">{product.name}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-lab">
            {product.reportStatus === "available"
              ? `${product.purity} purity. Lab result linked.`
              : "Product record imported. Lab result pending."}
          </p>

          <div className="mt-8 flex items-end justify-between gap-6 border-y border-carbon/10 bg-mist/60 px-4 py-5">
            <div>
              <p className="text-xs text-lab">Price</p>
              <p className="text-4xl font-semibold text-carbon tabular-nums">{money(product.price)}</p>
            </div>
            <div className="text-right text-sm text-lab">
              <p>{product.format}</p>
              <p>{product.batch}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.labReportUrl ? (
              <Link
                href={product.labReportUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lab border border-arctic px-5 py-3 text-sm font-medium text-arctic transition-colors duration-200 ease-lab hover:bg-arctic hover:text-paper"
              >
                <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
                Testing details
              </Link>
            ) : (
              <div className="flex min-h-11 items-center justify-center rounded-lab border border-carbon/15 px-5 py-3 text-center text-sm font-medium text-lab">
                Testing pending
              </div>
            )}
            {product.reportStatus === "available" ? (
              <Link
                href="/cart"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper transition-colors duration-200 ease-lab hover:bg-arctic"
              >
                <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
                Add to cart
              </Link>
            ) : (
              <div className="flex min-h-11 items-center justify-center rounded-lab bg-carbon/10 px-5 py-3 text-center text-sm font-medium text-carbon/60">
                Awaiting report
              </div>
            )}
          </div>

          <div className="mt-6">
            <ResearchNotice tight />
          </div>
        </div>
      </section>

      <section className="border-y border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="mx-auto grid max-w-[1120px] gap-3 px-4 py-12 md:px-8">
          <details className="group rounded-image border border-carbon/10 bg-paper shadow-soft" open>
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors duration-200 ease-lab hover:bg-mist">
              <span className="font-display text-2xl leading-tight text-carbon">Testing details</span>
              <span className="text-sm text-arctic group-open:hidden">Open</span>
              <span className="hidden text-sm text-lab group-open:inline">Close</span>
            </summary>
            <div className="border-t border-carbon/10 p-4">
              <COAFrame coa={coa} compact />
            </div>
          </details>

          <details className="group rounded-image border border-carbon/10 bg-paper shadow-soft">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors duration-200 ease-lab hover:bg-mist">
              <span className="font-display text-2xl leading-tight text-carbon">Product notes</span>
              <span className="text-sm text-arctic group-open:hidden">Open</span>
              <span className="hidden text-sm text-lab group-open:inline">Close</span>
            </summary>
            <dl className="grid border-t border-carbon/10 text-sm md:grid-cols-2">
              {[
                ["Concentration", product.concentration],
                ["Storage", product.storage],
                ["Format", product.molecular],
                ["Reference", product.referenceStandard]
              ].map(([label, value]) => (
                <div key={label} className="border-b border-carbon/10 p-4 even:md:border-l">
                  <dt className="text-lab">{label}</dt>
                  <dd className="mt-1 font-medium text-carbon">{value}</dd>
                </div>
              ))}
            </dl>
          </details>

          <details className="group rounded-image border border-carbon/10 bg-paper shadow-soft">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors duration-200 ease-lab hover:bg-mist">
              <span className="font-display text-2xl leading-tight text-carbon">Shipping</span>
              <span className="text-sm text-arctic group-open:hidden">Open</span>
              <span className="hidden text-sm text-lab group-open:inline">Close</span>
            </summary>
            <div className="grid gap-3 border-t border-carbon/10 p-5 text-sm leading-6 text-lab md:grid-cols-3">
              <p>Ships within Canada via Canada Post.</p>
              <p>Discreet packaging is listed in the Royalis FAQ.</p>
              <p>Tracking is provided for all orders.</p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
