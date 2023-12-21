export const tableField = {
  fullName: 'Họ và tên',
  username: 'Tên người dùng',
  email: 'Email',
  phone: 'Số điện thoại',
  dob: 'Ngày sinh',
  role: 'Quyền',
  ward: 'Phường',
  district: 'Quận',
  // verified: 'Xác thực',
}

export const ROLES = {
  SUPER_ADMIN: 'canbo_so',
  ADMIN_LV_1: 'canbo_quan',
  ADMIN_LV_2: 'canbo_phuong',
  // ADMIN_LV_3: 'admin_lv_3',
  // GENERAL: 'general'
}

export const ROLE_LABEL = {
  SUPER_ADMIN: 'cán bộ sở',
  ADMIN_LV_1: 'cán bộ quận',
  ADMIN_LV_2: 'cán bộ phường',
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

export const permissions = {
  [ROLES.SUPER_ADMIN]: {
    "description": "Phân hệ cán bộ sở",
    "permissions": {
      "*": true,        // Wildcard for all permissions
      // accept 3 type city ward and district
      "data": "city",
      "users": {
        "create": true,
        "read": true,
        "update": true,
        "delete": true,
        // request: for creating request or report form
        "request": false
      },
      "advertise": {
        "create": true,
        "read": true,
        "update": true,
        "delete": true,
        "request": false
      },
      "address": {
        "create": true,
        "read": true,
        "update": true,
        "delete": true,
        "request": false
      },
    },
    "layout": {
      "advertise": {
        "create_form": true,
      }
    }
  },
  [ROLES.ADMIN_LV_1]: {
    "description": "Phân hệ cán bộ quận",
    "data": "district",
    "permissions": {
      "users": {},
      "advertise": {
        "request": true
      },
      "address": {
        "request": true
      },
    }
  },
  [ROLES.ADMIN_LV_2]: {
    "description": "Phân hệ cán bộ phường",
    "data": "ward",
    "permissions": {
      "users": {},
      "advertise": {
        "request": true
      },
      "address": {
        "request": true
      },
    }
  },
  // [ROLES.ADMIN_LV_3]: {
  //   "description": "Phân hệ người dân",
  //   "permissions": {
  //     "users": {},
  //     "advertise": {
  //       "request": true
  //     },
  //     "address": {
  //       "request": true
  //     },
  //   }
  // }
}