import {
  siteConfig,
  seoConfig,
  organizationSchema,
  type SiteConfig,
  type SeoConfig,
  type OrganizationSchema
} from '~/data/site'

// 首页 ID
const HOME_PAGE_ID = '760dcc34-df32-4473-96bd-fa021c401837'

// 网站配置 composable
export function useSiteConfig() {
  // 获取网站基础配置
  const config = computed(() => siteConfig)

  // 获取 SEO 配置
  const getSeo = (page: string = 'home'): SeoConfig => {
    return seoConfig[page] || seoConfig.home
  }

  // 获取 Organization 结构化数据
  const organization = computed(() => organizationSchema)

  // 便捷访问属性
  const companyName = computed(() => siteConfig.companyName)
  const slogan = computed(() => siteConfig.slogan)
  const contact = computed(() => siteConfig.contact)
  const url = computed(() => siteConfig.url)
  const icp = computed(() => siteConfig.icp)

  // 各区块内容 - 添加安全默认值
  const hero = computed(() => siteConfig.hero || { badge: '', title: '', description: '', tags: [] })
  const about = computed(() => siteConfig.about || { title: '', subtitle: '', description: '', features: [] })
  const advantages = computed(() => siteConfig.advantages || { title: '', subtitle: '', items: [], highlights: [], badge: '' })
  const services = computed(() => siteConfig.services || { title: '', subtitle: '', cards: [], detailLinks: [] })
  const news = computed(() => siteConfig.news || { title: '', subtitle: '', limit: 3, showMoreButton: {} })
  const contactInfo = computed(() => ({
    title: siteConfig.contactSection?.title || '',
    description: siteConfig.contactSection?.description || '',
    contact: siteConfig.contact
  }))
  const cta = computed(() => siteConfig.cta || { title: '', description: '' })
  const projects = computed(() => siteConfig.projects || { title: '', subtitle: '', items: [] })
  const footer = computed(() => siteConfig.footer)

  return {
    config,
    getSeo,
    organization,
    companyName,
    slogan,
    contact,
    contactInfo,
    url,
    icp,
    hero,
    about,
    advantages,
    services,
    news,
    cta,
    projects,
    footer
  }
}

// SEO composable
export function useSeo(page: string = 'home') {
  const { getSeo } = useSiteConfig()
  const seo = getSeo(page)

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogType: seo.ogType as any,
    twitterCard: seo.twitterCard as any
  })

  const { organization } = useSiteConfig()

  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        ...organization.value
      })
    }]
  })

  return {
    seo,
    organization
  }
}
