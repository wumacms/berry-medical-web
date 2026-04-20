<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ServiceDetailBlock :service="design" image-position="left" />
    <ServiceDetailBlock :service="construction" image-position="right" />
    <ServiceDetailBlock :service="equipment" image-position="left" />
    <ServiceDetailBlock :service="software" image-position="right" />
    <AdvantagesSection />
    <ProjectsSection />
    <NewsSection :latest-news="latestNews" />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeo('home')

// 获取服务详情
const { design, construction, equipment, software } = useServices()
// 获取新闻数据
const { latestNews } = useNews()

// 跳过 supabase 认证重定向（确保公开页面不会被拦截）
definePageMeta({
  layout: 'default'
})
</script>
