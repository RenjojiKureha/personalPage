import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/mdx";

const BASE_URL = "https://www.renjojikureha.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();
  const projects = getProjects();

  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectUrls = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/projects`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    ...blogUrls,
    ...projectUrls,
  ];
}