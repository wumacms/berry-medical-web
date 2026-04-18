-- =============================================
-- 贝瑞医疗网站增量迁移脚本 v2
-- 添加动态内容管理所需字段
-- =============================================

-- site_config 表：添加缺失的字段
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS hero JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS about JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS advantages JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS news JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS contact_info JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS cta JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS footer JSONB DEFAULT '{}';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}';

-- =============================================
-- 初始数据（仅当 site_config 为空时执行）
-- =============================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM site_config WHERE id = 'main') THEN
    INSERT INTO site_config (id, name, company_name, slogan, description, logo, url) VALUES
    (
      'main',
      '贝瑞医疗',
      '贝瑞医疗科技（郑州）有限公司',
      '核医学场所建设一站式服务商',
      '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。',
      '/images/logos/logo.png',
      'https://wumacms.github.io/berry-medical-nuxt'
    );
  END IF;
END $$;

-- 插入初始 hero 数据（仅当为空时）
UPDATE site_config SET hero = '{
  "title": "核医学场所建设一站式服务商",
  "subtitle": "核医学科室规划 · 辐射防护施工 · 智能管理系统",
  "description": "贝瑞医疗深耕核医学领域多年，为医疗机构提供从选址评估到智能运维的全生命周期解决方案。"
}' WHERE id = 'main' AND (hero IS NULL OR hero = '{}' OR hero = 'null');

-- 插入初始 about 数据
UPDATE site_config SET about = '{
  "title": "关于贝瑞医疗",
  "subtitle": "专业 · 专注 · 创新",
  "description": "贝瑞医疗科技（郑州）有限公司是一家专注于核医学场所建设的高新技术企业，业务涵盖放射性药物制备设施、PET/CT机房、核素治疗病房等场所的选址评估、方案设计、辐射防护施工及智能管理系统开发。",
  "stats": [
    {"value": "50+", "label": "服务案例"},
    {"value": "18省", "label": "覆盖范围"},
    {"value": "100%", "label": "环评通过率"}
  ],
  "mission": "让核医学更安全、更智能、更高效"
}' WHERE id = 'main' AND (about IS NULL OR about = '{}' OR about = 'null');

-- 插入初始 advantages 数据
UPDATE site_config SET advantages = '{
  "title": "为什么选择贝瑞医疗",
  "subtitle": "专业能力 · 服务保障 · 技术实力",
  "items": [
    {"value": "shield-check", "label": "合规保障", "description": "环评、卫评一次通过"},
    {"value": "users", "label": "专业团队", "description": "核医学 + 辐射防护双背景"},
    {"value": "settings", "label": "一站式服务", "description": "从选址到运维全覆盖"},
    {"value": "zap", "label": "快速响应", "description": "48小时现场踏勘"}
  ]
}' WHERE id = 'main' AND (advantages IS NULL OR advantages = '{}' OR advantages = 'null');

-- 插入初始 services 数据
UPDATE site_config SET services = '{
  "title": "我们的服务",
  "subtitle": "全流程 · 全方位 · 全周期",
  "description": "核医学场所建设一站式解决方案，覆盖从规划到运营的各个环节"
}' WHERE id = 'main' AND (services IS NULL OR services = '{}' OR services = 'null');

-- 插入初始 contact_info 数据
UPDATE site_config SET contact_info = '{
  "title": "联系贝瑞医疗专家团队",
  "description": "立即沟通，获取核医学场所建设一站式解决方案。"
}' WHERE id = 'main' AND (contact_info IS NULL OR contact_info = '{}' OR contact_info = 'null');

-- 插入初始 cta 数据
UPDATE site_config SET cta = '{
  "title": "准备好开始您的核医学项目了吗？",
  "description": "立即联系贝瑞医疗，获取免费咨询和定制方案。",
  "buttonText": "立即咨询"
}' WHERE id = 'main' AND (cta IS NULL OR cta = '{}' OR cta = 'null');

-- 插入初始 footer 数据
UPDATE site_config SET footer = '{
  "copyright": "© 2025 贝瑞医疗科技（郑州）有限公司",
  "icp": "豫ICP备2025000000号",
  "icpLink": "https://beian.miit.gov.cn/"
}' WHERE id = 'main' AND (footer IS NULL OR footer = '{}' OR footer = 'null');
