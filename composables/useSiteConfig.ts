import {
  siteConfig,
  seoConfig,
  organizationSchema,
  type SiteConfig,
  type SeoConfig,
  type OrganizationSchema
} from '~/data/site'

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

  // 各区块内容
  const hero = computed(() => siteConfig.hero)
  const about = computed(() => siteConfig.about)
  const advantages = computed(() => siteConfig.advantages)
  const services = computed(() => siteConfig.services)
  const news = computed(() => siteConfig.news)
  const contactInfo = computed(() => ({
    title: siteConfig.contactSection.title,
    description: siteConfig.contactSection.description,
    contact: siteConfig.contact
  }))
  const cta = computed(() => siteConfig.cta)
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
