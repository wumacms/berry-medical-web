import {
  advantages,
  highlights,
  certifications,
  type AdvantageItem,
  type HighlightItem
} from '~/data/advantages'

// 优势数据 composable
export function useAdvantages() {
  // 获取优势数据列表
  const advantageList = computed(() => advantages)

  // 获取亮点数据
  const highlightList = computed(() => highlights)

  // 获取资质认证
  const certificationList = computed(() => certifications)

  return {
    advantageList,
    highlightList,
    certificationList
  }
}
