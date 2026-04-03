interface TechItem {
  name: string;
}

interface TechCategory {
  label: string;
  color: "blue" | "purple" | "green" | "yellow";
  items: TechItem[];
}

const colorMap = {
  blue: { bg: "bg-accent-blue/10", text: "text-accent-blue", border: "border-accent-blue/20" },
  purple: { bg: "bg-accent-purple/10", text: "text-accent-purple", border: "border-accent-purple/20" },
  green: { bg: "bg-accent-green/10", text: "text-accent-green", border: "border-accent-green/20" },
  yellow: { bg: "bg-accent-yellow/10", text: "text-accent-yellow", border: "border-accent-yellow/20" },
};

const techData: TechCategory[] = [
  {
    label: "前端",
    color: "blue",
    items: [{ name: "React" }, { name: "Next.js" }, { name: "TypeScript" }, { name: "Tailwind CSS" }],
  },
  {
    label: "后端",
    color: "green",
    items: [{ name: "Node.js" }, { name: "Express" }, { name: "Python" }, { name: "PostgreSQL" }],
  },
  {
    label: "工具链",
    color: "purple",
    items: [{ name: "Git" }, { name: "Docker" }, { name: "Linux" }, { name: "CI/CD" }],
  },
];

export default function TechStack() {
  return (
    <div className="space-y-6">
      {techData.map((category) => {
        const colors = colorMap[category.color];
        return (
          <div key={category.label}>
            <h4 className={`font-mono text-xs ${colors.text} mb-3`}>
              {`// ${category.label}`}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item.name}
                  className={`text-sm px-3 py-1.5 rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
