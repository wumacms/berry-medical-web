<template>
  <!-- ========= 2. 施工篇 · 右图左文区块 ========= -->
  <section id="service-construction" class="py-20 bg-white dark:bg-stone-900 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- 左侧内容区 -->
        <div class="order-2 lg:order-1">
          <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <i class="fas fa-hard-hat"></i> {{ construction.badge }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{{ construction.title }}</h2>
          <p class="text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
            {{ construction.description }}
          </p>
          <div class="mt-6 space-y-3">
            <div v-for="(feature, idx) in construction.features" :key="idx" class="flex items-start gap-3">
              <i :class="['fas', feature.icon, 'text-orange-500 mt-1']"></i>
              <span>{{ feature.text }}</span>
            </div>
          </div>
        </div>
        <!-- 右侧图片区 -->
        <div class="rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
          <img 
            :src="getImageUrl(construction.image)" 
            alt="核医学辐射防护施工" 
            class="w-full h-auto object-cover"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()
const { construction } = useServices()
</script>
