interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border">
      {items.map((item, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-bg-secondary border-2 border-accent-blue" />
          <div className="text-xs font-mono text-accent-blue mb-1">{item.period}</div>
          <h4 className="text-sm font-semibold text-text-heading">{item.title}</h4>
          <p className="text-sm text-text-muted">{item.subtitle}</p>
          {item.description && (
            <p className="text-sm text-text-primary mt-2 leading-relaxed">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
