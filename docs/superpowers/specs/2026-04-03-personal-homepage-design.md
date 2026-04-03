# 个人主页设计文档

## 概述

面向求职/展示技能的程序员个人主页，采用现代精致 + 编程风融合的视觉风格，部署在自有服务器上。

## 技术栈

| 技术 | 用途 |
|------|------|
| **Next.js 15** (App Router) | 框架，SSG 预渲染 + ISR |
| **TypeScript** | 类型安全 |
| **Tailwind CSS** | 样式方案 |
| **Framer Motion** | 轻量微动效 |
| **MDX** (next-mdx-remote) | 博客和项目详情内容 |
| **rehype-pretty-code** + **shiki** | 代码语法高亮 |
| **gray-matter** | MDX frontmatter 解析 |
| **Docker** + **Nginx** | 自有服务器部署 |

## 页面路由结构

```
├── /                    首页（Hero + 精选项目 + 最新文章）
├── /about               关于我（技术栈 + 工作经历 + 教育）
├── /projects            项目作品集（卡片网格列表）
│   └── /projects/[slug] 项目详情页（MDX 渲染）
├── /blog                博客列表（标签筛选）
│   └── /blog/[slug]     文章详情页（MDX 渲染）
└── /contact             联系方式
```

## 布局设计

### 全局布局：左右分栏式

- **左侧固定面板**（约 280px 宽）：
  - 头像（圆形，渐变边框）
  - 姓名 + 职位标题
  - 导航菜单（当前页高亮）
  - 社交链接（GitHub、邮箱等图标）
  - 版权信息
- **右侧内容区**：
  - 可滚动，承载各页面主内容
  - 内容区最大宽度限制，保证阅读舒适度

### 响应式策略

- **桌面端（>= 768px）**：左右分栏，左侧固定
- **移动端（< 768px）**：左侧面板收起为顶部导航栏 + 汉堡菜单

## 视觉风格：One Dark + 渐变点缀

### 配色方案

| 用途 | 色值 |
|------|------|
| 页面背景 | `#282c34` |
| 面板/卡片背景 | `#21252b` |
| 边框 | `#3e4451` |
| 正文文字 | `#abb2bf` |
| 标题文字 | `#e5e5e5` |
| 次要文字 | `#5c6370` |
| 强调色 - 蓝 | `#61afef` |
| 强调色 - 紫 | `#c678dd` |
| 强调色 - 绿 | `#98c379` |
| 强调色 - 黄 | `#e5c07b` |
| 强调色 - 红 | `#e06c75` |

### 设计元素

- 代码注释风格的段落标题（如 `// 精选项目`）
- 终端窗口风格的装饰（红黄绿三点）
- 技术标签使用对应颜色的半透明背景 + 渐变边框
- 按钮和链接 hover 时微妙渐变变化

### 动效方案（轻量微动效）

- **页面元素**：滚动进入视口时淡入上移（Framer Motion `whileInView`）
- **卡片 hover**：微妙上移 + 边框颜色变亮
- **导航**：当前页指示器平滑过渡
- **页面切换**：内容区淡入过渡
- **链接/按钮**：hover 时颜色渐变过渡（CSS transition）

## 各页面详细设计

### 1. 首页 `/`

- 简短欢迎语 + 一句话自我介绍
- **精选项目**：2-4 个代表性项目卡片，双列网格
  - 每张卡片：项目名 + 简介 + 技术标签
- **最新文章**：2-3 篇最新博客文章列表
  - 每条：标题 + 日期 + 标签

### 2. 关于我 `/about`

- **个人简介**：1-2 段文字介绍背景和技术方向
- **技术栈**：分类展示（前端、后端、工具链等），每项带图标 + 名称
- **工作经历**：垂直时间线，每段包含公司、职位、时间范围、简要描述
- **教育背景**：学校、专业、时间

### 3. 项目作品集 `/projects`

- **项目卡片网格**：双列布局
  - 项目截图/封面图
  - 项目名称 + 简短描述
  - 技术标签
  - GitHub 链接 + 在线预览链接（如有）
- **项目详情页** `/projects/[slug]`：
  - MDX 渲染的详细项目介绍
  - 技术架构说明
  - 截图/演示
  - 相关链接

### 4. 博客 `/blog`

- **文章列表**：
  - 标签筛选栏（点击标签过滤文章）
  - 每篇文章：标题、日期、标签、阅读时间估算、摘要
- **文章详情页** `/blog/[slug]`：
  - MDX 渲染，支持代码高亮（shiki，One Dark 主题）
  - 文章元信息（日期、标签、阅读时间）
  - 上一篇/下一篇导航
  - 目录（TOC）可选

### 5. 联系方式 `/contact`

- 邮箱地址（带一键复制按钮）
- 社交链接列表（GitHub、LinkedIn 等，带图标）
- 简短的联系引导文字

## 内容管理

### MDX 文件结构

```
content/
├── blog/
│   ├── react-performance.mdx
│   └── docker-best-practices.mdx
└── projects/
    ├── project-a.mdx
    └── project-b.mdx
```

### MDX Frontmatter 格式

**博客文章：**
```yaml
---
title: "文章标题"
date: "2026-03-28"
tags: ["React", "性能优化"]
summary: "文章摘要"
---
```

**项目：**
```yaml
---
title: "项目名称"
summary: "项目简介"
tags: ["React", "Node.js"]
github: "https://github.com/..."
demo: "https://..."
cover: "/images/projects/project-a.png"
featured: true
---
```

## 项目目录结构

```
personalPage/
├── src/
│   ├── app/                    # App Router 页面
│   │   ├── layout.tsx          # 根布局（左右分栏）
│   │   ├── page.tsx            # 首页
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx        # 项目列表
│   │   │   └── [slug]/page.tsx # 项目详情
│   │   ├── blog/
│   │   │   ├── page.tsx        # 博客列表
│   │   │   └── [slug]/page.tsx # 文章详情
│   │   └── contact/page.tsx
│   ├── components/             # 可复用组件
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx     # 左侧固定面板
│   │   │   ├── MobileNav.tsx   # 移动端导航
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── BlogPostItem.tsx
│   │   │   ├── TagFilter.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── TechStack.tsx
│   │   │   └── CopyButton.tsx
│   │   └── mdx/
│   │       └── MDXComponents.tsx  # MDX 自定义组件
│   ├── lib/
│   │   ├── mdx.ts              # MDX 文件读取和解析
│   │   └── utils.ts            # 工具函数（阅读时间等）
│   └── styles/
│       └── globals.css         # Tailwind + 全局样式
├── content/                    # MDX 内容文件
│   ├── blog/
│   └── projects/
├── public/
│   └── images/                 # 静态图片资源
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 部署方案

### Docker 容器化

- **多阶段构建**：`node:20-alpine` 构建 → 精简运行镜像
- `next build` 生成 standalone 输出
- Nginx 反向代理，处理 HTTPS 和静态资源缓存

### docker-compose.yml

- `web` 服务：Next.js standalone server（端口 3000）
- `nginx` 服务：反向代理 + SSL 终止 + 静态资源缓存

### 部署流程

1. 本地开发完成，推送到 Git 仓库
2. 服务器上 `git pull` + `docker compose up -d --build`
3. 后续可扩展为 GitHub Actions 自动部署

## SEO 优化

- 每个页面配置 `metadata`（title、description、openGraph）
- `generateStaticParams` 预渲染所有博客和项目页
- 自动生成 `sitemap.xml`
- `robots.txt` 配置

## 不在本期范围内

- 多语言（i18n）支持
- 评论系统
- 暗色/亮色主题切换
- 搜索功能
- RSS 订阅
- 访问统计/分析

以上功能可在 v1 完成后按需迭代。
