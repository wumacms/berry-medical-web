// CDN URL 配置
export function useCdnUrl() {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || ''

  // 拼接完整路径，添加 baseURL 前缀
  const getImageUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path

    // 确保 baseURL 正确拼接
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${baseURL.replace(/\/$/, '')}${normalizedPath}`
  }

  return {
    cdnBaseUrl: baseURL,
    getImageUrl
  }
}
