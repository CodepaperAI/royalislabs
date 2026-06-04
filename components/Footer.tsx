import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { navItems, trustPillars } from "@/lib/data";

const policyLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/coa-library", label: "Testing" }
];

const researchUseNotice =
  "Premium pharmaceutical-grade peptides, rigorously lab tested for purity and potency. Intended strictly for research purposes only. Not for human or animal consumption. Not intended for diagnostic, therapeutic, or medical use. By purchasing, you agree that these products will be used for legitimate research purposes only.";

export function Footer() {
  return (
    <footer className="border-t border-carbon bg-carbon text-paper">
      <div className="grid border-b border-paper/15 md:grid-cols-4">
        {trustPillars.map((pillar) => (
          <div key={pillar} className="border-b border-paper/15 px-4 py-4 text-sm md:border-b-0 md:border-r md:px-8">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={15} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
              {pillar}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl leading-tight">Royalis Labs</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-paper/70">
            A Canadian research peptide catalogue built around clean product presentation,
            discreet shipping, and testing details where Royalis publishes them.
          </p>
          <div className="mt-6 grid gap-2 text-sm text-paper/75">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} strokeWidth={1.75} aria-hidden="true" />
              Canada Post shipping within Canada
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
              info@royalislabs.com
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
              0120232562
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Navigate</p>
          <div className="mt-4 grid gap-3 text-sm text-paper/70">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center transition-colors duration-200 ease-lab hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Policies</p>
          <div className="mt-4 grid gap-3 text-sm text-paper/70">
            {policyLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center transition-colors duration-200 ease-lab hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Payment</p>
          <p className="mt-4 text-sm leading-6 text-paper/70">
            E-transfer orders remain payment pending until Royalis Labs confirms the
            actual bank deposit and matches it to the order number.
          </p>
        </div>
      </div>

      <div className="border-t border-paper/15 px-4 py-5 text-xs leading-5 text-paper/55 md:px-8">
        <p className="mx-auto max-w-[1440px]">{researchUseNotice}</p>
      </div>
    </footer>
  );
}
