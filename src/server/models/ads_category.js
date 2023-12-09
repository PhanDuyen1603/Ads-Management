import { defineMongooseModel } from '#nuxt/mongoose'

export const adsCategorySchema = defineMongooseModel({
  name: 'ads_category',
  schema: {
    name: 'string',
    slug: 'string'
  }
})