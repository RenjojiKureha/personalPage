# 个人主页实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个基于 Next.js 15 的程序员个人主页，包含首页、关于我、项目作品集、博客、联系方式五大模块，采用 One Dark + 渐变配色的左右分栏布局，Docker 部署至自有服务器。

**Architecture:** Next.js 15 App Router + TypeScript，左侧固定 Sidebar + 右侧滚动内容区的分栏布局。博客和项目内容使用 MDX 文件管理，通过 next-mdx-remote 渲染。Tailwind CSS 处理样式，Framer Motion 提供轻量动效。Docker 多阶段构建 + Nginx 反向代理部署。

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, next-mdx-remote, rehype-pretty-code, shiki, gray-matter, Docker, Nginx

---

## 文件结构总览

### 新建文件

| 文件路径 | 职责 |
|---------|------|
| `src/app/layout.tsx` | 根布局：左右分栏、全局字体、metadata |
| `src/app/page.tsx` | 首页：欢迎语 + 精选项目 + 最新文章 |
| `src/app/about/page.tsx` | 关于我：简介、技术栈、经历、教育 |
| `src/app/projects/page.tsx` | 项目列表：卡片网格 |
| `src/app/projects/[slug]/page.tsx` | 项目详情：MDX 渲染 |
| `src/app/blog/page.tsx` | 博客列表：标签筛选 + 文章列表 |
| `src/app/blog/[slug]/page.tsx` | 文章详情：MDX 渲染 + 代码高亮 |
| `src/app/contact/page.tsx` | 联系方式：邮箱复制 + 社交链接 |
| `src/app/sitemap.ts` | 自动生成 sitemap.xml |
| `src/app/robots.ts` | robots.txt 配置 |
| `src/components/layout/Sidebar.tsx` | 左侧固定面板（桌面端） |
| `src/components/layout/MobileNav.tsx` | 移动端顶部导航 + 汉堡菜单 |
| `src/components/ui/ProjectCard.tsx` | 项目卡片组件 |
| `src/components/ui/BlogPostItem.tsx` | 博客文章列表项组件 |
| `src/components/ui/TagFilter.tsx` | 标签筛选组件 |
| `src/components/ui/Timeline.tsx` | 工作经历时间线组件 |
| `src/components/ui/TechStack.tsx` | 技术栈展示组件 |
| `src/components/ui/CopyButton.tsx` | 一键复制按钮组件 |
| `src/components/ui/SectionTitle.tsx` | 代码注释风格标题组件 |
| `src/components/ui/AnimatedSection.tsx` | 滚动淡入动效包装组件 |
| `src/components/mdx/MDXComponents.tsx` | MDX 自定义渲染组件映射 |
| `src/lib/mdx.ts` | MDX 文件读取、解析、排序工具 |
| `src/lib/utils.ts` | 工具函数（阅读时间计算等） |
| `src/lib/types.ts` | TypeScript 类型定义 |
| `src/styles/globals.css` | Tailwind 导入 + 全局自定义样式 |
| `content/blog/hello-world.mdx` | 示例博客文章 |
| `content/projects/demo-project.mdx` | 示例项目 |
| `tailwind.config.ts` | Tailwind 配置（One Dark 配色） |
| `next.config.ts` | Next.js 配置 |
| `Dockerfile` | Docker 多阶段构建 |
| `docker-compose.yml` | 服务编排 |
| `nginx.conf` | Nginx 反向代理配置 |
| `.gitignore` | Git 忽略规则 |

---

## Task 1: 项目初始化与基础配置

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/styles/globals.css`, `.gitignore`, `src/lib/types.ts`

- [ ] **Step 1: 初始化 Next.js 项目**

```bash
cd E:/personalPage
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

选择默认选项。这会生成 `package.json`、`tsconfig.json`、`next.config.ts`、`tailwind.config.ts` 等基础文件。

- [ ] **Step 2: 安装额外依赖**

```bash
npm install framer-motion next-mdx-remote gray-matter rehype-pretty-code shiki reading-time lucide-react
```

- `framer-motion`: 动效
- `next-mdx-remote`: MDX 远程渲染
- `gray-matter`: frontmatter 解析
- `rehype-pretty-code` + `shiki`: 代码高亮
- `reading-time`: 阅读时间计算
- `lucide-react`: 图标库

- [ ] **Step 3: 配置 Tailwind CSS — One Dark 配色**

替换 `tailwind.config.ts` 为：

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#282c34",
          secondary: "#21252b",
        },
        border: {
          DEFAULT: "#3e4451",
        },
        text: {
          primary: "#abb2bf",
          heading: "#e5e5e5",
          muted: "#5c6370",
        },
        accent: {
          blue: "#61afef",
          purple: "#c678dd",
          green: "#98c379",
          yellow: "#e5c07b",
          red: "#e06c75",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: 配置全局样式**

替换 `src/styles/globals.css` 为：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');

@layer base {
  body {
    @apply bg-bg-primary text-text-primary font-sans;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply text-text-heading font-semibold;
  }

  ::selection {
    @apply bg-accent-blue/30;
  }

  /* 自定义滚动条 */
  ::-webkit-scrollbar {
    @apply w-2;
  }
  ::-webkit-scrollbar-track {
    @apply bg-bg-primary;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-border rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-text-muted;
  }
}
```

- [ ] **Step 5: 配置 Next.js**

替换 `next.config.ts` 为：

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 6: 创建类型定义**

创建 `src/lib/types.ts`：

```ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingTime: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  github?: string;
  demo?: string;
  cover?: string;
  featured: boolean;
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
}
```

- [ ] **Step 7: 更新 .gitignore**

确保 `.gitignore` 包含：

```
node_modules/
.next/
out/
.env
.superpowers/
```

- [ ] **Step 8: 初始化 Git 并提交**

```bash
git init
git add .
git commit -m "feat: 初始化 Next.js 项目，配置 Tailwind One Dark 主题"
```

- [ ] **Step 9: 验证开发服务器启动**

```bash
npm run dev
```

预期：浏览器访问 `http://localhost:3000` 看到 Next.js 默认页面，无报错。

---

## Task 2: MDX 内容引擎

**Files:**
- Create: `src/lib/mdx.ts`, `src/lib/utils.ts`, `content/blog/hello-world.mdx`, `content/projects/demo-project.mdx`

- [ ] **Step 1: 创建工具函数**

创建 `src/lib/utils.ts`：

```ts
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

- [ ] **Step 2: 创建 MDX 读取工具**

创建 `src/lib/mdx.ts`：

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, Project } from "./types";

const contentDir = path.join(process.cwd(), "content");

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      tags: data.tags ?? [],
      summary: data.summary ?? "",
      readingTime: stats.text,
      content,
    } satisfies BlogPost;
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      summary: data.summary ?? "",
      tags: data.tags ?? [],
      github: data.github,
      demo: data.demo,
      cover: data.cover,
      featured: data.featured ?? false,
      content,
    } satisfies Project;
  });

  return projects;
}

export function getProject(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug);
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
```

- [ ] **Step 3: 创建示例博客文章**

创建目录和文件 `content/blog/hello-world.mdx`：

```mdx
---
title: "你好，世界"
date: "2026-04-03"
tags: ["随笔", "Next.js"]
summary: "这是我个人博客的第一篇文章，记录建站过程和技术选型思考。"
---

## 为什么要做个人主页

作为一个程序员，拥有自己的个人主页不仅是展示技能的窗口，也是持续学习和输出的动力。

## 技术选型

本站使用以下技术栈构建：

- **Next.js 15** - React 框架，App Router
- **Tailwind CSS** - 原子化 CSS
- **MDX** - Markdown + JSX，用于撰写博客

```typescript
const greeting = "Hello, World!";
console.log(greeting);
```

## 后续计划

接下来会持续分享技术文章，记录项目经验和学习心得。
```

- [ ] **Step 4: 创建示例项目**

创建 `content/projects/demo-project.mdx`：

```mdx
---
title: "个人主页"
summary: "基于 Next.js 15 构建的程序员个人主页，采用 One Dark 配色风格。"
tags: ["Next.js", "TypeScript", "Tailwind CSS"]
github: "https://github.com/yourusername/personalPage"
featured: true
---

## 项目介绍

这是我的个人主页项目，使用 Next.js 15 App Router 构建，采用现代精致 + 编程风融合的设计风格。

## 技术亮点

- **App Router** - 使用 Next.js 最新的应用路由
- **MDX 内容管理** - 博客和项目使用 MDX 文件管理
- **One Dark 配色** - 程序员友好的暗色主题
- **Docker 部署** - 容器化一键部署

## 功能特性

- 响应式左右分栏布局
- MDX 博客系统，支持代码高亮
- 项目作品集展示
- 标签筛选
- SEO 优化
```

- [ ] **Step 5: 提交**

```bash
git add src/lib/mdx.ts src/lib/utils.ts src/lib/types.ts content/
git commit -m "feat: 添加 MDX 内容引擎和示例内容"
```

---

## Task 3: 全局布局与 Sidebar 组件

**Files:**
- Create: `src/components/layout/Sidebar.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/ui/SectionTitle.tsx`, `src/components/ui/AnimatedSection.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: 创建 SectionTitle 组件**

创建 `src/components/ui/SectionTitle.tsx`：

```tsx
interface SectionTitleProps {
  children: string;
  color?: "blue" | "purple" | "green" | "yellow" | "red";
}

const colorMap = {
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  green: "text-accent-green",
  yellow: "text-accent-yellow",
  red: "text-accent-red",
};

export default function SectionTitle({ children, color = "blue" }: SectionTitleProps) {
  return (
    <h2 className={`font-mono text-sm ${colorMap[color]} mb-4`}>
      <span className="text-text-muted">{"// "}</span>
      {children}
    </h2>
  );
}
```

- [ ] **Step 2: 创建 AnimatedSection 组件**

创建 `src/components/ui/AnimatedSection.tsx`：

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: 创建 Sidebar 组件**

创建 `src/components/layout/Sidebar.tsx`：

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Mail } from "lucide-react";
import type { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "关于我", href: "/about" },
  { label: "项目", href: "/projects" },
  { label: "博客", href: "/blog" },
  { label: "联系", href: "/contact" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-bg-secondary border-r border-border flex flex-col p-8 max-md:hidden">
      {/* 头像 */}
      <div className="mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple" />
      </div>

      {/* 名字与职位 */}
      <h1 className="text-xl font-bold text-text-heading">你的名字</h1>
      <p className="text-sm text-text-muted mt-1">Full-Stack Developer</p>

      {/* 导航 */}
      <nav className="mt-8 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive(item.href)
                    ? "text-accent-blue bg-accent-blue/10"
                    : "text-text-primary hover:text-text-heading hover:bg-bg-primary/50"
                }`}
              >
                <span className="font-mono text-text-muted mr-2">▸</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 社交链接 */}
      <div className="mt-auto pt-6 border-t border-border">
        <div className="font-mono text-xs text-text-muted mb-3">{"// 社交链接"}</div>
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-blue transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:your@email.com"
            className="text-text-muted hover:text-accent-blue transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
        <p className="text-xs text-text-muted mt-4">&copy; 2026</p>
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: 创建 MobileNav 组件**

创建 `src/components/layout/MobileNav.tsx`：

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "关于我", href: "/about" },
  { label: "项目", href: "/projects" },
  { label: "博客", href: "/blog" },
  { label: "联系", href: "/contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden">
      {/* 顶部栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg-secondary border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-bold text-text-heading">你的名字</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-primary"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 展开菜单 */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-bg-secondary pt-14">
          <nav className="p-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-md text-base transition-colors ${
                      isActive(item.href)
                        ? "text-accent-blue bg-accent-blue/10"
                        : "text-text-primary hover:text-text-heading"
                    }`}
                  >
                    <span className="font-mono text-text-muted mr-2">▸</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: 更新根布局**

替换 `src/app/layout.tsx` 为：

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "你的名字 - Full-Stack Developer",
    template: "%s | 你的名字",
  },
  description: "全栈开发工程师的个人主页，展示项目作品和技术博客。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Sidebar />
        <MobileNav />
        <main className="md:ml-[280px] min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12 max-md:pt-20">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: 验证布局**

```bash
npm run dev
```

预期：浏览器访问 `http://localhost:3000`，左侧看到 Sidebar（桌面端），缩小窗口后变为顶部导航栏。

- [ ] **Step 7: 提交**

```bash
git add src/components/layout/ src/components/ui/SectionTitle.tsx src/components/ui/AnimatedSection.tsx src/app/layout.tsx
git commit -m "feat: 添加左右分栏布局、Sidebar 和移动端导航"
```

---

## Task 4: 首页

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`, `src/components/ui/BlogPostItem.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 创建 ProjectCard 组件**

创建 `src/components/ui/ProjectCard.tsx`：

```tsx
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
```

- [ ] **Step 2: 创建 BlogPostItem 组件**

创建 `src/components/ui/BlogPostItem.tsx`：

```tsx
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
```

- [ ] **Step 3: 实现首页**

替换 `src/app/page.tsx` 为：

```tsx
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
          <h1 className="text-3xl font-bold text-text-heading">
            你好 <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">👋</span>
          </h1>
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
```

- [ ] **Step 4: 验证首页**

```bash
npm run dev
```

预期：首页展示欢迎语、精选项目卡片（demo-project）和最新文章（hello-world）。

- [ ] **Step 5: 提交**

```bash
git add src/app/page.tsx src/components/ui/ProjectCard.tsx src/components/ui/BlogPostItem.tsx
git commit -m "feat: 实现首页，包含精选项目和最新文章"
```

---

## Task 5: 关于我页面

**Files:**
- Create: `src/components/ui/TechStack.tsx`, `src/components/ui/Timeline.tsx`, `src/app/about/page.tsx`

- [ ] **Step 1: 创建 TechStack 组件**

创建 `src/components/ui/TechStack.tsx`：

```tsx
interface TechItem {
  name: string;
  icon?: string;
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
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    label: "后端",
    color: "green",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Python" },
      { name: "PostgreSQL" },
    ],
  },
  {
    label: "工具链",
    color: "purple",
    items: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "CI/CD" },
    ],
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
```

- [ ] **Step 2: 创建 Timeline 组件**

创建 `src/components/ui/Timeline.tsx`：

```tsx
interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border">
      {items.map((item, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-bg-secondary border-2 border-accent-blue" />
          <div className="text-xs font-mono text-accent-blue mb-1">{item.period}</div>
          <h4 className="text-sm font-semibold text-text-heading">{item.title}</h4>
          <p className="text-sm text-text-muted">{item.subtitle}</p>
          {item.description && (
            <p className="text-sm text-text-primary mt-2 leading-relaxed">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: 实现关于我页面**

创建 `src/app/about/page.tsx`：

```tsx
import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import TechStack from "@/components/ui/TechStack";
import Timeline from "@/components/ui/Timeline";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解我的技术背景、工作经历和教育经历。",
};

const workExperience = [
  {
    title: "高级前端工程师",
    subtitle: "某科技公司",
    period: "2024 - 至今",
    description: "负责核心产品前端架构设计和开发，推动团队技术升级。",
  },
  {
    title: "前端工程师",
    subtitle: "某互联网公司",
    period: "2022 - 2024",
    description: "参与多个 B 端产品的开发，独立负责项目模块设计和实现。",
  },
];

const education = [
  {
    title: "计算机科学与技术",
    subtitle: "某大学",
    period: "2018 - 2022",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* 个人简介 */}
      <AnimatedSection>
        <SectionTitle color="blue">关于我</SectionTitle>
        <div className="text-text-primary leading-relaxed space-y-4">
          <p>
            你好！我是一名全栈开发工程师，拥有多年 Web 开发经验。
            热衷于使用现代技术构建高质量的 Web 应用。
          </p>
          <p>
            目前专注于 React/Next.js 生态和 Node.js 后端开发，
            同时对 DevOps 和云原生技术有浓厚兴趣。
          </p>
        </div>
      </AnimatedSection>

      {/* 技术栈 */}
      <AnimatedSection delay={0.1}>
        <SectionTitle color="purple">技术栈</SectionTitle>
        <TechStack />
      </AnimatedSection>

      {/* 工作经历 */}
      <AnimatedSection delay={0.2}>
        <SectionTitle color="green">工作经历</SectionTitle>
        <Timeline items={workExperience} />
      </AnimatedSection>

      {/* 教育背景 */}
      <AnimatedSection delay={0.3}>
        <SectionTitle color="yellow">教育背景</SectionTitle>
        <Timeline items={education} />
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 4: 验证**

```bash
npm run dev
```

预期：访问 `/about`，看到个人简介、技术栈分类展示、工作经历时间线和教育背景。

- [ ] **Step 5: 提交**

```bash
git add src/app/about/ src/components/ui/TechStack.tsx src/components/ui/Timeline.tsx
git commit -m "feat: 实现关于我页面，包含技术栈和经历时间线"
```

---

## Task 6: 项目作品集页面

**Files:**
- Create: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/components/mdx/MDXComponents.tsx`

- [ ] **Step 1: 创建 MDX 组件映射**

创建 `src/components/mdx/MDXComponents.tsx`：

```tsx
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="text-xl font-bold text-text-heading mt-10 mb-4" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-lg font-semibold text-text-heading mt-8 mb-3" {...props} />
  ),
  p: (props) => (
    <p className="text-text-primary leading-relaxed mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-4 space-y-1 text-text-primary" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 text-text-primary" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a className="text-accent-blue hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  strong: (props) => <strong className="text-text-heading font-semibold" {...props} />,
  code: (props) => (
    <code className="bg-bg-secondary px-1.5 py-0.5 rounded text-sm text-accent-red font-mono" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-bg-secondary border border-border rounded-lg p-4 overflow-x-auto mb-4 text-sm" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-2 border-accent-purple pl-4 italic text-text-muted mb-4" {...props} />
  ),
};
```

- [ ] **Step 2: 实现项目列表页**

创建 `src/app/projects/page.tsx`：

```tsx
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
```

- [ ] **Step 3: 实现项目详情页**

创建 `src/app/projects/[slug]/page.tsx`：

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getProject, getProjects } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
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
            <Github size={14} /> GitHub
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

      <article className="prose-custom">
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
```

- [ ] **Step 4: 验证**

```bash
npm run dev
```

预期：访问 `/projects` 看到项目卡片网格，点击进入 `/projects/demo-project` 看到 MDX 渲染的详情页。

- [ ] **Step 5: 提交**

```bash
git add src/app/projects/ src/components/mdx/
git commit -m "feat: 实现项目列表和详情页，集成 MDX 渲染"
```

---

## Task 7: 博客页面

**Files:**
- Create: `src/components/ui/TagFilter.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: 创建 TagFilter 组件**

创建 `src/components/ui/TagFilter.tsx`：

```tsx
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
```

- [ ] **Step 2: 实现博客列表页**

创建 `src/app/blog/page.tsx`：

```tsx
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
```

- [ ] **Step 3: 实现博客详情页**

创建 `src/app/blog/[slug]/page.tsx`：

```tsx
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

      <article className="prose-custom">
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

      {/* 上一篇/下一篇 */}
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
```

- [ ] **Step 4: 验证**

```bash
npm run dev
```

预期：访问 `/blog` 看到文章列表和标签筛选，点击标签过滤，点击文章进入详情页，代码高亮正常工作。

- [ ] **Step 5: 提交**

```bash
git add src/app/blog/ src/components/ui/TagFilter.tsx
git commit -m "feat: 实现博客列表和详情页，支持标签筛选和代码高亮"
```

---

## Task 8: 联系方式页面

**Files:**
- Create: `src/components/ui/CopyButton.tsx`, `src/app/contact/page.tsx`

- [ ] **Step 1: 创建 CopyButton 组件**

创建 `src/components/ui/CopyButton.tsx`：

```tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-blue transition-colors"
    >
      {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
      {copied ? "已复制" : "复制"}
    </button>
  );
}
```

- [ ] **Step 2: 实现联系方式页面**

创建 `src/app/contact/page.tsx`：

```tsx
import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopyButton from "@/components/ui/CopyButton";

export const metadata: Metadata = {
  title: "联系方式",
  description: "通过邮箱或社交媒体与我取得联系。",
};

const EMAIL = "your@email.com";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
    color: "hover:text-accent-blue",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
    color: "hover:text-accent-blue",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <AnimatedSection>
        <SectionTitle color="yellow">联系我</SectionTitle>
        <p className="text-text-primary leading-relaxed max-w-2xl">
          如果你对我的项目感兴趣，或者有合作意向，欢迎通过以下方式联系我。
        </p>
      </AnimatedSection>

      {/* 邮箱 */}
      <AnimatedSection delay={0.1}>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="font-mono text-xs text-text-muted mb-3">{"// 邮箱"}</div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-accent-yellow" />
            <a
              href={`mailto:${EMAIL}`}
              className="text-text-heading hover:text-accent-blue transition-colors"
            >
              {EMAIL}
            </a>
            <CopyButton text={EMAIL} />
          </div>
        </div>
      </AnimatedSection>

      {/* 社交链接 */}
      <AnimatedSection delay={0.2}>
        <div className="font-mono text-xs text-text-muted mb-4">{"// 社交链接"}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 bg-bg-secondary border border-border rounded-lg p-4 transition-colors ${link.color}`}
              >
                <Icon size={20} />
                <span className="text-sm">{link.name}</span>
              </a>
            );
          })}
        </div>
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```

预期：访问 `/contact`，看到邮箱（带复制按钮）和社交链接卡片。

- [ ] **Step 4: 提交**

```bash
git add src/app/contact/ src/components/ui/CopyButton.tsx
git commit -m "feat: 实现联系方式页面，支持邮箱一键复制"
```

---

## Task 9: SEO 优化

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`

- [ ] **Step 1: 创建 sitemap.ts**

创建 `src/app/sitemap.ts`：

```ts
import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/mdx";

const BASE_URL = "https://yourdomain.com";

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
```

- [ ] **Step 2: 创建 robots.ts**

创建 `src/app/robots.ts`：

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
```

- [ ] **Step 3: 提交**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: 添加 sitemap.xml 和 robots.txt SEO 配置"
```

---

## Task 10: Docker 部署配置

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `.dockerignore`

- [ ] **Step 1: 创建 Dockerfile**

创建 `Dockerfile`：

```dockerfile
# 阶段 1: 依赖安装
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 阶段 2: 构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 阶段 3: 运行
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

- [ ] **Step 2: 创建 .dockerignore**

创建 `.dockerignore`：

```
node_modules
.next
.git
.gitignore
*.md
.superpowers
```

- [ ] **Step 3: 创建 nginx.conf**

创建 `nginx.conf`：

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 重定向到 HTTPS（如果需要，取消下面两行注释）
    # return 301 https://$host$request_uri;

    location / {
        proxy_pass http://web:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location /_next/static {
        proxy_pass http://web:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /images {
        proxy_pass http://web:3000;
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

- [ ] **Step 4: 创建 docker-compose.yml**

创建 `docker-compose.yml`：

```yaml
services:
  web:
    build: .
    restart: unless-stopped
    expose:
      - "3000"

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - web
```

- [ ] **Step 5: 验证构建**

```bash
npm run build
```

预期：构建成功，输出 standalone 模式信息，无报错。

- [ ] **Step 6: 提交**

```bash
git add Dockerfile .dockerignore docker-compose.yml nginx.conf
git commit -m "feat: 添加 Docker 和 Nginx 部署配置"
```

---

## Task 11: 最终验证与构建检查

- [ ] **Step 1: 完整构建测试**

```bash
npm run build
```

预期：所有页面成功预渲染，无 TypeScript 错误，无构建警告。

- [ ] **Step 2: 启动生产模式预览**

```bash
npm run start
```

预期：访问 `http://localhost:3000`，逐个检查所有页面：
- `/` — 首页正常，精选项目和最新文章显示
- `/about` — 技术栈、时间线渲染正常
- `/projects` — 项目卡片展示
- `/projects/demo-project` — MDX 详情页渲染正常
- `/blog` — 文章列表和标签筛选正常
- `/blog/hello-world` — MDX 文章渲染，代码高亮正常
- `/contact` — 邮箱复制和社交链接正常
- 响应式：缩小窗口，移动端导航正常切换

- [ ] **Step 3: 最终提交**

```bash
git add -A
git commit -m "chore: 最终构建验证通过"
```
