import { ROLES } from '~/constant/user/index'

export const adminMenu = [
  {
    title: 'Tổng quan',
    name: 'admin',
    icon: 'mdi mdi-earth',
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_LV_1, ROLES.ADMIN_LV_2]
  },
  {
    title: 'Profile',
    name: 'admin-profile',
    icon: 'mdi mdi-account-check',
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_LV_1, ROLES.ADMIN_LV_2]
  },
  {
    title: 'Danh sách quảng cáo/ điểm đặt quảng cáo',
    name: 'admin-ad',
    icon: 'mdi mdi-table',
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_LV_1, ROLES.ADMIN_LV_2]
  },
  {
    title: 'Danh sách báo cáo',
    name: 'admin-report',
    icon: 'mdi mdi-table',
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_LV_1, ROLES.ADMIN_LV_2]
  },
  {
    title: 'Danh sách cty cấp phép',
    name: 'admin-companny',
    icon: 'mdi mdi-table',
    roles: [ROLES.SUPER_ADMIN]
  },
  {
    title: 'Danh sách người dùng',
    name: 'admin-users',
    icon: 'mdi mdi-table',
    roles: [ROLES.SUPER_ADMIN]
  },
  {
    title: 'Phường/ Quận',
    name: 'admin-location',
    icon: 'mdi mdi-map-marker',
    roles: [ROLES.SUPER_ADMIN]
  },
]