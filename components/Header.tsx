"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { navItems } from "@/lib/data";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-arctic/15 bg-paper/95 shadow-rule backdrop-blur-xl">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-carbon focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Royalis Labs home">
          <span className="grid h-10 w-10 place-items-center rounded-lab border border-carbon bg-carbon text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors duration-200 ease-lab group-hover:bg-arctic">
            <FlaskConical size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl leading-none text-carbon transition-colors duration-200 ease-lab group-hover:text-arctic">
              Royalis Labs
            </span>
            <span className="block text-xs leading-5 text-lab">Canadian research peptides</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lab px-3 py-2 text-sm transition-colors duration-200 ease-lab after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-arctic after:transition-transform after:duration-200 after:ease-lab ${
                  active
                    ? "text-carbon after:scale-x-100"
                    : "text-lab after:scale-x-0 hover:text-carbon hover:after:scale-x-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/coa-library"
            className="inline-flex min-h-11 items-center gap-2 rounded-lab border border-arctic px-3 py-2 text-sm text-arctic transition-colors duration-200 ease-lab hover:bg-arctic hover:text-paper"
          >
            <Search size={15} strokeWidth={1.75} aria-hidden="true" />
            Testing lookup
          </Link>
          <Link
            href="/account"
            className="grid h-11 w-11 place-items-center rounded-lab border border-carbon/20 text-carbon transition-colors duration-200 ease-lab hover:border-carbon hover:bg-bone"
            aria-label="Account"
          >
            <UserRound size={17} strokeWidth={1.75} aria-hidden="true" />
          </Link>
          <Link
            href="/cart"
            className="grid h-11 w-11 place-items-center rounded-lab bg-carbon text-paper transition-colors duration-200 ease-lab hover:bg-arctic"
            aria-label="Cart"
          >
            <ShoppingCart size={17} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>

        <details className="group md:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-lab border border-carbon/20 text-carbon transition-colors duration-200 ease-lab hover:bg-bone">
            <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </summary>
          <div className="absolute left-0 right-0 top-full border-b border-arctic/15 bg-paper px-4 py-4 shadow-soft">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b border-carbon/10 px-1 py-3 text-sm ${
                    isActive(pathname, item.href) ? "text-arctic" : "text-carbon"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/coa-library"
                  className="inline-flex items-center justify-center gap-2 rounded-lab border border-arctic px-3 py-3 text-sm text-arctic"
                >
                  <Search size={15} strokeWidth={1.75} aria-hidden="true" />
                  Testing
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 rounded-lab bg-carbon px-3 py-3 text-sm text-paper"
                >
                  <ShoppingCart size={15} strokeWidth={1.75} aria-hidden="true" />
                  Cart
                </Link>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
