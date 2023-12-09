export default defineEventHandler(async (event) => {
  try {
    return await billboardTypeSchema.find({})
  }
  catch (error) {
    return error
  }
})