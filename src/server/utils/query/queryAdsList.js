import mongoose from "mongoose"
const queryAdsList = (query) => {
  const commonQuery = [
    {
      $lookup: {
         from: "addresses",
         localField: "addressId",
         foreignField: "_id",
         as: "address"
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

        // id for updates
        "addressId": 1,
        "adsCategoryId": 1,
        "billboardTypeId": 1,
      }
    }
  ]
  if(query?.ids) {
    const listId = query.ids.split(', ')
      .map(x => new mongoose.Types.ObjectId(x))
    commonQuery.unshift({
      $match: { _id: { $in: listId }}
    })
  }
  if(query?.id) {
    commonQuery.unshift({ $match: { _id: query.id } },)
    commonQuery[commonQuery.length - 1] = {
      $project: {
        "_id": 1,
        "title": 1,
        "content": 1,
        "images": 1,
        "width": 1,
        "height": 1,
        "address": 1,
        "adCategory": 1,
        "billboardType": 1,
        // id for updates
        "addressId": 1,
        "adsCategoryId": 1,
        "billboardTypeId": 1,
      }
    }
  }

  return commonQuery
}

export default queryAdsList