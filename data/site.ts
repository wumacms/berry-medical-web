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
  name: '贝瑞医疗',
  companyName: '贝瑞医疗科技（郑州）有限公司',
  slogan: '核医学场所建设一站式服务商',
  description: '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。',
  keywords: [
    '核医学',
    '辐射防护',
    '放射性药品',
    'GMP',
    '智慧管理系统',
    '瑞核V1.0',
    '131I治疗',
    'Lu-177标记药物'
  ],
  url: 'http://www.berrymedical.com.cn',
  logo: 'http://www.berrymedical.com.cn/favicon.svg',
  contact: {
    phone: ['18503878846', '13215991477'],
    email: '530051528@qq.com',
    address: {
      city: '郑州市',
      province: '河南省',
      street: '高新技术产业开发区瑞达路睿达广场1栋14层',
      postalCode: '450000'
    }
  }
}

// SEO 配置
export const seoConfig: Record<string, SeoConfig> = {
  home: {
    title: '贝瑞医疗 | 核医学场所建设一站式服务商',
    description: '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。',
    ogTitle: '贝瑞医疗 | 核医学场所建设一站式服务商',
    ogDescription: '专注核医学场所建设，从选址规划、辐射防护防护施工到智慧管理系统，为全国顶级医疗机构提供全产业链闭环解决方案。',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }
}

// Organization 结构化数据
export const organizationSchema: OrganizationSchema = {
  name: '贝瑞医疗科技',
  alternateName: 'Berry Medical',
  url: 'http://www.berrymedical.com.cn',
  logo: 'http://www.berrymedical.com.cn/favicon.svg',
  description: '核医学场所建设一站式服务商',
  address: {
    addressLocality: '郑州市',
    addressRegion: '河南省',
    streetAddress: '高新技术产业开发区瑞达路睿达广场1栋14层',
    postalCode: '450000',
    addressCountry: 'CN'
  },
  contactPoint: {
    telephone: '+86-18503878846',
    contactType: 'customer service'
  }
}
