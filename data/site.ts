import siteData from './generated/site.json'

// 网站基础配置
export interface SiteConfig {
  name: string
  companyName: string
  slogan: string
  description: string
  keywords: string[]
  url: string
  logo: string
  contact: {
    phone: string[]
    email: string
    address: {
      city: string
      province: string
      street: string
      postalCode: string
    }
  }
  social?: {
    wechat?: string
    weibo?: string
  }
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
  url: siteData?.url || 'https://wumacms.github.io/berry-medical-nuxt',
  logo: siteData?.logo || '/images/logos/logo.png',
  contact: {
    phone: siteData?.contact?.phone || ['18503878846', '13215991477'],
    email: siteData?.contact?.email || '530051528@qq.com',
    address: {
      province: siteData?.contact?.address?.province || '河南省',
      city: siteData?.contact?.address?.city || '郑州市',
      street: siteData?.contact?.address?.street || '高新技术产业开发区瑞达路睿达广场1栋14层',
      postalCode: siteData?.contact?.address?.postalCode || '450000'
    }
  }
}

// SEO 配置
export const seoConfig: Record<string, SeoConfig> = {
  home: {
    title: siteData?.seo?.title || '贝瑞医疗 | 核医学场所建设一站式服务商',
    description: siteData?.seo?.description || '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链。',
    ogTitle: siteData?.seo?.title || '贝瑞医疗 | 核医学场所建设一站式服务商',
    ogDescription: siteData?.seo?.description || '专注核医学场所建设，从选址规划到智慧管理系统。',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }
}

// Organization 结构化数据
export const organizationSchema: OrganizationSchema = {
  name: siteData?.name || '贝瑞医疗科技',
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
