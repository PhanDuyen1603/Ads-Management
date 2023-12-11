export default defineEventHandler(async (event) => {
  try {
    const data = await userSchema.find({})
    if(!data && data.length) {
      createError({ statusCode: 204, statusMessage: 'No content.' })
    }
    return { statusCode: 200, statusMessage: 'Get success', data }
  }
  catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
  }
})