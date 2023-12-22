import useAuthStore from '~/stores/auth.store'
import { adminMenu } from '~/constant/layout/admin/leftMenu'
import parseCookie from '~/utils/cookie/parseCookie'

export default defineNuxtRouteMiddleware((to) => {
  const $store = useAuthStore()
  const { profile } = $store
  let redirectUrl = '/';

  if(process.client && to.name.startsWith('admin')) {
    const cookies = parseCookie(document.cookie)
    if(!cookies.token) return navigateTo(redirectUrl)
    // TODO: get user by token
    const profileRole = profile?.role
    const accepRoles = adminMenu.filter(x => x.name === to.name)?.[0].roles.includes(profileRole)
    if(!accepRoles) {
      redirectUrl = '/admin'
      return navigateTo(redirectUrl)
    }
  }
})