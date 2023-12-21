import useAuthStore from "~/stores/auth.store"

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const headers = {}

  if(window.localStorage.getItem('access-token')) {
    authStore.setAccessToken(window.localStorage.getItem('access-token'))
  }

  if(authStore.accessToken) {
    headers.Authorization = 'Bearer ' + authStore.accessToken
  }

  const $api = $fetch.create({
    baseURL: config.public.baseURL,
    headers
  })

  return {
    provide: {
      apiFetch: $api
    }
  }
})