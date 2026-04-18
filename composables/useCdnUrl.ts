// CDN URL 配置
export function useCdnUrl() {
  const config = useRuntimeConfig()
  const cdnBaseUrl = config.public.cdnBaseUrl as string

  // 拼接完整路径
  const getImageUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${cdnBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`
  }

  return {
    cdnBaseUrl,
    getImageUrl
  }
}
