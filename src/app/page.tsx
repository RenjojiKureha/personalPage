import { getBlogPosts, getProjects } from "@/lib/mdx";
import ProjectCard from "@/components/ui/ProjectCard";
import BlogPostItem from "@/components/ui/BlogPostItem";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Home() {
  const projects = getProjects().filter((p) => p.featured);
  const posts = getBlogPosts().slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <AnimatedSection>
        <div className="space-y-4">
          <p className="font-mono text-sm text-text-muted">{"// 欢迎来到我的主页"}</p>
          <h1 className="text-3xl font-bold text-text-heading">你好 👋</h1>
          <p className="text-text-primary leading-relaxed max-w-2xl">
            我是一名全栈开发工程师，热衷于用技术解决实际问题。
            专注于 Web 开发领域，喜欢探索新技术并分享实践经验。
          </p>
        </div>
      </AnimatedSection>

      {/* 精选项目 */}
      {projects.length > 0 && (
        <AnimatedSection delay={0.1}>
          <SectionTitle color="purple">精选项目</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* 最新文章 */}
      {posts.length > 0 && (
        <AnimatedSection delay={0.2}>
          <SectionTitle color="green">最新文章</SectionTitle>
          <div className="space-y-3">
            {posts.map((post) => (
              <BlogPostItem key={post.slug} post={post} />
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
