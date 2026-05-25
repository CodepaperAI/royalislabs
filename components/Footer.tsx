import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { navItems, trustPillars } from "@/lib/data";

const policyLinks = [
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/coa-library", label: "Testing" }
];

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
            Product prices follow the Royalis WooCommerce catalogue. Checkout availability
            depends on the active Royalis Labs store configuration.
          </p>
        </div>
      </div>

      <div className="border-t border-paper/15 px-4 py-5 text-xs leading-5 text-paper/55 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          Research use only. Not for human or veterinary use. No protocols, dosing, or
          administration guidance is provided by Royalis Labs.
        </div>
      </div>
    </footer>
  );
}
