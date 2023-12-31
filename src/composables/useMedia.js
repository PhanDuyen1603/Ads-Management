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

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getRandomLocationImage = () => {
    return `/images/locations/${randomInteger(1, 22)}.jpeg`
  }

  return {
    getFileUrl,
    getRandomLocationImage
  }
}