"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { money } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductPhoto } from "./ProductPhoto";

export function ProductCard({
  product,
  onViewCoa
}: {
  product: Product;
  onViewCoa?: (product: Product) => void;
}) {
  const isOrderable = product.reportStatus === "available" || product.reportStatus === "not-applicable";
  const reportLabel =
    product.reportStatus === "available"
      ? "Tested"
      : product.reportStatus === "source-listed"
        ? "Listed result"
        : product.reportStatus === "not-applicable"
          ? "Supply item"
          : "Testing pending";
  const assayLabel =
    product.reportStatus === "available"
      ? `${product.purity} purity / ${product.assayedMass} avg. mass`
      : product.reportStatus === "source-listed"
        ? `${product.purity} lab result listed / link pending`
        : product.reportStatus === "not-applicable"
          ? product.assayedMass
          : "Testing pending";
  const proofLabel =
    product.reportStatus === "available"
      ? "Third-party tested"
      : product.reportStatus === "source-listed"
        ? "Result listed"
        : product.reportStatus === "not-applicable"
          ? "Not required"
          : "Pending";

  return (
    <article className="interactive-lift group grid overflow-hidden rounded-image border border-arctic/10 bg-paper shadow-soft focus-within:border-arctic/60">
      <Link
        href={`/catalogue/${product.slug}`}
        className="relative block aspect-[4/5] bg-bone focus-visible:outline-offset-[-4px]"
      >
        <ProductPhoto
          src={product.image}
          alt={`Royalis research vial labelled ${product.name}, batch ${product.batch}`}
          className="h-full"
          thumbnail
          sizes="(max-width: 768px) 100vw, 28vw"
        />
        <span className="absolute left-3 top-3 rounded-lab border border-arctic/15 bg-paper/95 px-2 py-1 text-xs font-medium text-arctic shadow-rule">
          {reportLabel}
        </span>
        <span className="absolute right-3 top-3 rounded-lab bg-carbon px-2.5 py-1 text-sm font-semibold text-paper shadow-rule tabular-nums">
          {money(product.price)}
        </span>
      </Link>

      <div className="grid gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-lab">{product.category}</p>
            <h3 className="mt-1 font-display text-2xl leading-tight text-carbon">
              <Link href={`/catalogue/${product.slug}`} className="transition-colors duration-200 ease-lab hover:text-arctic">
                {product.name}
              </Link>
            </h3>
          </div>
        </div>

        <p className="text-sm text-lab">{assayLabel}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-lab">
          <span className="hairline-panel rounded-lab bg-mist px-2 py-2">
            <span className="block text-[11px] uppercase text-lab">Format</span>
            <span className="mt-1 block font-medium normal-case text-carbon">Single vial</span>
          </span>
          <span className="hairline-panel rounded-lab bg-mist px-2 py-2">
            <span className="block text-[11px] uppercase text-lab">Lab result</span>
            <span className="mt-1 block font-medium normal-case text-carbon">{proofLabel}</span>
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          {onViewCoa ? (
            <button
              type="button"
              onClick={() => onViewCoa(product)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lab border border-arctic px-3 py-2 text-sm font-medium text-arctic transition-colors duration-200 ease-lab hover:bg-arctic hover:text-paper"
            >
              <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
              Testing
            </button>
          ) : (
            <Link
              href={`/coa-library?batch=${product.batch}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lab border border-arctic px-3 py-2 text-sm font-medium text-arctic transition-colors duration-200 ease-lab hover:bg-arctic hover:text-paper"
            >
              <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
              Testing
            </Link>
          )}
          {isOrderable ? (
            <AddToCartButton
              productSlug={product.slug}
              label="Add"
              compact
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lab bg-carbon px-3 py-2 text-sm font-medium text-paper transition-colors duration-200 ease-lab hover:bg-arctic"
            />
          ) : (
            <Link
              href={`/catalogue/${product.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lab bg-carbon/10 px-3 py-2 text-sm font-medium text-carbon/70 transition-colors duration-200 ease-lab hover:bg-carbon hover:text-paper"
            >
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
              View
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
