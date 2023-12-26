import useAuthStore from "~/stores/auth.store";
import { permissions } from '~/constant/user'
import parseCookie from '~/utils/cookie/parseCookie'

export default function useAuth() {
  const { $apiFetch } = useNuxtApp()
  const $store = useAuthStore()

  /**
   * @desc login
   */
  const signIn = async ({ username, password}) => {
    try {
      const response = await $apiFetch("/auth/login", {
        method: "POST",
        headers: {
          "client-platform": "browser",
        },
        body: { username, password },
      });
      if(response.success) {
        $store.setAccessToken(response.data.accessToken)
        $store.setProfile(response.data.staff)
        $store.isLoggedIn = true
      }
      return {...response, isLoggedIn: $store.isLoggedIn};
    } catch (error) {
      console.log('POST: /login', error)
      return { isLoggedIn:false }
    }
  }

  /**
   * @desc set profile from cookie to stoe
   */
  const getMe = () => {
    const cookies = parseCookie(document.cookie)
    const user = JSON.parse(cookies.user || {})
    $store.setProfile(user)
  }

  const signOut = () => {
    $store.clearAccessToken()
    $store.clearProfile()
  }

  const profile = computed(() => $store.profile)
  const isLoggedIn = computed(() => $store.isLoggedIn)
  const role = computed(() => $store.profile?.role)
  const userPermission = computed(() => permissions[$store.profile?.role]?.permissions || permissions.general.permissions)

  return {
    signIn,
    signOut,
    getMe,
    profile,
    isLoggedIn,
    role,
    userPermission
  }
}