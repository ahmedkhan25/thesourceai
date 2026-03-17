interface SectionHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  badge?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  badge,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-source-green/10 px-3 py-1 text-xs font-medium text-source-green">
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-bold text-source-black">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-source-muted">{subtitle}</p>
      )}
    </div>
  );
}
