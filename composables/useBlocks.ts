/**
 * 区块数据 composable
 * 从 blocks.ts 读取区块数据
 */

import {
  homeBlocks,
  homeHero,
  homeAbout,
  homeServices,
  homeServiceDetails,
  homeAdvantages,
  homeProjects,
  homeNews,
  homeContact,
  homeCta,
  newsBlocks,
  newsHero,
  newsList,
  getBlocksByPage,
  getBlockByType,
  type Block
} from '~/data/blocks'

// 区块数据 composable
export function useBlocks() {
  // 获取首页所有区块
  const getHomeBlocks = () => homeBlocks
  
  // 获取新闻页所有区块
  const getNewsBlocks = () => newsBlocks
  
  // 根据页面 ID 获取区块
  const getPageBlocks = (pageId: string) => getBlocksByPage(pageId)
  
  // 根据页面和类型获取区块
  const getBlock = (pageId: string, type: string) => getBlockByType(pageId, type)
  
  // 首页各区块快捷访问
  const hero = computed(() => homeHero)
  const about = computed(() => homeAbout)
  const services = computed(() => homeServices)
  const serviceDetails = computed(() => homeServiceDetails)
  const advantages = computed(() => homeAdvantages)
  const projects = computed(() => homeProjects)
  const news = computed(() => homeNews)
  const contact = computed(() => homeContact)
  const cta = computed(() => homeCta)
  
  // 新闻页区块
  const newsPageHero = computed(() => newsHero)
  const newsPageList = computed(() => newsList)
  
  // 根据类型获取服务详情
  const getServiceDetail = (id: string): Block | undefined => {
    return homeServiceDetails.find((b: Block) => b.config?.id === id)
  }

  return {
    // 首页
    getHomeBlocks,
    hero,
    about,
    services,
    serviceDetails,
    advantages,
    projects,
    news,
    contact,
    cta,
    // 新闻页
    getNewsBlocks,
    newsPageHero,
    newsPageList,
    // 通用
    getPageBlocks,
    getBlock,
    getServiceDetail
  }
}
