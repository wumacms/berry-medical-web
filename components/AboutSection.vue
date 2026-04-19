<template>
  <!-- ========== 2. 企业文化/简介区块（配图横版） ========== -->
  <section class="py-20 bg-white dark:bg-stone-900">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{{ about.title }}</h2>
          <p class="text-orange-600 dark:text-orange-400 font-semibold mt-2 flex items-center gap-1">
            <i class="fas fa-biohazard"></i> {{ about.subtitle }}
          </p>
          <p class="text-stone-600 dark:text-stone-400 mt-5 leading-relaxed">
            {{ about.description }}
          </p>
          <div class="grid grid-cols-2 gap-5 mt-8">
            <div v-for="(feature, index) in about.features" :key="index" class="flex items-center gap-3">
              <i :class="['fas', feature.icon, 'text-2xl text-orange-500']"></i>
              <span class="font-medium">{{ feature.text }}</span>
            </div>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-xl">
          <img 
            :src="getImageUrl(about.image || '/images/about/team.jpg')" 
            :alt="about.imageAlt || '核医学实验室团队'" 
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
const { about } = useSiteConfig()
</script>
