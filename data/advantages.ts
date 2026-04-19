/**
 * 优势数据
 * 从 blocks.json 读取 (type = advantages)
 */

import blocksData from './generated/blocks.json'

// 优势项类型
export interface AdvantageItem {
  value: string
  label: string
  description?: string
}

// 查找 blocks.json 中的 advantages 区块
const advantagesBlock = (blocksData as any[]).find((b: any) => b.type === 'advantages')

// 优势配置
export const advantagesConfig = {
  title: advantagesBlock?.config?.title || '为什么选择贝瑞医疗',
  subtitle: advantagesBlock?.config?.subtitle || '核心技术壁垒 · 深度行业积淀',
  highlights: advantagesBlock?.config?.highlights || [],
  badge: advantagesBlock?.config?.badge || '全流程许可证办理支持'
}

// 优势数据 - 从 blocks.json 的 advantages 区块提取
export const advantages: AdvantageItem[] = (advantagesBlock?.config?.items || []).map((item: any) => ({
  value: item.value,
  label: item.label,
  description: item.description || item.label
}))
