<template>
  <!-- 服务详情区块 - 通用组件 -->
  <section :id="id" :class="[bgClass, 'py-20 scroll-mt-20']">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <div :class="[isImageLeft ? 'grid lg:grid-cols-2 gap-12 items-center' : 'grid lg:grid-cols-2 gap-12 items-center']">
        <!-- 图片区 -->
        <div :class="[
          'rounded-2xl overflow-hidden shadow-xl',
          isImageLeft ? 'order-1' : 'order-1 lg:order-2'
        ]">
          <img 
            :src="getImageUrl(image ?? '')" 
            :alt="imageAlt || title" 
            class="w-full h-auto object-cover"
            loading="lazy"
          >
        </div>
        <!-- 内容区 -->
        <div :class="isImageLeft ? 'order-2' : 'order-2 lg:order-1'">
          <!-- 标签 -->
          <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <i v-if="icon" :class="['fas', icon]"></i> {{ badge }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{{ title }}</h2>
          <p class="text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
            {{ description }}
          </p>
          <div class="mt-6 space-y-3">
            <div v-for="(feature, idx) in features" :key="idx" class="flex items-start gap-3">
              <i :class="['fas', feature.icon, 'text-orange-500 mt-1']"></i>
              <span>{{ feature.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  text: string
}

interface ServiceData {
  id: string
  title: string
  badge: string
  description: string
  image?: string
  imageAlt?: string
  features: Feature[]
}

interface Props {
  service: ServiceData
  imagePosition?: 'left' | 'right'  // 图片位置，默认左侧
  bgStyle?: 'light' | 'white' | 'gradient'  // 背景样式
  icon?: string  // 可选的 FontAwesome 图标类名
}

const props = withDefaults(defineProps<Props>(), {
  imagePosition: 'left',
  bgStyle: 'light',
})

// 从 service 对象中提取属性
const { id, title, badge, description, image, imageAlt, features } = toRefs(props.service)

const { getImageUrl } = useCdnUrl()

// 计算背景样式
const bgClass = computed(() => {
  switch (props.bgStyle) {
    case 'white':
      return 'bg-white dark:bg-stone-900'
    case 'gradient':
      return 'bg-gradient-to-r from-orange-50 to-stone-100 dark:from-stone-800 dark:to-stone-900'
    case 'light':
    default:
      return 'bg-stone-50 dark:bg-stone-800/30'
  }
})

const isImageLeft = computed(() => props.imagePosition === 'left')
</script>
