import { defineMongooseModel } from '#nuxt/mongoose'

export const locationTypeSchema = defineMongooseModel({
  name: 'location_type',
  schema: {
    name: 'string',
    slug: 'string'
  }
})