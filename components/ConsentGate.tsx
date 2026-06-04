"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, XCircle } from "lucide-react";

const CONSENT_STORAGE_KEY = "royalis_research_consent_v1";

const acknowledgementItems = [
  {
    title: "Age requirement",
    body: "You are at least 18 years old, or the age of majority in your jurisdiction, whichever is higher."
  },
  {
    title: "Research use only",
    body: "Products are sold for in-vitro scientific laboratory research only. They are not for human or animal consumption, cosmetic use, or dietary supplements."
  },
  {
    title: "No medical advice",
    body: "Royalis Labs is not a pharmacy or medical provider and does not provide dosing, administration, or reconstitution guidance for human use."
  },
  {
    title: "Compliance responsibility",
    body: "You are responsible for handling all materials according to your institution's safety protocols and all applicable laws."
  },
  {
    title: "Final sale",
    body: "Due to the nature of these materials, all sales are final. Shipping issues are handled under the Shipping & Returns policy."
  }
];

export function ConsentGate() {
  const [status, setStatus] = useState<"checking" | "required" | "accepted" | "declined">(
    "checking"
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    setStatus(stored ? "accepted" : "required");
  }, []);

  useEffect(() => {
    if (status !== "required" && status !== "declined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [status]);

  function acceptConsent() {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ acceptedAt: new Date().toISOString(), version: 1 })
    );
    setStatus("accepted");
  }

  if (status === "checking" || status === "accepted") {
    return null;
  }

  const declined = status === "declined";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-carbon/80 px-4 py-6 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-consent-title"
        aria-describedby="research-consent-copy"
        className="max-h-[min(780px,calc(100dvh-2rem))] w-full max-w-[860px] overflow-y-auto rounded-image border border-arctic/20 bg-paper text-carbon shadow-[0_32px_120px_rgba(2,12,28,0.34)]"
      >
        <div className="sticky top-0 z-10 border-b border-arctic/10 bg-paper/95 px-5 py-5 backdrop-blur md:px-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lab bg-arctic/10 text-arctic">
              {declined ? (
                <XCircle size={22} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <ShieldCheck size={22} strokeWidth={1.75} aria-hidden="true" />
              )}
            </span>
            <div>
              <p className="text-sm font-semibold text-arctic">Royalis Labs access acknowledgement</p>
              <h2 id="research-consent-title" className="mt-2 font-display text-3xl leading-tight md:text-5xl">
                {declined ? "Agreement required." : "Scientific research materials only."}
              </h2>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 md:px-8">
          {declined ? (
            <div className="grid gap-5">
              <p className="text-base leading-7 text-lab">
                We cannot provide access to the catalogue unless these requirements are accepted.
                Review the acknowledgement again if you selected this by mistake.
              </p>
              <button
                type="button"
                onClick={() => setStatus("required")}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lab bg-carbon px-5 py-3 text-sm font-semibold text-paper transition-colors duration-200 ease-lab hover:bg-arctic sm:w-fit"
              >
                Review acknowledgement
              </button>
            </div>
          ) : (
            <>
              <p id="research-consent-copy" className="max-w-3xl text-base leading-7 text-lab">
                Royalis Labs provides materials strictly for scientific laboratory research.
                To continue, please acknowledge the following:
              </p>

              <ul className="mt-6 grid gap-3">
                {acknowledgementItems.map((item) => (
                  <li key={item.title} className="grid gap-2 border-l-2 border-arctic/40 bg-mist px-4 py-3">
                    <span className="font-semibold text-carbon">{item.title}</span>
                    <span className="text-sm leading-6 text-lab">{item.body}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {!declined ? (
          <div className="sticky bottom-0 border-t border-arctic/10 bg-paper/95 px-5 py-4 backdrop-blur md:px-8">
            <p className="text-sm leading-6 text-lab">
              By selecting <strong className="text-carbon">I agree</strong>, you confirm that you
              have read and agree to our{" "}
              <Link href="/terms" className="font-semibold text-arctic hover:text-carbon">
                Terms & Conditions
              </Link>
              ,{" "}
              <Link href="/disclaimer" className="font-semibold text-arctic hover:text-carbon">
                Disclaimer
              </Link>
              , and{" "}
              <Link href="/shipping-returns" className="font-semibold text-arctic hover:text-carbon">
                Shipping & Returns Policy
              </Link>
              .
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={acceptConsent}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lab bg-carbon px-5 py-3 text-sm font-semibold text-paper transition-colors duration-200 ease-lab hover:bg-arctic"
              >
                I agree
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setStatus("declined")}
                className="inline-flex min-h-12 items-center justify-center rounded-lab border border-carbon/20 px-5 py-3 text-sm font-semibold text-carbon transition-colors duration-200 ease-lab hover:border-carbon hover:bg-bone"
              >
                I do not agree
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
