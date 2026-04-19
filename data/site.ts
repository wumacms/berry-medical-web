import siteDataRaw from './generated/site.json'

// JSON 数据类型（与 site.json 结构对应）
interface SiteDataJson {
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
  hero?: {
    badge?: string
    title?: string
    description?: string
    tags?: string[]
  }
  about?: {
    title?: string
    subtitle?: string
    description?: string
    features?: { icon: string; text: string }[]
  }
  advantages?: {
    title?: string
    subtitle?: string
  }
  services?: {
    title?: string
    subtitle?: string
  }
  news?: {
    title?: string
    subtitle?: string
  }
  projects?: string[]
  contactSection?: {
    title?: string
    description?: string
  }
  cta?: {
    title?: string
    description?: string
  }
  footer?: {
    description?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

const siteData = siteDataRaw as SiteDataJson

// 网站基础配置
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
  hero: {
    badge: string
    title: string
    description: string
    tags: string[]
  }
  about: {
    title: string
    subtitle: string
    description: string
    features: { icon: string; text: string }[]
  }
  advantages: {
    title: string
    subtitle: string
  }
  services: {
    title: string
    subtitle: string
  }
  news: {
    title: string
    subtitle: string
  }
  projects: string[]
  contactSection: {
    title: string
    description: string
  }
  cta: {
    title: string
    description: string
  }
  footer: {
    description: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
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
  hero: {
    badge: siteData?.hero?.badge || '精准医疗 · 核创未来',
    title: siteData?.hero?.title || '专注核医学场所\n一站式服务商',
    description: siteData?.hero?.description || '从选址规划、辐射防护施工到智慧管理系统，贝瑞医疗为全国顶级医疗机构提供全产业链闭环解决方案，助力精准诊疗时代。',
    tags: siteData?.hero?.tags || ['15+年专业团队', '30+成功案例', '全流程GMP合规']
  },
  about: {
    title: siteData?.about?.title || '精于专业 · 恪于安全 · 诚于客户',
    subtitle: siteData?.about?.subtitle || '核医学一站式服务领航者',
    description: siteData?.about?.description || '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。',
    features: siteData?.about?.features || [
      { icon: 'fa-drafting-compass', text: '工艺设计/专项施工图' },
      { icon: 'fa-hard-hat', text: '辐射防护施工/三废处理' },
      { icon: 'fa-chart-line', text: '智慧核医学管理系统' },
      { icon: 'fa-hand-holding-heart', text: '7×24h运维检测' }
    ]
  },
  advantages: {
    title: siteData?.advantages?.title || '为什么选择贝瑞医疗',
    subtitle: siteData?.advantages?.subtitle || '核心技术壁垒 · 深度行业积淀'
  },
  services: {
    title: siteData?.services?.title || '核医学场所 · 全生命周期解决方案',
    subtitle: siteData?.services?.subtitle || '闭环服务'
  },
  news: {
    title: siteData?.news?.title || '贝瑞动态 · 核医前沿',
    subtitle: siteData?.news?.subtitle || '行业资讯 | 技术突破 | 公司要闻'
  },
  projects: siteData?.projects || [
    '复旦大学附属中山医院',
    '陆军军医大学西南医院',
    '南昌大学第一附属医院',
    '福建医科大学附属第一医院',
    '广东省第二人民医院',
    '宜春市人民医院'
  ],
  contactSection: {
    title: siteData?.contactSection?.title || '联系贝瑞医疗专家团队',
    description: siteData?.contactSection?.description || '立即沟通，获取核医学场所建设一站式解决方案。'
  },
  cta: {
    title: siteData?.cta?.title || '赋能精准医疗 · 共建核医学科标杆',
    description: siteData?.cta?.description || '从设计到验收，贝瑞医疗让核医学场所建设更专业、更安全。'
  },
  footer: {
    description: siteData?.footer?.description || '专注核医学场所建设一站式服务，从设计、施工到智慧管理系统，赋能精准医疗，守护医患安全。'
  },
  seo: {
    title: siteData?.seo?.title || '贝瑞医疗 | 核医学场所建设一站式服务商',
    description: siteData?.seo?.description || '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链。',
    keywords: siteData?.seo?.keywords || ['核医学', '辐射防护', '放射性药品', 'GMP', '智慧管理系统']
  }
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
