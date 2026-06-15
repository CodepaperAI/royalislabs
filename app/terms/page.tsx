import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Royalis Labs research-use terms, ordering conditions, payment, shipping, and final-sale acknowledgement."
};

const terms = [
  {
    title: "Research-use restriction",
    body: "Products are sold strictly for in-vitro scientific laboratory research. They are not sold for human or animal consumption, cosmetic use, dietary supplementation, diagnosis, treatment, or therapeutic use."
  },
  {
    title: "Eligibility",
    body: "By using this site, you confirm that you are at least 18 years old, or the age of majority in your jurisdiction, whichever is higher."
  },
  {
    title: "Customer responsibility",
    body: "You are responsible for confirming that your purchase, possession, handling, and use of materials complies with applicable laws and institutional safety protocols."
  },
  {
    title: "No medical guidance",
    body: "Royalis Labs does not provide medical advice, dosing instructions, administration guidance, or reconstitution guidance for human use."
  },
  {
    title: "Payment",
    body: "E-transfer orders are received as payment pending. Orders are processed after payment is accepted and matched to the order number. Customers must enter only the order number in the transfer message section and must not add anything else."
  },
  {
    title: "Final sale",
    body: "All sales are final due to the nature of these materials. Shipping concerns should be handled through the Shipping & Returns policy."
  }
];

export default function TermsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1120px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-4 text-sm font-semibold text-arctic">Terms & Conditions</p>
        <h1 className="font-display text-4xl leading-tight text-carbon md:text-6xl">
          Research-use ordering terms.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-lab">
          These terms set the customer-facing boundaries for Royalis Labs catalogue access,
          ordering, payment, and product-use acknowledgement.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-4 px-4 pb-16 md:px-8">
        {terms.map((term) => (
          <article key={term.title} className="border border-arctic/10 bg-paper p-5 shadow-soft">
            <h2 className="font-display text-2xl leading-tight text-carbon">{term.title}</h2>
            <p className="mt-3 text-sm leading-6 text-lab">{term.body}</p>
          </article>
        ))}

        <ResearchNotice />

        <Link
          href="/shipping-returns"
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-lab bg-carbon px-5 py-3 text-sm font-semibold text-paper transition-colors duration-200 ease-lab hover:bg-arctic"
        >
          Shipping & Returns
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
