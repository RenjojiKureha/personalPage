# MindFlow - 智能思维导图生成系统

MindFlow 是一个全栈 Web 应用，旨在通过人工智能技术将音频录音或文档资料自动转换为结构清晰的思维导图。用户可以上传会议记录、讲座录音或各类文档，系统将自动识别内容、提取摘要并生成可视化的思维导图。

## 🛠 技术栈 (Tech Stack)

本项目采用现代化的前后Rx端分离架构，配合 Docker 容器化部署。

### 前端 (MindFlow)
*   **框架**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **语言**: JavaScript / Markdown
*   **可视化**: [Markmap](https://markmap.js.org/) (用于渲染 Markdown 为思维导图)
*   **样式**: 自定义 Utility-First CSS (类 Tailwind 风格)
*   **HTTP 客户端**: Native Fetch API

### 后端 (mfBackend)
*   **运行时**: [Node.js](https://nodejs.org/)
*   **框架**: [Express.js](https://expressjs.com/)
*   **语言**: [TypeScript](https://www.typescriptlang.org/)
*   **数据库 ORM**: [Prisma](https://www.prisma.io/)
*   **数据库**: [MongoDB](https://www.mongodb.com/)
*   **API 文档**: Markdown 说明

### 外部服务与 AI 能力
*   **语音识别 (ASR)**: 腾讯云语音识别 (Tencent Cloud ASR) - 用于长音频转文字
*   **大语言模型 (LLM)**: DeepSeek API - 用于文本摘要、逻辑梳理及 Markdown 格式化
*   **邮件服务**: Nodemailer (QQ 邮箱 SMTP) - 用于发送登录/注册验证码

### 基础设施
*   **容器化**: Docker & Docker Compose
*   **Web 服务器**: Nginx (用于前端静态资源托管及 API 反向代理)

---

## 🚀 功能实现细节

### 1. 用户认证系统
后端实现了完整的用户认证流程，支持多种登录方式。
*   **技术**: JWT (隐含或 Session), `bcryptjs` (密码哈希), `nodemailer` (邮件发送).
*   **功能**:
    *   **注册**: 用户名、邮箱、密码注册。密码经过加盐哈希存储。
    *   **验证码登录**: 通过邮箱发送 6 位随机验证码，Redis/数据库存储验证码及过期时间（本实现使用 MongoDB 存储验证码）。
    *   **密码登录**: 传统的账号/邮箱 + 密码登录。
    *   **找回密码**: 通过邮箱验证码重置密码。

### 2. 思维导图生成核心流程

#### A. 音频导入 (`/api/process-audio`)
1.  **上传**: 前端通过 `Multer` 中间件上传音频文件。
2.  **转写**: 后端调用 **腾讯云长语音识别 API** (`CreateRecTask`)。
    *   由于音频可能较长，采用轮询机制 (`DescribeTaskStatus`) 等待转写完成。
    *   支持格式：mp3, wav, m4a 等。
3.  **AI 处理**: 获取转写的原始文本后，调用 **DeepSeek LLM**。
    *   Prompt 设计：要求 AI 扮演速记员，修正错别字，提取层级结构，并输出为 Markdown 列表格式。
4.  **渲染**: 后端返回 Markdown，前端 `markmap-view` 将其渲染为交互式 SVG 导图。

#### B. 文档导入 (`/api/process-text`)
1.  **上传**: 支持 PDF, DOCX, DOC, TXT, MD 等格式。
2.  **文本提取**:
    *   **PDF**: 使用 `pdfjs-dist` 解析二进制数据提取文本。
    *   **DOCX**: 使用 `mammoth` 提取原始文本。
    *   **DOC**: 使用 `word-extractor`。
    *   **TXT/MD**: 直接读取。
3.  **AI 处理**: 提取的文本同样送入 **DeepSeek LLM** 进行摘要和结构化。
4.  **渲染**: 返回 Markdown 供前端渲染。

### 3. 并发控制
为了防止大量并发请求导致服务器内存溢出或触发 API 速率限制，后端实现了 `ConcurrencyLimiter` 类。
*   限制同时进行的重型任务（如音频转写、大文件解析）数量（默认为 3）。
*   超出限制的请求进入队列等待。

### 4. 历史记录管理
*   **存储**: 使用 MongoDB 的 `User` 集合中的 `history` 字段存储用户的导图记录。
*   **结构**: 包含 `markdownContent`, `audioFileName` (如适用), `lastWritedAt` 等。
*   **同步**: 前端支持实时保存修改后的 Markdown 内容到数据库。

### 5. 图片导出
*   **实现**: 前端利用 Canvas API。
    *   将 SVG 节点序列化。
    *   绘制到 Canvas 上（支持高倍率缩放以保证清晰度）。
    *   导出为 PNG 图片下载。

---

## 📂 目录结构

```
Graduation project/
├── docker-compose.yml    # 项目整体容器编排
├── MindFlow/             # 前端项目
│   ├── src/
│   │   ├── components/   # Vue 组件 (Login, HistoryList, Editor)
│   │   ├── assets/       # CSS 样式
│   │   └── markmap.js    # Markmap 初始化逻辑
│   ├── Dockerfile        # 前端构建镜像 (Nginx)
│   └── nginx.conf        # Nginx 代理配置
└── mfBackend/            # 后端项目
    ├── src/
    │   ├── api.ts        # Express 路由与控制器
    │   ├── db.ts         # 数据库连接与 CRUD 封装
    │   └── server.ts     # 入口文件
    ├── prisma/           # 数据库模型定义
    └── Dockerfile        # 后端构建镜像
```

## 🔧 环境配置与运行

### 1. 环境变量 (.env)
在 `mfBackend` 目录下创建 `.env` 文件 (Docker 部署时可在 `docker-compose.yml` 中配置):

```env
DATABASE_URL="mongodb://..."
TENCENT_SECRET_ID="your_id"
TENCENT_SECRET_KEY="your_key"
DEEPSEEK_API_KEY="your_key"
EMAIL_USER="your_email"
EMAIL_PASS="your_smtp_pass"
```

### 2. 本地开发运行

**后端:**
```bash
cd mfBackend
npm install
npx prisma generate
npm start
node ./server.ts
```

**前端:**
```bash
cd MindFlow
npm install
npm run dev
```

### 3. Docker 一键部署

在项目根目录下运行：

```bash
docker-compose up --build -d
```
访问 `http://localhost:80` 即可使用。


# 前端
## 可视化实现（markmap）
### 理解如何使用
* markmap中文官方文档：
    * 信息量少
    * 有理解门槛
* csdn上相关博客：
    * 数量少
    * 仅介绍如何通过软件使用
* markmap英文官方文档：
    * 有语言障碍
    * ***有调用实例演示及开源代码***
最终通过markmap英文官方文档给出的实例开源代码，整合进入项目，实现思维导图实时生成和渲染

## css稳定展示
### tailwind链接不稳定
    对前端界面美化时使用了tailwind框架，但由于测试时链接不稳定，导致css无法加载成功，导致界面混乱。
* ### 解决办法
    本地化处理，新建本地css库，仿照tailwind框架自己写一个，完成了css稳定加载。

# 后端
## 外部接口选用
### 1.语音识别（ASR）
将用户上传的语音文件转成文本，查阅资料后决定选用**腾讯云**：
* 多种音频格式支持
* 识别准确度高
* 结果返回速度快
* 接口安全稳定
* 高性价比（并有每月刷新的免费试用时长）
### 2.大语言模型（LLM）
运用大语言模型ai处理语音识别后返回的文本，将文本总结为.md格式，用于前端渲染
* Gemini：
    * 文本处理能力强
    * ***api服务不支持中国大陆***
* openai：
    * 文本处理能力强
    * ***api服务不支持中国大陆***
* deepseek：
    * 文本处理能力相较前二者略弱
    * 性价比高
    * 接口安全稳定

由于该项目所需的单次文本量处理并不大，故选择**deepseek**

## 音频测试
选用多种叙述类型的音频测试准确率
* 新闻播报：
    * 语音识别准确率100%
    * 专有名词均准确
    * 文本处理结构清晰
* 小说文段节选：
    * 语音识别准确率95%
    * 仅名称个别字有误，不耽误整体理解
    * 文本处理结构清晰，但无法纠错
* 文言文朗读：
    * 语音识别准确率70%
    * 错字很多，小幅修改原文原义
    * 文本处理结构略有误差，部分纠错
* 授课讲稿：
    * 语音识别准确率95%
    * 专有名词略微有误
    * 文本处理结构清晰，能够纠错
* 多人音频：
    * 语音识别准确率99%
    * 仅个别字有误，不耽误整体理解
    * 文本处理结构清晰，能够通过对话推理出讲述者

由于现实场景对于文言文总结的需求量并不大，所以可以忽略这个个例。综上所述，该项目可适应各种现代汉语音频，并能准确总结。  
***注：接口仅支持5mb以下的音频文件***

## ai接口提示词工程
### 输出结果不稳定
    初步的提示词工程限制不到位，导致ai输出结果的格式不稳定，前端无法识别和渲染
* ### 解决办法
    修改提示词，将格式要求提前声明，增加强调符

### Todo 回退机制
1. 错误检查机制：在识别到非预期格式时捕获错误
2. 捕获错误后尝试重试？或采用第二套提示词 or API？

## 并发问题
### 部分请求超时
多用户同时使用服务时，部分用户返回请求超时，且获得返回的用户等待时间变长
### 解决办法
新增ConcurrencyLimiter类
* 限制并发数（上限3个）
    * 未达上限：立即执行
    * 已达上限：放入队列等待
* 完成后，自动从队列中取出下一个任务执行

# 服务器部署
## docker build耗时长
* ### 问题成因
    经检查发现是npm包下载太耗时
* ### 解决办法
    更换国内镜像源

## 初次运行显示404
* ### 问题成因
    nginx配置文件端口管理问题
* ### 解决方法
    修正nginx配置文件

## 用户无法注册登录
* ### 问题成因
    项目所选用的数据库mongodb默认单机模式
* ### 解决方法
    手动开启reolica Set模式

## 文件无法上传
* ### 问题成因
    nginx 没有配置允许大文件上传，当超过限制时，nginx 返回 HTML 错误页面
* ### 解决方法
    更新nginx配置和Express配置以支持大文件上传

## 环境变量未读取
* ### 问题成因
    生成思维导图时报错secretid not found，原因是Docker Compose 文件中使用了占位符，而不是从实际的 .env 文件读取。
* ### 解决方法
    修改 docker-compose.yml 从 .env 文件读取真实的环境变量
