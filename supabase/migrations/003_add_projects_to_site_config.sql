-- =====================================================
-- 迁移脚本: 添加 projects 字段并同步数据
-- 说明: 同步 projects 数据到 Supabase site_config 表
-- =====================================================

-- 添加 projects 字段（如果不存在）
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS projects jsonb DEFAULT '[]'::jsonb;

-- 使用 UPSERT 模式确保数据一致性
INSERT INTO site_config (id, projects, updated_at)
VALUES (
  'main',
  '[
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
  ]'::jsonb,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  projects = EXCLUDED.projects,
  updated_at = CURRENT_TIMESTAMP;

-- 验证更新结果
SELECT 
  id, 
  name,
  jsonb_array_length(projects) as project_count,
  updated_at
FROM site_config 
WHERE id = 'main';
