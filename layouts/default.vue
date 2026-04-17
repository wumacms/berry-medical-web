<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 font-sans antialiased">
    <AppHeader />
    <main class="flex-1 overflow-hidden">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// 全局布局组件
</script>
