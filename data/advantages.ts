// 优势数据
export interface AdvantageItem {
  value: string
  label: string
  description: string
}

export interface HighlightItem {
  icon: string
  text: string
}

export const advantages: AdvantageItem[] = [
  {
    value: '10+',
    label: '四类《放射性药品使用许可证》取证支持',
    description: '四类《放射性药品使用许可证》取证支持'
  },
  {
    value: '15+年',
    label: '核医学场所专业团队经验',
    description: '核医学场所专业团队经验'
  },
  {
    value: '30+',
    label: '医疗机构建设案例',
    description: '医疗机构建设案例'
  },
  {
    value: '100+',
    label: '核医学方案技术咨询',
    description: '核医学方案技术咨询'
  }
]

export const highlights: HighlightItem[] = [
  {
    icon: 'fa-book-open',
    text: '参编核医学行业规范标准'
  },
  {
    icon: 'fa-hard-hat',
    text: '擅长复杂场地改造&狭小空间优化'
  }
]

export const certifications = [
  '全流程许可证办理支持'
]
