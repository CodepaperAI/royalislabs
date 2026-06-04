"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { COAFrame } from "@/components/COAFrame";
import { ProductCard } from "@/components/ProductCard";
import { ResearchNotice } from "@/components/ResearchNotice";
import { categories, coas, products } from "@/lib/data";
import type { Category, Product } from "@/lib/types";

const statusRank = {
  available: 0,
  "source-listed": 1,
  "not-applicable": 2,
  pending: 3
};

export function CatalogueClient({ initialCategory }: { initialCategory?: string }) {
  const validInitial = categories.some((category) => category.name === initialCategory)
    ? (initialCategory as Category)
    : "All";
  const [category, setCategory] = useState<Category | "All">(validInitial);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products
      .filter((product) => {
        const categoryMatch = category === "All" || product.category === category;
        const queryMatch =
          !search ||
          [product.name, product.sku, product.batch, product.lab, product.category]
            .join(" ")
            .toLowerCase()
            .includes(search);
        return categoryMatch && queryMatch;
      })
      .sort((a, b) => statusRank[a.reportStatus] - statusRank[b.reportStatus]);
  }, [category, query]);

  const activeCategory = category === "All" ? null : categories.find((item) => item.name === category);
  const selectedCoa = selectedProduct
    ? coas.find((coa) => coa.batch === selectedProduct.batch)
    : null;

  return (
    <>
      <section className="border-y border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <label className="block">
              <span className="text-sm font-medium text-carbon">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Product, batch, purity"
                className="mt-2 min-h-11 w-full rounded-lab border border-arctic/20 bg-paper px-3 py-3 text-sm shadow-rule transition-colors duration-200 ease-lab focus:border-arctic"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-carbon">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as Category | "All")}
                className="mt-2 min-h-11 w-full rounded-lab border border-arctic/20 bg-paper px-3 py-3 text-sm shadow-rule transition-colors duration-200 ease-lab focus:border-arctic"
              >
                <option value="All">All categories</option>
                {categories.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className={`min-h-11 shrink-0 rounded-lab border px-3 py-2 text-sm transition-colors duration-200 ease-lab ${
                category === "All"
                  ? "border-arctic bg-arctic text-paper"
                  : "border-arctic/20 bg-paper text-carbon hover:border-arctic hover:text-arctic"
              }`}
            >
              All
            </button>
            {categories.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setCategory(item.name)}
                className={`min-h-11 shrink-0 rounded-lab border px-3 py-2 text-sm transition-colors duration-200 ease-lab ${
                  category === item.name
                    ? "border-arctic bg-arctic text-paper"
                    : "border-arctic/20 bg-paper text-carbon hover:border-arctic hover:text-arctic"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
        {activeCategory ? (
          <div className="mb-6 hairline-panel bg-paper px-4 py-3 text-sm leading-6 text-lab shadow-soft">
            <strong className="text-carbon">{activeCategory.name}:</strong> {activeCategory.description}
          </div>
        ) : null}

        <div className="mb-4 flex items-center justify-between gap-4 text-sm text-lab">
          <p>
            <span className="font-medium text-carbon tabular-nums">{filteredProducts.length}</span> products
          </p>
          <p>Images, pricing, strength, and testing status first.</p>
        </div>

        <div className="reveal-stagger grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} onViewCoa={setSelectedProduct} />
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border border-carbon/15 bg-paper p-8 text-center">
            <p className="font-display text-3xl">No matching batch records.</p>
            <p className="mt-3 text-sm text-lab">Try a product name, batch number, or purity value.</p>
          </div>
        ) : null}
      </section>

      <section className="border-t border-arctic/10 bg-paper">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
          <ResearchNotice />
        </div>
      </section>

      {selectedProduct && selectedCoa ? (
        <div
          className="fixed inset-0 z-50 bg-carbon/70 p-3 backdrop-blur-sm md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Testing quick view"
        >
          <div className="mx-auto flex max-h-full max-w-5xl animate-soft-reveal flex-col overflow-hidden rounded-image bg-paper shadow-product">
            <div className="flex items-start justify-between gap-4 border-b border-arctic/10 p-4">
              <div>
                <p className="text-sm text-lab">Testing quick view</p>
                <h2 className="font-display text-3xl leading-tight text-carbon">{selectedProduct.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="grid h-11 w-11 place-items-center rounded-lab border border-carbon/20 transition-colors duration-200 ease-lab hover:bg-bone"
                aria-label="Close testing quick view"
              >
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <COAFrame coa={selectedCoa} compact />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
