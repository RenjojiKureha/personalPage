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
