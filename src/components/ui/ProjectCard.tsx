import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group bg-bg-secondary border border-border rounded-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50">
        <h3 className="text-sm font-bold text-text-heading group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-text-muted mt-2 line-clamp-2">
          {project.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
