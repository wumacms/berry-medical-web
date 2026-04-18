<template>
  <div>
    <!-- 暗色背景标题区块 -->
    <section class="relative bg-cover bg-center bg-no-repeat py-20 md:py-28" style="background-image: url('/images/news/cover-1.jpg');">
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/85 to-stone-900/70 dark:from-black dark:via-stone-950/90 dark:to-stone-900/80"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-stone-950/50 pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-6 md:px-10 z-10">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-orange-500/20 dark:bg-orange-500/25 backdrop-blur-sm text-orange-100 dark:text-orange-100 px-5 py-1.5 rounded-full text-sm font-medium mb-5 border border-orange-400/40 shadow-lg">
            <i class="fas fa-newspaper text-orange-300"></i> 贝瑞动态 · 核医前沿
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
            新闻与洞察
          </h1>
          <p class="text-stone-200 dark:text-stone-100 mt-5 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow">
            行业前沿资讯、技术突破、公司要闻及核医学领域深度观察
          </p>
          <div class="w-24 h-1 bg-orange-400/80 rounded-full mx-auto mt-6 shadow-sm"></div>
        </div>
      </div>
    </section>

    <!-- 新闻列表主区块 -->
    <section class="py-16 md:py-24 bg-white dark:bg-stone-900">
      <div class="max-w-7xl mx-auto px-6 md:px-10">
        <!-- 分类筛选标签 -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            v-for="cat in categories" 
            :key="cat"
            :class="[
              'px-5 py-2 rounded-full font-medium text-sm transition',
              activeCategory === cat 
                ? 'bg-orange-600 text-white shadow-sm hover:bg-orange-700' 
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            ]"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- 新闻列表网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NewsCard 
            v-for="news in filteredNews" 
            :key="news.id" 
            :news="news"
            :featured="news.id === '1'"
          />
        </div>

        <!-- 分页组件 -->
        <div class="flex justify-center mt-16">
          <nav class="flex items-center gap-2 flex-wrap">
            <button 
              v-for="page in totalPages" 
              :key="page"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm shadow-sm transition',
                currentPage === page 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              ]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button class="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition">
              下一页 <i class="fas fa-chevron-right ml-1 text-xs"></i>
            </button>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types/news'

// SEO 配置
useSeoMeta({
  title: '新闻资讯 | 贝瑞医疗 - 核医学行业前沿动态',
  description: '贝瑞医疗新闻资讯频道，提供核医学行业前沿资讯、技术突破、公司要闻及核医学领域深度观察。',
  keywords: '贝瑞医疗,核医学新闻,行业资讯,技术突破,放射性药品,辐射防护',
  ogTitle: '新闻资讯 | 贝瑞医疗',
  ogDescription: '核医学行业前沿资讯、技术突破、公司要闻及核医学领域深度观察'
})

// 结构化数据 - BreadcrumbList
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: 'http://www.berrymedical.com.cn'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '新闻资讯',
          item: 'http://www.berrymedical.com.cn/news'
        }
      ]
    })
  }]
})

const categories = ['全部', '公司要闻', '技术突破', '行业政策', '展会活动']
const activeCategory = ref('全部')
const currentPage = ref(1)
const totalPages = 3

// 新闻数据
const newsList: NewsItem[] = [
  {
    id: '1',
    title: '贝瑞医疗携瑞核V1.2亮相全国核医学年会，数字孪生成焦点',
    excerpt: '在2025年全国核医学学术年会上，贝瑞医疗展示了全新升级的瑞核智慧管理系统，通过数字孪生技术实现辐射防护预演，吸引数百位专家驻足交流。',
    date: '2025.04.18',
    category: '公司要闻',
    image: '/images/news/cover-1.jpg',
    views: 1245
  },
  {
    id: '2',
    title: '助力核药创新：贝瑞为多家药企定制GMP级热室，加速Lu-177临床转化',
    excerpt: '公司放射性药物设备事业部宣布，已为国内三家创新药企提供符合cGMP标准的热室及分装系统，推动靶向放射性核素治疗药物上市进程。',
    date: '2025.04.10',
    category: '技术突破',
    image: '/images/news/cover-2.jpg',
    views: 876
  },
  {
    id: '3',
    title: '新版《核医学辐射防护标准》解读：贝瑞医疗参与起草，智慧化成关键词',
    excerpt: '国家卫生健康委发布最新核医学辐射防护标准，贝瑞医疗作为行业参编单位，深度参与智能化监测与衰变池规范章节撰写。',
    date: '2025.03.28',
    category: '行业政策',
    image: '/images/news/cover-3.jpg',
    views: 654
  },
  {
    id: '4',
    title: '瑞核V1.0荣获医疗信息化创新金奖，引领核医学科智慧管理变革',
    excerpt: '在2025中国医疗信息化大会上，贝瑞医疗自主研发的"瑞核V1.0核医学智慧管理系统"凭借数字孪生及全维度监测功能获得创新金奖。',
    date: '2025.03.15',
    category: '公司要闻',
    image: '/images/news/cover-2.jpg',
    views: 1023
  },
  {
    id: '5',
    title: '贝瑞医疗郑州展厅开放日：沉浸式体验核医学防护施工全流程',
    excerpt: '3月28日，贝瑞医疗郑州总部展厅首次对外开放，现场演示辐射防护材料测试及衰变池智能控制系统，吸引众多医院基建科代表参加。',
    date: '2025.03.05',
    category: '展会活动',
    image: '/images/news/cover-3.jpg',
    views: 543
  },
  {
    id: '6',
    title: '贝瑞医疗与芬兰核医学中心达成战略合作，引入北欧辐射防护技术',
    excerpt: '双方将共同研发新一代智能化放射性废物处理系统，提升核医学科环保与安全水平。',
    date: '2025.02.20',
    category: '公司要闻',
    image: '/images/news/cover-1.jpg',
    views: 789
  }
]

// 根据分类筛选新闻
const filteredNews = computed(() => {
  if (activeCategory.value === '全部') {
    return newsList
  }
  return newsList.filter(news => news.category === activeCategory.value)
})
</script>
