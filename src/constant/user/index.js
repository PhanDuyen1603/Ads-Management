export const tableField = {
  // username: 'Tên người dùng',
  dateOfBirth: 'Ngày sinh',
  email: 'Email',
  phone: 'Số điện thoại',
  role: 'Quyền',
  ward: 'Phường',
  district: 'Quận',
  verified: 'Xác thực',
}

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN_LV_1: 'admin_lv_1',
  ADMIN_LV_2: 'admin_lv_2',
  GENERAL: 'general'
}

export const exampleData = [
  {
    email: 'admin@gmail.com',
    password: '1234',
    role: ROLES.SUPER_ADMIN
  },
  {
    email: 'admin2@gmail.com',
    password: '1234',
    role: ROLES.ADMIN_LV_1
  },
  {
    email: 'admin3@gmail.com',
    password: '1234',
    role: ROLES.ADMIN_LV_2
  },
  {
    email: 'test@gmail.com',
    password: '1234',
    role: ROLES.GENERAL
  },
]
