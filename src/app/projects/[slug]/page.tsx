import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getProject, getProjects } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { GitBranch, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-blue transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        返回项目列表
      </Link>

      <h1 className="text-2xl font-bold text-text-heading mb-3">{project.title}</h1>
      <p className="text-text-muted mb-4">{project.summary}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mb-10">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-blue transition-colors"
          >
            <GitBranch size={14} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-green transition-colors"
          >
            <ExternalLink size={14} /> 在线预览
          </a>
        )}
      </div>

      <article>
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
            },
          }}
        />
      </article>
    </div>
  );
}
