import useAuthStore from "~/stores/auth.store"
import parseCookie from "~/utils/cookie/parseCookie"
import setCookie from "~/utils/cookie/setCookie"
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const cookies = parseCookie(document.cookie)
  const headers = {}
  let clientId = null

  // TODO: remove late
  if(cookies.user) {
    authStore.setProfile(JSON.parse(cookies.user))
    authStore.setIsLogin(true)
  }

  if(cookies.token) {
    authStore.setAccessToken(cookies.token)
  }

  // client ID
  if(cookies.clientId) {
    authStore.clientId = cookies.clientId
    clientId = cookies.clientId
  } else {
    const id = uuidv4()
    setCookie('clientId', id)
    clientId = id
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
      apiFetch: $api,
      clientId
    }
  }
})