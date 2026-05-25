import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Canada-only shipping, discreet packaging, tracking, and final-sale return policy for Royalis Labs."
};

const policyBlocks = [
  {
    icon: Truck,
    title: "Shipping promise",
    body: "Most orders ship the same business day, with standard delivery ETAs averaging 1-2 business days."
  },
  {
    icon: PackageCheck,
    title: "Packaging proof",
    body: "The Royalis FAQ lists domestic Canada Post delivery in discreet packaging."
  },
  {
    icon: AlertTriangle,
    title: "Exceptions and delays",
    body: "Remote or rural delivery and courier delays can extend the listed average ETA."
  },
  {
    icon: CheckCircle2,
    title: "Final-sale policy",
    body: "The Royalis FAQ says all sales are final and returns are not accepted because of product and inventory conditions."
  }
];

export default function ShippingReturnsPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-16">
        <div>
          <p className="mb-4 text-sm font-semibold text-arctic">Shipping & Returns</p>
          <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
            Canada-only, tracked, discreet.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-lab">
            Orders ship domestically via Canada Post, with tracking and discreet packaging.
            The Royalis FAQ states all sales are final.
          </p>
        </div>
        <div className="flex min-h-[420px] flex-col justify-between rounded-image border border-arctic/10 bg-paper p-6 shadow-[0_24px_72px_rgba(10,45,94,0.08)] md:min-h-[560px] md:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-arctic/10 pb-5">
            <div>
              <p className="text-sm font-semibold text-arctic">Tracked domestic delivery</p>
              <p className="mt-1 text-sm text-lab">Canada-only fulfilment</p>
            </div>
            <PackageCheck size={28} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
          </div>
          <div className="grid gap-4">
            {[
              ["Carrier", "Canada Post"],
              ["Exterior", "Discreet packaging"],
              ["Tracking", "Provided after shipment"],
              ["Returns", "Final sale per Royalis FAQ"]
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[0.36fr_0.64fr] border-b border-arctic/10 pb-4 last:border-b-0">
                <p className="text-sm text-lab">{label}</p>
                <p className="text-sm font-medium text-carbon">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-arctic/10 bg-paper">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-14 md:grid-cols-4 md:px-8">
          {policyBlocks.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="border border-arctic/10 bg-paper p-5 shadow-[0_12px_36px_rgba(10,45,94,0.05)]">
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
          <SectionHeader kicker="Return limits" title="Firm rules protect chain-of-custody.">
            <p>
              The Royalis FAQ states that all sales are final and returns are not accepted.
              Quality questions should be sent by email so Royalis Labs can try to assist.
            </p>
          </SectionHeader>
          <div className="mt-8">
            <ResearchNotice />
          </div>
        </div>

        <div className="border border-carbon/15 bg-paper">
          {[
            ["Shipping area", "Orders can only be shipped to addresses within Canada."],
            ["Carrier", "Orders ship domestically via Canada Post."],
            ["Timing", "Most orders ship same business day; average ETA is 1-2 business days."],
            ["Returns", "All sales are final according to the Royalis FAQ."]
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[0.4fr_0.6fr] border-b border-carbon/10 last:border-b-0">
              <p className="p-4 text-sm font-medium text-carbon">{label}</p>
              <p className="p-4 text-sm leading-6 text-lab">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
