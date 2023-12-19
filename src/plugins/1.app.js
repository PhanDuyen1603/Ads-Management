
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()

  const $api = $fetch.create({
    baseURL: config.public.baseURL
  })

  return {
    provide: {
      apiFetch: $api
    }
  }
})