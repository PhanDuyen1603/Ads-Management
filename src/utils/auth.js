import { ROLES } from '~/constant/user'

export const roleMenuCondition = (roles = [], userRole) => {
  if(roles.includes(ROLES.GENERAL)) return true
  if(userRole === ROLES.SUPER_ADMIN) return true
  return roles.includes(userRole)
}