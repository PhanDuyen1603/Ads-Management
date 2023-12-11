import queryAdDetail from "~/server/utils/query/queryAdDetail"
import mongoose from "mongoose"

export default defineEventHandler(async (event) => {
  try {
    // const body = await readBody(event)
    const id = new mongoose.Types.ObjectId(event.context.params?._id);
    return await adsSchema.aggregate(queryAdDetail(id))
    // return await adsSchema.findOne({ _id: id })
  }
  catch (error) {
    return error
  }
})