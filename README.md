# Berry Medical Nuxt

贝瑞医疗科技（郑州）有限公司官方网站，基于 Nuxt 3 构建的核医学场所建设一站式服务商官网。

## 关于贝瑞医疗

贝瑞医疗深耕核医学场所建设全产业链，提供：

- **选址规划** - 场地评估、布局优化、辐射分区
- **方案设计** - GMP 标准洁净区设计、通风系统气流组织
- **辐射防护施工** - 放射性废水处理、多工种协同管理
- **设备供应安装** - 核素治疗监测、辐射监测仪器、药物操作热室/手套箱
- **智慧运维** - 瑞核智慧管理系统 V1.0

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | Nuxt 3 |
| UI | Vue 3 (Composition API) |
| 样式 | TailwindCSS 4 |
| 类型 | TypeScript |
| 数据库 | Supabase (PostgreSQL) |
| 部署 | GitHub Pages |

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 从 Supabase 获取数据
pnpm fetch-data

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 部署前准备

> ⚠️ **重要**：首次部署项目前，必须按顺序完成以下步骤：

### 1. 创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard) 创建新项目
2. 获取项目 URL 和 `service_role` key

### 2. 创建数据库表

在 Supabase SQL Editor 中执行 `supabase/schema.sql` 创建表结构。

### 3. 导入初始数据（可选）

执行 `supabase/seed.sql` 导入示例数据。

### 4. 部署 contact-submit Edge Function

通过 Supabase Dashboard 手动部署：

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目 `berry-medical-web`
3. 导航到 **Edge Functions**
4. 点击 **New Function**
5. 在编辑器中粘贴 `supabase/functions/contact-submit/index.ts` 的代码
6. 点击 **保存**

> 详见 [supabase/functions/README.md](./supabase/functions/README.md)

### 5. 配置 GitHub Secrets

在 GitHub 仓库 `Settings → Secrets and variables → Actions` 中添加：
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NUXT_PUBLIC_SUPABASE_URL`
- `NUXT_PUBLIC_SUPABASE_ANON_KEY`

### 6. 推送代码触发部署

推送到 `main` 分支，GitHub Actions 将自动构建并部署。

## 项目结构

```
├── assets/              # 静态资源（CSS、图片）
├── components/          # Vue 组件
│   ├── AppHeader.vue    # 网站头部（动态导航）
│   ├── AppFooter.vue    # 网站底部
│   ├── HeroSection.vue  # 首屏区域
│   ├── AboutSection.vue  # 关于我们
│   ├── AdvantagesSection.vue  # 核心优势
│   ├── ServicesSection.vue  # 服务概览
│   ├── ServiceDetailBlock.vue  # 服务详情通用组件
│   ├── ProjectsSection.vue  # 业绩案例
│   ├── NewsSection.vue  # 新闻列表
│   ├── NewsCard.vue     # 新闻卡片
│   ├── ContactSection.vue  # 联系方式
│   ├── CtaSection.vue   # CTA 区域
│   ├── PageHero.vue     # 页面通用头部
│   ├── ToastNotification.vue  # 提示通知组件
│   └── HelloWorld.vue   # 示例组件
├── composables/         # 组合式函数
│   ├── useSiteConfig.ts # 网站配置
│   ├── useNavigation.ts # 导航菜单（动态生成）
│   ├── useBlocks.ts     # 区块数据
│   ├── useNews.ts       # 新闻数据
│   ├── useServices.ts   # 服务数据
│   ├── useContactForm.ts # 联系表单处理
│   ├── useCdnUrl.ts     # CDN 地址
│   └── useToast.ts      # 提示通知
├── data/                # 静态数据文件
│   ├── site.ts          # 网站基础配置
│   ├── navigation.ts    # 导航配置
│   ├── blocks.ts        # 区块数据封装
│   ├── pages.ts         # 页面数据
│   ├── services.ts      # 服务配置
│   └── generated/       # 从 Supabase 生成的数据（勿手动编辑）
│       ├── website.json # 网站配置
│       ├── pages.json   # 页面数据
│       ├── blocks.json  # 区块数据
│       └── news.json    # 新闻数据
├── layouts/             # 布局文件
├── pages/               # 页面文件
│   ├── index.vue        # 首页
│   └── news/            # 新闻页面
│       ├── index.vue    # 新闻列表
│       └── [id].vue     # 新闻详情
├── supabase/            # 数据库脚本
│   ├── schema.sql       # 表结构定义
│   ├── seed.sql         # 初始数据
│   ├── functions/       # Edge Functions
│   │   └── contact-submit/  # 联系表单提交
│   │       └── index.ts
│   └── migrations/      # 数据库迁移文件
├── scripts/             # 工具脚本
│   └── fetch-supabase-data.ts  # 数据拉取脚本
├── public/              # 公共静态资源
├── types/               # TypeScript 类型定义
├── nuxt.config.ts       # Nuxt 配置
└── package.json
```

## 页面路由

| 文件 | 路由 | 描述 |
|------|------|------|
| `pages/index.vue` | `/` | 首页 |
| `pages/news/index.vue` | `/news` | 新闻列表 |
| `pages/news/[id].vue` | `/news/:id` | 新闻详情 |

## 数据架构

项目采用 **网站-页面-区块** 三层数据架构：

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  websites   │────→│   pages     │────→│   blocks    │
│  (网站配置)  │     │  (页面定义)  │     │  (区块内容)  │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │    news     │
                                        │  (新闻文章)  │
                                        └─────────────┘
```

### 数据流向

```
Supabase DB → pnpm fetch-data → data/generated/*.json → composables → components
```

### 生成的数据文件

| 文件 | 说明 | 来源表 |
|------|------|--------|
| `website.json` | 网站基础配置 | websites |
| `pages.json` | 页面信息（用于导航） | pages |
| `blocks.json` | 页面区块内容 | blocks |
| `news.json` | 新闻文章数据 | news |

## 环境变量

### 本地开发 (.env.local)

```env
# Supabase 配置
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# CDN 配置
NUXT_PUBLIC_CDN_BASE_URL=your_cdn_url
```

### GitHub Secrets (CI/CD 部署)

在 GitHub 仓库的 `Settings → Secrets and variables → Actions` 中配置：

| Secret 名称 | 说明 | 来源 |
|------------|------|------|
| `SUPABASE_URL` | Supabase 项目 URL | Supabase Dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key | Supabase Dashboard → Project Settings → API |
| `NUXT_PUBLIC_SUPABASE_URL` | 公开的 Supabase URL | 同 SUPABASE_URL |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | 公开的 Anon Key | Supabase Dashboard → Project Settings → API |

> **注意**：`NUXT_PUBLIC_CDN_BASE_URL` 在 `deploy.yml` 中已硬编码为 `https://wumacms.github.io/berry-medical-web`，如需更改请修改该文件。

## 数据库与后端

详见 [docs/DATABASE_DESIGN.md](./docs/DATABASE_DESIGN.md)

### 核心表

| 表名 | 说明 |
|------|------|
| `websites` | 网站基础配置（导航、页脚、SEO等） |
| `pages` | 页面定义（路由、导航可见性、排序） |
| `blocks` | 页面区块内容（Hero、About、Services等） |
| `news` | 新闻文章数据 |
| `contact_submissions` | 联系表单提交记录 |

### 功能模块

#### 联系表单（Contact Form）

用户提交的联系表单数据通过 Edge Function 处理后存储到 `contact_submissions` 表。

**前端调用**：`composables/useContactForm.ts` → `useContactForm().submit()`

**后端处理**：`supabase/functions/contact-submit/index.ts`

**API 端点**：`POST /functions/v1/contact-submit`

**请求格式**：
```json
{
  "name": "姓名（必填）",
  "phone": "手机号（必填，1开头的11位数字）",
  "email": "邮箱（可选）",
  "company": "公司（可选）",
  "message": "留言（可选）"
}
```

**响应格式**：
```json
{
  "success": true,
  "message": "提交成功"
}
```

### Edge Functions

详见 [supabase/functions/README.md](./supabase/functions/README.md)

## 开发规范

详见 [.codebuddy/rules](./.codebuddy/rules)

---

更多信息请参考 [Nuxt 3 文档](https://nuxt.com/docs)。
