export default defineEventHandler(async (event) => {
  try {
    return await adsCategorySchema.find({})
  }
  catch (error) {
    return error
  }
})