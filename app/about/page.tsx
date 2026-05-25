import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, MapPinned, Microscope, PackageCheck } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Royalis Labs publishes research peptide product records, product imagery, and testing details."
};

const standards = [
  {
    icon: FileCheck2,
    title: "Third-party testing",
    body: "Royalis states product quality is independently assessed by third-party testing."
  },
  {
    icon: Microscope,
    title: "Batch traceability",
    body: "Published records show product name, result date, purity, mass, and direct lab-result links where available."
  },
  {
    icon: MapPinned,
    title: "Canada-only shipping",
    body: "The Royalis FAQ says orders can only be shipped to addresses within Canada via Canada Post."
  },
  {
    icon: PackageCheck,
    title: "Consistent presentation",
    body: "The catalogue uses the current Royalis product photos captured from live product records."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 md:grid-cols-[1fr_0.9fr] md:px-8 md:py-16">
        <div>
          <p className="mb-4 text-sm font-semibold text-arctic">About</p>
          <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
            Royalis Labs product records, cleaned up.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-lab">
            Royalis Labs describes its catalogue as high-purity research peptides,
            with testing details published for verification where available.
          </p>
          <div className="mt-8">
            <ResearchNotice />
          </div>
        </div>
        <div className="relative min-h-[480px] overflow-hidden rounded-image bg-carbon md:min-h-[620px]">
          <Image
            src="/products/packaging.png"
            alt="Illustration of discreet Royalis Labs shipping packaging"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-carbon/15 bg-paper">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-14 md:grid-cols-4 md:px-8">
          {standards.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="border border-carbon/15 bg-bone p-5">
                <Icon size={20} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
                <h2 className="mt-5 font-display text-2xl leading-tight">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-lab">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 md:grid-cols-2 md:px-8">
        <div>
          <SectionHeader kicker="Testing standard" title="Testing stays close to the product.">
            <p>
              The active product records sit on the product page and in the testing page. Each
              record is indexed by product, batch, lab result, date, purity, and assayed mass where published.
            </p>
          </SectionHeader>
        </div>
        <div className="border border-carbon/15 bg-paper p-6">
          <p className="font-display text-3xl leading-tight">What transparency means here</p>
          <ul className="mt-6 grid gap-4 text-sm leading-6 text-lab">
            <li className="border-b border-carbon/10 pb-4">
              Product photos are visible before the product detail page is opened.
            </li>
            <li className="border-b border-carbon/10 pb-4">
              Testing identifiers are retained where the product record publishes them.
            </li>
            <li className="border-b border-carbon/10 pb-4">
              Support contact details match the original contact page.
            </li>
            <li>Products without current documentation should not enter the active catalogue.</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-carbon/15 bg-carbon text-paper">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div>
            <p className="font-display text-4xl leading-tight">Need a batch verified?</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-paper/70">
              Send the product name or testing identifier. Support contact routes match the
              current Royalis contact page, and research-use boundaries remain visible.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lab bg-paper px-5 py-3 text-sm font-medium text-carbon transition-colors duration-200 ease-lab hover:bg-arctic hover:text-paper"
          >
            Contact support
            <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
