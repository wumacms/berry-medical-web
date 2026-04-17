<template>
  <footer class="bg-stone-100 dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 py-8">
    <div class="max-w-7xl mx-auto px-6 md:px-10 text-center text-stone-500 dark:text-stone-400 text-sm">
      <p>© {{ currentYear }} 贝瑞医疗科技（郑州）有限公司 | 核医学一站式服务 | 精于专业 恪于安全 诚于客户</p>
      <p class="mt-1 text-xs"><i class="fas fa-leaf"></i> 助力健康中国 · 核医学基础设施引领者</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
