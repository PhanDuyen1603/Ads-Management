import mongoose from "mongoose"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if(!body.addressId) return false
    body.address = new mongoose.Types.ObjectId(body.address);
    body.adsCategory = new mongoose.Types.ObjectId(body.adsCategory);
    const newAds = await new adsSchema(body).save()

    if(!newAds && newAds._id) {
      createError({ statusCode: 500, statusMessage: 'Create ad fail.' })
    }

    await addressSchema.findOneAndUpdate(
      { _id: newAds.addressId },
      { $push: { ads: newAds._id } },
      { new: true, useFindAndModify: false }
    )

    return { statusCode: 200, statusMessage: 'Get success', data: newAds }
  }
  catch (error) {
    console.log({ error })
  }
})