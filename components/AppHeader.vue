<template>
  <header
    class="border-b border-stone-200 dark:border-stone-700 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm sticky top-0 z-30 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
      <!-- Logo + 品牌名 -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-sm"
        >
          <i class="fas fa-biohazard text-xl"></i>
        </div>
        <div>
          <span class="font-bold text-xl tracking-tight text-stone-800 dark:text-stone-100">
            <span class="text-orange-600 dark:text-orange-400">贝瑞医疗</span>
          </span>
          <p class="text-[11px] leading-tight text-stone-500 dark:text-stone-400 hidden sm:block">
            核医学场所建设一站式服务商
          </p>
        </div>
      </NuxtLink>

      <!-- 桌面端导航 (含二级下拉) -->
      <nav class="hidden lg:flex items-center gap-7 text-stone-700 dark:text-stone-300 font-medium">
        <div class="relative group">
          <NuxtLink to="/" class="hover:text-orange-600 dark:hover:text-orange-400 transition py-2 block">
            首页
          </NuxtLink>
        </div>
        <div class="relative group">
          <button class="flex items-center gap-1 hover:text-orange-600 dark:hover:text-orange-400 transition py-2">
            服务内容
            <i class="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform"></i>
          </button>
          <div
            class="absolute left-0 mt-2 w-64 bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
          >
            <div class="py-2">
              <NuxtLink to="/#service-design" class="block px-5 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-orange-600 transition text-sm">
                <i class="fas fa-pencil-ruler w-5 mr-2 text-orange-500"></i> 设计 · 规划布局
              </NuxtLink>
              <NuxtLink to="/#service-construction" class="block px-5 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-orange-600 transition text-sm">
                <i class="fas fa-hard-hat w-5 mr-2 text-orange-500"></i> 施工 · 辐射防护
              </NuxtLink>
              <NuxtLink to="/#service-equipment" class="block px-5 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-orange-600 transition text-sm">
                <i class="fas fa-microscope w-5 mr-2 text-orange-500"></i> 设备 · 监测仪器
              </NuxtLink>
              <NuxtLink to="/#service-software" class="block px-5 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-orange-600 transition text-sm">
                <i class="fas fa-chart-line w-5 mr-2 text-orange-500"></i> 瑞核V1.0智慧系统
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="relative group">
          <NuxtLink to="/#advantages" class="hover:text-orange-600 dark:hover:text-orange-400 transition py-2 block">
            专业优势
          </NuxtLink>
        </div>
        <div class="relative group">
          <NuxtLink to="/#projects" class="hover:text-orange-600 dark:hover:text-orange-400 transition py-2 block">
            业绩案例
          </NuxtLink>
        </div>
        <div class="relative group">
          <NuxtLink to="/news" class="hover:text-orange-600 dark:hover:text-orange-400 transition py-2 block">
            新闻资讯
          </NuxtLink>
        </div>
        <div class="relative group">
          <NuxtLink to="/#contact" class="hover:text-orange-600 dark:hover:text-orange-400 transition py-2 block">
            联系我们
          </NuxtLink>
        </div>
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
          to="/#contact"
          class="hidden lg:inline-block bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition"
        >
          <i class="fas fa-calendar-check mr-1"></i> 免费咨询
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
        <NuxtLink to="/" class="py-2 text-stone-800 dark:text-stone-200 font-medium border-b border-stone-100 dark:border-stone-800" @click="closeMobileMenu">
          首页
        </NuxtLink>
        <details class="group">
          <summary class="flex justify-between items-center cursor-pointer list-none py-2 text-stone-800 dark:text-stone-200 font-medium">
            服务内容
            <i class="fas fa-chevron-down group-open:rotate-180 transition"></i>
          </summary>
          <div class="pl-4 mt-2 flex flex-col gap-2 text-stone-600 dark:text-stone-400 text-sm">
            <NuxtLink to="/#service-design" class="py-1.5 hover:text-orange-600 transition" @click="closeMobileMenu">
              <i class="fas fa-pencil-ruler w-5 mr-2"></i> 设计篇
            </NuxtLink>
            <NuxtLink to="/#service-construction" class="py-1.5 hover:text-orange-600 transition" @click="closeMobileMenu">
              <i class="fas fa-hard-hat w-5 mr-2"></i> 施工篇
            </NuxtLink>
            <NuxtLink to="/#service-equipment" class="py-1.5 hover:text-orange-600 transition" @click="closeMobileMenu">
              <i class="fas fa-microscope w-5 mr-2"></i> 设备篇
            </NuxtLink>
            <NuxtLink to="/#service-software" class="py-1.5 hover:text-orange-600 transition" @click="closeMobileMenu">
              <i class="fas fa-microchip w-5 mr-2"></i> 瑞核系统
            </NuxtLink>
          </div>
        </details>
        <NuxtLink to="/#advantages" class="py-2 text-stone-800 dark:text-stone-200 font-medium border-b border-stone-100 dark:border-stone-800" @click="closeMobileMenu">
          专业优势
        </NuxtLink>
        <NuxtLink to="/#projects" class="py-2 text-stone-800 dark:text-stone-200 font-medium border-b border-stone-100 dark:border-stone-800" @click="closeMobileMenu">
          业绩案例
        </NuxtLink>
        <NuxtLink to="/news" class="py-2 text-stone-800 dark:text-stone-200 font-medium border-b border-stone-100 dark:border-stone-800" @click="closeMobileMenu">
          新闻资讯
        </NuxtLink>
        <NuxtLink to="/#contact" class="py-2 text-stone-800 dark:text-stone-200 font-medium" @click="closeMobileMenu">
          联系我们
        </NuxtLink>
        <div class="pt-3">
          <NuxtLink to="/#contact" class="block text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full shadow transition" @click="closeMobileMenu">
            获取方案 <i class="fas fa-arrow-right ml-1"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
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
