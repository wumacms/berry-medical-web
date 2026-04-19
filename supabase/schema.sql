-- =============================================
-- 贝瑞医疗网站数据库表结构
-- 新版：网站-页面-区块三层结构
-- =============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. 网站表 (websites)
-- =============================================
-- 存储网站的基础配置信息，包括导航栏和页脚的默认配置
CREATE TABLE IF NOT EXISTS websites (
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

-- =============================================
-- 2. 页面表 (pages)
-- =============================================
-- 存储网站的页面信息，导航菜单根据 is_nav_visible 和 nav_sort_order 字段动态生成
CREATE TABLE IF NOT EXISTS pages (
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

-- =============================================
-- 3. 区块表 (blocks)
-- =============================================
-- 存储所有页面区块的内容配置，支持多种区块类型
-- 注意：同一个页面可以有多个相同类型的区块（如多个 service-detail）
CREATE TABLE IF NOT EXISTS blocks (
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

-- =============================================
-- 4. 新闻表 (news) - 保持原有结构
-- =============================================
CREATE TABLE IF NOT EXISTS news (
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

-- =============================================
-- 索引设计
-- =============================================

-- websites 表
CREATE INDEX IF NOT EXISTS idx_websites_domain ON websites(domain);

-- pages 表
CREATE INDEX IF NOT EXISTS idx_pages_website ON pages(website_id);
CREATE INDEX IF NOT EXISTS idx_pages_nav ON pages(is_nav_visible, nav_sort_order);

-- blocks 表
CREATE INDEX IF NOT EXISTS idx_blocks_page ON blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_blocks_type ON blocks(type);
CREATE INDEX IF NOT EXISTS idx_blocks_sort ON blocks(page_id, sort_order);

-- news 表
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);

-- =============================================
-- RLS 策略 (Row Level Security)
-- =============================================

ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 允许公开读取所有数据
CREATE POLICY "Allow public read websites" ON websites FOR SELECT USING (true);
CREATE POLICY "Allow public read pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Allow public read blocks" ON blocks FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read news" ON news FOR SELECT USING (is_published = true);

-- =============================================
-- 触发器：自动更新时间戳
-- =============================================

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
