/**
 * 创建管理员账号脚本
 * 运行方式: pnpm run create-admin
 * 
 * 使用 Supabase Service Role Key 直接创建管理员用户
 */

import 'dotenv/config'

interface AdminParams {
  email: string
  password: string
  name: string
}

async function createAdmin(params: AdminParams) {
  const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('缺少环境变量: NUXT_PUBLIC_SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  console.log('开始创建管理员账号...')
  console.log(`邮箱: ${params.email}`)

  try {
    // 1. 通过 REST API 创建 Auth 用户
    console.log('\n[1/3] 创建 Auth 用户...')
    const createUserResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
        email_confirm: true,
        user_metadata: {
          name: params.name
        }
      })
    })

    const userData = await createUserResponse.json()
    
    if (!createUserResponse.ok) {
      console.error('创建 Auth 用户失败:', userData.msg || userData.message)
      process.exit(1)
    }

    const userId = userData.id
    console.log(`Auth 用户创建成功，ID: ${userId}`)

    // 2. 创建 admin_profiles 记录
    console.log('\n[2/3] 创建管理员资料...')
    const profileResponse = await fetch(`${supabaseUrl}/rest/v1/admin_profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        id: userId,
        email: params.email,
        name: params.name,
        role: 'admin',
        is_active: true
      })
    })

    if (!profileResponse.ok) {
      const errorData = await profileResponse.json()
      console.error('创建管理员资料失败:', errorData.message || errorData.msg)
      // 继续执行，因为用户已创建
    } else {
      console.log('管理员资料创建成功')
    }

    // 3. 创建 system_settings 默认记录（如果不存在）
    console.log('\n[3/3] 检查系统设置...')
    const settingsResponse = await fetch(`${supabaseUrl}/rest/v1/system_settings?id=eq.main`, {
      method: 'GET',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      }
    })

    const existingSettings = await settingsResponse.json()

    if (existingSettings.length === 0) {
      const insertSettingsResponse = await fetch(`${supabaseUrl}/rest/v1/system_settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          id: 'main',
          site_name: '贝瑞医疗',
          company_name: '贝瑞医疗科技（郑州）有限公司',
          nav_config: [],
          footer_config: {}
        })
      })

      if (!insertSettingsResponse.ok) {
        console.log('系统设置已存在或创建失败')
      } else {
        console.log('系统设置创建成功')
      }
    } else {
      console.log('系统设置已存在，跳过')
    }

    console.log('\n========================================')
    console.log('✅ 管理员账号创建成功！')
    console.log('========================================')
    console.log(`\n登录信息:`)
    console.log(`  邮箱: ${params.email}`)
    console.log(`  密码: ${params.password}`)
    console.log(`\n请访问: /admin/login`)
    console.log('\n提示: 请先在 Supabase 控制台执行数据库迁移')

  } catch (error: any) {
    console.error('创建管理员失败:', error.message)
    process.exit(1)
  }
}

// 从命令行参数获取信息
const email = process.argv[2]
const password = process.argv[3]
const name = process.argv[4] || '管理员'

if (!email || !password) {
  console.log('用法: pnpm run create-admin <邮箱> <密码> [姓名]')
  console.log('')
  console.log('示例:')
  console.log('  pnpm run create-admin admin@example.com 123456 "系统管理员"')
  console.log('')
  
  // 使用默认管理员账号
  createAdmin({
    email: 'admin@berry-medical.com',
    password: 'BerryAdmin2024!',
    name: '系统管理员'
  })
} else {
  createAdmin({ email, password, name })
}
