import type { Metadata } from "next";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Royalis Labs FAQ for testing, shipping, returns, and research-use boundaries."
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="reveal-stagger mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
          <p className="mb-4 text-sm font-semibold text-arctic">FAQ</p>
          <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
            Direct answers. No forum language.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-lab">
            Questions are grouped by the anxieties that matter: third-party testing,
            domestic delivery, payment clarity, replacement review, and research-use limits.
          </p>
        </div>
      </section>

      <section className="border-y border-arctic/10 bg-paper">
        <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
          <label className="block max-w-xl">
            <span className="text-sm font-medium text-carbon">Search FAQ</span>
            <input
              placeholder="Batch, testing, shipping, payment"
              className="mt-2 min-h-11 w-full rounded-lab border border-arctic/20 bg-mist px-3 py-3 text-sm transition-colors duration-200 ease-lab focus:border-arctic"
            />
          </label>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-6 px-4 py-12 md:px-8">
        {faqs.map((group) => (
          <div key={group.title} className="grid gap-4 border-t border-carbon/15 pt-6 md:grid-cols-[260px_1fr]">
            <h2 className="font-display text-3xl leading-tight text-carbon">{group.title}</h2>
            <div className="grid gap-3">
              {group.items.map((item) => (
                <article key={item.question} className="rounded-image border border-arctic/10 bg-paper p-5 shadow-soft">
                  <h3 className="font-medium text-carbon">{item.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-lab">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
