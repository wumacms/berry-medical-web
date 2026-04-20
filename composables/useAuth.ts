import type { AdminUser, LoginParams, AuthResult } from '~/types/auth'

// 认证 composable
export function useAuth() {
  const user = useState<AdminUser | null>('admin-user', () => null)
  const isLoading = useState<boolean>('auth-loading', () => true)
  const isAuthenticated = computed(() => !!user.value)
  
  // 确保只初始化一次
  let isInitialized = false
  let authStateListenerRegistered = false

  // 初始化认证状态
  async function initialize() {
    // 避免重复初始化
    if (!import.meta.client || isInitialized) {
      if (isInitialized) {
        isLoading.value = false
      }
      return
    }
    
    isInitialized = true
    // 使用 @nuxtjs/supabase 模块的客户端，自动处理会话
    const supabase = useSupabaseClient()
    
    try {
      // 获取当前会话
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('获取会话失败:', error)
        isLoading.value = false
        return
      }

      if (session?.user) {
        // 获取用户资料
        await fetchUserProfile(session.user.id)
      } else {
        user.value = null
      }
    } catch (err) {
      console.error('初始化认证失败:', err)
    } finally {
      isLoading.value = false
    }

    // 只注册一次监听器
    if (!authStateListenerRegistered) {
      authStateListenerRegistered = true
      supabase.auth.onAuthStateChange(async (event, session) => {
        // 避免重复触发
        if (event === 'SIGNED_IN' && session?.user) {
          // 防止重复获取
          if (user.value?.id !== session.user.id) {
            await fetchUserProfile(session.user.id)
          }
        } else if (event === 'SIGNED_OUT') {
          user.value = null
        }
      })
    }
  }

  // 获取用户资料（带防重入）
  let isFetchingProfile = false
  async function fetchUserProfile(userId: string) {
    // 防止重复调用
    if (isFetchingProfile) return
    if (user.value?.id === userId) return
    
    isFetchingProfile = true
    // 使用 @nuxtjs/supabase 模块的客户端
    const supabase = useSupabaseClient()
    
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('获取用户资料失败:', error)
        // 如果没有 profile，使用 auth 用户信息
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          user.value = {
            id: authUser.id,
            email: authUser.email || '',
            role: 'admin',
            is_active: true
          }
        }
        return
      }

      user.value = data as AdminUser
    } catch (err) {
      console.error('获取用户资料异常:', err)
    } finally {
      isFetchingProfile = false
    }
  }

  // 登录
  async function login(params: LoginParams): Promise<AuthResult> {
    // 使用 @nuxtjs/supabase 模块的客户端
    const supabase = useSupabaseClient()
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password
      })

      if (error) {
        return { user: null, session: null, error }
      }

      // 更新最后登录时间
      if (data.user) {
        await supabase
          .from('admin_profiles')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', data.user.id)
      }

      return { user: user.value, session: data.session, error: null }
    } catch (err) {
      return { user: null, session: null, error: err as Error }
    }
  }

  // 登出
  async function logout() {
    const supabase = useSupabaseClient()
    await supabase.auth.signOut()
    user.value = null
    navigateTo('/admin/login')
  }

  // 注册（可选，仅限创建第一个管理员）
  async function register(params: LoginParams & { name: string }): Promise<AuthResult> {
    // 使用 @nuxtjs/supabase 模块的客户端
    const supabase = useSupabaseClient()
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password
      })

      if (error) {
        return { user: null, session: null, error }
      }

      // 创建用户资料
      if (data.user) {
        await supabase.from('admin_profiles').insert({
          id: data.user.id,
          email: params.email,
          name: params.name,
          role: 'admin',
          is_active: true
        })
      }

      return { user: user.value, session: data.session, error: null }
    } catch (err) {
      return { user: null, session: null, error: err as Error }
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    initialize,
    login,
    logout,
    register
  }
}
