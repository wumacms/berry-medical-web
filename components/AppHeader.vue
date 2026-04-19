<template>
  <header
    class="border-b border-stone-200 dark:border-stone-700 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm sticky top-0 z-30 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
      <!-- Logo + 品牌名 -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <img 
          :src="getImageUrl('/images/logos/logo.png')" 
          alt="贝瑞医疗" 
          class="h-10 w-auto"
        >
      </NuxtLink>

      <!-- 桌面端导航 (含二级下拉) -->
      <nav class="hidden lg:flex items-center gap-7 text-stone-700 dark:text-stone-300 font-medium">
        <template v-for="item in menu" :key="item.path">
          <!-- 有子菜单的项 -->
          <div v-if="hasChildren(item)" class="relative group">
            <button class="flex items-center gap-1 hover:text-orange-600 dark:hover:text-orange-400 transition py-2">
              {{ item.name }}
              <i class="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform"></i>
            </button>
            <div
              class="absolute left-0 mt-2 w-56 bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
            >
              <div class="py-2">
                <NuxtLink 
                  v-for="child in item.children" 
                  :key="child.path"
                  :to="child.path" 
                  class="block px-5 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-orange-600 transition text-sm"
                >
                  {{ child.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <!-- 无子菜单的项 -->
          <div v-else class="relative group">
            <NuxtLink 
              :to="item.path" 
              class="hover:text-orange-600 dark:hover:text-orange-400 transition py-2 block"
              :class="{ 'text-orange-600 dark:text-orange-400': isActive(item.path) }"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </template>
      </nav>

      <!-- 右侧区域：深色模式切换 + 移动端菜单按钮 + 桌面端CTA -->
      <div class="flex items-center gap-3">
        <!-- 主题切换按钮 -->
        <button
          id="theme-toggle"
          aria-label="切换深色浅色模式"
          class="w-9 h-9 rounded-full inline-flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          @click="toggleTheme"
        >
          <i id="theme-toggle-sun" class="fas fa-sun hidden dark:block text-amber-500 text-lg"></i>
          <i id="theme-toggle-moon" class="fas fa-moon block dark:hidden text-lg"></i>
        </button>
        <!-- 移动端汉堡菜单按钮 -->
        <button
          id="mobile-menu-btn"
          class="lg:hidden w-9 h-9 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center justify-center"
          @click="toggleMobileMenu"
        >
          <i class="fas fa-bars text-xl"></i>
        </button>
        <!-- 桌面端CTA -->
        <NuxtLink
          :to="navConfig.ctaButton.link"
          class="hidden lg:inline-block bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition"
        >
          <i class="fas fa-calendar-check mr-1"></i> {{ navConfig.ctaButton.text }}
        </NuxtLink>
      </div>
    </div>

    <!-- 移动端滑动菜单 (折叠面板形式) -->
    <div
      id="mobile-menu"
      :class="[
        'lg:hidden bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-700 px-6 py-5 shadow-lg',
        { 'hidden': !isMobileMenuOpen }
      ]"
    >
      <div class="flex flex-col gap-4">
        <template v-for="item in menu" :key="item.path">
          <!-- 有子菜单的项 -->
          <details v-if="hasChildren(item)" class="group">
            <summary 
              class="flex justify-between items-center cursor-pointer list-none py-2 font-medium border-b border-stone-100 dark:border-stone-800 transition"
              :class="{
                'text-orange-600 dark:text-orange-400': isActive(item.path),
                'text-stone-800 dark:text-stone-200': !isActive(item.path)
              }"
            >
              {{ item.name }}
              <i class="fas fa-chevron-down group-open:rotate-180 transition"></i>
            </summary>
            <div class="pl-4 mt-2 flex flex-col gap-2 text-sm">
              <NuxtLink 
                v-for="child in item.children" 
                :key="child.path"
                :to="child.path" 
                class="py-1.5 transition"
                :class="{
                  'text-orange-600 dark:text-orange-400': isActive(child.path),
                  'text-stone-600 dark:text-stone-400 hover:text-orange-600': !isActive(child.path)
                }"
                @click="closeMobileMenu"
              >
                {{ child.name }}
              </NuxtLink>
            </div>
          </details>
          <!-- 无子菜单的项 -->
          <NuxtLink 
            v-else 
            :to="item.path" 
            class="py-2 font-medium border-b border-stone-100 dark:border-stone-800 transition" 
            :class="{ 
              'border-transparent': item === menu[menu.length - 1],
              'text-orange-600 dark:text-orange-400': isActive(item.path),
              'text-stone-800 dark:text-stone-200': !isActive(item.path)
            }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
        <div class="pt-3">
          <NuxtLink 
            :to="navConfig.ctaButton.link" 
            class="block text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full shadow transition" 
            @click="closeMobileMenu"
          >
            {{ navConfig.ctaButton.text }} <i class="fas fa-arrow-right ml-1"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()
const { menu, config: navConfig, isActive, hasChildren } = useNavigation()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleTheme = () => {
  if (import.meta.client) {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }
}

// 初始化主题
onMounted(() => {
  if (import.meta.client) {
    let stored = localStorage.getItem('theme')
    if (!stored) {
      stored = 'light'
      localStorage.setItem('theme', 'light')
    }
    const html = document.documentElement
    if (stored === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }
})
</script>
