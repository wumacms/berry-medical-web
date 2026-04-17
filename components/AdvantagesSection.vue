<template>
  <!-- ========== 4. 专业优势区块 ========== -->
  <section id="advantages" class="py-20 bg-white dark:bg-stone-900 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">为什么选择贝瑞医疗</h2>
        <p class="text-stone-600 dark:text-stone-400 mt-2">核心技术壁垒 · 深度行业积淀</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(item, index) in advantageList" :key="index" class="bg-stone-50 dark:bg-stone-800 p-6 rounded-xl text-center">
          <i :class="['fas', index === 0 ? 'fa-chart-line' : index === 1 ? 'fa-users' : index === 2 ? 'fa-building' : 'fa-file-alt', 'text-4xl text-orange-500 mb-3']"></i>
          <div class="text-3xl font-bold text-stone-800 dark:text-stone-200">{{ item.value }}</div>
          <p class="text-stone-500">{{ item.label }}</p>
        </div>
      </div>
      <div class="mt-12 bg-stone-100 dark:bg-stone-800/50 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        <div v-for="(item, index) in highlightList" :key="index" class="flex items-center gap-3">
          <i :class="['fas', item.icon, 'text-orange-500 text-2xl']"></i>
          <span>{{ item.text }}</span>
        </div>
        <div>
          <span v-for="(cert, index) in certificationList" :key="index" class="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">{{ cert }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { advantageList, highlightList, certificationList } = useAdvantages()
</script>
