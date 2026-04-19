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

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview

# 从 Supabase 获取数据
pnpm fetch-data
```

## 项目结构

```
├── assets/              # 静态资源（CSS、图片）
├── components/          # Vue 组件
│   ├── AppHeader.vue    # 网站头部
│   ├── AppFooter.vue    # 网站底部
│   ├── HeroSection.vue  # 首屏区域
│   ├── AboutSection.vue  # 关于我们
│   ├── AdvantagesSection.vue  # 核心优势
│   ├── ServicesSection.vue  # 服务概览
│   ├── ServiceDetailBlock.vue  # 服务详情通用组件
│   ├── NewsSection.vue  # 新闻列表
│   ├── NewsCard.vue  # 新闻卡片
│   ├── ContactSection.vue  # 联系方式
│   └── CtaSection.vue  # CTA 区域
├── composables/         # 组合式函数
│   ├── useSiteConfig.ts  # 网站配置
│   ├── useServices.ts  # 服务数据
│   ├── useAdvantages.ts  # 优势数据
│   ├── useNews.ts  # 新闻数据
│   └── useCdnUrl.ts  # CDN 地址
├── data/                # 静态数据文件
│   ├── site.ts          # 网站基础配置
│   ├── services.ts     # 服务配置
│   ├── advantages.ts    # 优势配置
│   ├── news.ts          # 新闻配置
│   └── generated/       # 从 Supabase 生成的数据
├── layouts/             # 布局文件
├── pages/               # 页面文件
│   ├── index.vue        # 首页
│   └── news/            # 新闻页面
│       ├── index.vue    # 新闻列表
│       └── [id].vue     # 新闻详情
├── supabase/            # 数据库迁移脚本
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

## 数据管理

项目使用 Supabase 作为后端数据库，通过 `pnpm fetch-data` 命令从 Supabase 获取数据并生成本地 JSON 文件：

- `data/generated/site.json` - 网站基础配置
- `data/generated/services.json` - 服务详情数据
- `data/generated/news.json` - 新闻文章数据

## 环境变量

```env
# Supabase 配置
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# CDN 配置
NUXT_PUBLIC_CDN_BASE_URL=your_cdn_url
```

---

更多信息请参考 [Nuxt 3 文档](https://nuxt.com/docs)。
