import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { TrustStrip } from "@/components/TrustStrip";
import { categories, featuredOrder, getProduct, money, products } from "@/lib/data";
import { productThumbnail } from "@/lib/product-images";

const featuredProducts = featuredOrder
  .map((slug) => getProduct(slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const heroProducts = ["retatrutide-10mg", "ghk-cu-50mg"]
  .map((slug) => getProduct(slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));
const testedCount = products.filter((product) => product.reportStatus === "available").length;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-carbon">
        <div className="mx-auto grid min-h-[650px] w-full max-w-[1440px] items-center gap-10 px-4 py-12 md:grid-cols-[1fr_0.86fr] md:px-8 lg:min-h-[720px]">
          <div className="reveal-stagger flex w-full min-w-0 flex-col justify-center md:max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-arctic">
              Enjoy free shipping on orders over $200+
            </p>
            <h1 className="max-w-full break-words font-display text-[2.2rem] leading-[1.06] text-carbon [text-wrap:wrap] sm:text-6xl sm:leading-[0.96] lg:text-7xl">
              High-Purity, Third-Party Verified Peptides
              <span className="block text-arctic">By Royalis Labs</span>
            </h1>
            <p className="mt-6 max-w-full text-base leading-7 text-lab [text-wrap:wrap] sm:max-w-2xl md:text-xl md:leading-9">
              Every batch is independently verified by third-party labs. Every product is backed by
              published lab results. Trusted by researchers worldwide.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalogue"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lab bg-carbon px-6 py-3 text-sm font-semibold text-paper shadow-soft transition-colors duration-200 ease-lab hover:bg-arctic"
              >
                View products
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <Link
                href="/coa-library"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lab border border-arctic bg-paper px-6 py-3 text-sm font-semibold text-arctic shadow-rule transition-colors duration-200 ease-lab hover:bg-arctic hover:text-paper"
              >
                Lab results
                <Sparkles size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-lab">
              {products.length} products / {testedCount} tested lots listed
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:justify-self-end">
            {heroProducts.map((product, index) => (
              <Link
                key={product.slug}
                href={`/catalogue/${product.slug}`}
                className="interactive-lift group relative min-h-[235px] overflow-hidden rounded-image border border-arctic/10 bg-paper shadow-product motion-safe:animate-product-rise sm:min-h-[430px] md:w-[240px] lg:w-[280px]"
                style={{ animationDelay: `${index * 90}ms` }}
                aria-label={`${product.name}, ${money(product.price)}`}
              >
                <Image
                  src={productThumbnail(product.image)}
                  alt={`${product.name} Royalis product image`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 50vw, 280px"
                  className="object-contain p-5 transition-transform duration-300 ease-snap motion-safe:group-hover:scale-[1.03] sm:p-8 md:p-10"
                />
                <span className="absolute bottom-3 right-3 rounded-lab border border-arctic/15 bg-paper px-3 py-2 text-sm font-semibold text-carbon shadow-soft tabular-nums sm:bottom-4 sm:right-4 sm:px-4 sm:text-lg">
                  {money(product.price)}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </section>

      <TrustStrip />

      <section className="mx-auto w-full max-w-[1440px] px-4 py-14 md:px-8">
        <div className="mb-7 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-semibold text-arctic">Products</p>
            <h2 className="mt-2 font-display text-4xl leading-tight text-carbon md:text-5xl">
              Current Royalis catalogue.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-lab">
              Price, strength, product imagery, and testing status stay visible without turning the page into a document archive.
            </p>
          </div>
          <Link href="/catalogue" className="inline-flex items-center gap-2 text-sm font-medium text-arctic">
            View all
            <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/catalogue"
            className="inline-flex min-h-11 shrink-0 items-center rounded-lab border border-arctic bg-arctic px-3 py-2 text-sm text-paper"
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/catalogue?category=${encodeURIComponent(category.name)}`}
              className="inline-flex min-h-11 shrink-0 items-center rounded-lab border border-arctic/20 bg-paper px-3 py-2 text-sm text-carbon transition-colors duration-200 ease-lab hover:border-arctic hover:text-arctic"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="reveal-stagger grid gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-arctic/10 bg-paper">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-10 md:grid-cols-[1fr_1fr] md:px-8">
          <div>
            <h2 className="font-display text-3xl leading-tight text-carbon">Batch drop notifications</h2>
            <p className="mt-3 text-sm leading-6 text-lab">
              Get notified when new products and tested lots go live.
            </p>
          </div>
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]" aria-label="Batch drop notifications">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="research@domain.ca"
              className="min-h-11 w-full rounded-lab border border-carbon/20 bg-mist px-3 py-3 text-sm transition-colors duration-200 ease-lab focus:border-arctic"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper transition-colors duration-200 ease-lab hover:bg-arctic"
            >
              Notify me
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
