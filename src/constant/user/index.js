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
  ADMIN_LV_3: 'admin_lv_3',
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
  [ROLES.ADMIN_LV_3]: {
    "description": "Phân hệ người dân",
    "permissions": {
      "users": {},
      "advertise": {
        "request": true
      },
      "address": {
        "request": true
      },
    }
  }
}