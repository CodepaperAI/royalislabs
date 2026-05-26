import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { coas, getCoaByBatch } from "@/lib/data";
import type { CoaRecord } from "@/lib/types";

export const metadata: Metadata = {
  title: "Testing",
  description: "Browse Royalis Labs product testing details by product, batch, purity, and date."
};

export default function CoaLibraryPage({ searchParams }: { searchParams?: { batch?: string } }) {
  const defaultCoa = coas.find((coa) => coa.reportStatus === "available") ?? coas[0];
  const selected = searchParams?.batch ? getCoaByBatch(searchParams.batch) : defaultCoa;
  const directCount = coas.filter((coa) => coa.reportStatus === "available").length;
  const statusRank: Record<CoaRecord["reportStatus"], number> = {
    available: 0,
    "source-listed": 1,
    pending: 2
  };
  const visibleCoas = [...coas].sort((a, b) => {
    if (a.batch === selected.batch) return -1;
    if (b.batch === selected.batch) return 1;
    return statusRank[a.reportStatus] - statusRank[b.reportStatus];
  });

  function statusLabel(coa: CoaRecord) {
    if (coa.reportStatus === "available") return "Lab result linked";
    if (coa.reportStatus === "source-listed") return "Lab result listed";
    return "Pending";
  }

  function badgeLabel(coa: CoaRecord) {
    if (coa.reportStatus === "available") return "Linked";
    if (coa.reportStatus === "source-listed") return "Listed";
    return "Pending";
  }

  function resultSummary(coa: CoaRecord) {
    if (coa.reportStatus === "available") return `${coa.lab} lab result is linked for this batch.`;
    if (coa.reportStatus === "source-listed") return `${coa.lab} result is listed; direct lab link is pending.`;
    return "Matching lab result is pending for this Royalis product.";
  }

  return (
    <>
      <section className="border-b border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 py-8 md:grid-cols-[1fr_auto] md:items-end md:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold text-arctic">Testing</p>
            <h1 className="font-display text-3xl leading-tight text-carbon md:text-5xl">
              Testing details at a glance.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-lab">
              Every visible record shows the core data directly: product, batch, purity,
              assayed mass, lab result, date, and status.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
            <div className="hairline-panel bg-paper px-4 py-3 shadow-soft">
              <p className="text-lab">Products</p>
              <p className="mt-1 font-semibold text-carbon tabular-nums">{coas.length}</p>
            </div>
            <div className="hairline-panel bg-paper px-4 py-3 shadow-soft">
              <p className="text-lab">Lab linked</p>
              <p className="mt-1 font-semibold text-carbon tabular-nums">{directCount}</p>
            </div>
            <div className="hairline-panel bg-paper px-4 py-3 shadow-soft">
              <p className="text-lab">Selected</p>
              <p className="mt-1 font-semibold text-carbon tabular-nums">{selected.batch}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 lg:px-8">
        <div className="reveal-stagger grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          {visibleCoas.map((coa) => {
            const isSelected = coa.batch === selected.batch;

            return (
              <article
                key={coa.id}
                className={`interactive-lift relative grid content-between gap-3 rounded-image border bg-paper p-4 focus-within:border-arctic/70 ${
                  isSelected ? "border-arctic shadow-lift" : "border-arctic/10 shadow-soft"
                }`}
              >
                <span
                  className={`absolute right-4 top-4 rounded-lab border px-2 py-1 text-xs font-medium leading-4 ${
                    coa.reportStatus === "available"
                      ? "border-arctic bg-arctic text-paper"
                      : "border-arctic/20 bg-bone text-carbon"
                  }`}
                >
                  {badgeLabel(coa)}
                </span>
                <div className="grid grid-cols-[78px_minmax(0,1fr)] gap-3 sm:grid-cols-[88px_minmax(0,1fr)]">
                  <Link
                    href={`/catalogue/${coa.productSlug}`}
                    className="relative h-28 overflow-hidden rounded-image border border-arctic/10 bg-bone transition-colors duration-200 ease-lab hover:border-arctic/35 hover:bg-mist"
                    aria-label={`View ${coa.productName}`}
                  >
                    <Image
                      src={coa.productImage}
                      alt={`${coa.productName} Royalis product image`}
                      fill
                      sizes="88px"
                      className="object-contain p-2"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="min-w-0 pr-14">
                      <p className="text-xs text-lab">Product</p>
                      <h2 className="mt-1 break-normal font-display text-xl leading-tight text-carbon">
                        <Link
                          href={`/catalogue/${coa.productSlug}`}
                          className="transition-colors duration-200 ease-lab hover:text-arctic"
                        >
                          {coa.productName}
                        </Link>
                      </h2>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-lab">{resultSummary(coa)}</p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  {[
                    ["Batch", coa.batch],
                    ["Purity", coa.purity],
                    ["Mass", coa.assayedMass],
                    ["Lab result", coa.lab],
                    ["Date", coa.testDate],
                    ["Status", statusLabel(coa)]
                  ].map(([label, value]) => (
                    <div key={label} className="hairline-panel bg-mist p-2">
                      <dt className="text-xs text-lab">{label}</dt>
                      <dd className="mt-1 break-words font-medium leading-5 text-carbon">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col items-start gap-3 border-t border-arctic/10 pt-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={`/coa-library?batch=${coa.batch}`}
                    className="inline-flex min-h-11 items-center gap-2 font-medium text-arctic transition-colors duration-200 ease-lab hover:text-carbon"
                  >
                    Select
                    <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                  {coa.reportUrl ? (
                    <a
                      href={coa.reportUrl}
                      className="inline-flex min-h-11 items-center gap-2 font-medium text-arctic transition-colors duration-200 ease-lab hover:text-carbon"
                    >
                      Lab result
                      <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="font-medium text-lab">Lab result pending</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-arctic/10 bg-paper">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-6 text-sm leading-6 text-lab md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            Match the batch shown on a product card with the batch shown here before ordering.
          </p>
          <p className="font-medium text-carbon">
            Selected batch: <span className="text-arctic">{selected.batch}</span>
          </p>
        </div>
      </section>
    </>
  );
}
