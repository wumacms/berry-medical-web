/**
 * 从 Supabase 获取数据并保存为 JSON 文件
 * 
 * 使用方式：
 *   node scripts/fetch-supabase-data.ts
 * 
 * 环境变量（需要在 .env 或 GitHub Secrets 中配置）：
 *   SUPABASE_URL - Supabase 项目 URL
 *   SUPABASE_SERVICE_ROLE_KEY - 服务角色密钥
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// 类型定义
interface NewsItem {
  id: string
  title: string
  excerpt: string | null
  content: string | null
  date: string
  category: string
  image: string | null
  views: number
  tags: string[] | null
  is_published: boolean
  created_at: string
}

interface ServiceItem {
  id: string
  title: string
  badge: string | null
  description: string | null
  features: string[] | null
  image: string | null
  sort_order: number
  is_published: boolean
}

interface AdvantageItem {
  id: number
  value: string
  label: string
  description: string | null
  sort_order: number
}

interface SiteConfig {
  id: string
  name: string | null
  company_name: string | null
  slogan: string | null
  description: string | null
  logo: string | null
  contact: {
    phone?: string[]
    email?: string
    address?: {
      province?: string
      city?: string
      street?: string
      postalCode?: string
    }
  }
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

// 验证环境变量
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 错误：缺少环境变量 SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY')
  console.log('\n请设置环境变量：')
  console.log('  export SUPABASE_URL=https://your-project.supabase.co')
  console.log('  export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
  process.exit(1)
}

// 创建 Supabase 客户端
const supabase = createClient(supabaseUrl, supabaseKey)

// 输出目录
const outputDir = path.join(process.cwd(), 'data', 'generated')

async function fetchData(): Promise<void> {
  console.log('📦 从 Supabase 获取数据...\n')
  console.log(`   URL: ${supabaseUrl}\n`)

  try {
    // 并行获取所有数据
    const [
      { data: news, error: newsError },
      { data: services, error: servicesError },
      { data: advantages, error: advantagesError },
      { data: siteConfig, error: siteConfigError }
    ] = await Promise.all([
      supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: false }),
      supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('advantages')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('site_config')
        .select('*')
        .eq('id', 'main')
        .single()
    ])

    // 检查错误
    if (newsError) throw new Error(`新闻数据获取失败: ${newsError.message}`)
    if (servicesError) throw new Error(`服务数据获取失败: ${servicesError.message}`)
    if (advantagesError) throw new Error(`优势数据获取失败: ${advantagesError.message}`)
    if (siteConfigError) throw new Error(`网站配置获取失败: ${siteConfigError.message}`)

    // 确保输出目录存在
    fs.mkdirSync(outputDir, { recursive: true })

    // 处理新闻数据
    const processedNews = (news || []).map((item: NewsItem) => ({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt || '',
      content: item.content || '',
      date: item.date,
      category: item.category,
      image: item.image || '',
      views: item.views || 0,
      tags: item.tags || []
    }))

    // 处理服务数据
    const processedServices = (services || []).map((item: ServiceItem) => ({
      id: item.id,
      title: item.title,
      badge: item.badge || '',
      description: item.description || '',
      features: item.features || [],
      image: item.image || ''
    }))

    // 处理优势数据
    const processedAdvantages = (advantages || []).map((item: AdvantageItem) => ({
      value: item.value,
      label: item.label,
      description: item.description || ''
    }))

    // 处理网站配置
    const processedSiteConfig = siteConfig ? {
      name: siteConfig.name || '贝瑞医疗',
      companyName: siteConfig.company_name || '',
      slogan: siteConfig.slogan || '',
      description: siteConfig.description || '',
      logo: siteConfig.logo || '',
      contact: siteConfig.contact || {},
      seo: siteConfig.seo || {}
    } : null

    // 写入 JSON 文件
    fs.writeFileSync(
      path.join(outputDir, 'news.json'),
      JSON.stringify(processedNews, null, 2),
      'utf-8'
    )
    console.log(`✅ 新闻数据: ${processedNews.length} 条`)

    fs.writeFileSync(
      path.join(outputDir, 'services.json'),
      JSON.stringify(processedServices, null, 2),
      'utf-8'
    )
    console.log(`✅ 服务数据: ${processedServices.length} 条`)

    fs.writeFileSync(
      path.join(outputDir, 'advantages.json'),
      JSON.stringify(processedAdvantages, null, 2),
      'utf-8'
    )
    console.log(`✅ 优势数据: ${processedAdvantages.length} 条`)

    fs.writeFileSync(
      path.join(outputDir, 'site.json'),
      JSON.stringify(processedSiteConfig, null, 2),
      'utf-8'
    )
    console.log(`✅ 网站配置: 已获取`)

    console.log(`\n📁 数据已保存到: ${outputDir}`)
    console.log('\n✨ 完成！')

  } catch (error) {
    console.error('\n❌ 获取数据失败:', error)
    process.exit(1)
  }
}

// 运行
fetchData()
