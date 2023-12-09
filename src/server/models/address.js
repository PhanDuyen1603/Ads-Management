import { defineMongooseModel } from '#nuxt/mongoose'

export const addressSchema = defineMongooseModel({
  name: 'address',
  schema: {
    city: {
      type: 'string',
    },
    district: {
      type: 'string',
    },
    lat: {
      type: 'number',
    },
    lng: {
      type: 'number',
    },
    streetLine1: {
      type: 'string'
    },
    streetLine2: {
      type: 'string'
    },
  },
})