import { CheckCircle2 } from "lucide-react";
import { trustPillars } from "@/lib/data";

export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid border-y border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] ${
        compact ? "md:grid-cols-4" : "md:grid-cols-4"
      }`}
    >
      {trustPillars.map((pillar) => (
        <div
          key={pillar}
          className="flex min-h-14 items-center gap-3 border-b border-arctic/10 px-4 py-3 text-sm text-carbon transition-colors duration-200 ease-lab hover:bg-paper md:border-b-0 md:border-r md:px-6"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lab border border-arctic/15 bg-paper">
            <CheckCircle2 size={16} strokeWidth={1.75} className="text-arctic" aria-hidden="true" />
          </span>
          <span>{pillar}</span>
        </div>
      ))}
    </div>
  );
}
