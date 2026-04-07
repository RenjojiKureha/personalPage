import type { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts, getAllTags } from "@/lib/mdx";
import BlogPostItem from "@/components/ui/BlogPostItem";
import TagFilter from "@/components/ui/TagFilter";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "博客",
  description: "技术博客文章，分享编程经验和学习心得。",
};

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const allPosts = getBlogPosts();
  const tags = getAllTags(allPosts);
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <SectionTitle color="green">博客</SectionTitle>
        <p className="text-text-muted text-sm mb-6">
          记录技术实践和学习心得，共 {allPosts.length} 篇文章。
        </p>
      </AnimatedSection>

      {tags.length > 0 && (
        <Suspense>
          <TagFilter tags={tags} activeTag={tag ?? null} />
        </Suspense>
      )}

      <div className="space-y-3">
        {posts.map((post, i) => (
          <AnimatedSection key={post.slug} delay={i * 0.05}>
            <BlogPostItem post={post} />
          </AnimatedSection>
        ))}
        {posts.length === 0 && (
          <p className="text-text-muted text-sm">暂无文章。</p>
        )}
      </div>
    </div>
  );
}