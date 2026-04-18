<template>
  <!-- ========= 3. 设备篇 · 左图右文区块 ========= -->
  <section id="service-equipment" class="py-20 bg-stone-50 dark:bg-stone-800/30 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- 左侧图片区 -->
        <div class="rounded-2xl overflow-hidden shadow-xl order-1">
          <img 
            src="/images/services/equipment.jpg" 
            alt="核医学监测与防护设备" 
            class="w-full h-auto object-cover"
            loading="lazy"
          >
        </div>
        <!-- 右侧内容区 -->
        <div class="order-2">
          <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <i class="fas fa-microscope"></i> 尖端设备 · 智慧监测
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">核素治疗及辐射监测仪器</h2>
          <p class="text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
            提供从放射性药物操作、分装到患者治疗监测、环境辐射安全的完整设备链，助力核医学科高效合规运行。
          </p>
          <div class="mt-6 space-y-3">
            <div class="flex items-start gap-3">
              <i class="fas fa-syringe text-orange-500 mt-1"></i>
              <span>I-131体内活度测量系统 / 全身动态辐射显像（Clairvoyant2）</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-radiation text-orange-500 mt-1"></i>
              <span>RadTarge个人剂量仪、RadWal环境辐射监测仪、便携式巡测仪</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-cube text-orange-500 mt-1"></i>
              <span>防护手套箱、合成热室、分装热室、一体化注射防护台</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-flask text-orange-500 mt-1"></i>
              <span>CRC-55tR活度计 / 全自动脚踏式放射性废物箱 / 转运防护罐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Service Equipment Detail Section
</script>
