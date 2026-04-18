import {
  advantages,
  type AdvantageItem
} from '~/data/advantages'

// 优势数据 composable
export function useAdvantages() {
  // 获取优势数据列表
  const advantageList = computed(() => advantages)

  return {
    advantageList
  }
}
