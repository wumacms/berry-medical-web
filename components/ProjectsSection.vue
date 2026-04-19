<template>
  <!-- ========== 5. 业绩案例展示 (部分合作单位 + 横版配图) ========== -->
  <section id="projects" class="py-20 bg-stone-50 dark:bg-stone-800/40 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">合作案例 · 实力见证</h2>
        <p class="text-stone-600 dark:text-stone-400 mt-2">全国顶级医院及科研机构信赖之选</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-12 text-center">
        <div v-for="project in projects" :key="project" class="bg-white dark:bg-stone-800 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <span class="font-semibold text-stone-700 dark:text-stone-300">{{ project }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { projects } = useSiteConfig()
</script>
