/**
 * 区块数据
 * 从 blocks.json 读取，提供统一的区块数据访问接口
 */

import blocksData from './generated/blocks.json'

// 区块类型
export interface Block {
  id: string
  pageId: string
  type: string
  title: string
  sortOrder: number
  config: Record<string, any>
}

// 首页 ID
const HOME_PAGE_ID = '760dcc34-df32-4473-96bd-fa021c401837'
const NEWS_PAGE_ID = '4a260865-a9e2-45ab-a42e-6a100e02f37b'

// 获取某页面的所有区块
export const getBlocksByPage = (pageId: string) => {
  return (blocksData as Block[])
    .filter(b => b.pageId === pageId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

// 获取某页面的某类型区块
export const getBlockByType = (pageId: string, type: string) => {
  return (blocksData as Block[]).find(b => b.pageId === pageId && b.type === type)
}

// 获取首页所有区块
export const homeBlocks = getBlocksByPage(HOME_PAGE_ID)

// 获取新闻页所有区块
export const newsBlocks = getBlocksByPage(NEWS_PAGE_ID)

// 首页各区块快捷访问
export const homeHero = getBlockByType(HOME_PAGE_ID, 'hero')
export const homeAbout = getBlockByType(HOME_PAGE_ID, 'about')
export const homeServices = getBlockByType(HOME_PAGE_ID, 'services')
export const homeServiceDetails = (blocksData as Block[]).filter(b => b.pageId === HOME_PAGE_ID && b.type === 'service-detail')
export const homeAdvantages = getBlockByType(HOME_PAGE_ID, 'advantages')
export const homeProjects = getBlockByType(HOME_PAGE_ID, 'projects')
export const homeNews = getBlockByType(HOME_PAGE_ID, 'news')
export const homeContact = getBlockByType(HOME_PAGE_ID, 'contact')
export const homeCta = getBlockByType(HOME_PAGE_ID, 'cta')

// 新闻页区块
export const newsHero = getBlockByType(NEWS_PAGE_ID, 'hero')
export const newsList = getBlockByType(NEWS_PAGE_ID, 'news-list')
