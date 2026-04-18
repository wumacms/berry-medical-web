<template>
  <!-- ========== 页脚 ========== -->
  <footer class="bg-stone-900 dark:bg-stone-950 text-stone-300 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-6 md:px-10">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
              <!-- 品牌Logo 与 简介 -->
              <div>
                  <img 
                    :src="getImageUrl('/images/logos/logo.png')" 
                    alt="贝瑞医疗" 
                    class="h-10 w-auto mb-4"
                  >
                  <p class="text-sm text-stone-400 leading-relaxed">{{ footer.description }}</p>
              </div>
              <!-- 公司地址 -->
              <div>
                  <h4 class="text-white font-semibold mb-4">公司地址</h4>
                  <address class="not-italic text-sm text-stone-400 leading-relaxed">
                      {{ contact.address.street }}<br>
                      邮编：{{ contact.address.postalCode }}
                  </address>
              </div>
              <!-- 联系方式 -->
              <div>
                  <h4 class="text-white font-semibold mb-4">联系方式</h4>
                  <ul class="space-y-2 text-sm text-stone-400">
                      <li><i class="fas fa-phone-alt w-5 text-orange-500"></i> 电话：{{ contact.phone.join(' 或 ') }}</li>
                      <li><i class="fas fa-envelope w-5 text-orange-500"></i> 邮箱：{{ contact.email }}</li>
                      <li><i class="fas fa-globe w-5 text-orange-500"></i> 官网：{{ contact.website }}</li>
                  </ul>
              </div>
              <!-- 微信公众号二维码 -->
              <div>
                  <h4 class="text-white font-semibold mb-4">官方微信</h4>
                  <div class="flex gap-2 justify-center">
                      <div class="text-center">
                          <img :src="getImageUrl('/images/qrcode/gongzhonghao.jpg')" 
                               alt="微信公众号二维码" 
                               class="w-16 h-16 rounded-lg border border-stone-700 p-1 bg-white">
                          <p class="mt-1 text-xs text-stone-500">公众号</p>
                      </div>
                      <div class="text-center">
                          <img :src="getImageUrl('/images/qrcode/shipinhao.png')" 
                               alt="微信二维码" 
                               class="w-16 h-16 rounded-lg border border-stone-700 p-1 bg-white">
                          <p class="mt-1 text-xs text-stone-500">视频号</p>
                      </div>
                      <div class="text-center">
                          <img :src="getImageUrl('/images/qrcode/xiaochengxu.png')" 
                               alt="微信小程序二维码" 
                               class="w-16 h-16 rounded-lg border border-stone-700 p-1 bg-white">
                          <p class="mt-1 text-xs text-stone-500">小程序</p>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 底部备案信息 -->
          <div class="border-t border-stone-800 mt-12 pt-6 text-center text-xs text-stone-500">
              <p>© {{ new Date().getFullYear() }} {{ companyName }} 版权所有 | {{ icp }}</p>
          </div>
      </div>
  </footer>
</template>

<script setup lang="ts">
const { getImageUrl } = useCdnUrl()
const { footer, contact, companyName, icp } = useSiteConfig()
</script>
