<template>
  <div>
    <PageHero
      title="联系我们"
      subtitle="如果您对我们的产品或服务有任何疑问，请填写以下表单，我们将尽快与您联系。"
      badge=""
      badge-icon="fa-headset"
      :background-url="getImageUrl('/images/contact/cover.jpg')"
    />

    <ContactSection />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()

// SEO 配置
useSeo('contact')
</script>
