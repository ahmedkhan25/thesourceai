interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  description,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="rounded-xl border border-source-border bg-white p-6 animate-fade-slide-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-source-muted">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-source-black">{value}</p>
      {description && (
        <p className="mt-1 text-sm text-source-muted">{description}</p>
      )}
    </div>
  );
}
