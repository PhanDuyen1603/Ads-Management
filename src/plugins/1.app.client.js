import useAuthStore from "~/stores/auth.store"
import parseCookie from "~/utils/cookie/parseCookie"

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const cookies = parseCookie(document.cookie)
  const headers = {}

  // TODO: remove late
  if(cookies.user) {
    authStore.setProfile(JSON.parse(cookies.user))
    authStore.setIsLogin(true)
  }

  if(cookies.token) {
    authStore.setAccessToken(cookies.token)
  }

  if(unref(authStore).accessToken) {
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