export default function useMedia() {
  const config = useRuntimeConfig()
  const fileHost = config.public.baseURL

  const getFileUrl = (url) => {
    if (!url || typeof url !== 'string') return
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${fileHost}${url}`;
    if (url.startsWith('./')) return `${fileHost}${url.replace('./', '/')}`

    return `${fileHost}/${url}`
  }

  return {
    getFileUrl
  }
}