//@ts-ignore
// import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  try {
    const { email = '', password = '' } = await readBody(event)
    if (!email || !password) {
      return createError({ statusCode: 401, statusMessage: 'Email or password cannot be empty' })
    }
    const user = await userSchema.findOne({ email: sanitize(email) }).select('+password')
    if (!user) {
      return createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }
    if (!user.verified) {
      return createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    const isPasswordCorrect = await compareStrings(password, user.password)
    if (!isPasswordCorrect) {
      return createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }
    return 200
  }
  catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
  }
})