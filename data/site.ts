/**
 * 网站配置数据
 * 从 website.json 读取
 */

import websiteData from './generated/website.json'
import {
  homeHero,
  homeAbout,
  homeAdvantages,
  homeServices,
  homeNews,
  homeCta,
  homeProjects,
  homeContact
} from './blocks'

// JSON 数据类型
interface WebsiteJson {
  id?: string
  name?: string
  companyName?: string
  slogan?: string
  description?: string
  logo?: string
  url?: string
  icp?: string
  contact?: {
    phone?: string[]
    email?: string
    website?: string
    address?: {
      city?: string
      province?: string
      street?: string
      postalCode?: string
    }
  }
  navConfig?: Record<string, any>
  footerConfig?: {
    copyright?: string
    description?: string
    icp?: string
    icpLink?: string
    columns?: any[]
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

const siteData = websiteData as WebsiteJson

// 网站配置类型
export interface SiteConfig {
  name: string
  companyName: string
  slogan: string
  description: string
  keywords: string[]
  url: string
  icp: string
  logo: string
  contact: {
    phone: string[]
    email: string
    website: string
    address: {
      city: string
      province: string
      street: string
      postalCode: string
    }
  }
  footer: {
    copyright: string
    description: string
    icp: string
    icpLink: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  // 区块数据
  hero: Record<string, any>
  about: Record<string, any>
  advantages: Record<string, any>
  services: Record<string, any>
  news: Record<string, any>
  cta: Record<string, any>
  projects: Record<string, any>
  contactSection: Record<string, any>
}

export interface SeoConfig {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogType: string
  twitterCard: string
}

export interface OrganizationSchema {
  name: string
  alternateName: string
  url: string
  logo: string
  description: string
  address: {
    addressLocality: string
    addressRegion: string
    streetAddress: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    telephone: string
    contactType: string
  }
}

// 网站配置数据
export const siteConfig: SiteConfig = {
  name: siteData?.name || '贝瑞医疗',
  companyName: siteData?.companyName || '贝瑞医疗科技（郑州）有限公司',
  slogan: siteData?.slogan || '核医学场所建设一站式服务商',
  description: siteData?.description || '',
  keywords: siteData?.seo?.keywords || ['核医学', '辐射防护', '放射性药品', 'GMP'],
  url: siteData?.url || 'https://wumacms.github.io/berry-medical-web',
  icp: siteData?.icp || '豫ICP备2025123456号',
  logo: siteData?.logo || '/images/logos/logo.png',
  contact: {
    phone: siteData?.contact?.phone || ['18503878846', '13215991477'],
    email: siteData?.contact?.email || '530051528@qq.com',
    website: siteData?.contact?.website || 'www.berrymedical.com.cn',
    address: {
      province: siteData?.contact?.address?.province || '河南省',
      city: siteData?.contact?.address?.city || '郑州市',
      street: siteData?.contact?.address?.street || '高新技术产业开发区瑞达路睿达广场1栋14层',
      postalCode: siteData?.contact?.address?.postalCode || '450001'
    }
  },
  footer: {
    copyright: siteData?.footerConfig?.copyright || '© 2025 贝瑞医疗科技（郑州）有限公司',
    description: siteData?.footerConfig?.description || '专注核医学场所建设一站式服务，从设计、施工到智慧管理系统，赋能精准医疗，守护医患安全。',
    icp: siteData?.footerConfig?.icp || '豫ICP备2025123456号',
    icpLink: siteData?.footerConfig?.icpLink || 'https://beian.miit.gov.cn/'
  },
  seo: {
    title: siteData?.seo?.title || '贝瑞医疗 | 核医学场所建设一站式服务商',
    description: siteData?.seo?.description || '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链。',
    keywords: siteData?.seo?.keywords || ['核医学', '辐射防护', '放射性药品', 'GMP', '智慧管理系统']
  },
  // 区块数据
  hero: homeHero?.config || { badge: '', title: '', description: '', tags: [] },
  about: homeAbout?.config || { title: '', subtitle: '', description: '', features: [] },
  advantages: homeAdvantages?.config || { title: '', subtitle: '', items: [], highlights: [], badge: '' },
  services: homeServices?.config || { title: '', subtitle: '', cards: [], detailLinks: [] },
  news: homeNews?.config || { title: '', subtitle: '', limit: 3, showMoreButton: {} },
  cta: homeCta?.config || { title: '', description: '' },
  projects: homeProjects?.config || { title: '', subtitle: '', items: [] },
  contactSection: homeContact?.config || { title: '', description: '' }
}

// SEO 配置
export const seoConfig: Record<string, SeoConfig> = {
  home: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    ogTitle: siteConfig.seo.title,
    ogDescription: siteConfig.seo.description,
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  contact: {
    title: '联系我们 | 贝瑞医疗 - 核医学场所建设专家',
    description: '联系贝瑞医疗专家团队，获取核医学场所建设一站式解决方案。电话：18503878846 / 13215991477',
    ogTitle: '联系我们 | 贝瑞医疗',
    ogDescription: '立即沟通，获取核医学场所建设一站式解决方案。',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }
}

// Organization 结构化数据
export const organizationSchema: OrganizationSchema = {
  name: siteConfig.companyName,
  alternateName: 'Berry Medical',
  url: siteConfig.url,
  logo: siteConfig.logo,
  description: siteConfig.description,
  address: {
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.province,
    streetAddress: siteConfig.contact.address.street,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: 'CN'
  },
  contactPoint: {
    telephone: `+86-${siteConfig.contact.phone[0]}`,
    contactType: 'customer service'
  }
}
