<template>
  <!-- 瑞核V1.0 智慧管理系统单独高亮区（配图） -->
  <section id="service-software" class="py-16 bg-gradient-to-r from-orange-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-12 items-center">
      <div class="flex-1">
        <div class="bg-orange-100 dark:bg-orange-900/30 inline-block px-4 py-1 rounded-full text-orange-700 dark:text-orange-300 text-sm font-medium">
          <i class="fas fa-microchip mr-1"></i> {{ software.badge }}
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mt-4">{{ software.title }}</h2>
        <p class="text-stone-600 dark:text-stone-400 mt-4 text-lg">
          {{ software.description }}
        </p>
        <ul class="mt-6 space-y-3">
          <li v-for="(feature, idx) in software.features" :key="idx" class="flex items-center gap-2">
            <i :class="['fas', feature.icon, 'text-orange-500']"></i>
            <span>{{ feature.text }}</span>
          </li>
        </ul>
      </div>
      <div class="flex-1 rounded-2xl overflow-hidden shadow-xl">
        <img 
          :src="getImageUrl(software.image)" 
          alt="智慧管理系统界面" 
          class="w-full h-auto object-cover"
          loading="lazy"
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()
const { software } = useServices()
</script>
