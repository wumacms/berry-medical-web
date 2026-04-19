# 数据库设计文档

## 一、概述

本项目采用 **网站-页面-区块** 三层数据架构，所有内容区块数据统一存储在 `blocks` 表中，实现清晰的数据组织和灵活的内容管理。

## 二、数据库结构

### 2.1 表结构关系图

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   websites      │       │    pages        │       │    blocks       │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │──────→│ website_id(FK)  │──────→│ page_id (FK)    │
│ name            │       │ name            │       │ type            │
│ domain          │       │ path            │       │ title           │
│ company_name    │       │ description     │       │ sort_order      │
│ slogan          │       │ nav_sort_order  │       │ config (JSONB)  │
│ description     │       │ is_nav_visible  │       │ is_published    │
│ logo            │       │ is_footer_vis   │       │ updated_at      │
│ url             │       │ seo (JSONB)     │       └─────────────────┘
│ icp             │       │ created_at      │
│ contact (JSONB) │       │ updated_at      │
│ nav_config      │       └─────────────────┘
│   (JSONB)       │
│ footer_config   │       ┌─────────────────┐
│   (JSONB)       │       │     news        │
│ seo (JSONB)     │       ├─────────────────┤
│ updated_at      │       │ id (PK)         │
└─────────────────┘       │ title           │
                          │ excerpt         │
                          │ content         │
                          │ date            │
                          │ category        │
                          │ image           │
                          │ views           │
                          │ tags (TEXT[])   │
                          │ is_published    │
                          │ created_at      │
                          │ updated_at      │
                          └─────────────────┘
```

### 2.2 数据表详细设计

#### websites 表（网站表）

存储网站的基础配置信息，包括导航栏和页脚的默认配置。

```sql
CREATE TABLE websites (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL DEFAULT '贝瑞医疗',
  domain TEXT,
  company_name TEXT,
  slogan TEXT,
  description TEXT,
  logo TEXT,
  url TEXT,
  icp TEXT,
  contact JSONB DEFAULT '{}',
  nav_config JSONB DEFAULT '{}',
  footer_config JSONB DEFAULT '{}',
  seo JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### pages 表（页面表）

存储网站的页面信息，导航菜单根据 `is_nav_visible` 和 `nav_sort_order` 字段动态生成。

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id TEXT NOT NULL REFERENCES websites(id),
  name TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  description TEXT,
  nav_sort_order INTEGER DEFAULT 0,
  is_nav_visible BOOLEAN DEFAULT true,
  is_footer_visible BOOLEAN DEFAULT true,
  seo JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### blocks 表（区块表）

存储所有页面区块的内容配置，支持多种区块类型。

```sql
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER DEFAULT 0,
  config JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**支持的区块类型：**

| type | 说明 | 对应组件 |
|------|------|----------|
| `hero` | 首屏横幅 | HeroSection.vue |
| `about` | 关于我们 | AboutSection.vue |
| `services` | 服务概览 | ServicesSection.vue |
| `service-detail` | 服务详情 | ServiceDetailBlock.vue |
| `advantages` | 核心优势 | AdvantagesSection.vue |
| `projects` | 业绩案例 | ProjectsSection.vue |
| `news` | 首页新闻动态 | NewsSection.vue |
| `news-list` | 新闻列表页 | NewsSection.vue (列表模式) |
| `contact` | 联系方式 | ContactSection.vue |
| `cta` | 行动召唤 | CtaSection.vue |

#### news 表（新闻表）

存储新闻文章数据。

```sql
CREATE TABLE news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL DEFAULT '公司要闻',
  image TEXT,
  views INTEGER DEFAULT 0,
  tags TEXT[],
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.3 索引设计

```sql
-- websites 表
CREATE INDEX idx_websites_domain ON websites(domain);

-- pages 表
CREATE INDEX idx_pages_website ON pages(website_id);
CREATE INDEX idx_pages_nav ON pages(is_nav_visible, nav_sort_order);

-- blocks 表
CREATE INDEX idx_blocks_page ON blocks(page_id);
CREATE INDEX idx_blocks_type ON blocks(type);
CREATE INDEX idx_blocks_sort ON blocks(page_id, sort_order);

-- news 表
CREATE INDEX idx_news_published ON news(is_published);
CREATE INDEX idx_news_date ON news(date DESC);
CREATE INDEX idx_news_category ON news(category);
```

### 2.4 RLS 策略

```sql
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 允许公开读取所有数据
CREATE POLICY "Allow public read websites" ON websites FOR SELECT USING (true);
CREATE POLICY "Allow public read pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Allow public read blocks" ON blocks FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read news" ON news FOR SELECT USING (is_published = true);
```

### 2.5 触发器

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_websites_updated_at BEFORE UPDATE ON websites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blocks_updated_at BEFORE UPDATE ON blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 三、前端数据流

### 3.1 数据流架构

```
┌─────────────────┐
│   Supabase DB   │
│  (websites,     │
│   pages,        │
│   blocks,       │
│   news)         │
└────────┬────────┘
         │ pnpm fetch-data
         ▼
┌─────────────────┐
│  data/generated │
│  ├── website.json
│  ├── pages.json │
│  ├── blocks.json│
│  └── news.json  │
└────────┬────────┘
         │ import
         ▼
┌─────────────────┐
│   composables   │
│  ├── useSiteConfig.ts
│  ├── useNavigation.ts
│  ├── useBlocks.ts
│  └── useNews.ts
└────────┬────────┘
         │ computed
         ▼
┌─────────────────┐
│   components    │
│  └── 各区块组件  │
└─────────────────┘
```

### 3.2 组件与区块对应关系

| 区块类型 | Vue 组件 | 数据来源 |
|----------|----------|----------|
| hero | HeroSection.vue | blocks.json (type=hero) |
| about | AboutSection.vue | blocks.json (type=about) |
| services | ServicesSection.vue | blocks.json (type=services) |
| service-detail | ServiceDetailBlock.vue | blocks.json (type=service-detail) |
| advantages | AdvantagesSection.vue | blocks.json (type=advantages) |
| projects | ProjectsSection.vue | blocks.json (type=projects) |
| news | NewsSection.vue | blocks.json (type=news) + news.json |
| contact | ContactSection.vue | blocks.json (type=contact) + website.contact |
| cta | CtaSection.vue | blocks.json (type=cta) |
| nav | AppHeader.vue | pages.json (筛选 is_nav_visible) |
| footer | AppFooter.vue | website.footer_config |

### 3.3 导航菜单动态生成

导航菜单根据 `pages` 表中 `is_nav_visible = true` 的记录动态生成：

```typescript
// 导航菜单项结构
interface NavMenuItem {
  name: string      // 页面名称
  path: string      // 页面路径
}

// 生成规则：
// 1. 从 pages 表读取 is_nav_visible = true 的页面
// 2. 按 nav_sort_order 排序
// 3. 服务内容菜单固定包含4个服务详情锚点链接
```

## 四、数据初始化

初始数据脚本位于 `supabase/seed.sql`，包含：

1. **网站数据** - 贝瑞医疗基础配置
2. **页面数据** - 首页、新闻资讯页
3. **区块数据** - Hero、About、Services、Advantages、Projects、News、Contact、CTA 等
4. **新闻数据** - 示例新闻文章

## 五、数据管理规范

### 5.1 本地开发

```bash
# 从 Supabase 获取最新数据
pnpm fetch-data
```

### 5.2 数据文件位置

| 文件 | 说明 | 编辑方式 |
|------|------|----------|
| `data/generated/*.json` | 生成的数据文件 | **禁止手动编辑** |
| `data/*.ts` | 数据封装层 | 可编辑 |
| `supabase/seed.sql` | 初始数据脚本 | 可编辑 |

### 5.3 部署流程

```bash
# 1. 获取最新数据
pnpm fetch-data

# 2. 构建静态站点
pnpm generate

# 3. 预览
pnpm preview
```

## 六、文件清单

| 文件路径 | 说明 |
|----------|------|
| `supabase/schema.sql` | 数据库表结构定义 |
| `supabase/seed.sql` | 初始数据脚本 |
| `scripts/fetch-supabase-data.ts` | 数据拉取脚本 |
| `data/generated/website.json` | 网站配置（生成） |
| `data/generated/pages.json` | 页面数据（生成） |
| `data/generated/blocks.json` | 区块数据（生成） |
| `data/generated/news.json` | 新闻数据（生成） |
| `composables/useSiteConfig.ts` | 网站配置 composable |
| `composables/useNavigation.ts` | 导航菜单 composable |
| `composables/useBlocks.ts` | 区块数据 composable |
| `composables/useNews.ts` | 新闻数据 composable |
