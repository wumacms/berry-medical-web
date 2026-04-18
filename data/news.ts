import type { NewsItem } from '~/types/news'
import newsData from './generated/news.json'

// 首页展示的最新新闻（取前3条）
export const latestNewsData: NewsItem[] = newsData.slice(0, 3).map(item => ({
  id: item.id,
  title: item.title,
  excerpt: item.excerpt,
  date: item.date.replace(/-/g, '.'),
  category: item.category,
  image: item.image,
  views: item.views
}))

// 所有新闻数据
export const allNewsData: NewsItem[] = newsData.map(item => ({
  id: item.id,
  title: item.title,
  excerpt: item.excerpt,
  date: item.date.replace(/-/g, '.'),
  category: item.category,
  image: item.image,
  views: item.views
}))

// 新闻分类
export const newsCategories = [
  '全部',
  '公司要闻',
  '技术突破',
  '行业政策',
  '行业峰会',
  '展会活动'
] as const
