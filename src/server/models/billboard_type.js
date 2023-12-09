import { defineMongooseModel } from '#nuxt/mongoose'

export const billboardTypeSchema = defineMongooseModel({
  name: 'billboard_type',
  schema: {
    name: 'string',
    slug: 'string'
  }
})