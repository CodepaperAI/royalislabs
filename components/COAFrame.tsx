import Image from "next/image";
import Link from "next/link";
import type { CoaRecord } from "@/lib/types";

export function COAFrame({ coa, compact = false }: { coa: CoaRecord; compact?: boolean }) {
  const hasDirectReport = Boolean(coa.reportUrl);

  return (
    <section className="overflow-hidden rounded-image border border-arctic/10 bg-paper shadow-soft">
      <div className="grid gap-3 border-b border-arctic/10 bg-mist/70 p-4 md:grid-cols-5">
        <div>
          <p className="text-xs text-lab">Batch</p>
          <p className="font-medium text-carbon">{coa.batch}</p>
        </div>
        <div>
          <p className="text-xs text-lab">Purity</p>
          <p className="font-medium text-carbon">{coa.purity}</p>
        </div>
        <div>
          <p className="text-xs text-lab">Assayed mass</p>
          <p className="font-medium text-carbon">{coa.assayedMass}</p>
        </div>
        <div>
          <p className="text-xs text-lab">Lab result</p>
          <p className="font-medium text-carbon">{coa.lab}</p>
        </div>
        <div>
          <p className="text-xs text-lab">Test date</p>
          <p className="font-medium text-carbon">{coa.testDate}</p>
        </div>
      </div>
      {coa.pdf ? (
        <div className={compact ? "h-[360px]" : "h-[620px]"}>
          <iframe
            src={`${coa.pdf}#toolbar=0&navpanes=0`}
            title={`${coa.productName} testing record ${coa.batch}`}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className={`grid bg-paper text-carbon ${compact ? "md:grid-cols-[180px_1fr]" : "md:grid-cols-[0.38fr_0.62fr]"}`}>
          <div className={`relative bg-bone ${compact ? "min-h-[240px]" : "min-h-[420px]"}`}>
            <Image
              src={coa.productImage}
              alt={`${coa.productName} product photography`}
              fill
              sizes={compact ? "180px" : "(max-width: 768px) 100vw, 32vw"}
              className="object-contain p-4"
            />
          </div>
          <div className="grid content-between gap-8 p-5 md:p-8">
            <div>
              <p className="text-sm font-semibold text-arctic">
                {hasDirectReport ? "Lab result linked" : "Testing status"}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
                {hasDirectReport ? "Third-party result available." : "Lab result pending."}
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-6 text-lab">
                {hasDirectReport
                  ? "This matched Janoshik link is kept here as a supporting product detail."
                  : coa.sourceNote ?? "A matching third-party lab result is not linked for this product yet."}
              </p>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div className="hairline-panel bg-mist p-3">
                <p className="text-lab">Product</p>
                <p className="mt-1 font-medium">{coa.productName}</p>
              </div>
              <div className="hairline-panel bg-mist p-3">
                <p className="text-lab">Batch</p>
                <p className="mt-1 font-medium">{coa.batch}</p>
              </div>
              <div className="hairline-panel bg-mist p-3">
                <p className="text-lab">Status</p>
                <p className="mt-1 font-medium">
                  {coa.reportStatus === "available"
                    ? "Available"
                    : coa.reportStatus === "source-listed"
                      ? "Lab result listed"
                      : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-arctic/10 bg-paper p-4 text-sm">
        <span className="text-lab">Record: {coa.method}</span>
        {coa.reportUrl ? (
          <Link
            href={coa.reportUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center font-medium text-arctic transition-colors duration-200 ease-lab hover:text-carbon"
          >
            Open lab result
          </Link>
        ) : coa.pdf ? (
          <Link
            href={coa.pdf}
            className="inline-flex min-h-11 items-center font-medium text-arctic transition-colors duration-200 ease-lab hover:text-carbon"
          >
            Open PDF
          </Link>
        ) : (
          <span className="font-medium text-lab">Lab result pending</span>
        )}
      </div>
    </section>
  );
}
