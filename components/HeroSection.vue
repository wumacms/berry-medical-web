<template>
  <!-- ========== 1. 首屏Hero区块 + 背景大图 ========== -->
  <section id="home" class="relative bg-cover bg-center bg-no-repeat" style="background-image: url('/images/news/cover-1.jpg'); background-size: cover;">
    <!-- 深色遮罩层，确保文字可读 -->
    <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
    <div class="relative max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36 flex flex-col lg:flex-row items-center gap-12 z-10">
      <div class="flex-1 text-center lg:text-left text-white">
        <div class="inline-flex items-center gap-2 bg-orange-600/90 dark:bg-orange-700/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 text-white">
          <i class="fas fa-flask"></i> 精准医疗 · 核创未来
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
          专注核医学场所<br>一站式服务商
        </h1>
        <p class="text-lg text-stone-100 mt-6 max-w-2xl drop-shadow">
          从选址规划、辐射防护施工到智慧管理系统，贝瑞医疗为全国顶级医疗机构提供全产业链闭环解决方案，助力精准诊疗时代。
        </p>
        <div class="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
          <NuxtLink to="/#service-design" class="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-md transition">
            <i class="fas fa-chalkboard-user mr-2"></i> 探索服务
          </NuxtLink>
          <NuxtLink to="/#contact" class="border-2 border-white text-white hover:bg-white/20 font-medium px-8 py-3.5 rounded-full transition">
            <i class="fas fa-phone-alt mr-2"></i> 联系专家
          </NuxtLink>
        </div>
        <div class="flex flex-wrap gap-6 justify-center lg:justify-start mt-10 text-sm text-stone-100">
          <span><i class="fas fa-check-circle text-orange-300 mr-1"></i> 15+年专业团队</span>
          <span><i class="fas fa-check-circle text-orange-300 mr-1"></i> 30+成功案例</span>
          <span><i class="fas fa-check-circle text-orange-300 mr-1"></i> 全流程GMP合规</span>
        </div>
      </div>
      <div class="flex-1 hidden lg:block"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero Section Component
</script>
