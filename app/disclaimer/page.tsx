import type { Metadata } from "next";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Royalis Labs research-use disclaimer and non-medical-use boundaries."
};

const disclaimerItems = [
  "Royalis Labs products are not medicines, supplements, cosmetics, foods, or therapeutic products.",
  "No product content on this site should be interpreted as medical advice, diagnosis, treatment, dosing, administration, or outcome guidance.",
  "Product names, images, and lab results are provided for catalogue identification and batch verification only.",
  "Customers are responsible for lawful purchase, possession, handling, storage, and research use of materials."
];

export default function DisclaimerPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1120px] gap-8 px-4 py-12 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-16">
        <div>
          <p className="mb-4 text-sm font-semibold text-arctic">Disclaimer</p>
          <h1 className="font-display text-4xl leading-tight text-carbon md:text-6xl">
            Not for human or animal use.
          </h1>
          <p className="mt-5 text-base leading-7 text-lab">
            This page clarifies the boundaries around Royalis Labs product listings,
            testing information, and research-use language.
          </p>
        </div>
        <div className="border border-arctic/10 bg-paper p-5 shadow-product md:p-7">
          <ShieldCheck size={26} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl leading-tight text-carbon">
            Scientific laboratory research only.
          </h2>
          <p className="mt-4 text-sm leading-6 text-lab">
            Royalis Labs does not represent that products are safe, effective, or appropriate
            for human or veterinary use. The site avoids therapeutic claims and keeps product
            details focused on catalogue identification and lab-result matching.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-4 px-4 pb-16 md:px-8">
        {disclaimerItems.map((item) => (
          <div key={item} className="flex gap-3 border border-arctic/10 bg-paper p-4 text-sm leading-6 text-lab">
            <AlertTriangle size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-arctic" aria-hidden="true" />
            <p>{item}</p>
          </div>
        ))}

        <ResearchNotice />
      </section>
    </>
  );
}
