import useAuthStore from "~/stores/auth.store";
import { permissions } from '~/constant/user'

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

  const signOut = () => {
    $store.clearAccessToken()
    $store.clearProfile()
  }

  const profile = computed(() => $store.profile)
  const isLoggedIn = computed(() => $store.isLoggedIn)
  const role = computed(() => $store.profile?.role)
  const userPermission = computed(() => permissions[$store.profile?.role]?.permissions)

  return {
    signIn,
    signOut,
    profile,
    isLoggedIn,
    role,
    userPermission
  }
}