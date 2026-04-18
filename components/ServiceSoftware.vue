<template>
  <!-- 瑞核V1.0 智慧管理系统单独高亮区（配图） -->
  <section id="service-software" class="py-16 bg-gradient-to-r from-orange-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-12 items-center">
      <div class="flex-1">
        <div class="bg-orange-100 dark:bg-orange-900/30 inline-block px-4 py-1 rounded-full text-orange-700 dark:text-orange-300 text-sm font-medium">
          <i class="fas fa-microchip mr-1"></i> 数字孪生 · 智慧中枢
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mt-4">瑞核V1.0 核医学智慧管理系统</h2>
        <p class="text-stone-600 dark:text-stone-400 mt-4 text-lg">
          1中心+2平台+4维度+N应用，实现设备运行、辐射安全、安防、日常运营全维度管理。物理空间1:1虚拟映射，数据驱动主动预判。
        </p>
        <ul class="mt-6 space-y-3">
          <li class="flex items-center gap-2">
            <i class="fas fa-chart-simple text-orange-500"></i>
            <span>实时辐射监测预警 & 智能决策辅助</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fas fa-database text-orange-500"></i>
            <span>设备生命周期管理与预测维护</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fas fa-shield-alt text-orange-500"></i>
            <span>符合核医学质控及监管上报标准</span>
          </li>
        </ul>
      </div>
      <div class="flex-1 rounded-2xl overflow-hidden shadow-xl">
        <img 
          :src="getImageUrl('/images/services/software.jpg')" 
          alt="智慧管理系统界面" 
          class="w-full h-auto object-cover"
          loading="lazy"
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()
</script>
