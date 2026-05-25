import type { Metadata } from "next";
import { CatalogueClient } from "./CatalogueClient";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Browse Royalis Labs product photography with product pricing, strength, and testing status."
};

export default function CataloguePage({
  searchParams
}: {
  searchParams?: { category?: string };
}) {
  return (
    <>
      <section className="border-b border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="reveal-stagger mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-4 text-sm font-semibold text-arctic">Catalogue</p>
        <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
          Products.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-lab">
          Browse Royalis lots with product imagery, price, purity, average mass, and report status kept in view.
        </p>
        </div>
      </section>
      <CatalogueClient initialCategory={searchParams?.category} />
    </>
  );
}
