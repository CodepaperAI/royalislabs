import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";
import { SectionHeader } from "@/components/SectionHeader";
import { supportWindows } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Royalis Labs using the published email and phone details."
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-4 text-sm font-semibold text-arctic">Contact</p>
        <h1 className="max-w-4xl font-display text-3xl leading-tight text-carbon sm:text-5xl md:text-7xl md:leading-none">
          Contact Royalis Labs.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-lab">
          Inquiries are handled through the Royalis Labs Google Workspace inbox at
          info@royalislabs.com for product, order, shipping, and testing questions.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-carbon sm:grid-cols-3">
          <a href="mailto:info@royalislabs.com" className="inline-flex items-center gap-2 border border-carbon/15 bg-paper p-4 hover:border-arctic">
            <Mail size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
            info@royalislabs.com
          </a>
          <a href="tel:+14377759715" className="inline-flex items-center gap-2 border border-carbon/15 bg-paper p-4 hover:border-arctic">
            <Phone size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
            437-775-9715
          </a>
          <a
            href="https://wa.me/14377759715?text=Hello%20Royalis%20Labs%2C%20I%20have%20a%20question."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-carbon/15 bg-paper p-4 hover:border-arctic"
          >
            <MessageCircle size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="border-y border-carbon/15 bg-paper">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 lg:grid-cols-2 lg:px-8">
          <form className="border border-carbon/15 bg-bone p-5">
            <h2 className="font-display text-3xl leading-tight">Order support</h2>
            <p className="mt-3 text-sm leading-6 text-lab">
              Use the Google Workspace inbox for order, shipping, or product questions.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {["Order number", "Product", "Batch if available", "Email"].map((label) => (
                <label key={label} className="block text-sm font-medium text-carbon">
                  {label}
                  <input className="mt-2 w-full rounded-lab border border-carbon/20 bg-paper px-3 py-3 text-sm" />
                </label>
              ))}
            </div>
            <label className="mt-4 block text-sm font-medium text-carbon">
              Issue type
              <select className="mt-2 w-full rounded-lab border border-carbon/20 bg-paper px-3 py-3 text-sm">
                <option>Product question</option>
                <option>Order question</option>
                <option>Tracking question</option>
                <option>Testing question</option>
              </select>
            </label>
            <label className="mt-4 block text-sm font-medium text-carbon">
              Details
              <textarea className="mt-2 min-h-32 w-full rounded-lab border border-carbon/20 bg-paper px-3 py-3 text-sm" />
            </label>
            <button className="mt-4 w-full rounded-lab bg-carbon px-4 py-3 text-sm font-medium text-paper hover:bg-arctic" type="submit">
              Submit order request
            </button>
          </form>

          <form className="border border-carbon/15 bg-bone p-5">
            <h2 className="font-display text-3xl leading-tight">Testing verification</h2>
            <p className="mt-3 text-sm leading-6 text-lab">
              Send a product name or batch number. We can confirm testing records and
              batch metadata, not usage instructions.
            </p>
            <div className="mt-6 grid gap-4">
              {["Product or SKU", "Batch number", "Email"].map((label) => (
                <label key={label} className="block text-sm font-medium text-carbon">
                  {label}
                  <input className="mt-2 w-full rounded-lab border border-carbon/20 bg-paper px-3 py-3 text-sm" />
                </label>
              ))}
              <label className="block text-sm font-medium text-carbon">
                Verification question
                <textarea className="mt-2 min-h-32 w-full rounded-lab border border-carbon/20 bg-paper px-3 py-3 text-sm" />
              </label>
            </div>
            <button className="mt-4 w-full rounded-lab bg-carbon px-4 py-3 text-sm font-medium text-paper hover:bg-arctic" type="submit">
              Submit testing request
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <SectionHeader kicker="Contact details" title="Use the current Royalis contact routes." />
        <div className="grid gap-3 md:grid-cols-3">
          {supportWindows.map((item) => (
            <div key={item.label} className="border border-carbon/15 bg-paper p-5">
              <p className="text-sm text-lab">{item.label}</p>
              <p className="mt-2 font-display text-3xl leading-tight text-carbon">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8">
        <ResearchNotice />
      </section>
    </>
  );
}
