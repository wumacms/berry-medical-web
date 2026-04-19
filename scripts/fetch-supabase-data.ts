/**
 * 从 Supabase 获取数据并保存为 JSON 文件
 * 
 * 使用方式：
 *   pnpm fetch-data
 *   node scripts/fetch-supabase-data.ts
 * 
 * 环境变量（需要在 .env 或 GitHub Secrets 中配置）：
 *   SUPABASE_URL - Supabase 项目 URL
 *   SUPABASE_SERVICE_ROLE_KEY - 服务角色密钥
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// =============================================
// 类型定义
// =============================================

interface Website {
  id: string
  name: string | null
  domain: string | null
  company_name: string | null
  slogan: string | null
  description: string | null
  logo: string | null
  url: string | null
  icp: string | null
  contact: Record<string, any>
  nav_config: Record<string, any>
  footer_config: Record<string, any>
  seo: Record<string, any>
  created_at: string
  updated_at: string
}

interface Page {
  id: string
  website_id: string
  name: string
  path: string
  description: string | null
  nav_sort_order: number
  is_nav_visible: boolean
  is_footer_visible: boolean
  seo: Record<string, any>
  created_at: string
  updated_at: string
}

interface Block {
  id: string
  page_id: string
  type: string
  title: string | null
  sort_order: number
  config: Record<string, any>
  is_published: boolean
  created_at: string
  updated_at: string
}

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

// =============================================
// 验证环境变量
// =============================================

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 错误：缺少环境变量 SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY')
  console.log('\n请设置环境变量：')
  console.log('  export SUPABASE_URL=https://your-project.supabase.co')
  console.log('  export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
  process.exit(1)
}

// =============================================
// 创建 Supabase 客户端
// =============================================

const supabase = createClient(supabaseUrl, supabaseKey)
const outputDir = path.join(process.cwd(), 'data', 'generated')

// =============================================
// 主函数
// =============================================

async function fetchData(): Promise<void> {
  console.log('📦 从 Supabase 获取数据...\n')
  console.log(`   URL: ${supabaseUrl}\n`)

  try {
    // 并行获取所有数据
    const [
      { data: websites, error: websitesError },
      { data: pages, error: pagesError },
      { data: blocks, error: blocksError },
      { data: news, error: newsError }
    ] = await Promise.all([
      supabase.from('websites').select('*').eq('id', 'main').single(),
      supabase.from('pages').select('*').order('nav_sort_order', { ascending: true }),
      supabase.from('blocks').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('news').select('*').eq('is_published', true).order('date', { ascending: false })
    ])

    // 检查错误
    if (websitesError) throw new Error(`网站数据获取失败: ${websitesError.message}`)
    if (pagesError) throw new Error(`页面数据获取失败: ${pagesError.message}`)
    if (blocksError) throw new Error(`区块数据获取失败: ${blocksError.message}`)
    if (newsError) throw new Error(`新闻数据获取失败: ${newsError.message}`)

    // 确保输出目录存在
    fs.mkdirSync(outputDir, { recursive: true })

    // 处理网站数据
    const website = websites as Website
    const processedWebsite = {
      id: website.id,
      name: website.name || '贝瑞医疗',
      companyName: website.company_name || '',
      slogan: website.slogan || '',
      description: website.description || '',
      logo: website.logo || '',
      url: website.url || '',
      icp: website.icp || '',
      contact: website.contact || {},
      navConfig: website.nav_config || {},
      footerConfig: website.footer_config || {},
      seo: website.seo || {}
    }

    // 处理页面数据 - 只保留导航可见的
    const processedPages = ((pages as Page[]) || [])
      .filter(p => p.is_nav_visible)
      .map(p => ({
        id: p.id,
        name: p.name,
        path: p.path,
        description: p.description || '',
        navSortOrder: p.nav_sort_order,
        isNavVisible: p.is_nav_visible,
        seo: p.seo || {}
      }))

    // 处理区块数据 - 按 page_id 分组
    const blocksList = (blocks as Block[]) || []
    const processedBlocks = blocksList.map(b => ({
      id: b.id,
      pageId: b.page_id,
      type: b.type,
      title: b.title || '',
      sortOrder: b.sort_order,
      config: b.config || {}
    }))

    // 处理新闻数据
    const processedNews = ((news as NewsItem[]) || []).map(item => ({
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

    // 写入 JSON 文件
    fs.writeFileSync(path.join(outputDir, 'website.json'), JSON.stringify(processedWebsite, null, 2), 'utf-8')
    console.log(`✅ 网站数据: ${processedWebsite.name}`)

    fs.writeFileSync(path.join(outputDir, 'pages.json'), JSON.stringify(processedPages, null, 2), 'utf-8')
    console.log(`✅ 页面数据: ${processedPages.length} 条`)

    fs.writeFileSync(path.join(outputDir, 'blocks.json'), JSON.stringify(processedBlocks, null, 2), 'utf-8')
    console.log(`✅ 区块数据: ${processedBlocks.length} 条`)

    fs.writeFileSync(path.join(outputDir, 'news.json'), JSON.stringify(processedNews, null, 2), 'utf-8')
    console.log(`✅ 新闻数据: ${processedNews.length} 条`)

    console.log(`\n📁 数据已保存到: ${outputDir}`)
    console.log('\n✨ 完成！')

  } catch (error) {
    console.error('\n❌ 获取数据失败:', error)
    process.exit(1)
  }
}

// 运行
fetchData()
