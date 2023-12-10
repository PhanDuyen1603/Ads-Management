import { defineMongooseModel } from '#nuxt/mongoose'

// cán bộ Phường, cán bộ Quận, cán bộ Sở VH-TT
export const userRoleSchema = defineMongooseModel({
  name: 'user_role',
  schema: {
    name: 'string',
    slug: 'string',
  }
})