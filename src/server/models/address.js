import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

export const addressSchema = defineMongooseModel({
  name: 'address',
  schema: {
    title: { type: 'string', },
    city: { type: 'string', },
    district: { type: 'string', },
    ward: { type: 'string', },
    lat: { type: 'number', },
    lng: { type: 'number', },
    streetLine1: { type: 'string' },
    streetLine2: { type: 'string' },
    updatedAt: { type: 'date' },
    createdAt: { type: 'date' },
    // quy hoach
    isPlanned: { type: 'boolean', default: false },
    ads: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ads'
    }],
    // loai vi tri
    locationTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'locationTypes'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }
  },
})