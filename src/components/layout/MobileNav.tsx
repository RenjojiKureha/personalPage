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
