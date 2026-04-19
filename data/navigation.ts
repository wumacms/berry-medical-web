/**
 * 导航菜单数据
 * 从 pages.json 读取，动态生成导航菜单
 */

import pagesData from './generated/pages.json'

// 导航菜单项类型
export interface NavMenuItem {
  name: string
  path: string
  children?: NavMenuItem[]
}

// 服务详情链接（固定）
const serviceChildren: NavMenuItem[] = [
  { name: '设计 · 规划布局', path: '/#service-design' },
  { name: '施工 · 辐射防护', path: '/#service-construction' },
  { name: '设备 · 监测仪器', path: '/#service-equipment' },
  { name: '瑞核V1.0智慧系统', path: '/#service-software' }
]

// 从 pages.json 生成导航菜单
export const navigationMenu: NavMenuItem[] = [
  // 首页
  { name: '首页', path: '/' },
  // 服务内容（带子菜单）
  {
    name: '服务内容',
    path: '/#services',
    children: serviceChildren
  },
  // 专业优势
  { name: '专业优势', path: '/#advantages' },
  // 业绩案例
  { name: '业绩案例', path: '/#projects' },
  // 从 pages.json 读取的其他页面
  ...(pagesData as any[])
    .filter((p: any) => p.isNavVisible && p.path !== '/' && !['/#services', '/#advantages', '/#projects'].includes(p.path))
    .map((p: any) => ({
      name: p.name,
      path: p.path
    }))
]

// 导航配置
export const navConfig = {
  logo: '/images/logos/logo.png',
  logoAlt: '贝瑞医疗',
  ctaButton: {
    text: '免费咨询',
    link: '/#contact'
  }
}
