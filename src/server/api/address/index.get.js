export default defineEventHandler(async (event) => {
  try {
    return await addressSchema.find({})
  }
  catch (error) {
    return error
  }
})