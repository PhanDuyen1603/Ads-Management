export default defineEventHandler(async (event) => {
  try {
    return await locationTypeSchema.find({})
  }
  catch (error) {
    return error
  }
})