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
import type { NewsItem } from '~/types/news'

defineProps<{
  latestNews?: NewsItem[]
}>()

// 默认新闻数据
const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: '贝瑞医疗助力全国核医学学术年会，共话精准诊疗新基建',
    excerpt: '公司携瑞核V1.0系统及全流程辐射防护方案亮相年会，获得多家三甲医院高度关注。',
    date: '2025.03.20',
    category: '行业峰会',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format',
    views: 1245
  },
  {
    id: '2',
    title: '新型Lu-177标记药物研发支持：贝瑞提供GMP级热室解决方案',
    excerpt: '公司为多家药企定制放射性药物合成热室，助力创新核药快速临床转化。',
    date: '2025.02.10',
    category: '技术突破',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format',
    views: 876
  },
  {
    id: '3',
    title: '瑞核V1.2版本发布，新增辐射剂量数字孪生预演模块',
    excerpt: '实现核医学科辐射防护动态模拟与人员路径优化，安全效能双提升。',
    date: '2025.01.15',
    category: '智慧升级',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format',
    views: 1023
  }
]

const latestNews = defaultNews
</script>
