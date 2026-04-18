<template>
  <!-- ========== 页脚 ========== -->
  <footer class="bg-stone-900 dark:bg-stone-950 text-stone-300 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-6 md:px-10">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
              <!-- 品牌Logo 与 简介 -->
              <div>
                  <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          贝
                      </div>
                      <span class="text-white text-lg font-semibold">贝瑞医疗科技</span>
                  </div>
                  <p class="mt-4 text-sm text-stone-400 leading-relaxed">专注核医学场所建设一站式服务，从设计、施工到智慧管理系统，赋能精准医疗，守护医患安全。</p>
              </div>
              <!-- 公司地址 -->
              <div>
                  <h4 class="text-white font-semibold mb-4">公司地址</h4>
                  <address class="not-italic text-sm text-stone-400 leading-relaxed">
                      郑州市高新技术产业开发区瑞达路睿达广场1栋14层<br>
                      邮编：450001
                  </address>
              </div>
              <!-- 联系方式 -->
              <div>
                  <h4 class="text-white font-semibold mb-4">联系方式</h4>
                  <ul class="space-y-2 text-sm text-stone-400">
                      <li><i class="fas fa-phone-alt w-5 text-orange-500"></i> 电话：18503878846 / 13215991477</li>
                      <li><i class="fas fa-envelope w-5 text-orange-500"></i> 邮箱：530051528@qq.com</li>
                      <li><i class="fas fa-globe w-5 text-orange-500"></i> 官网：www.berrymedical.com.cn</li>
                  </ul>
              </div>
              <!-- 微信公众号二维码 -->
              <div>
                  <h4 class="text-white font-semibold mb-4">官方微信</h4>
                  <div class="flex gap-2 justify-center">
                      <div class="text-center">
                          <img src="/images/qrcode/gongzhonghao.png" 
                               alt="微信公众号二维码" 
                               class="w-16 h-16 rounded-lg border border-stone-700">
                          <p class="mt-1 text-xs text-stone-500">公众号</p>
                      </div>
                      <div class="text-center">
                          <img src="/images/qrcode/shipinhao.png" 
                               alt="微信视频号二维码" 
                               class="w-16 h-16 rounded-lg border border-stone-700">
                          <p class="mt-1 text-xs text-stone-500">视频号</p>
                      </div>
                      <div class="text-center">
                          <img src="/images/qrcode/xiaochengxu.png" 
                               alt="微信小程序二维码" 
                               class="w-16 h-16 rounded-lg border border-stone-700">
                          <p class="mt-1 text-xs text-stone-500">小程序</p>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 底部备案信息 -->
          <div class="border-t border-stone-800 mt-12 pt-6 text-center text-xs text-stone-500">
              <p>© 2025 贝瑞医疗科技（郑州）有限公司 版权所有 | 豫ICP备2025123456号</p>
          </div>
      </div>
  </footer>
</template>
