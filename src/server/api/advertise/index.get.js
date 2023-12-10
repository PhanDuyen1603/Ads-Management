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
        $lookup: {
          from: 'ads_categories',
          localField: 'adsCategoryId',
          foreignField: "_id",
          as: "adCategory"
        }
      },
      {
        $unwind: "$adCategory"
      },
      {
        $lookup: {
          from: 'billboard_types',
          localField: 'billboardTypeId',
          foreignField: "_id",
          as: "billboardType"
        }
      },
      {
        $unwind: "$billboardType"
      },
      {
        $project: {
          "_id": 1,
          "title": 1,
          "content": 1,
          "images": 1,
          "width": 1,
          "height": 1,
          "address": 1,
          "adCategory.name": 1,
          "billboardType.name": 1,
          // "address._id": 1,
          // "address.streetLine1": 1,
        }
      }
    ])
  }
  catch (error) {
    return error
  }
})