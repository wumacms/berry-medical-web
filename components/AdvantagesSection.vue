<template>
  <!-- ========== 4. 专业优势区块 ========== -->
  <section id="advantages" class="py-20 bg-white dark:bg-stone-900 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{{ advantages.title }}</h2>
        <p class="text-stone-600 dark:text-stone-400 mt-2">{{ advantages.subtitle }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(item, index) in advantages.items" :key="index" class="bg-stone-50 dark:bg-stone-800 p-6 rounded-xl text-center">
          <i :class="['fas', index === 0 ? 'fa-chart-line' : index === 1 ? 'fa-users' : index === 2 ? 'fa-building' : 'fa-file-alt', 'text-4xl text-orange-500 mb-3']"></i>
          <div class="text-3xl font-bold text-stone-800 dark:text-stone-200">{{ item.value }}</div>
          <p class="text-stone-500">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { advantages } = useSiteConfig()
</script>
