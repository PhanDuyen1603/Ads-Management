import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

export const userSchema = defineMongooseModel({
  name: 'user',
  schema: {
    username: 'string',
    email: {
      type: 'string',
      required: true,
      validate: {
        validator: function (value) {
            return /^\S+@\S+\.\S+$/.test(value)
        },
        message: 'Invalid email.'
      },
      index: {
        unique: true
      }
    },
    phone: {
      type: 'string',
      required: true
    },
    password: { type: 'string' },
    verified: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_roles",
      requried: true,
    },
    dateOfBirth: { type: 'date' },
    updatedAt: { type: 'date' },
    createdAt: { type: 'date' }
  }
})