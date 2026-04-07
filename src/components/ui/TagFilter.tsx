"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
            activeTag === tag
              ? "bg-accent-green text-bg-primary"
              : "bg-accent-green/10 text-accent-green hover:bg-accent-green/20"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
