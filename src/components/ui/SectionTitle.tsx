interface SectionTitleProps {
  children: string;
  color?: "blue" | "purple" | "green" | "yellow" | "red";
}

const colorMap = {
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  green: "text-accent-green",
  yellow: "text-accent-yellow",
  red: "text-accent-red",
};

export default function SectionTitle({ children, color = "blue" }: SectionTitleProps) {
  return (
    <h2 className={`font-mono text-sm ${colorMap[color]} mb-4`}>
      <span className="text-text-muted">{"// "}</span>
      {children}
    </h2>
  );
}
