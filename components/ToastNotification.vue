<template>
  <Teleport to="body">
    <Transition name="toast">
      <div 
        v-if="visible"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] max-w-md w-full px-4"
      >
        <div 
          class="rounded-xl shadow-2xl p-4 flex items-start gap-3"
          :class="toastStyles"
        >
          <i :class="[iconClass, 'text-xl mt-0.5']"></i>
          <div class="flex-1 min-w-0">
            <p class="font-medium">{{ title }}</p>
            <p v-if="message" class="text-sm mt-0.5 opacity-90">{{ message }}</p>
          </div>
          <button 
            @click="close"
            class="text-current opacity-60 hover:opacity-100 transition-opacity"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toast, hideToast } = useToast()

const visible = computed(() => toast.visible)
const title = computed(() => toast.title)
const message = computed(() => toast.message)
const type = computed(() => toast.type)

const toastStyles = computed(() => {
  switch (type.value) {
    case 'success':
      return 'bg-green-600 text-white'
    case 'error':
      return 'bg-red-600 text-white'
    case 'warning':
      return 'bg-yellow-500 text-white'
    default:
      return 'bg-stone-700 text-white'
  }
})

const iconClass = computed(() => {
  switch (type.value) {
    case 'success':
      return 'fas fa-check-circle'
    case 'error':
      return 'fas fa-exclamation-circle'
    case 'warning':
      return 'fas fa-exclamation-triangle'
    default:
      return 'fas fa-info-circle'
  }
})

const close = () => {
  hideToast()
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
