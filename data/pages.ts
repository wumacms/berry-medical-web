/**
 * 页面数据
 * 从 pages.json 读取
 */

import pagesData from './generated/pages.json'

// 页面类型
export interface Page {
  id: string
  name: string
  path: string
  description: string
  navSortOrder: number
  isNavVisible: boolean
  seo: Record<string, any>
}

// 所有页面
export const pages = pagesData as Page[]

// 获取所有导航可见的页面
export const navPages = pages.filter(p => p.isNavVisible)

// 获取页面路径映射
export const pagePathMap: Record<string, Page> = {}
pages.forEach(p => { pagePathMap[p.path] = p })

// 首页
export const homePage = pagePathMap['/'] || pages[0]

// 新闻页
export const newsPage = pagePathMap['/news']

// 查找页面
export const getPageByPath = (path: string) => pagePathMap[path]
