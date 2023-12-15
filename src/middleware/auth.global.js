import useUsersStore from '~/stores/users.store'
import { adminMenu } from '~/constant/layout/admin/leftMenu'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUsersStore()
  const { profile, isLoggedIn } = userStore
  let redirectUrl = '/';

  if(!isLoggedIn && to.name.startsWith('admin')) {
    const profileRole = profile.role
    const accepRoles = adminMenu.filter(x => x.name === to.name)?.[0].roles.includes(profileRole)

    if(!accepRoles) {
      redirectUrl = '/admin'
      return navigateTo(redirectUrl)
    }
    return navigateTo(redirectUrl)
  }

})