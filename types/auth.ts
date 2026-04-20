// 用户类型
export interface AdminUser {
  id: string
  email: string
  name?: string
  role: string
  is_active: boolean
  last_login_at?: string
}

// 登录参数
export interface LoginParams {
  email: string
  password: string
}

// 登录结果
export interface AuthResult {
  user: AdminUser | null
  session: any
  error: Error | null
}
