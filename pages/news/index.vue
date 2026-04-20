<template>
  <div>
    <PageHero
      title="新闻与洞察"
      :subtitle="newsSection.subtitle"
      :badge="newsSection.title"
      badge-icon="fa-newspaper"
      :background-url="getImageUrl('/images/news/cover-1.jpg')"
    />

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
            v-for="newsItem in filteredNews" 
            :key="newsItem.id" 
            :news="newsItem"
            :featured="newsItem.id === filteredNews[0]?.id"
          />
        </div>

        <!-- 空状态 -->
        <div v-if="filteredNews.length === 0" class="text-center py-16">
          <p class="text-stone-500 dark:text-stone-400">暂无新闻</p>
        </div>

        <!-- 分页组件 -->
        <div v-if="totalPages > 1" class="flex justify-center mt-16">
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
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()
const { news: newsSection } = useSiteConfig()
const { allNews } = useNews()

const siteUrl = 'https://wumacms.github.io/berry-medical-nuxt'

// SEO 配置
useSeoMeta({
  title: `${newsSection.value.title} | 贝瑞医疗`,
  description: newsSection.value.subtitle,
  keywords: '贝瑞医疗,核医学新闻,行业资讯,技术突破,放射性药品,辐射防护',
  ogTitle: `${newsSection.value.title} | 贝瑞医疗`,
  ogDescription: newsSection.value.subtitle
})

// 跳过 supabase 认证重定向（确保公开页面不会被拦截）
definePageMeta({
  layout: 'default'
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
          item: siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '新闻资讯',
          item: `${siteUrl}/news`
        }
      ]
    })
  }]
})

// 动态获取分类
const categories = computed(() => {
  const cats = new Set(allNews.value.map(n => n.category))
  return ['全部', ...Array.from(cats)]
})

const activeCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 9

const totalPages = computed(() => Math.ceil(allNews.value.length / pageSize))

// 根据分类筛选新闻
const filteredNews = computed(() => {
  let list = allNews.value
  if (activeCategory.value !== '全部') {
    list = list.filter(news => news.category === activeCategory.value)
  }
  return list
})
</script>
