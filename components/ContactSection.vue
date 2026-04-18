<template>
  <!-- ========== 7. 联系区块 ========== -->
  <section id="contact" class="py-20 bg-stone-50 dark:bg-stone-800/40 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
      <div class="rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
        <img 
          :src="getImageUrl('/images/about/team.jpg')" 
          alt="贝瑞医疗办公环境" 
          class="w-full h-auto object-cover"
          loading="lazy"
        >
      </div>
      <div class="order-1 md:order-2">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">联系贝瑞医疗专家团队</h2>
        <p class="text-stone-600 dark:text-stone-400 mt-3">立即沟通，获取核医学场所建设一站式解决方案。</p>
        <div class="mt-8 space-y-5">
          <div class="flex items-center gap-4">
            <i class="fas fa-phone-alt w-7 text-orange-500 text-xl"></i>
            <div>
              <p class="font-medium">联系电话</p>
              <p class="text-stone-700 dark:text-stone-300">{{ contact.phone.join(' &nbsp; ') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <i class="fas fa-envelope w-7 text-orange-500 text-xl"></i>
            <div>
              <p class="font-medium">电子邮箱</p>
              <p class="text-stone-700 dark:text-stone-300">{{ contact.email }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <i class="fas fa-globe w-7 text-orange-500 text-xl"></i>
            <div>
              <p class="font-medium">官方网站</p>
              <p class="text-stone-700 dark:text-stone-300">{{ contact.url || 'http://www.berrymedical.com.cn' }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <i class="fas fa-map-marker-alt w-7 text-orange-500 text-xl"></i>
            <div>
              <p class="font-medium">公司地址</p>
              <p class="text-stone-700 dark:text-stone-300">{{ contact.address.province }}{{ contact.address.city }}{{ contact.address.street }}</p>
            </div>
          </div>
        </div>
        <div class="mt-8 flex gap-4">
          <a href="tel:18503878846" class="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full shadow transition">
            <i class="fas fa-phone"></i> 一键致电
          </a>
          <a href="mailto:530051528@qq.com" class="border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium px-6 py-3 rounded-full transition">
            <i class="fas fa-envelope"></i> 发送邮件
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { contact } = useSiteConfig()
const { getImageUrl } = useCdnUrl()
</script>
