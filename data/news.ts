import type { NewsItem } from '~/types/news'

// 首页展示的最新新闻
export const latestNewsData: NewsItem[] = [
  {
    id: '1',
    title: '贝瑞医疗助力全国核医学学术年会，共话精准诊疗新基建',
    excerpt: '公司携瑞核V1.0系统及全流程辐射防护方案亮相年会，获得多家三甲医院高度关注。',
    date: '2025.03.20',
    category: '行业峰会',
    image: '/images/news/cover-1.jpg',
    views: 1245
  },
  {
    id: '2',
    title: '新型Lu-177标记药物研发支持：贝瑞提供GMP级热室解决方案',
    excerpt: '公司为多家药企定制放射性药物合成热室，助力创新核药快速临床转化。',
    date: '2025.02.10',
    category: '技术突破',
    image: '/images/news/cover-2.jpg',
    views: 876
  },
  {
    id: '3',
    title: '瑞核V1.2版本发布，新增辐射剂量数字孪生预演模块',
    excerpt: '实现核医学科辐射防护动态模拟与人员路径优化，安全效能双提升。',
    date: '2025.01.15',
    category: '智慧升级',
    image: '/images/news/cover-3.jpg',
    views: 1023
  }
]

// 所有新闻数据（可扩展为从 API 获取）
export const allNewsData: NewsItem[] = [
  ...latestNewsData,
  {
    id: '4',
    title: '贝瑞医疗与多家三甲医院签署战略合作协议',
    excerpt: '公司先后与北京协和医院、上海华山医院等签署核医学场所建设战略合作协议。',
    date: '2024.12.20',
    category: '公司要闻',
    image: '/images/news/cover-2.jpg',
    views: 956
  },
  {
    id: '5',
    title: '核医学科新建标准发布，贝瑞医疗参与编制',
    excerpt: '公司受邀参与《核医学科建设与管理规范》的编制工作，贡献专业力量。',
    date: '2024.11.15',
    category: '行业政策',
    image: '/images/news/cover-3.jpg',
    views: 723
  }
]

// 新闻分类
export const newsCategories = [
  '全部',
  '公司要闻',
  '技术突破',
  '行业政策',
  '行业峰会',
  '展会活动'
] as const
