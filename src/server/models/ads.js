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
    adsCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'adsCategories'
    },
    locationTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'locationTypes'
    },
    billboardTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'billboardTypes'
    },
    title: { type: 'string' },
    content: { type: 'string' },
    width: { type: 'number' },
    height: { type: 'number' },
    quantity: { type: 'number', default: 1 },
    isPlanned: { type: 'boolean', default: false },
    images: { type: ['string'] },
    start_date: { type: 'date' },
    end_date: { type: 'date' },
  },
})