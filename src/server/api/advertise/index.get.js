import queryAdsList from "~/server/utils/query/queryAdsList"

export default defineEventHandler(async (event) => {
  try {
    return await adsSchema.aggregate(queryAdsList)
  }
  catch (error) {
    return error
  }
})