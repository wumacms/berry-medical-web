-- =============================================
-- 管理员表 - 用于后台管理系统认证
-- =============================================

-- 使用 Supabase Auth 的用户系统
-- 此表用于存储管理员的附加信息（可选，非必须）
-- 如果只需要使用 Supabase Auth 的邮箱认证，可以跳过此表

-- 管理员信息表（存储管理员的元数据）
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 启用 RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- 允许所有角色读取（用于后台管理列表）
CREATE POLICY "Allow all roles read admin_profiles" ON admin_profiles
  FOR SELECT USING (true);

-- 允许 service_role 完全访问（绕过 RLS）
CREATE POLICY "Service role full access" ON admin_profiles
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- 允许认证用户插入自己的记录
CREATE POLICY "Allow authenticated insert own profile" ON admin_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 允许认证用户更新自己的信息
CREATE POLICY "Allow authenticated update own profile" ON admin_profiles
  FOR UPDATE USING (auth.uid() = id);

-- 触发器：自动更新时间戳
CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 系统设置表 - 存储网站配置
-- =============================================
CREATE TABLE IF NOT EXISTS system_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  site_name TEXT DEFAULT '贝瑞医疗',
  site_logo TEXT,
  site_favicon TEXT,
  company_name TEXT,
  slogan TEXT,
  description TEXT,
  icp TEXT,
  contact JSONB DEFAULT '{}',
  nav_config JSONB DEFAULT '[]',
  footer_config JSONB DEFAULT '{}',
  seo JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 插入默认配置
INSERT INTO system_settings (id, site_name, company_name) 
VALUES ('main', '贝瑞医疗', '贝瑞医疗科技（郑州）有限公司')
ON CONFLICT (id) DO NOTHING;

-- 允许认证用户读取系统设置
CREATE POLICY "Allow authenticated read system_settings" ON system_settings
  FOR SELECT USING (auth.role() = 'authenticated');

-- 允许认证用户更新系统设置
CREATE POLICY "Allow authenticated update system_settings" ON system_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 触发器
CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 操作日志表 - 记录管理员操作
-- =============================================
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 允许管理员读取日志
CREATE POLICY "Allow admin read logs" ON admin_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- 自动记录插入
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admin_logs (user_id, action, table_name, record_id, details)
  VALUES (
    NEW.id,
    TG_OP,
    TG_TABLE_NAME,
    NEW.id,
    jsonb_build_object('data', NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 管理员表的操作日志触发器
CREATE TRIGGER log_admin_profiles_changes
  AFTER INSERT OR UPDATE OR DELETE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();
