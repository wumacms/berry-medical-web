import type { NewsItem, NewsCategory, NewsListParams, NewsListResponse } from '~/types/news'
import { latestNewsData, allNewsData, newsCategories } from '~/data/news'

// 新闻数据 composable
export function useNews() {
  // 获取首页展示的最新新闻
  const latestNews = computed(() => latestNewsData)

  // 获取所有新闻
  const allNews = computed(() => allNewsData)

  // 获取新闻分类
  const categories = computed(() => [...newsCategories])

  // 按分类获取新闻
  const getNewsByCategory = (category: NewsCategory): NewsItem[] => {
    if (category === '全部') {
      return allNewsData
    }
    return allNewsData.filter(news => news.category === category)
  }

  // 获取单条新闻
  const getNewsById = (id: string): NewsItem | undefined => {
    return allNewsData.find(news => news.id === id)
  }

  // 模拟分页获取
  const getNewsList = (params: NewsListParams): NewsListResponse => {
    let filtered = allNewsData

    if (params.category && params.category !== '全部') {
      filtered = allNewsData.filter(news => news.category === params.category)
    }

    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const list = filtered.slice(start, end)

    return {
      list,
      total: filtered.length,
      page: params.page,
      pageSize: params.pageSize
    }
  }

  return {
    latestNews,
    allNews,
    categories,
    getNewsByCategory,
    getNewsById,
    getNewsList
  }
}
