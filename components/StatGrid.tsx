export function StatGrid({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <dl className="grid border border-carbon/15 bg-paper sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="border-b border-carbon/10 p-4 sm:border-r lg:border-b-0">
          <dt className="text-xs text-lab">{item.label}</dt>
          <dd className="mt-1 text-lg font-semibold text-carbon tabular-nums">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
