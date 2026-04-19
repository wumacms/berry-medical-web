/**
 * 导航菜单数据
 * 从 pages.json 读取，根据路径关系动态生成二级菜单
 */

import pagesData from './generated/pages.json'

// 导航菜单项类型
export interface NavMenuItem {
  name: string
  path: string
  children?: NavMenuItem[]
}

/**
 * 根据页面路径关系构建导航菜单树
 * 规则：
 * - /about 是一级菜单
 * - /about/company 是 /about 的二级菜单
 * - /about/company/team 是 /about/company 的三级菜单（但导航只显示两级）
 */
function buildNavigationTree(pages: any[]): NavMenuItem[] {
  // 只取导航可见的页面，并按路径排序
  const visiblePages = pages
    .filter((p: any) => p.isNavVisible)
    .sort((a: any, b: any) => (a.navSortOrder || 0) - (b.navSortOrder || 0))

  const menu: NavMenuItem[] = []
  const pathMap = new Map<string, NavMenuItem>()

  // 第一步：创建所有菜单项
  for (const page of visiblePages) {
    const item: NavMenuItem = {
      name: page.name,
      path: page.path,
      children: []
    }
    pathMap.set(page.path, item)
  }

  // 第二步：建立父子关系
  for (const page of visiblePages) {
    const item = pathMap.get(page.path)!
    const parentPath = getParentPath(page.path)

    if (parentPath && pathMap.has(parentPath)) {
      // 有父级，添加到父级的 children
      const parent = pathMap.get(parentPath)!
      if (!parent.children) parent.children = []
      parent.children.push(item)
    } else {
      // 没有父级或父级不在导航中，作为一级菜单
      menu.push(item)
    }
  }

  // 第三步：清理空的 children 数组
  for (const item of pathMap.values()) {
    if (item.children && item.children.length === 0) {
      delete item.children
    }
  }

  return menu
}

/**
 * 获取父级路径
 * /about/company -> /about
 * /about -> null
 * / -> null
 */
function getParentPath(path: string): string | null {
  if (path === '/') return null
  
  // 移除末尾的斜杠
  const cleanPath = path.replace(/\/$/, '')
  const lastSlashIndex = cleanPath.lastIndexOf('/')
  
  if (lastSlashIndex <= 0) return null
  
  return cleanPath.substring(0, lastSlashIndex) || '/'
}

// 从 pages.json 生成导航菜单
export const navigationMenu: NavMenuItem[] = buildNavigationTree(pagesData)

// 导航配置
export const navConfig = {
  logo: '/images/logos/logo.png',
  logoAlt: '贝瑞医疗',
  ctaButton: {
    text: '免费咨询',
    link: '/#contact'
  }
}
