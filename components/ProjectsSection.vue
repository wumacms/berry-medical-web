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
const projects = [
  '复旦大学附属中山医院',
  '陆军军医大学西南医院',
  '南昌大学第一附属医院',
  '福建医科大学附属第一医院',
  '广东省第二人民医院',
  '宜春市人民医院',
  '遵义医科大学附属医院',
  '新疆医科大学附属肿瘤医院',
  '国家肿瘤区域医疗中心',
  '远大医药（中国）'
]
</script>
