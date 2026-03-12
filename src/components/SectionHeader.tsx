interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  label,
  title,
  className = 'mb-16 w-full',
  children
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <span className="font-mono text-sm text-black mb-4 block font-bold uppercase tracking-widest">
        // {label}
      </span>
      <h2 className="font-heading text-3xl font-bold text-black uppercase tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
}
