# Supabase Edge Functions 部署说明

## 功能说明

### contact-submit

处理联系表单提交，将数据存储到 `contact_submissions` 表。

**功能：**
- 服务端验证，防止恶意请求
- 数据持久化存储
- 返回提交结果

**请求格式：**
```json
{
  "name": "姓名",
  "phone": "手机号",
  "email": "邮箱",
  "message": "留言内容"
}
```

**优势：**
- 服务端验证，防止恶意请求
- 敏感操作在服务端完成，安全性更高
- 可添加更复杂的业务逻辑

## 本地开发

```bash
# 启动本地 Supabase 开发环境
supabase start

# 部署 Edge Function 到本地
supabase functions serve contact-submit --env-file .env.local

# 测试本地 Edge Function
curl -X POST http://localhost:54321/functions/v1/contact-submit \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","phone":"13800138000","email":"test@example.com","message":"测试消息"}'
```

## 部署方式

### 方式一：使用 Supabase CLI（推荐）

```bash
# 1. 安装 Supabase CLI（如果还没安装）
npm install -g supabase

# 2. 登录 Supabase
supabase login

# 3. 链接本地项目到 Supabase 项目
supabase link --project-ref ksfefrrvqvksrglprbyu

# 4. 部署 Edge Function
supabase functions deploy contact-submit
```

### 方式二：通过 Supabase Dashboard

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目 `berry-medical-nuxt`
3. 导航到 **Edge Functions**
4. 点击 **New Function**
5. 选择 **From existing folder**，选择 `supabase/functions/contact-submit`
6. 部署

## 环境变量

Edge Function 使用以下环境变量（已在 Supabase 项目中配置）：
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 测试 Edge Function

部署后，可以通过以下命令测试：

```bash
curl -X POST https://ksfefrrvqvksrglprbyu.supabase.co/functions/v1/contact-submit \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","phone":"13800138000","email":"test@example.com","message":"测试消息"}'
```

预期响应：
```json
{"success":true,"message":"提交成功"}
```

## 项目中的 Edge Functions

| Function | 说明 | 状态 |
|----------|------|------|
| `contact-submit` | 联系表单提交 | ✅ 已部署 |
