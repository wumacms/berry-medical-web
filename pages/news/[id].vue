<template>
  <div>
    <!-- 文章主体区块 -->
    <section class="relative bg-cover bg-center bg-no-repeat py-16 md:py-24" :style="{ backgroundImage: `url('${getImageUrl(article.image)}')` }">
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/85 to-stone-900/70 dark:from-black dark:via-stone-950/90 dark:to-stone-900/80"></div>
      <div class="relative max-w-4xl mx-auto px-6 md:px-10 z-10 text-center">
        <!-- 新闻分类 -->
        <div class="inline-flex items-center gap-2 bg-orange-500/20 dark:bg-orange-500/25 backdrop-blur-sm text-orange-100 px-4 py-1.5 rounded-full text-sm font-medium mb-5 border border-orange-400/30">
          <i class="fas fa-microscope"></i> {{ article.category }}
        </div>
        <!-- 文章标题 -->
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg leading-tight">
          {{ article.title }}
        </h1>
        <!-- 发布日期 & 阅读时间 -->
        <div class="flex items-center justify-center gap-5 text-stone-300 text-sm mt-6">
          <span><i class="far fa-calendar-alt mr-1"></i> {{ formatDate(article.date) }}</span>
          <span><i class="far fa-clock mr-1"></i> 约 {{ article.readingTime || '3 分钟' }}</span>
          <span><i class="far fa-eye mr-1"></i> {{ article.views }} 次阅读</span>
        </div>
      </div>
    </section>

    <!-- 文章正文区域 -->
    <section class="py-12 md:py-16 bg-white dark:bg-stone-900">
      <div class="max-w-4xl mx-auto px-6 md:px-10">
        <!-- 正文内容 -->
        <article class="text-stone-700 dark:text-stone-300 leading-relaxed prose-custom">
          <p class="text-lg font-medium text-orange-700 dark:text-orange-400 border-l-4 border-orange-500 pl-4 italic mb-6">
            {{ article.excerpt }}
          </p>
          
          <div v-html="processedContent"></div>
        </article>

        <!-- 文章底部标签分享 -->
        <div class="mt-10 pt-6 border-t border-stone-200 dark:border-stone-700 flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap gap-2">
            <span class="text-xs text-stone-500 dark:text-stone-400"><i class="fas fa-tags"></i> 关键词：</span>
            <span v-for="tag in article.tags" :key="tag" class="bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full text-xs text-stone-600 dark:text-stone-300">
              {{ tag }}
            </span>
          </div>
          <div class="flex gap-3">
            <span class="text-stone-400 text-sm cursor-pointer hover:text-orange-500"><i class="fab fa-weixin"></i></span>
            <span class="text-stone-400 text-sm cursor-pointer hover:text-orange-500"><i class="fab fa-weibo"></i></span>
            <span class="text-stone-400 text-sm cursor-pointer hover:text-orange-500" @click="copyLink"><i class="fas fa-link"></i></span>
          </div>
        </div>
      </div>
    </section>

    <!-- 上一篇 / 下一篇导航 -->
    <section class="py-12 bg-stone-50 dark:bg-stone-800/30 border-t border-stone-200 dark:border-stone-700">
      <div class="max-w-4xl mx-auto px-6 md:px-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 上一篇 -->
          <NuxtLink 
            v-if="prevNews" 
            :to="`/news/${prevNews.id}`" 
            class="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-stone-800/80 shadow-sm hover:shadow-md transition border border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-600"
          >
            <div class="text-orange-500 dark:text-orange-400 text-xl"><i class="fas fa-arrow-left"></i></div>
            <div class="flex-1">
              <p class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">上一篇</p>
              <h4 class="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition line-clamp-2">
                {{ prevNews.title }}
              </h4>
              <p class="text-xs text-stone-400 dark:text-stone-500 mt-1">{{ formatDate(prevNews.date) }}</p>
            </div>
          </NuxtLink>
          <div v-else class="flex items-start gap-4 p-5 rounded-2xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 opacity-60">
            <div class="text-stone-400 text-xl"><i class="fas fa-arrow-left"></i></div>
            <div class="flex-1">
              <p class="text-xs text-stone-400 uppercase tracking-wider">上一篇</p>
              <h4 class="font-semibold text-stone-400 line-clamp-2">没有更多文章了</h4>
            </div>
          </div>
          <!-- 下一篇 -->
          <NuxtLink 
            v-if="nextNews" 
            :to="`/news/${nextNews.id}`" 
            class="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-stone-800/80 shadow-sm hover:shadow-md transition border border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-600 md:text-right"
          >
            <div class="flex-1">
              <p class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">下一篇</p>
              <h4 class="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition line-clamp-2">
                {{ nextNews.title }}
              </h4>
              <p class="text-xs text-stone-400 dark:text-stone-500 mt-1">{{ formatDate(nextNews.date) }}</p>
            </div>
            <div class="text-orange-500 dark:text-orange-400 text-xl"><i class="fas fa-arrow-right"></i></div>
          </NuxtLink>
          <div v-else class="flex items-start gap-4 p-5 rounded-2xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 opacity-60 md:text-right">
            <div class="flex-1">
              <p class="text-xs text-stone-400 uppercase tracking-wider">下一篇</p>
              <h4 class="font-semibold text-stone-400 line-clamp-2">没有更多文章了</h4>
            </div>
            <div class="text-stone-400 text-xl"><i class="fas fa-arrow-right"></i></div>
          </div>
        </div>
        <!-- 返回列表按钮 -->
        <div class="text-center mt-10">
          <NuxtLink to="/news" class="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 text-sm transition">
            <i class="fas fa-list-ul"></i> 返回新闻列表
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const newsId = route.params.id as string
const { getImageUrl } = useCdnUrl()
const { allNews, getNewsById } = useNews()

// 获取文章数据
const article = computed(() => {
  return getNewsById(newsId) || allNews.value[0] || {
    id: '',
    title: '文章未找到',
    excerpt: '',
    date: '',
    category: '',
    image: '/images/news/cover-1.jpg',
    views: 0,
    tags: [],
    content: ''
  }
})

// 处理 content 中的图片路径
const baseURL = useRuntimeConfig().app.baseURL || ''
const processedContent = computed(() => {
  if (!article.value.content) return ''
  return article.value.content.replace(/__CDN_PATH__/g, baseURL.replace(/\/$/, ''))
})

// 获取上一篇和下一篇
const currentIndex = computed(() => {
  return allNews.value.findIndex(n => n.id === newsId)
})

const prevNews = computed(() => {
  const idx = currentIndex.value
  return idx > 0 ? allNews.value[idx - 1] : null
})

const nextNews = computed(() => {
  const idx = currentIndex.value
  return idx < allNews.value.length - 1 ? allNews.value[idx + 1] : null
})

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

// SEO 配置
useSeoMeta({
  title: `${article.value.title} | 贝瑞医疗`,
  description: article.value.excerpt,
  keywords: article.value.tags?.join(','),
  ogTitle: article.value.title,
  ogDescription: article.value.excerpt,
  ogType: 'article'
})

// 结构化数据 - Article
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.value.title,
      description: article.value.excerpt,
      image: article.value.image,
      datePublished: article.value.date,
      author: {
        '@type': 'Organization',
        name: '贝瑞医疗科技'
      },
      publisher: {
        '@type': 'Organization',
        name: '贝瑞医疗科技',
        logo: {
          '@type': 'ImageObject',
          url: `${baseURL}/favicon.svg`
        }
      }
    })
  }]
})

// 复制链接
const copyLink = async () => {
  if (import.meta.client) {
    await navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}
</script>

<style scoped>
.prose-custom {
  @apply [&>p]:mb-5 [&>p]:leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-stone-800 [&>h2]:dark:text-stone-100 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-5 [&>li]:mb-1;
}
.prose-custom :deep(img) {
  @apply rounded-xl shadow-md my-6 w-full;
}
</style>
