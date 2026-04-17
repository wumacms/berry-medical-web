<template>
  <!-- ========== 6. 新闻资讯列表区块 ========== -->
  <section id="news" class="py-20 bg-white dark:bg-stone-900 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">贝瑞动态 · 核医前沿</h2>
        <p class="text-stone-600 dark:text-stone-400 mt-2">行业资讯 | 技术突破 | 公司要闻</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <NewsCard v-for="news in latestNews" :key="news.id" :news="news" />
      </div>
      <div class="text-center mt-12">
        <NuxtLink to="/news" class="inline-flex items-center gap-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 px-6 py-3 rounded-full transition">
          查看全部新闻 <i class="fas fa-arrow-right"></i>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  latestNews?: any[]
}>()

// 使用 composable 获取新闻数据
const { latestNews: newsFromData } = useNews()

// 优先使用 props，否则使用数据文件中的数据
const latestNews = computed(() => props.latestNews || newsFromData.value)
</script>
