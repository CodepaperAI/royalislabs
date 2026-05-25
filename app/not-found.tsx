import Link from "next/link";
import { FileText } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[900px] px-4 py-20 text-center md:px-8">
      <p className="mb-4 text-sm font-semibold text-arctic">404</p>
      <h1 className="font-display text-3xl leading-tight text-carbon md:text-5xl">This record is not in the catalogue.</h1>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-lab">
        Search active products or check testing details before continuing.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/catalogue" className="rounded-lab bg-carbon px-5 py-3 text-sm font-medium text-paper hover:bg-arctic">
          View catalogue
        </Link>
        <Link href="/coa-library" className="inline-flex items-center justify-center gap-2 rounded-lab border border-arctic px-5 py-3 text-sm font-medium text-arctic hover:bg-arctic hover:text-paper">
          <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
          Testing details
        </Link>
      </div>
    </section>
  );
}
