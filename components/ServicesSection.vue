<template>
  <!-- ========== 3. 服务内容大区块 (设计篇+施工篇+设备篇) ========== -->
  <section class="py-20 bg-stone-50 dark:bg-stone-800/30 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-orange-600 font-semibold text-sm uppercase tracking-wider">
          <i class="fas fa-cubes"></i> {{ services.subtitle }}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mt-2">
          {{ services.title }}
        </h2>
      </div>
      <div class="grid md:grid-cols-3 gap-8 mt-16">
        <div
          v-for="service in overviewList"
          :key="service.id"
          class="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition"
        >
          <i :class="['fas', service.icon, 'text-3xl text-orange-500 mb-4']"></i>
          <h3 class="text-2xl font-semibold text-stone-800 dark:text-stone-200">{{ service.title }}</h3>
          <p v-if="service.subtitle" class="text-stone-500 dark:text-stone-400 mt-2 text-sm">
            {{ service.subtitle }}
          </p>
          <p class="text-stone-500 dark:text-stone-400 mt-2 text-sm">
            {{ service.description }}
          </p>
          <ul class="mt-4 space-y-2 text-sm text-stone-600 dark:text-stone-400">
            <li v-for="(feature, idx) in service.features" :key="idx">
              <i :class="['fas', feature.icon || 'fa-check-circle', 'text-orange-500 w-4 mr-2']"></i> {{ feature.text || feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { overviewList } = useServices()
const { services } = useSiteConfig()
</script>
