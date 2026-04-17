// 新闻类型定义
export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content?: string
  date: string
  category: string
  image: string
  views: number
  readingTime?: string
  tags?: string[]
  author?: string
  prevNews?: {
    id: string
    title: string
    date: string
  }
  nextNews?: {
    id: string
    title: string
    date: string
  }
}

// 新闻分类
export type NewsCategory = '全部' | '公司要闻' | '技术突破' | '行业政策' | '展会活动'

// 新闻列表请求参数
export interface NewsListParams {
  page: number
  pageSize: number
  category?: NewsCategory
}

// 新闻列表响应
export interface NewsListResponse {
  list: NewsItem[]
  total: number
  page: number
  pageSize: number
}
