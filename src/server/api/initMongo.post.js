import {addresses, roles} from '../utils/mockData'

export default defineEventHandler(async (event) => {
  const result = {
    roles: '',
    addressMessage: ''
  }
  try {
    // init roles
    for (const item of roles) {
      await new userRoleSchema(item).save()
    }
    result.roles = 'init roles success'
    const adminRole = await userRoleSchema.findOne({ slug: 'so' })

    // init admin account
    const admin = {
      username: 'admin',
      email: 'admin@gmail.com',
      phone: '+84123456789',
      password: '1234',
      roleId: adminRole._id
    }
    await new userSchema(admin).save()

    // init addressees
    for (const item of addresses) {
      await new addressSchema(item).save()
    }
    result.addressMessage = 'init address Data success'
    return result
  }
  catch (error) {
    return {
      ...result,
      error,
    }
  }
})