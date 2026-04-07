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
  // {
  //   title: "高级前端工程师",
  //   subtitle: "某科技公司",
  //   period: "2024 - 至今",
  //   description: "负责核心产品前端架构设计和开发，推动团队技术升级。",
  // },
  // {
  //   title: "前端工程师",
  //   subtitle: "某互联网公司",
  //   period: "2022 - 2024",
  //   description: "参与多个 B 端产品的开发，独立负责项目模块设计和实现。",
  // },
  { 
    title:"暂无工作经历",
    subtitle:"",
    period:"",
    description:""
  }
];

const education = [
  {
    title: "计算机科学与技术",
    subtitle: " ",
    period: "2022 - 2026",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
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

      <AnimatedSection delay={0.1}>
        <SectionTitle color="purple">技术栈</SectionTitle>
        <TechStack />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <SectionTitle color="green">工作经历</SectionTitle>
        <Timeline items={workExperience} />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <SectionTitle color="yellow">教育背景</SectionTitle>
        <Timeline items={education} />
      </AnimatedSection>
    </div>
  );
}
