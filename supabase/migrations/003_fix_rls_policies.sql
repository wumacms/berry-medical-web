-- =============================================
-- 修复 RLS 策略 - 允许 service_role 访问
-- =============================================
-- 在 Supabase SQL 编辑器中执行此脚本

-- 删除旧的 RLS 策略
DROP POLICY IF EXISTS "Allow all roles read admin_profiles" ON admin_profiles;
DROP POLICY IF EXISTS "Service role full access" ON admin_profiles;
DROP POLICY IF EXISTS "Allow authenticated insert own profile" ON admin_profiles;
DROP POLICY IF EXISTS "Allow authenticated update own profile" ON admin_profiles;

-- 重新创建 RLS 策略 - 允许认证用户读取
CREATE POLICY "Allow authenticated read" ON admin_profiles
  FOR SELECT USING (true);

-- 允许 service_role 完全控制（关键：使用 auth.role()）
CREATE POLICY "Service role full access" ON admin_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- 允许认证用户管理自己的资料
CREATE POLICY "Allow authenticated manage own" ON admin_profiles
  FOR ALL USING (auth.uid() = id);

-- 同样修复 system_settings
DROP POLICY IF EXISTS "Allow authenticated read system_settings" ON system_settings;
DROP POLICY IF EXISTS "Allow authenticated update system_settings" ON system_settings;

CREATE POLICY "Allow authenticated read settings" ON system_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated manage settings" ON system_settings
  FOR ALL USING (auth.role() = 'service_role' OR true);

-- 同样修复 admin_logs
DROP POLICY IF EXISTS "Allow admin read logs" ON admin_logs;

CREATE POLICY "Allow authenticated read logs" ON admin_logs
  FOR SELECT USING (true);

CREATE POLICY "Allow service role manage logs" ON admin_logs
  FOR ALL USING (auth.role() = 'service_role');

-- 验证 admin_profiles 是否有所需记录
SELECT * FROM admin_profiles LIMIT 5;
