<template>
  <!-- ========= 1. 设计篇 · 左图右文区块 ========= -->
  <section id="service-design" class="py-20 bg-stone-50 dark:bg-stone-800/30 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- 左侧图片区 -->
        <div class="rounded-2xl overflow-hidden shadow-xl order-1">
          <img 
            src="/images/services/design.jpg" 
            alt="核医学设计规划与布局" 
            class="w-full h-auto object-cover"
            loading="lazy"
          >
        </div>
        <!-- 右侧内容区 -->
        <div class="order-2">
          <!-- 标签 -->
          <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <i class="fas fa-pencil-ruler"></i> 精准设计 · 合规先行
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">全流程核医学专项设计</h2>
          <p class="text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
            从选址评估到施工图落地，贝瑞设计团队严格遵循药品GMP、GBZ系列及放射性药品附录，为客户提供功能优化与成本可控的专项设计。
          </p>
          <div class="mt-6 space-y-3">
            <div class="flex items-start gap-3">
              <i class="fas fa-check-circle text-orange-500 mt-1"></i>
              <span>辐射控制区/监督区精细化分区，保障医患安全</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-check-circle text-orange-500 mt-1"></i>
              <span>独立通风系统设计，气流自非放射区→控制区，排气高效过滤</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-check-circle text-orange-500 mt-1"></i>
              <span>衰变池、防护屏蔽、制药区域C级背景局部A级环境设计</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-check-circle text-orange-500 mt-1"></i>
              <span>药监GMP专家检查及环保、卫评验收一站式技术支持</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Service Design Detail Section
</script>
