<template>
  <!-- ========== 联系区块 ========== -->
  <section id="contact" class="py-20 bg-stone-50 dark:bg-stone-800/40 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <!-- 标题区 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">
          {{ contactInfo.title || '联系我们' }}
        </h2>
        <p class="text-stone-600 dark:text-stone-400 mt-3 max-w-2xl mx-auto">
          {{ contactInfo.description || '立即沟通，获取核医学场所建设一站式解决方案' }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- 左侧：联系信息 -->
        <div class="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">联系方式</h3>
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-phone-alt text-orange-600 text-lg"></i>
              </div>
              <div>
                <p class="font-medium text-stone-800 dark:text-stone-100">联系电话</p>
                <div class="mt-1 space-y-1">
                  <a 
                    v-for="phone in contactInfo.contact.phone" 
                    :key="phone"
                    :href="`tel:${phone}`"
                    class="block text-stone-600 dark:text-stone-400 hover:text-orange-600 transition"
                  >
                    {{ phone }}
                  </a>
                </div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-envelope text-orange-600 text-lg"></i>
              </div>
              <div>
                <p class="font-medium text-stone-800 dark:text-stone-100">电子邮箱</p>
                <a 
                  :href="`mailto:${contactInfo.contact.email}`"
                  class="text-stone-600 dark:text-stone-400 hover:text-orange-600 transition"
                >
                  {{ contactInfo.contact.email }}
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-globe text-orange-600 text-lg"></i>
              </div>
              <div>
                <p class="font-medium text-stone-800 dark:text-stone-100">官方网站</p>
                <span class="text-stone-600 dark:text-stone-400">{{ contactInfo.contact.website }}</span>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-map-marker-alt text-orange-600 text-lg"></i>
              </div>
              <div>
                <p class="font-medium text-stone-800 dark:text-stone-100">公司地址</p>
                <p class="text-stone-600 dark:text-stone-400">
                  {{ contactInfo.contact.address.province }}{{ contactInfo.contact.address.city }}{{ contactInfo.contact.address.street }}
                </p>
              </div>
            </div>
          </div>

          <!-- 快捷操作按钮 -->
          <div class="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700">
            <div class="flex flex-wrap gap-3">
              <a 
                :href="`tel:${contactInfo.contact.phone[0]}`" 
                class="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-full shadow transition flex items-center gap-2"
              >
                <i class="fas fa-phone"></i> 一键致电
              </a>
              <a 
                :href="`mailto:${contactInfo.contact.email}`" 
                class="border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 font-medium px-5 py-2.5 rounded-full transition flex items-center gap-2"
              >
                <i class="fas fa-envelope"></i> 发送邮件
              </a>
            </div>
          </div>
        </div>

        <!-- 右侧：留言表单 -->
        <div class="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">在线留言</h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- 姓名 -->
            <div>
              <label for="name" class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                姓名 <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="请输入您的姓名"
                @input="clearFieldError('name')"
                class="w-full px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-stone-100 dark:disabled:bg-stone-800"
                :class="fieldErrors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 placeholder-stone-400'"
                :disabled="state.isSubmitting"
              />
              <p v-if="fieldErrors.name" class="mt-1 text-sm text-red-600">{{ fieldErrors.name }}</p>
            </div>

            <!-- 手机号 -->
            <div>
              <label for="phone" class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                手机号 <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                placeholder="请输入您的手机号码"
                @input="clearFieldError('phone')"
                class="w-full px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-stone-100 dark:disabled:bg-stone-800"
                :class="fieldErrors.phone ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 placeholder-stone-400'"
                :disabled="state.isSubmitting"
              />
              <p v-if="fieldErrors.phone" class="mt-1 text-sm text-red-600">{{ fieldErrors.phone }}</p>
            </div>

            <!-- 邮箱 -->
            <div>
              <label for="email" class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                邮箱
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="请输入您的邮箱地址（选填）"
                class="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                :disabled="state.isSubmitting"
              />
            </div>

            <!-- 公司 -->
            <div>
              <label for="company" class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                公司名称
              </label>
              <input
                id="company"
                v-model="formData.company"
                type="text"
                placeholder="请输入您的公司名称（选填）"
                class="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                :disabled="state.isSubmitting"
              />
            </div>

            <!-- 留言 -->
            <div>
              <label for="message" class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                留言内容
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                placeholder="请输入您想咨询的内容（选填）"
                class="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                :disabled="state.isSubmitting"
              ></textarea>
            </div>

            <!-- 提交按钮 -->
            <button
              type="submit"
              :disabled="state.isSubmitting"
              class="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold px-6 py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <span v-if="state.isSubmitting">
                <i class="fas fa-spinner fa-spin"></i> 提交中...
              </span>
              <span v-else>
                <i class="fas fa-paper-plane"></i> 提交留言
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { contactInfo } = useSiteConfig()
const { formData, state, fieldErrors, clearFieldError, submitForm } = useContactForm()
const { success, error: showError } = useToast()

// 处理表单提交
const handleSubmit = async () => {
  const result = await submitForm()

  if (result) {
    success('提交成功', '我们已收到您的留言，会尽快与您联系')
  } else if (state.isError) {
    showError('提交失败', state.errorMessage || '请稍后重试')
  }
}
</script>
