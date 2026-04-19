/**
 * 联系人表单提交 Composable
 * 处理表单验证和 Supabase 数据提交
 */
import { ref, reactive } from 'vue'

// 表单数据类型
export interface ContactFormData {
  name: string
  phone: string
  email: string
  company: string
  message: string
}

// 表单状态
export interface ContactFormState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

// 字段错误类型
export interface FieldErrors {
  name: string
  phone: string
}

// 验证规则
function isValidPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

function isValidEmail(value: string): boolean {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// 使用 Supabase 提交表单
export function useContactForm() {
  const formData = reactive<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  })

  const state = reactive<ContactFormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  })

  const fieldErrors = reactive<FieldErrors>({
    name: '',
    phone: ''
  })

  // 清除字段错误
  const clearFieldError = (field: 'name' | 'phone') => {
    fieldErrors[field] = ''
  }

  // 验证表单，返回字段错误
  const validate = (): boolean => {
    let isValid = true

    // 验证姓名
    if (!formData.name.trim()) {
      fieldErrors.name = '请输入您的姓名'
      isValid = false
    } else {
      fieldErrors.name = ''
    }

    // 验证手机号
    if (!formData.phone.trim()) {
      fieldErrors.phone = '请输入您的手机号码'
      isValid = false
    } else if (!isValidPhone(formData.phone)) {
      fieldErrors.phone = '手机号格式不正确'
      isValid = false
    } else {
      fieldErrors.phone = ''
    }

    return isValid
  }

  // 重置表单
  const resetForm = () => {
    formData.name = ''
    formData.phone = ''
    formData.email = ''
    formData.company = ''
    formData.message = ''
    fieldErrors.name = ''
    fieldErrors.phone = ''
  }

  // 提交表单
  const submitForm = async (): Promise<boolean> => {
    // 清除之前的提示
    state.isSuccess = false
    state.isError = false
    state.errorMessage = ''

    // 验证表单
    if (!validate()) {
      return false
    }

    state.isSubmitting = true

    try {
      const config = useRuntimeConfig()
      const baseURL = config.app.baseURL || '/'
      const response = await $fetch(`${baseURL}api/contact`, {
        method: 'POST',
        body: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          company: formData.company.trim() || null,
          message: formData.message.trim() || null
        }
      })

      state.isSuccess = true
      // 清空表单
      resetForm()
      return true
    } catch (error: any) {
      state.isError = true
      state.errorMessage = error?.data?.message || '提交失败，请稍后重试'
      return false
    } finally {
      state.isSubmitting = false
    }
  }

  return {
    formData,
    state,
    fieldErrors,
    clearFieldError,
    validate,
    submitForm,
    resetForm
  }
}
