/**
 * 联系人表单提交 Composable
 * 处理表单验证和 Supabase 数据提交
 */
import { ref, reactive } from 'vue'
import { createClient } from '@supabase/supabase-js'

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

  // 创建 Supabase 客户端
  const supabase = createClient(
    'https://ksfefrrvqvksrglprbyu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZmVmcnJ2cXZrc3JnbHByYnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MTE5MDYsImV4cCI6MjA5MjA4NzkwNn0.lq8QpAviDT7seWhicwtmsglYWv5dSTqq_grEZ1eRNig'
  )

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
      // 直接使用 Supabase 客户端插入数据
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          company: formData.company.trim() || null,
          message: formData.message.trim() || null
        }])

      if (error) {
        console.error('Supabase error:', error)
        state.isError = true
        state.errorMessage = '提交失败，请稍后重试'
        return false
      }

      state.isSuccess = true
      // 清空表单
      resetForm()
      return true
    } catch (error: any) {
      console.error('Submit error:', error)
      state.isError = true
      state.errorMessage = error?.message || '提交失败，请稍后重试'
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
