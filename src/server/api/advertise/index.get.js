export default defineEventHandler(async (event) => {
  try {
    return await adsSchema.aggregate([
      {$lookup:
        {
           from: "addresses",   // collection to join
           localField: "addressId",  //this field as refereence for category collection id
           foreignField: "_id",  //this field is category id to join product collecton on base one catId === _id;
           as: "address"    // output array field
        }
      },
      {
        $unwind: "$address" // If needed, unwind the array (optional)
      },
      {
        $project: {
        "_id": 1,
        "content": 1,
        "address._id": 1,
        "address.streetLine1": 1,
      }
    }
    ])
  }
  catch (error) {
    return error
  }
})