import mongoose from "mongoose"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if(!body.addressId) return false
    body.address = new mongoose.Types.ObjectId(body.address);
    body.adsCategory = new mongoose.Types.ObjectId(body.adsCategory);

    return await new adsSchema(body).save()
  }
  catch (error) {
    console.log({ error })
  }
})