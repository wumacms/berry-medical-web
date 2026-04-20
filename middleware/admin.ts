export default defineNuxtRouteMiddleware(async (to, from) => {
  // 仅对 /admin 路径生效
  if (!to.path.startsWith('/admin')) {
    return
  }

  const { isAuthenticated, initialize, user } = useAuth()

  // 登录页允许所有人访问
  if (to.path === '/admin/login') {
    // 客户端初始化认证状态
    if (import.meta.client) {
      await initialize()
    }
    
    // 如果已经登录，跳转到仪表盘
    if (isAuthenticated.value) {
      return navigateTo('/admin')
    }
    return
  }

  // 其他 /admin/* 路由需要登录（仅在客户端检查）
  if (!import.meta.client) {
    // 服务端渲染时重定向到登录页
    return navigateTo('/admin/login')
  }

  // 客户端初始化
  await initialize()

  // 检查是否已登录
  if (!isAuthenticated.value) {
    return navigateTo('/admin/login')
  }

  // 检查用户是否激活
  if (user.value && user.value.is_active === false) {
    const { logout } = useAuth()
    await logout()
    return navigateTo('/admin/login?reason=inactive')
  }
})
