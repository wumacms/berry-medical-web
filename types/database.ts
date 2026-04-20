/**
 * 数据库类型定义
 * 对应新的 websites-pages-blocks 三层结构
 */

// =============================================
// 网站类型
// =============================================

export interface Website {
  id: string
  name: string
  companyName: string
  slogan: string
  description: string
  logo: string
  url: string
  icp: string
  contact: WebsiteContact
  navConfig: NavConfig
  footerConfig: FooterConfig
  seo: SeoConfig
}

export interface WebsiteContact {
  phone?: string[]
  email?: string
  website?: string
  address?: {
    province?: string
    city?: string
    street?: string
    postalCode?: string
  }
}

export interface NavConfig {
  logo?: string
  logoAlt?: string
  menuItems?: NavMenuItem[]
  ctaButton?: {
    text: string
    link: string
  }
}

export interface FooterConfig {
  copyright?: string
  description?: string
  icp?: string
  icpLink?: string
  columns?: FooterColumn[]
}

export interface FooterColumn {
  type: 'address' | 'contact' | 'qrcode'
  title: string
}

// =============================================
// 页面类型
// =============================================

export interface Page {
  id: string
  name: string
  path: string
  description: string
  navSortOrder: number
  isNavVisible: boolean
  seo: SeoConfig
}

// =============================================
// 区块类型
// =============================================

export interface Block {
  id: string
  pageId: string
  type: BlockType
  title: string
  sortOrder: number
  config: BlockConfig
}

export type BlockType = 
  | 'hero'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'advantages'
  | 'projects'
  | 'news'
  | 'news-list'
  | 'contact'
  | 'cta'

export interface BlockConfig {
  // Hero 区块
  badge?: string
  title?: string
  subtitle?: string
  description?: string
  tags?: string[]
  buttons?: { text: string; link: string; style: string }[]
  
  // About 区块
  features?: { icon: string; text: string }[]
  
  // Services 区块
  cards?: ServiceCard[]
  detailLinks?: { id: string; text: string; icon?: string }[]
  
  // Service Detail 区块
  id?: string
  features2?: { icon: string; text: string }[]
  
  // Advantages 区块
  advantages?: AdvantageItem[]
  highlights?: { icon: string; text: string }[]
  
  // Projects 区块
  projectItems?: string[]
  
  // News/News-list 区块
  limit?: number
  showMoreButton?: { text: string; link: string }
  categories?: string[]
  pageSize?: number
  
  // CTA 区块
  // (复用 title, description)
  
  // 通用
  [key: string]: any
}

export interface ServiceCard {
  id: string
  icon: string
  title: string
  subtitle: string
  features: string[]
}

export interface AdvantageItem {
  icon?: string
  value: string
  label: string
  description?: string
}

// =============================================
// SEO 类型
// =============================================

export interface SeoConfig {
  title?: string
  description?: string
  keywords?: string[]
}

// =============================================
// 导航菜单
// =============================================

export interface NavMenuItem {
  name: string
  path: string
  children?: NavMenuItem[]
}
