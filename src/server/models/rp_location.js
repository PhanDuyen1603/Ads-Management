import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

export const reportLocationSchema = defineMongooseModel({
  name: 'rp_location',
  schema: {
    name: {
      type: 'string',
      requried: true,
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
      requried: true,
    },
    content: {
      type: 'string',
      requried: true,
    },
    images: {
      type: ['string'],
    },
    // tình trạng: đã xử lý, chưa xử lý, chờ xử lý
    /**
     * 0: Còn trống,
     * 1: Đang hoạt động,
     * 2: Chờ cấp phép,
     * 3: Ẩn,
     * 4: Đã xoá (không còn sài chỗ này nữa)}
     */
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
    updatedAt: { type: 'date' },
    createdAt: { type: 'date' }
  }
})