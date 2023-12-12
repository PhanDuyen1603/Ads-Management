import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

export const requestEditSchema = defineMongooseModel({
  name: 'rq_edit_ad',
  schema: {
    content: {
      type: 'string',
      required: true
    },
    reason: {
      type: 'string',
      required: true
    },
    // tình trạng: đã xử lý, chưa xử lý, chờ xử lý
    status: { type: 'number', enum: [0, 1, 2, 3, 4] },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      requried: true,
    },
    adsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ads",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    updatedAt: { type: 'date' },
    createdAt: { type: 'date' }
  }
})