import type { Metadata } from "next";
import { GitBranch, Link2, Mail } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopyButton from "@/components/ui/CopyButton";

export const metadata: Metadata = {
  title: "联系方式",
  description: "通过邮箱或社交媒体与我取得联系。",
};

const EMAIL = "2271959422@qq.com";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/RenjojiKureha",
    icon: GitBranch,
    color: "hover:text-accent-blue",
  },
  {
    name: "CSDN",
    href: " ",
    icon: Link2,
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