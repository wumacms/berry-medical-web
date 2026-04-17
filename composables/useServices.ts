import {
  servicesOverview,
  serviceDesign,
  serviceConstruction,
  serviceEquipment,
  serviceSoftware,
  type ServiceItem
} from '~/data/services'

// 服务数据 composable
export function useServices() {
  // 获取服务概览列表
  const overviewList = computed(() => servicesOverview)

  // 获取各项服务详情
  const design = computed(() => serviceDesign)
  const construction = computed(() => serviceConstruction)
  const equipment = computed(() => serviceEquipment)
  const software = computed(() => serviceSoftware)

  // 根据 ID 获取服务详情
  const getServiceById = (id: string) => {
    switch (id) {
      case 'design':
        return serviceDesign
      case 'construction':
        return serviceConstruction
      case 'equipment':
        return serviceEquipment
      case 'software':
        return serviceSoftware
      default:
        return null
    }
  }

  return {
    overviewList,
    design,
    construction,
    equipment,
    software,
    getServiceById
  }
}
