/**
 * 联系人表单提交 API
 * POST /api/contact
 */

import { createClient } from '@supabase/supabase-js'

// 请求体类型定义
interface ContactFormBody {
  name?: string
  phone?: string
  email?: string
  company?: string
  message?: string
}

// 验证手机号格式
function isValidPhone(phone: unknown): phone is string {
  return typeof phone === 'string' && /^1[3-9]\d{9}$/.test(phone)
}

// 验证邮箱格式
function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default defineEventHandler(async (event) => {
  // 获取请求体
  const body = await readBody<ContactFormBody>(event)

  // 验证必填字段
  if (!body.name || !body.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '姓名和手机号为必填项'
    })
  }

  // 验证手机号格式
  if (!isValidPhone(body.phone)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '手机号格式不正确'
    })
  }

  // 验证邮箱格式（如果提供）
  if (body.email && !isValidEmail(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '邮箱格式不正确'
    })
  }

  // 获取 Supabase 配置
  const supabaseUrl = process.env.SUPABASE_URL
  // 使用 SERVICE_ROLE_KEY 绕过 RLS（服务器端安全调用）
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '服务器配置错误'
    })
  }

  // 创建 Supabase 客户端（使用 service role key 绕过 RLS）
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 插入数据
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || null,
      company: body.company?.trim() || null,
      message: body.message?.trim() || null
    })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '数据提交失败，请稍后重试'
    })
  }

  return {
    success: true,
    message: '提交成功',
    data
  }
})
