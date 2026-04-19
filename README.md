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
│   └── CtaSection.vue   # CTA 区域
├── composables/         # 组合式函数
│   ├── useSiteConfig.ts # 网站配置
│   ├── useNavigation.ts # 导航菜单（动态生成）
│   ├── useBlocks.ts     # 区块数据
│   ├── useNews.ts       # 新闻数据
│   └── useCdnUrl.ts     # CDN 地址
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
│   └── seed.sql         # 初始数据
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

```env
# Supabase 配置
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# CDN 配置
NUXT_PUBLIC_CDN_BASE_URL=your_cdn_url
```

## 数据库表结构

详见 [docs/DATABASE_DESIGN.md](./docs/DATABASE_DESIGN.md)

### 核心表

| 表名 | 说明 |
|------|------|
| `websites` | 网站基础配置（导航、页脚、SEO等） |
| `pages` | 页面定义（路由、导航可见性、排序） |
| `blocks` | 页面区块内容（Hero、About、Services等） |
| `news` | 新闻文章数据 |

## 开发规范

详见 [.codebuddy/rules](./.codebuddy/rules)

---

更多信息请参考 [Nuxt 3 文档](https://nuxt.com/docs)。
