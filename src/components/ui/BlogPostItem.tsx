import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface BlogPostItemProps {
  post: BlogPost;
}

export default function BlogPostItem({ post }: BlogPostItemProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group bg-bg-secondary border border-border rounded-lg p-4 transition-all duration-300 hover:border-accent-green/50">
        <h3 className="text-sm font-semibold text-text-heading group-hover:text-accent-green transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
