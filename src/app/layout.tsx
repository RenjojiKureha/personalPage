import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
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
