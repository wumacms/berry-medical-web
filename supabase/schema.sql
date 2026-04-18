-- =============================================
-- 贝瑞医疗网站数据库表结构
-- 运行此脚本创建所有需要的表
-- =============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. 新闻表
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

-- 新闻表索引
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);

-- =============================================
-- 2. 服务表
-- =============================================
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  badge TEXT,
  description TEXT,
  features TEXT[],
  image TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. 优势表
-- =============================================
CREATE TABLE IF NOT EXISTS advantages (
  id SERIAL PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. 网站配置表
-- =============================================
CREATE TABLE IF NOT EXISTS site_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT DEFAULT '贝瑞医疗',
  company_name TEXT,
  slogan TEXT,
  description TEXT,
  logo TEXT,
  url TEXT,
  icp TEXT,
  contact JSONB DEFAULT '{}',
  hero JSONB DEFAULT '{}',
  about JSONB DEFAULT '{}',
  advantages JSONB DEFAULT '{}',
  services JSONB DEFAULT '{}',
  news JSONB DEFAULT '{}',
  contact_info JSONB DEFAULT '{}',
  cta JSONB DEFAULT '{}',
  footer JSONB DEFAULT '{}',
  seo JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 5. 插入初始数据
-- =============================================

-- 插入新闻数据
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
);

-- 插入服务数据
INSERT INTO services (id, title, badge, description, features, image, sort_order) VALUES
(
  'design',
  '全流程核医学专项设计',
  '精准设计 · 合规先行',
  '从选址评估到施工图落地，贝瑞设计团队严格遵循药品GMP、GBZ系列及放射性药品附录，为客户提供功能优化与成本可控的专项设计。',
  ARRAY[
    '辐射控制区/监督区精细化分区，保障医患安全',
    '独立通风系统设计，气流自非放射区→控制区，排气高效过滤',
    '衰变池、防护屏蔽、制药区域C级背景局部A级环境设计',
    '药监GMP专家检查及环保、卫评验收一站式技术支持'
  ],
  '/images/services/design.jpg',
  1
),
(
  'construction',
  '辐射防护施工与三废处理',
  '专业施工 · 品质保障',
  '拥有多年核医学场所施工经验的专业团队，为客户提供高质量的辐射防护施工和废物处理系统，确保项目顺利通过各项验收。',
  ARRAY[
    '铅防护门窗、铅玻璃、铅板等辐射屏蔽工程',
    '智能衰变池系统，自动监测与处理放射性废水',
    '放射性固体废物暂存与处理系统',
    '全程驻点技术指导，确保施工合规'
  ],
  '/images/services/construction.jpg',
  2
),
(
  'equipment',
  '核医学设备供应与安装',
  '先进设备 · 精准监测',
  '提供全套核医学场所所需设备，从辐射监测到废物处理，品质可靠、售后服务完善。',
  ARRAY[
    '核素治疗监测设备',
    '辐射监测仪器（个人剂量仪、环境监测仪）',
    '活度计CRC-55tR',
    '药物操作热室/手套箱'
  ],
  '/images/services/equipment.jpg',
  3
),
(
  'software',
  '瑞核智慧管理系统V1.0',
  '智慧管理 · 数字赋能',
  '自主研发的核医学科智慧管理系统，实现辐射防护动态模拟、人员路径优化与全流程数字化管理。',
  ARRAY[
    '辐射剂量数字孪生预演模块',
    '人员路径优化与实时监控',
    '设备运行状态智能监测',
    '7×24小时远程运维支持'
  ],
  '/images/services/software.jpg',
  4
);

-- 插入优势数据
INSERT INTO advantages (value, label, description, sort_order) VALUES
('10+', '四类《放射性药品使用许可证》取证支持', '四类《放射性药品使用许可证》取证支持', 1),
('15+年', '核医学场所专业团队经验', '核医学场所专业团队经验', 2),
('30+', '医疗机构建设案例', '医疗机构建设案例', 3),
('100+', '核医学方案技术咨询', '核医学方案技术咨询', 4);

-- 插入网站配置
INSERT INTO site_config (id, name, company_name, slogan, description, logo, url, icp, contact, hero, about, advantages, services, news, contact_info, cta, footer, seo) VALUES (
  'main',
  '贝瑞医疗',
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
    "badge": "精准医疗 · 核创未来",
    "title": "专注核医学场所\n一站式服务商",
    "description": "从选址规划、辐射防护施工到智慧管理系统，贝瑞医疗为全国顶级医疗机构提供全产业链闭环解决方案，助力精准诊疗时代。",
    "tags": ["15+年专业团队", "30+成功案例", "全流程GMP合规"]
  }'::jsonb,
  '{
    "title": "精于专业 · 恪于安全 · 诚于客户",
    "subtitle": "核医学一站式服务领航者",
    "description": "贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。核心团队拥有十年以上知名科研机构与医疗机构经验，匠心铸造每个项目。",
    "features": [
      {"icon": "fa-drafting-compass", "text": "工艺设计/专项施工图"},
      {"icon": "fa-hard-hat", "text": "辐射防护施工/三废处理"},
      {"icon": "fa-chart-line", "text": "智慧核医学管理系统"},
      {"icon": "fa-hand-holding-heart", "text": "7×24h运维检测"}
    ]
  }'::jsonb,
  '{
    "title": "为什么选择贝瑞医疗",
    "subtitle": "核心技术壁垒 · 深度行业积淀"
  }'::jsonb,
  '{
    "title": "核医学场所 · 全生命周期解决方案",
    "subtitle": "闭环服务"
  }'::jsonb,
  '{
    "title": "贝瑞动态 · 核医前沿",
    "subtitle": "行业资讯 | 技术突破 | 公司要闻"
  }'::jsonb,
  '{
    "title": "联系贝瑞医疗专家团队",
    "description": "立即沟通，获取核医学场所建设一站式解决方案。"
  }'::jsonb,
  '{
    "title": "赋能精准医疗 · 共建核医学科标杆",
    "description": "从设计到验收，贝瑞医疗让核医学场所建设更专业、更安全。"
  }'::jsonb,
  '{
    "description": "专注核医学场所建设一站式服务，从设计、施工到智慧管理系统，赋能精准医疗，守护医患安全。"
  }'::jsonb,
  '{
    "title": "贝瑞医疗 | 核医学场所建设一站式服务商",
    "description": "贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。",
    "keywords": ["核医学", "辐射防护", "放射性药品", "GMP", "智慧管理系统"]
  }'::jsonb
);

-- =============================================
-- 6. 创建 RLS 策略（Row Level Security）
-- =============================================
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE advantages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- 允许公开读取
CREATE POLICY "Allow public read news" ON news FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read services" ON services FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read advantages" ON advantages FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read site_config" ON site_config FOR SELECT USING (true);

-- =============================================
-- 7. 创建更新时间的触发器函数
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
