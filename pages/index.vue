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
// SEO 配置
useSeo('home')

// 获取新闻数据
const { latestNews } = useNews()
</script>
