import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

export const adsSchema = defineMongooseModel({
  name: 'ads',
  schema: {
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      requried: true,
    },
    // Hình thức quảng cáo
    adsCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'adsCategories'
    },
    // Loại bảng quảng cáo
    billboardTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'billboardTypes'
    },
    // ad content
    title: { type: 'string' },
    content: { type: 'string'},
    images: { type: ['string'] },

    // specifications
    width: { type: 'number' },
    height: { type: 'number' },
    quantity: { type: 'number', default: 1 },


    start_date: { type: 'date' },
    end_date: { type: 'date' },

    updatedAt: { type: 'date' },
    createdAt: { type: 'date' },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }
  },
})