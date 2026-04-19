<template>
  <div>
    <!-- 简洁标题Hero区块 -->
    <section class="relative bg-cover bg-center bg-no-repeat py-20 md:py-28" :style="{ backgroundImage: `url('${getImageUrl('/images/contact/cover.jpg')}')` }">
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/85 to-stone-900/70 dark:from-black dark:via-stone-950/90 dark:to-stone-900/80"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-stone-950/50 pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-6 md:px-10 z-10">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-orange-500/20 dark:bg-orange-500/25 backdrop-blur-sm text-orange-100 dark:text-orange-100 px-5 py-1.5 rounded-full text-sm font-medium mb-5 border border-orange-400/40 shadow-lg">
            <i class="fas fa-headset text-orange-300"></i> 联系我们
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
            了解更多
          </h1>
          <p class="text-stone-200 dark:text-stone-100 mt-5 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow">
            如果您对我们的产品或服务有任何疑问，请填写以下表单，我们将尽快与您联系。
          </p>
          <div class="w-24 h-1 bg-orange-400/80 rounded-full mx-auto mt-6 shadow-sm"></div>
        </div>
      </div>
    </section>

    <ContactSection />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()

// SEO 配置
useSeo('contact')
</script>
