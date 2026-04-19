<template>
  <!-- ========= 3. 设备篇 · 左图右文区块 ========= -->
  <section id="service-equipment" class="py-20 bg-stone-50 dark:bg-stone-800/30 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- 左侧图片区 -->
        <div class="rounded-2xl overflow-hidden shadow-xl order-1">
          <img 
            :src="getImageUrl(equipment.image)" 
            :alt="equipment.imageAlt || '核医学监测与防护设备'" 
            class="w-full h-auto object-cover"
            loading="lazy"
          >
        </div>
        <!-- 右侧内容区 -->
        <div class="order-2">
          <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <i class="fas fa-microscope"></i> {{ equipment.badge }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{{ equipment.title }}</h2>
          <p class="text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
            {{ equipment.description }}
          </p>
          <div class="mt-6 space-y-3">
            <div v-for="(feature, idx) in equipment.features" :key="idx" class="flex items-start gap-3">
              <i :class="['fas', feature.icon, 'text-orange-500 mt-1']"></i>
              <span>{{ feature.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()
const { equipment } = useServices()
</script>
