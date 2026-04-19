# 数据库设计优化方案

## 一、概述

本方案对现有数据库进行重构，采用**网站-页面-区块**三层结构，所有内容区块数据统一存储在 `blocks` 表中，实现更清晰的数据组织和更灵活的内容管理。

## 二、数据库结构设计

### 2.1 表结构关系图

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   websites      │       │    pages        │       │    blocks       │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │──────→│ website_id(FK) │──────→│ page_id (FK)    │
│ name            │       │ name           │       │ type            │
│ domain          │       │ path           │       │ title           │
│ company_name    │       │ description    │       │ sort_order      │
│ slogan          │       │ nav_sort_order │       │ config (JSONB)  │
│ description     │       │ is_nav_visible │       │ is_published    │
│ logo            │       │ is_footer_vis  │       │ updated_at      │
│ url             │       │ seo (JSONB)    │       └─────────────────┘
│ icp             │       │ created_at     │
│ contact (JSONB)  │       │ updated_at     │
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_id, type)
);
```

**支持的区块类型：**

| type | 说明 | 对应组件 |
|------|------|----------|
| `hero` | 首屏横幅 | HeroSection.vue |
| `about` | 关于我们 | AboutSection.vue |
| `services` | 服务概览 | ServicesSection.vue |
| `service-detail` | 服务详情 | ServiceDesign/Construction/Equipment/Software.vue |
| `advantages` | 核心优势 | AdvantagesSection.vue |
| `projects` | 业绩案例 | ProjectsSection.vue |
| `news` | 首页新闻动态 | NewsSection.vue |
| `news-list` | 新闻列表页 | NewsSection.vue (列表模式) |
| `contact` | 联系方式 | ContactSection.vue |
| `cta` | 行动召唤 | CtaSection.vue |

#### news 表（新闻表）

存储新闻文章数据（保持不变）。

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

## 三、数据初始化脚本

### 3.1 网站数据（website.json 对应）

```sql
INSERT INTO websites (id, name, domain, company_name, slogan, description, logo, url, icp, contact, nav_config, footer_config, seo) VALUES (
  'main',
  '贝瑞医疗',
  'www.berrymedical.com.cn',
  '贝瑞医疗科技（郑州）有限公司',
  '核医学场所建设一站式服务商',
  '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。',
  '/images/logos/logo.png',
  'https://wumacms.github.io/berry-medical-nuxt',
  '豫ICP备2025123456号',
  '{
    "phone": ["18503878846", "13215991477"],
    "email": "530051528@qq.com",
    "website": "www.berrymedical.com.cn",
    "address": {
      "province": "河南省",
      "city": "郑州市",
      "street": "高新技术产业开发区瑞达路睿达广场1栋14层",
      "postalCode": "450001"
    }
  }'::jsonb,
  '{
    "logo": "/images/logos/logo.png",
    "logoAlt": "贝瑞医疗",
    "menuItems": [],
    "ctaButton": {
      "text": "免费咨询",
      "link": "/#contact"
    }
  }'::jsonb,
  '{
    "copyright": "© 2025 贝瑞医疗科技（郑州）有限公司",
    "description": "专注核医学场所建设一站式服务，从设计、施工到智慧管理系统，赋能精准医疗，守护医患安全。，从设计、施工到智慧管理系统，赋能精准医疗，守护医患安全。",
    "icp": "豫ICP备2025123456号",
    "icpLink": "https://beian.miit.gov.cn/",
    "columns": [
      { "type": "address", "title": "公司地址" },
      { "type": "contact", "title": "联系方式" },
      { "type": "qrcode", "title": "官方微信" }
    ]
  }'::jsonb,
  '{
    "title": "贝瑞医疗 | 核医学场所建设一站式服务商",
    "description": "贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。",
    "keywords": ["核医学", "辐射防护", "放射性药品", "GMP", "智慧管理系统"]
  }'::jsonb
);
```

### 3.2 页面数据（pages.json 对应）

```sql
-- 首页
INSERT INTO pages (id, website_id, name, path, description, nav_sort_order, is_nav_visible, is_footer_visible, seo) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'main',
  '首页',
  '/',
  '贝瑞医疗 - 核医学场所建设一站式服务商',
  1,
  true,
  true,
  '{
    "title": "贝瑞医疗 | 核医学场所建设一站式服务商",
    "description": "贝瑞医疗提供核医学场所全生命周期解决方案"
  }'::jsonb
);

-- 新闻资讯页
INSERT INTO pages (id, website_id, name, path, description, nav_sort_order, is_nav_visible, is_footer_visible, seo) VALUES (
  '4a260865-a9e2-45ab-a42e-6a100e02f37b',
  'main',
  '新闻资讯',
  '/news',
  '新闻资讯 - 行业动态、公司要闻',
  2,
  true,
  true,
  '{
    "title": "新闻资讯 | 贝瑞医疗",
    "description": "了解贝瑞医疗最新动态及核医学行业资讯"
  }'::jsonb
);
```

### 3.3 区块数据（blocks.json 对应）

#### 首页 Hero 区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'hero',
  '首屏Hero',
  1,
  '{
    "badge": "精准医疗 · 核创未来",
    "title": "专注核医学场所\n一站式服务商",
    "description": "从选址规划、辐射防护施工到智慧管理系统，贝瑞医疗为全国顶级医疗机构提供全产业链闭环解决方案，助力精准诊疗时代。",
    "tags": ["15+年专业团队", "30+成功案例", "全流程GMP合规"],
    "buttons": [
      { "text": "探索服务", "link": "/#service-design", "style": "primary" },
      { "text": "联系专家", "link": "/#contact", "style": "secondary" }
    ]
  }'::jsonb
);
```

#### 关于我们区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'about',
  '关于我们',
  2,
  '{
    "title": "精于专业 · 恪于安全 · 诚于客户",
    "subtitle": "核医学一站式服务领航者",
    "description": "贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。核心团队拥有十年以上知名科研机构与医疗机构经验，匠心铸造每个项目。",
    "features": [
      { "icon": "fa-drafting-compass", "text": "工艺设计/专项施工图" },
      { "icon": "fa-hard-hat", "text": "辐射防护施工/三废处理" },
      { "icon": "fa-chart-line", "text": "智慧核医学管理系统" },
      { "icon": "fa-hand-holding-heart", "text": "7×24h运维检测" }
    ]
  }'::jsonb
);
```

#### 服务概览区块（包含3个服务卡片，4个详情链接）

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'services',
  '服务概览',
  3,
  '{
    "title": "核医学场所 · 全生命周期解决方案",
    "subtitle": "闭环服务",
    "cards": [
      {
        "id": "design",
        "icon": "fa-pencil-ruler",
        "title": "设计",
        "subtitle": "选址评估 · 布局优化 · 辐射分区 · GMP标准洁净区设计 · 通风系统独立气流组织",
        "features": [
          "符合GBZ、药品GMP及放射性药品附录",
          "衰变池设计/辐射防护优化",
          "药监验收一站式技术咨询"
        ]
      },
      {
        "id": "construction",
        "icon": "fa-hard-hat",
        "title": "施工",
        "subtitle": "辐射防护施工 · 放射性废水处理系统 · 多工种协同管理 · 全程驻点",
        "features": [
          "防护门窗/围护结构/三废处理",
          "通过环保验收、职卫控评验收",
          "智能衰变池系统（长短半衰期双系）"
        ]
      },
      {
        "id": "equipment",
        "icon": "fa-microscope",
        "title": "设备",
        "subtitle": "核素治疗监测 · 辐射监测仪器 · 药物操作热室/手套箱",
        "features": [
          "131I体内活度测量/全身动态辐射显像",
          "个人剂量仪/环境监测/活度计CRC-55tR",
          "放射性废物自动处理系统"
        ]
      }
    ],
    "detailLinks": [
      { "id": "service-design", "text": "设计 · 规划布局", "icon": "fa-pencil-ruler" },
      { "id": "service-construction", "text": "施工 · 辐射防护", "icon": "fa-hard-hat" },
      { "id": "service-equipment", "text": "设备 · 监测仪器", "icon": "fa-microscope" },
      { "id": "service-software", "text": "瑞核V1.0智慧系统", "icon": "fa-chart-line" }
    ]
  }'::jsonb
);
```

#### 服务详情区块（设计篇）

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'service-detail',
  '设计篇',
  4,
  '{
    "id": "service-design",
    "badge": "精准设计 · 合规先行",
    "title": "全流程核医学专项设计",
    "description": "从选址评估到施工图落地，贝瑞设计团队严格遵循药品GMP、GBZ系列及放射性药品附录，为客户提供功能优化与成本可控的专项设计。"
  }'::jsonb
);
```

#### 服务详情区块（施工篇）

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'service-detail',
  '施工篇',
  5,
  '{
    "id": "service-construction",
    "badge": "匠心施工 · 全程可控",
    "title": "辐射防护与净化工程总承包",
    "description": "多工种交叉协同，驻点管理确保进度与质量。辐射防护门窗、围护结构、三废处理系统一次性通过环保验收及职业病危害控制效果评价。",
    "features": [
      { "icon": "fa-shield-virus", "text": "防护门窗/铅玻璃/防护涂料施工，满足环评卫评要求" },
      { "icon": "fa-water", "text": "智能放射性废水衰变系统（长短半衰期双系）达标排放" },
      { "icon": "fa-chart-line", "text": "放射性药物制备净化场所施工，通过药监GMP专家检查" },
      { "icon": "fa-clock", "text": "全程项目管理 + 7×24h运维保障，无缝衔接验收" }
    ]
  }'::jsonb
);
```

#### 服务详情区块（设备篇）

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'service-detail',
  '设备篇',
  6,
  '{
    "id": "service-equipment",
    "badge": "尖端设备 · 智慧监测",
    "title": "核素治疗及辐射监测仪器",
    "description": "提供从放射性药物操作、分装到患者治疗监测、环境辐射安全的完整设备链，助力核医学科高效合规运行。",
    "features": [
      { "icon": "fa-syringe", "text": "I-131体内活度测量系统 / 全身动态辐射显像（Clairvoyant2）" },
      { "icon": "fa-radiation", "text": "RadTarge个人剂量仪、RadWal环境辐射监测仪、便携式巡测仪" },
      { "icon": "fa-cube", "text": "防护手套箱、合成热室、分装热室、一体化注射防护台" },
      { "icon": "fa-flask", "text": "CRC-55tR活度计 / 全自动脚踏式放射性废物箱 / 转运防护罐" }
    ]
  }'::jsonb
);
```

#### 服务详情区块（瑞核系统）

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'service-detail',
  '瑞核系统',
  7,
  '{
    "id": "service-software",
    "badge": "数字孪生 · 智慧中枢",
    "title": "瑞核V1.0 核医学智慧管理系统",
    "description": "1中心+2平台+4维度+N应用，实现设备运行、辐射安全、安防、日常运营全维度管理。物理空间1:1虚拟映射，数据驱动主动预判。",
    "features": [
      { "icon": "fa-chart-simple", "text": "实时辐射监测预警 & 智能决策辅助" },
      { "icon": "fa-database", "text": "设备生命周期管理与预测维护" },
      { "icon": "fa-shield-alt", "text": "符合核医学质控及监管上报标准" }
    ]
  }'::jsonb
);
```

#### 核心优势区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'advantages',
  '核心优势',
  8,
  '{
    "title": "为什么选择贝瑞医疗",
    "subtitle": "核心技术壁垒 · 深度行业积淀",
    "items": [
      { "icon": "fa-chart-line", "value": "10+", "label": "四类《放射性药品使用许可证》取证支持" },
      { "icon": "fa-users", "value": "15+年", "label": "核医学场所专业团队经验" },
      { "icon": "fa-building", "value": "30+", "label": "医疗机构建设案例" },
      { "icon": "fa-file-alt", "value": "100+", "label": "核医学方案技术咨询" }
    ],
    "highlights": [
      { "icon": "fa-book-open", "text": "参编核医学行业规范标准" },
      { "icon": "fa-hard-hat", "text": "擅长复杂场地改造&狭小空间优化" }
    ],
    "badge": "全流程许可证办理支持"
  }'::jsonb
);
```

#### 业绩案例区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'projects',
  '业绩案例',
  9,
  '{
    "title": "合作案例 · 实力见证",
    "subtitle": "全国顶级医院及科研机构信赖之选",
    "items": [
      "复旦大学附属中山医院",
      "陆军军医大学西南医院",
      "南昌大学第一附属医院",
      "福建医科大学附属第一医院",
      "广东省第二人民医院",
      "宜春市人民医院",
      "遵义医科大学附属医院",
      "新疆医科大学附属肿瘤医院",
      "国家肿瘤区域医疗中心",
      "远大医药（中国）"
    ]
  }'::jsonb
);
```

#### 新闻动态区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'news',
  '新闻动态',
  10,
  '{
    "title": "贝瑞动态 · 核医前沿",
    "subtitle": "行业资讯 | 技术突破 | 公司要闻",
    "limit": 3,
    "showMoreButton": {
      "text": "查看全部新闻",
      "link": "/news"
    }
  }'::jsonb
);
```

### 3.4 新闻数据（news 表）

```sql
-- 新闻数据
INSERT INTO news (title, excerpt, content, date, category, image, views, tags) VALUES
(
  '贝瑞医疗携瑞核V1.2亮相全国核医学年会，数字孪生成焦点',
  '在2025年全国核医学学术年会上，贝瑞医疗展示了全新升级的瑞核智慧管理系统，通过数字孪生技术实现辐射防护预演，吸引数百位专家驻足交流。',
  '<p>2025年全国核医学学术年会于4月15日至18日在上海国际会议中心成功举办。</p><h2>数字孪生技术引领行业创新</h2><p>贝瑞医疗重点展示的瑞核V1.2系统采用先进的数字孪生技术，能够1:1还原核医学科物理空间。</p>',
  '2025-04-18',
  '公司要闻',
  '/images/news/cover-1.jpg',
  1245,
  ARRAY['全国核医学年会', '数字孪生', '瑞核V1.2']
),
(
  '助力核药创新：贝瑞为多家药企定制GMP级热室，加速Lu-177临床转化',
  '公司放射性药物设备事业部宣布，已为国内三家创新药企提供符合cGMP标准的热室及分装系统，推动靶向放射性核素治疗药物上市进程。',
  '<p>随着靶向放射性核素治疗（Theranostics）在国内快速发展，符合GMP标准的放射性药物制备设施需求日益增长。</p><h2>定制化解决方案</h2><p>针对不同药企的药物研发管线，贝瑞医疗技术团队提供了从设计咨询、设备选型到安装验证的全流程服务。</p>',
  '2025-04-10',
  '技术突破',
  '/images/news/cover-2.jpg',
  876,
  ARRAY['Lu-177', 'GMP热室', '放射性药物']
),
(
  '新版《核医学辐射防护标准》解读：贝瑞医疗参与起草，智慧化成关键词',
  '国家卫生健康委发布最新核医学辐射防护标准，贝瑞医疗作为行业参编单位，深度参与智能化监测与衰变池规范章节撰写。',
  '<p>国家卫生健康委发布最新核医学辐射防护标准，贝瑞医疗作为行业参编单位深度参与。</p><h2>智能化监测成为重点</h2><p>新版标准在智能化监测方面提出了更高要求，强调实时监测与预警功能。</p>',
  '2025-03-28',
  '行业政策',
  '/images/news/cover-3.jpg',
  654,
  ARRAY['辐射防护标准', '行业政策', '智慧化']
),
(
  '瑞核V1.0荣获医疗信息化创新金奖，引领核医学科智慧管理变革',
  '在2025中国医疗信息化大会上，贝瑞医疗自主研发的"瑞核V1.0核医学智慧管理系统"凭借数字孪生及全维度监测功能获得创新金奖。',
  '<p>在2025中国医疗信息化大会上，瑞核V1.0凭借数字孪生及全维度监测功能获得创新金奖。</p><h2>行业认可</h2><p>与会专家对瑞核V1.0的创新性给予高度评价，认为其代表了核医学科智慧管理的未来方向。</p>',
  '2025-03-15',
  '公司要闻',
  '/images/news/cover-2.jpg',
  1023,
  ARRAY['瑞核V1.0', '创新金奖', '智慧管理']
),
(
  '贝瑞医疗郑州展厅开放日：沉浸式体验核医学防护施工全流程',
  '3月28日，贝瑞医疗郑州总部展厅首次对外开放，现场演示辐射防护材料测试及衰变池智能控制系统，吸引众多医院基建科代表参加。',
  '<p>贝瑞医疗郑州总部展厅首次对外开放，吸引众多医院基建科代表参加。</p><h2>沉浸式体验</h2><p>参观者可亲身体验辐射防护材料测试，了解衰变池智能控制系统的工作原理。</p>',
  '2025-03-05',
  '展会活动',
  '/images/news/cover-3.jpg',
  543,
  ARRAY['展厅开放', '展会活动', '沉浸式体验']
),
(
  '贝瑞医疗与芬兰核医学中心达成战略合作，引入北欧辐射防护技术',
  '双方将共同研发新一代智能化放射性废物处理系统，提升核医学科环保与安全水平。',
  '<p>双方将共同研发新一代智能化放射性废物处理系统，提升核医学科环保与安全水平。</p>',
  '2025-02-20',
  '公司要闻',
  '/images/news/cover-1.jpg',
  789,
  ARRAY['国际合作', '战略合作', '技术引进']
);
```

#### 联系方式区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'contact',
  '联系我们',
  11,
  '{
    "title": "联系贝瑞医疗专家团队",
    "description": "立即沟通，获取核医学场所建设一站式解决方案。"
  }'::jsonb
);
```

#### CTA 区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '760dcc34-df32-4473-96bd-fa021c401837',
  'cta',
  '行动召唤',
  12,
  '{
    "title": "赋能精准医疗 · 共建核医学科标杆",
    "description": "从设计到验收，贝瑞医疗让核医学场所建设更专业、更安全。"
  }'::jsonb
);
```

#### 新闻页 Hero 区块

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '4a260865-a9e2-45ab-a42e-6a100e02f37b',
  'hero',
  '新闻页Hero',
  1,
  '{
    "badge": "贝瑞动态 · 核医前沿",
    "title": "新闻与洞察",
    "subtitle": "行业前沿资讯、技术突破、公司要闻及核医学领域深度观察"
  }'::jsonb
);
```

#### 新闻列表区块（新闻页用）

```sql
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES (
  '4a260865-a9e2-45ab-a42e-6a100e02f37b',
  'news-list',
  '新闻列表',
  2,
  '{
    "categories": ["全部", "公司要闻", "技术突破", "行业政策", "展会活动"],
    "pageSize": 9
  }'::jsonb
);
```

## 四、前端架构改造

### 4.1 数据流架构

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
│  ├── useWebsite.ts
│  ├── usePages.ts │
│  ├── useBlocks.ts │
│  └── useNews.ts  │
└────────┬────────┘
         │ computed
         ▼
┌─────────────────┐
│   components    │
│  └── 各区块组件  │
└─────────────────┘
```

### 4.2 组件与区块对应关系

| 区块类型 | Vue 组件 | 数据来源 |
|----------|----------|----------|
| hero | HeroSection.vue | blocks.json (type=hero) |
| about | AboutSection.vue | blocks.json (type=about) |
| services | ServicesSection.vue | blocks.json (type=services) |
| service-detail | ServiceDesign/Construction/Equipment/Software.vue | blocks.json (type=service-detail) |
| advantages | AdvantagesSection.vue | blocks.json (type=advantages) |
| projects | ProjectsSection.vue | blocks.json (type=projects) + site 配置 |
| news | NewsSection.vue | blocks.json (type=news) + news.json |
| contact | ContactSection.vue | blocks.json (type=contact) + website.contact |
| cta | CtaSection.vue | blocks.json (type=cta) |
| nav | AppHeader.vue | pages.json (筛选 is_nav_visible) |
| footer | AppFooter.vue | website.footer_config |

### 4.3 文件改造清单

| 序号 | 文件路径 | 改造内容 |
|------|----------|----------|
| **数据库** |
| 1 | `supabase/schema.sql` | 重写为新结构（websites, pages, blocks, news） |
| 2 | `supabase/migrations/002_add_dynamic_content.sql` | 删除 |
| 3 | `supabase/migrations/003_add_projects_to_site_config.sql` | 删除 |
| **数据获取** |
| 4 | `scripts/fetch-supabase-data.ts` | 重写为从新表获取数据 |
| **数据类型** |
| 5 | `types/database.ts` | 新增 Website, Page, Block 类型 |
| **数据文件** |
| 6 | `data/site.ts` | 改为从 website.json 读取 |
| 7 | `data/services.ts` | 删除，改用 blocks.json |
| 8 | `data/advantages.ts` | 删除，改用 blocks.json |
| 9 | `data/navigation.ts` | 新增，从 pages.json 动态生成 |
| 10 | `data/blocks.ts` | 新增，封装区块数据读取 |
| **Composable** |
| 11 | `composables/useSiteConfig.ts` | 适配新数据结构 |
| 12 | `composables/useServices.ts` | 删除，改用 useBlocks |
| 13 | `composables/useAdvantages.ts` | 删除，改用 useBlocks |
| 14 | `composables/useNavigation.ts` | 新增，动态生成导航菜单 |
| 15 | `composables/useBlocks.ts` | 新增，区块数据 composable |
| 16 | `composables/useNews.ts` | 保持，适配新结构 |
| **组件** |
| 17 | `components/AppHeader.vue` | 使用 useNavigation 动态渲染 |
| 18 | `components/AppFooter.vue` | 使用 website 配置 |
| 19 | `components/HeroSection.vue` | 使用 blocks 数据 |
| 20 | `components/AboutSection.vue` | 使用 blocks 数据 |
| 21 | `components/ServicesSection.vue` | 使用 blocks 数据 |
| 22 | `components/ServiceDesign.vue` | 使用 blocks 数据 |
| 23 | `components/ServiceConstruction.vue` | 使用 blocks 数据 |
| 24 | `components/ServiceEquipment.vue` | 使用 blocks 数据 |
| 25 | `components/ServiceSoftware.vue` | 使用 blocks 数据 |
| 26 | `components/AdvantagesSection.vue` | 使用 blocks 数据 |
| 27 | `components/ProjectsSection.vue` | 使用 site 配置 |
| 28 | `components/NewsSection.vue` | 使用 blocks 数据 |
| 29 | `components/ContactSection.vue` | 使用 blocks + website 数据 |
| 30 | `components/CtaSection.vue` | 使用 blocks 数据 |
| **页面** |
| 31 | `pages/index.vue` | 保持，组件自动从新数据源获取 |
| 32 | `pages/news/index.vue` | 适配新结构 |

### 4.4 导航菜单动态生成规则

导航菜单根据 `pages` 表中 `is_nav_visible = true` 的记录动态生成：

```typescript
// 导航菜单项结构
interface NavMenuItem {
  name: string      // 页面名称
  path: string      // 页面路径
  children?: NavMenuItem[]  // 子菜单（用于"服务内容"下拉）
}

// 生成规则：
// 1. 服务内容菜单：固定包含4个服务详情锚点链接
// 2. 其他页面：直接从 pages 表读取
```

## 五、改造原则

1. **保持现有样式不变**：所有 Vue 组件的 HTML 结构和 TailwindCSS 样式保持原样
2. **保持现有内容不变**：区块显示的内容数据保持原样
3. **数据来源切换**：从硬编码数据 → 从 `data/generated/*.json` 读取
4. **组件接口兼容**：组件的 props 和数据访问方式保持兼容
5. **静默迁移**：用户无需感知数据库变化，`pnpm fetch-data` 自动同步

## 六、改造验收标准

- [ ] `pnpm fetch-data` 命令正常工作
- [ ] 首页显示的区块内容与改造前一致
- [ ] 导航菜单正确生成
- [ ] 新闻页面正常显示
- [ ] 所有区块组件样式不变
- [ ] `pnpm dev` 开发模式正常启动
- [ ] `pnpm build` 构建成功
