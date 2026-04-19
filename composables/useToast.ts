/**
 * 全局 Toast 消息 Composable
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastState {
  visible: boolean
  title: string
  message: string
  type: ToastType
}

const toast = reactive<ToastState>({
  visible: false,
  title: '',
  message: '',
  type: 'info'
})

let timer: ReturnType<typeof setTimeout> | null = null

export function useToast() {
  // 显示 toast
  const showToast = (options: {
    title: string
    message?: string
    type?: ToastType
    duration?: number
  }) => {
    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer)
    }

    toast.title = options.title
    toast.message = options.message || ''
    toast.type = options.type || 'info'
    toast.visible = true

    // 自动关闭
    const duration = options.duration ?? 4000
    if (duration > 0) {
      timer = setTimeout(() => {
        hideToast()
      }, duration)
    }
  }

  // 隐藏 toast
  const hideToast = () => {
    toast.visible = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  // 快捷方法
  const success = (title: string, message?: string) => {
    showToast({ title, message, type: 'success' })
  }

  const error = (title: string, message?: string) => {
    showToast({ title, message, type: 'error' })
  }

  const warning = (title: string, message?: string) => {
    showToast({ title, message, type: 'warning' })
  }

  const info = (title: string, message?: string) => {
    showToast({ title, message, type: 'info' })
  }

  return {
    toast,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info
  }
}
