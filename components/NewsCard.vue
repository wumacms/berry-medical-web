<template>
  <article class="group bg-stone-50 dark:bg-stone-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-stone-200 dark:border-stone-700">
    <NuxtLink :to="`/news/${news.id}`" class="block relative overflow-hidden h-56">
      <img 
        :src="getImageUrl(news.image)" 
        :alt="news.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        loading="lazy"
      >
      <div v-if="featured" class="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
        🔥 头条
      </div>
    </NuxtLink>
    <div class="p-6 flex-1 flex flex-col">
      <div class="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mb-3">
        <span><i class="far fa-calendar-alt mr-1"></i> {{ news.date }}</span>
        <span class="bg-stone-200 dark:bg-stone-700 px-2 py-0.5 rounded-full text-orange-700 dark:text-orange-300">{{ news.category }}</span>
      </div>
      <h3 class="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2 line-clamp-2">
        <NuxtLink :to="`/news/${news.id}`" class="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
          {{ news.title }}
        </NuxtLink>
      </h3>
      <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4 flex-1">
        {{ news.excerpt }}
      </p>
      <div class="mt-auto flex items-center justify-between">
        <NuxtLink :to="`/news/${news.id}`" class="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium text-sm group-hover:gap-2 transition-all">
          阅读全文 <i class="fas fa-arrow-right"></i>
        </NuxtLink>
        <span class="text-xs text-stone-400"><i class="far fa-eye"></i> {{ news.views }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types/news'

defineProps<{
  news: NewsItem
  featured?: boolean
}>()

const { getImageUrl } = useCdnUrl()
</script>
