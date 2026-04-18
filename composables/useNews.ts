import type { NewsItem, NewsCategory, NewsListParams, NewsListResponse } from '~/types/news'
import allNewsData from '~/data/generated/news.json'

// 新闻数据 composable
export function useNews() {
  // 获取首页展示的最新新闻
  const latestNews = computed(() => (allNewsData as NewsItem[]).slice(0, 3))

  // 获取所有新闻
  const allNews = computed(() => allNewsData as NewsItem[])

  // 获取新闻分类
  const categories = computed(() => {
    const cats = new Set((allNewsData as NewsItem[]).map(n => n.category))
    return ['全部', ...Array.from(cats)]
  })

  // 按分类获取新闻
  const getNewsByCategory = (category: NewsCategory): NewsItem[] => {
    const data = allNewsData as NewsItem[]
    if (category === '全部') {
      return data
    }
    return data.filter(news => news.category === category)
  }

  // 获取单条新闻
  const getNewsById = (id: string): NewsItem | undefined => {
    return (allNewsData as NewsItem[]).find(news => news.id === id)
  }

  // 模拟分页获取
  const getNewsList = (params: NewsListParams): NewsListResponse => {
    const data = allNewsData as NewsItem[]
    let filtered = data

    if (params.category && params.category !== '全部') {
      filtered = data.filter(news => news.category === params.category)
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
