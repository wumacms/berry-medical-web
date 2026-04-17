<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ServiceDesign />
    <ServiceConstruction />
    <ServiceEquipment />
    <ServiceSoftware />
    <AdvantagesSection />
    <ProjectsSection />
    <NewsSection :latest-news="latestNews" />
    <ContactSection />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types/news'

// SEO 配置
useSeoMeta({
  title: '贝瑞医疗 | 核医学场所建设一站式服务商',
  description: '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。',
  keywords: '核医学,辐射防护,放射性药品,GMP,智慧管理系统,瑞核V1.0,131I治疗,Lu-177标记药物',
  ogTitle: '贝瑞医疗 | 核医学场所建设一站式服务商',
  ogDescription: '专注核医学场所建设，从选址规划、辐射防护施工到智慧管理系统，为全国顶级医疗机构提供全产业链闭环解决方案。',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

// 结构化数据 - Organization
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '贝瑞医疗科技',
      alternateName: 'Berry Medical',
      url: 'http://www.berrymedical.com.cn',
      logo: 'http://www.berrymedical.com.cn/favicon.svg',
      description: '核医学场所建设一站式服务商',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '郑州市',
        addressRegion: '河南省',
        streetAddress: '高新技术产业开发区瑞达路睿达广场1栋14层',
        postalCode: '450000',
        addressCountry: 'CN'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+86-18503878846',
        contactType: 'customer service'
      }
    })
  }]
})

// 首页新闻数据
const latestNews: NewsItem[] = [
  {
    id: '1',
    title: '贝瑞医疗助力全国核医学学术年会，共话精准诊疗新基建',
    excerpt: '公司携瑞核V1.0系统及全流程辐射防护方案亮相年会，获得多家三甲医院高度关注。',
    date: '2025.03.20',
    category: '行业峰会',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format',
    views: 1245
  },
  {
    id: '2',
    title: '新型Lu-177标记药物研发支持：贝瑞提供GMP级热室解决方案',
    excerpt: '公司为多家药企定制放射性药物合成热室，助力创新核药快速临床转化。',
    date: '2025.02.10',
    category: '技术突破',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format',
    views: 876
  },
  {
    id: '3',
    title: '瑞核V1.2版本发布，新增辐射剂量数字孪生预演模块',
    excerpt: '实现核医学科辐射防护动态模拟与人员路径优化，安全效能双提升。',
    date: '2025.01.15',
    category: '智慧升级',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format',
    views: 1023
  }
]
</script>
