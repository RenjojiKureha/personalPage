import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-green transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        返回博客
      </Link>

      <h1 className="text-2xl font-bold text-text-heading mb-3">{post.title}</h1>

      <div className="flex items-center gap-3 text-sm text-text-muted mb-4">
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green"
          >
            {tag}
          </span>
        ))}
      </div>

      <article>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
            },
          }}
        />
      </article>

      <div className="mt-16 pt-8 border-t border-border flex justify-between gap-4">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors"
          >
            <ArrowLeft size={14} />
            <span>{prevPost.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors"
          >
            <span>{nextPost.title}</span>
            <ArrowRight size={14} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}