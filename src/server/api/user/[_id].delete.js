import mongoose from "mongoose"

export default defineEventHandler(async (event) => {
  try {
    const id = new mongoose.Types.ObjectId(event.context.params?._id);
    return await userSchema.findOneAndDelete({ _id: id })
  }
  catch (error) {
    return error
  }
})