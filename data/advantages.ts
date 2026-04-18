import advantagesData from './generated/advantages.json'

// 优势数据
export interface AdvantageItem {
  value: string
  label: string
  description: string
}

export const advantages: AdvantageItem[] = advantagesData.map(item => ({
  value: item.value,
  label: item.label,
  description: item.description
}))
