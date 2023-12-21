import useAuthStore from '~/stores/auth.store'
import { adminMenu } from '~/constant/layout/admin/leftMenu'

export default defineNuxtRouteMiddleware((to) => {
  const $store = useAuthStore()
  const { profile, isLoggedIn } = $store
  let redirectUrl = '/';

  if(!isLoggedIn && to.name.startsWith('admin')) {
    if(!profile) return navigateTo(redirectUrl)
    const profileRole = profile?.role
    const accepRoles = adminMenu.filter(x => x.name === to.name)?.[0].roles.includes(profileRole)

    if(!accepRoles) {
      redirectUrl = '/admin'
      return navigateTo(redirectUrl)
    }
    return navigateTo(redirectUrl)
  }

})