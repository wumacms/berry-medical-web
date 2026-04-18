import servicesData from './generated/services.json'

// 服务详情数据
export interface ServiceItem {
  id: string
  title: string
  icon: string
  description: string
  features: string[]
  image?: string
}

// 服务概览数据
export const servicesOverview = servicesData.slice(0, 3).map((service, index) => {
  const icons = ['fa-pencil-ruler', 'fa-hard-hat', 'fa-microscope']
  const descriptions = [
    '选址评估 · 布局优化 · 辐射分区 · GMP标准洁净区设计 · 通风系统独立气流组织',
    '辐射防护施工 · 放射性废水处理系统 · 多工种协同管理 · 全程驻点',
    '核素治疗监测 · 辐射监测仪器 · 药物操作热室/手套箱'
  ]
  return {
    id: service.id,
    title: service.title.replace('全流程核医学专项设计', '设计').replace('辐射防护施工与三废处理', '施工').replace('核医学设备供应与安装', '设备'),
    icon: icons[index] || 'fa-cog',
    description: descriptions[index] || service.description,
    features: service.features?.slice(0, 3) || []
  }
})

// 根据 ID 获取服务详情
const servicesMap: Record<string, typeof servicesData[0]> = {}
servicesData.forEach(s => { servicesMap[s.id] = s })

// 设计服务详情
export const serviceDesign = {
  badge: servicesMap['design']?.badge || '精准设计 · 合规先行',
  title: servicesMap['design']?.title || '全流程核医学专项设计',
  description: servicesMap['design']?.description || '',
  features: servicesMap['design']?.features || [],
  image: servicesMap['design']?.image || '/images/services/design.jpg'
}

// 施工服务详情
export const serviceConstruction = {
  badge: servicesMap['construction']?.badge || '专业施工 · 品质保障',
  title: servicesMap['construction']?.title || '辐射防护施工与三废处理',
  description: servicesMap['construction']?.description || '',
  features: servicesMap['construction']?.features || [],
  image: servicesMap['construction']?.image || '/images/services/construction.jpg'
}

// 设备服务详情
export const serviceEquipment = {
  badge: servicesMap['equipment']?.badge || '先进设备 · 精准监测',
  title: servicesMap['equipment']?.title || '核医学设备供应与安装',
  description: servicesMap['equipment']?.description || '',
  features: servicesMap['equipment']?.features || [],
  image: servicesMap['equipment']?.image || '/images/services/equipment.jpg'
}

// 软件服务详情
export const serviceSoftware = {
  badge: servicesMap['software']?.badge || '智慧管理 · 数字赋能',
  title: servicesMap['software']?.title || '瑞核智慧管理系统V1.0',
  description: servicesMap['software']?.description || '',
  features: servicesMap['software']?.features || [],
  image: servicesMap['software']?.image || '/images/services/software.jpg'
}
