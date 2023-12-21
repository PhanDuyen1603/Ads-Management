import useAuthStore from "~/stores/auth.store";
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

  const profile = computed(() => $store.profile)
  const isLoggedIn = computed(() => $store.isLoggedIn)

  return {
    signIn,
    profile,
    isLoggedIn
  }
}