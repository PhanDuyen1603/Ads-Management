import queryAdsList from "~/server/utils/query/queryAdsList"

export default defineEventHandler(async (event) => {
  try {
    const query = queryAdsList(event.context.params)
    return await adsSchema.aggregate(query)
  }
  catch (error) {
    return error
  }
})