export function ResearchNotice({ tight = false }: { tight?: boolean }) {
  return (
    <aside
      className={`border-l-2 border-arctic bg-paper px-4 text-sm leading-6 text-carbon ${
        tight ? "py-3" : "py-4"
      }`}
    >
      <strong>Research use only.</strong> Not for human or veterinary use. Royalis Labs does
      not provide protocols, dosing, administration, or outcome guidance.
    </aside>
  );
}
