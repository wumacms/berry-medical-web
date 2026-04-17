<template>
  <div>
    <!-- 文章主体区块 -->
    <section class="relative bg-cover bg-center bg-no-repeat py-16 md:py-24" style="background-image: url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&auto=format');">
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/85 to-stone-900/70 dark:from-black dark:via-stone-950/90 dark:to-stone-900/80"></div>
      <div class="relative max-w-4xl mx-auto px-6 md:px-10 z-10 text-center">
        <!-- 新闻分类 -->
        <div class="inline-flex items-center gap-2 bg-orange-500/20 dark:bg-orange-500/25 backdrop-blur-sm text-orange-100 px-4 py-1.5 rounded-full text-sm font-medium mb-5 border border-orange-400/30">
          <i class="fas fa-microscope"></i> {{ article.category }}
        </div>
        <!-- 文章标题 -->
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg leading-tight">
          {{ article.title }}
        </h1>
        <!-- 发布日期 & 阅读时间 -->
        <div class="flex items-center justify-center gap-5 text-stone-300 text-sm mt-6">
          <span><i class="far fa-calendar-alt mr-1"></i> {{ article.date }}</span>
          <span><i class="far fa-clock mr-1"></i> 约 {{ article.readingTime }}</span>
          <span><i class="far fa-eye mr-1"></i> {{ article.views }} 次阅读</span>
        </div>
      </div>
    </section>

    <!-- 文章正文区域 -->
    <section class="py-12 md:py-16 bg-white dark:bg-stone-900">
      <div class="max-w-4xl mx-auto px-6 md:px-10">
        <!-- 正文内容 -->
        <article class="text-stone-700 dark:text-stone-300 leading-relaxed prose-custom">
          <p class="text-lg font-medium text-orange-700 dark:text-orange-400 border-l-4 border-orange-500 pl-4 italic mb-6">
            {{ article.excerpt }}
          </p>
          
          <div v-html="article.content"></div>
        </article>

        <!-- 文章底部标签分享 -->
        <div class="mt-10 pt-6 border-t border-stone-200 dark:border-stone-700 flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap gap-2">
            <span class="text-xs text-stone-500 dark:text-stone-400"><i class="fas fa-tags"></i> 关键词：</span>
            <span v-for="tag in article.tags" :key="tag" class="bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full text-xs text-stone-600 dark:text-stone-300">
              {{ tag }}
            </span>
          </div>
          <div class="flex gap-3">
            <span class="text-stone-400 text-sm cursor-pointer hover:text-orange-500"><i class="fab fa-weixin"></i></span>
            <span class="text-stone-400 text-sm cursor-pointer hover:text-orange-500"><i class="fab fa-weibo"></i></span>
            <span class="text-stone-400 text-sm cursor-pointer hover:text-orange-500" @click="copyLink"><i class="fas fa-link"></i></span>
          </div>
        </div>
      </div>
    </section>

    <!-- 上一篇 / 下一篇导航 -->
    <section class="py-12 bg-stone-50 dark:bg-stone-800/30 border-t border-stone-200 dark:border-stone-700">
      <div class="max-w-4xl mx-auto px-6 md:px-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 上一篇 -->
          <NuxtLink v-if="article.prevNews" :to="`/news/${article.prevNews.id}`" class="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-stone-800/80 shadow-sm hover:shadow-md transition border border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-600">
            <div class="text-orange-500 dark:text-orange-400 text-xl"><i class="fas fa-arrow-left"></i></div>
            <div class="flex-1">
              <p class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">上一篇</p>
              <h4 class="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition line-clamp-2">
                {{ article.prevNews.title }}
              </h4>
              <p class="text-xs text-stone-400 dark:text-stone-500 mt-1">{{ article.prevNews.date }}</p>
            </div>
          </NuxtLink>
          <!-- 下一篇 -->
          <NuxtLink v-if="article.nextNews" :to="`/news/${article.nextNews.id}`" class="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-stone-800/80 shadow-sm hover:shadow-md transition border border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-600 md:text-right">
            <div class="flex-1">
              <p class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">下一篇</p>
              <h4 class="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition line-clamp-2">
                {{ article.nextNews.title }}
              </h4>
              <p class="text-xs text-stone-400 dark:text-stone-500 mt-1">{{ article.nextNews.date }}</p>
            </div>
            <div class="text-orange-500 dark:text-orange-400 text-xl"><i class="fas fa-arrow-right"></i></div>
          </NuxtLink>
        </div>
        <!-- 返回列表按钮 -->
        <div class="text-center mt-10">
          <NuxtLink to="/news" class="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 text-sm transition">
            <i class="fas fa-list-ul"></i> 返回新闻列表
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types/news'

const route = useRoute()
const newsId = route.params.id as string

// 获取文章数据
const article = computed<NewsItem>(() => {
  const articles: Record<string, NewsItem> = {
    '1': {
      id: '1',
      title: '贝瑞医疗携瑞核V1.2亮相全国核医学年会，数字孪生成焦点',
      excerpt: '在2025年全国核医学学术年会上，贝瑞医疗展示了全新升级的瑞核智慧管理系统，通过数字孪生技术实现辐射防护预演，吸引数百位专家驻足交流。',
      date: '2025年4月18日',
      category: '公司要闻',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format',
      views: 1245,
      readingTime: '5 分钟',
      tags: ['全国核医学年会', '数字孪生', '瑞核V1.2', '智慧管理'],
      content: `
        <p>2025年全国核医学学术年会于4月15日至18日在上海国际会议中心成功举办。作为国内领先的核医学场所建设一站式服务商，贝瑞医疗携全新升级的瑞核V1.2智慧管理系统精彩亮相，引发业界广泛关注。</p>
        <h2>数字孪生技术引领行业创新</h2>
        <p>本次年会上，贝瑞医疗重点展示的瑞核V1.2系统采用先进的数字孪生技术，能够1:1还原核医学科物理空间，实现辐射防护动态模拟与人员路径优化。现场演示环节，数百位来自全国各地的核医学专家驻足交流，对系统的前瞻性功能给予高度评价。</p>
        <img src="https://images.unsplash.com/photo-1581093458791-9d1f3c1b6d6a?w=800&auto=format" alt="贝瑞医疗展位现场" class="rounded-xl shadow-md my-6 w-full">
        <p class="text-sm text-stone-500 dark:text-stone-400 text-center -mt-4 mb-6">贝瑞医疗年会展位现场</p>
        <h2>全流程解决方案获专家认可</h2>
        <p>除智慧管理系统外，贝瑞医疗还展示了从选址规划、辐射防护施工到设备供应的全产业链解决方案。多位三甲医院核医学科主任表示，贝瑞医疗的一站式服务模式极大地简化了项目建设流程，值得推广。</p>
        <p>贝瑞医疗将继续深耕核医学领域，以技术创新驱动行业发展，为更多医疗机构提供专业、高效、安全的核医学场所建设服务。</p>
      `,
      prevNews: {
        id: '6',
        title: '贝瑞医疗与芬兰核医学中心达成战略合作',
        date: '2025年2月20日'
      },
      nextNews: {
        id: '2',
        title: '助力核药创新：贝瑞为多家药企定制GMP级热室',
        date: '2025年4月10日'
      }
    },
    '2': {
      id: '2',
      title: '助力核药创新：贝瑞为多家药企定制GMP级热室，加速Lu-177临床转化',
      excerpt: '公司放射性药物设备事业部宣布，已为国内三家创新药企提供符合cGMP标准的热室及分装系统，推动靶向放射性核素治疗药物上市进程。',
      date: '2025年4月10日',
      category: '技术突破',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format',
      views: 876,
      readingTime: '4 分钟',
      tags: ['Lu-177', 'GMP热室', '放射性药物', '临床转化'],
      content: `
        <p>随着靶向放射性核素治疗（Theranostics）在国内快速发展，符合GMP标准的放射性药物制备设施需求日益增长。贝瑞医疗放射性药物设备事业部近日宣布，已成功为国内三家创新药企提供定制化的cGMP热室及分装系统。</p>
        <h2>定制化解决方案</h2>
        <p>针对不同药企的药物研发管线，贝瑞医疗技术团队提供了从设计咨询、设备选型到安装验证的全流程服务。系统涵盖合成热室、分装热室、通风净化及辐射监测等核心模块，完全满足FDA及NMPA的GMP要求。</p>
        <h2>加速Lu-177临床转化</h2>
        <p>特别值得一提的是，贝瑞医疗为多家药企定制的Lu-177标记药物制备系统已进入验证阶段，预计将于今年下半年投入临床使用。这将极大推动国产创新核药的上市进程，惠及更多肿瘤患者。</p>
      `,
      prevNews: {
        id: '1',
        title: '贝瑞医疗携瑞核V1.2亮相全国核医学年会',
        date: '2025年4月18日'
      },
      nextNews: {
        id: '3',
        title: '新版《核医学辐射防护标准》解读',
        date: '2025年3月28日'
      }
    },
    '3': {
      id: '3',
      title: '瑞核V1.2版本发布：新增辐射剂量数字孪生预演模块，重塑核医学科安全边界',
      excerpt: '贝瑞医疗自主研发的瑞核智慧管理系统迎来重大升级，通过数字孪生技术实现辐射防护动态模拟与人员路径优化，为核医学科安全效能带来双重提升。',
      date: '2025年1月15日',
      category: '技术突破',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format',
      views: 1023,
      readingTime: '6 分钟',
      tags: ['数字孪生', '辐射防护', '瑞核V1.2', '智慧管理'],
      content: `
        <p>贝瑞医疗自主研发的瑞核智慧管理系统迎来重大升级，通过数字孪生技术实现辐射防护动态模拟与人员路径优化，为核医学科安全效能带来双重提升。</p>
        <h2>数字孪生：让辐射防护"可见、可预演"</h2>
        <p>瑞核V1.2基于1:1物理空间建模，集成实时辐射监测数据与人员定位系统，可模拟不同操作流程下的辐射剂量分布。医院管理人员可在虚拟环境中预演药物分装、患者注射等场景，提前识别高风险区域并优化工作动线。</p>
        <h2>主动预判：从"事后报警"到"事前规避"</h2>
        <p>传统辐射监测多为阈值报警，而瑞核V1.2利用机器学习算法，基于历史数据和实时流量预测潜在超限风险。系统可提前15分钟发出预警，并自动联动通风、门禁等设备，将安全管控关口大幅前移。</p>
      `,
      prevNews: {
        id: '2',
        title: '助力核药创新：贝瑞为多家药企定制GMP级热室',
        date: '2025年4月10日'
      },
      nextNews: {
        id: '4',
        title: '瑞核V1.0荣获医疗信息化创新金奖',
        date: '2025年3月15日'
      }
    }
  }
  
  return articles[newsId] || articles['1']
})

// SEO 配置
useSeoMeta({
  title: `${article.value.title} | 贝瑞医疗`,
  description: article.value.excerpt,
  keywords: article.value.tags?.join(','),
  ogTitle: article.value.title,
  ogDescription: article.value.excerpt,
  ogType: 'article',
  articlePublishedTime: article.value.date,
  articleSection: article.value.category
})

// 结构化数据 - Article
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.value.title,
      description: article.value.excerpt,
      image: article.value.image,
      datePublished: article.value.date,
      author: {
        '@type': 'Organization',
        name: '贝瑞医疗科技'
      },
      publisher: {
        '@type': 'Organization',
        name: '贝瑞医疗科技',
        logo: {
          '@type': 'ImageObject',
          url: 'http://www.berrymedical.com.cn/favicon.svg'
        }
      }
    })
  }]
})

// 复制链接
const copyLink = async () => {
  if (import.meta.client) {
    await navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}
</script>

<style scoped>
.prose-custom {
  @apply [&>p]:mb-5 [&>p]:leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-stone-800 [&>h2]:dark:text-stone-100 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-5 [&>li]:mb-1;
}
.prose-custom :deep(img) {
  @apply rounded-xl shadow-md my-6 w-full;
}
</style>
