import useAuthStore from "~/stores/auth.store";
import { permissions } from '~/constant/user'
import parseCookie from '~/utils/cookie/parseCookie'
import { useToast } from "vue-toastification";

export default function useAuth() {
  const { $apiFetch } = useNuxtApp()
  const $store = useAuthStore()
  const $route = useRoute()
  const toast = useToast()
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
      toast.success("Đăng nhập thành công", {
        timeout: 2000
      })
      return {...response, isLoggedIn: $store.isLoggedIn};
    } catch (error) {
      console.log('POST: /login', error)
      toast.error("Đăng nhập thất bại", {
        timeout: 2000
      })
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
  const queryByPermissionData = computed(() => {
    const profile = $store.profile
    if(!$route.name.startsWith('admin') || !profile) return {}
    const dataPermission = permissions[profile?.role]?.data
    let query = {
      data: dataPermission
    }
    if (dataPermission === 'ward') {
      query.wards = profile.assigned?.ward
      query.districts = profile.assigned?.district
    } if (dataPermission === 'district') {
      query.districts = profile.assigned?.district
    }
    return query
  })

  return {
    signIn,
    signOut,
    getMe,
    profile,
    isLoggedIn,
    role,
    userPermission,
    queryByPermissionData
  }
}