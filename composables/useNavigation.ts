/**
 * 导航菜单 composable
 * 从 navigation.ts 读取导航数据
 */

import { navigationMenu, navConfig, type NavMenuItem } from '~/data/navigation'

// 导航菜单 composable
export function useNavigation() {
  // 获取导航菜单
  const menu = computed(() => navigationMenu)
  
  // 获取导航配置
  const config = computed(() => navConfig)
  
  // 判断当前路径是否激活
  const isActive = (path: string): boolean => {
    if (typeof window === 'undefined') return false
    const currentPath = window.location.pathname
    if (path === '/') return currentPath === '/'
    return currentPath.startsWith(path)
  }
  
  // 判断是否有子菜单
  const hasChildren = (item: NavMenuItem): boolean => {
    return !!(item.children && item.children.length > 0)
  }

  return {
    menu,
    config,
    isActive,
    hasChildren
  }
}
