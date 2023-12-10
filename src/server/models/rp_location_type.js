import { defineMongooseModel } from '#nuxt/mongoose'

const rqLocationTypes = [
  { name: "Tố giác sai phạm", slug: "to-giac-sai-pham" },
  { name: "Đăng ký nội dung", slug: "dang-ky-noi-dung" },
  { name: "Đóng góp ý kiến", slug: "dong-gop-y-kien" },
  { name: "Giải đáp thắc mắc", slug: "giai-dap-thac-mac" }
];

export const reportLocationTypeSchema = defineMongooseModel({
  name: 'rp_location_type',
  schema: {
    name: 'string',
    slug: 'string'
  }
})