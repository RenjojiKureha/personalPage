import type { Metadata } from "next";
import { getProjects } from "@/lib/mdx";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "项目",
  description: "我的项目作品集，展示个人和工作中完成的项目。",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <SectionTitle color="purple">项目作品集</SectionTitle>
        <p className="text-text-muted text-sm mb-6">
          以下是我参与开发的一些项目，点击查看详情。
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <AnimatedSection key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
