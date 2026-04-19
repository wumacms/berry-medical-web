/**
 * 服务数据
 * 从 blocks.json 读取 (type = services, service-detail)
 */

import blocksData from './generated/blocks.json'

// 服务详情数据
export interface ServiceItem {
  id: string
  badge: string
  title: string
  description: string
  features: { icon: string; text: string }[]
}

// 查找 blocks.json 中的 services 区块
const servicesBlock = (blocksData as any[]).find((b: any) => b.type === 'services')
const serviceDetailBlocks = (blocksData as any[]).filter((b: any) => b.type === 'service-detail')

// 服务概览数据 - 从 services 区块的 cards 提取
export const servicesOverview = (servicesBlock?.config?.cards || []).map((card: any) => ({
  id: card.id,
  title: card.title,
  icon: card.icon,
  description: card.description,
  features: card.features || []
}))

// 服务概览头部信息
export const servicesHeader = {
  title: servicesBlock?.config?.title || '核医学场所 · 全生命周期解决方案',
  subtitle: servicesBlock?.config?.subtitle || '闭环服务',
  detailLinks: servicesBlock?.config?.detailLinks || []
}

// 查找服务详情
const getServiceDetail = (id: string) => {
  return serviceDetailBlocks.find((b: any) => b.config?.id === id)?.config || {}
}

// 设计服务详情
export const serviceDesign: ServiceItem = {
  id: 'design',
  badge: getServiceDetail('service-design').badge || '精准设计 · 合规先行',
  title: getServiceDetail('service-design').title || '全流程核医学专项设计',
  description: getServiceDetail('service-design').description || '',
  features: getServiceDetail('service-design').features || []
}

// 施工服务详情
export const serviceConstruction: ServiceItem = {
  id: 'construction',
  badge: getServiceDetail('service-construction').badge || '匠心施工 · 全程可控',
  title: getServiceDetail('service-construction').title || '辐射防护与净化工程总承包',
  description: getServiceDetail('service-construction').description || '',
  features: getServiceDetail('service-construction').features || []
}

// 设备服务详情
export const serviceEquipment: ServiceItem = {
  id: 'equipment',
  badge: getServiceDetail('service-equipment').badge || '尖端设备 · 智慧监测',
  title: getServiceDetail('service-equipment').title || '核素治疗及辐射监测仪器',
  description: getServiceDetail('service-equipment').description || '',
  features: getServiceDetail('service-equipment').features || []
}

// 软件服务详情
export const serviceSoftware: ServiceItem = {
  id: 'software',
  badge: getServiceDetail('service-software').badge || '数字孪生 · 智慧中枢',
  title: getServiceDetail('service-software').title || '瑞核V1.0 核医学智慧管理系统',
  description: getServiceDetail('service-software').description || '',
  features: getServiceDetail('service-software').features || []
}
