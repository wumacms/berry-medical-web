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
export const servicesOverview = [
  {
    id: 'design',
    title: '设计',
    icon: 'fa-pencil-ruler',
    description: '选址评估 · 布局优化 · 辐射分区 · GMP标准洁净区设计 · 通风系统独立气流组织',
    features: [
      '符合GBZ、药品GMP及放射性药品附录',
      '衰变池设计/辐射防护优化',
      '药监验收一站式技术咨询'
    ]
  },
  {
    id: 'construction',
    title: '施工',
    icon: 'fa-hard-hat',
    description: '辐射防护施工 · 放射性废水处理系统 · 多工种协同管理 · 全程驻点',
    features: [
      '防护门窗/围护结构/三废处理',
      '通过环保验收、卫职控评验收',
      '智能衰变池系统（长短半衰期双系）'
    ]
  },
  {
    id: 'equipment',
    title: '设备',
    icon: 'fa-microscope',
    description: '核素治疗监测 · 辐射监测仪器 · 药物操作热室/手套箱',
    features: [
      '131I体内活度测量/全身动态辐射显像',
      '个人剂量仪/环境监测/活度计CRC-55tR',
      '放射性废物自动处理系统'
    ]
  }
]

// 设计服务详情
export const serviceDesign = {
  badge: '精准设计 · 合规先行',
  title: '全流程核医学专项设计',
  description: '从选址评估到施工图落地，贝瑞设计团队严格遵循药品GMP、GBZ系列及放射性药品附录，为客户提供功能优化与成本可控的专项设计。',
  features: [
    '辐射控制区/监督区精细化分区，保障医患安全',
    '独立通风系统设计，气流自非放射区→控制区，排气高效过滤',
    '衰变池、防护屏蔽、制药区域C级背景局部A级环境设计',
    '药监GMP专家检查及环保、卫评验收一站式技术支持'
  ],
  image: '/images/services/design.jpg'
}

// 施工服务详情
export const serviceConstruction = {
  badge: '专业施工 · 品质保障',
  title: '辐射防护施工与三废处理',
  description: '拥有多年核医学场所施工经验的专业团队，为客户提供高质量的辐射防护施工和废物处理系统。',
  features: [
    '铅防护门窗、铅玻璃、铅板等辐射屏蔽工程',
    '智能衰变池系统，自动监测与处理放射性废水',
    '放射性固体废物暂存与处理系统',
    '全程驻点技术指导，确保施工合规'
  ],
  image: '/images/services/construction.jpg'
}

// 设备服务详情
export const serviceEquipment = {
  badge: '先进设备 · 精准监测',
  title: '核医学设备供应与安装',
  description: '提供全套核医学场所所需设备，从辐射监测到废物处理，品质可靠、售后服务完善。',
  features: [
    '核素治疗监测设备',
    '辐射监测仪器（个人剂量仪、环境监测仪）',
    '活度计CRC-55tR',
    '药物操作热室/手套箱',
    '放射性废物自动处理系统'
  ],
  image: '/images/services/equipment.jpg'
}

// 软件服务详情
export const serviceSoftware = {
  badge: '智慧管理 · 数字赋能',
  title: '瑞核智慧管理系统V1.0',
  description: '自主研发的核医学科智慧管理系统，实现辐射防护动态模拟、人员路径优化与全流程数字化管理。',
  features: [
    '辐射剂量数字孪生预演模块',
    '人员路径优化与实时监控',
    '设备运行状态智能监测',
    '数据分析与报表生成',
    '7×24小时远程运维支持'
  ],
  image: '/images/services/software.jpg'
}
