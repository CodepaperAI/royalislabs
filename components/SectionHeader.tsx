export function SectionHeader({
  kicker,
  title,
  children,
  className = ""
}: {
  kicker?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {kicker ? <p className="mb-3 text-sm font-semibold text-arctic">{kicker}</p> : null}
      <h2 className="font-display text-3xl leading-tight text-carbon md:text-5xl">{title}</h2>
      {children ? <div className="mt-4 text-base leading-7 text-lab">{children}</div> : null}
    </div>
  );
}
