export default defineEventHandler(async (event) => {
  const data = [
    { name: "Đất công/Công viên/Hành lang an toàn giao thông", slug: "dat-cong-cong-vien-hanh-lang-an-toan-giao-thong" },
    { name: "Đất tư nhân/Nhà ở riêng lẻ", slug: "dat-tu-nhan-nha-o-rieng-le" },
    { name: "Trung tâm thương mại", slug: "trung-tam-thuong-mai" },
    { name: "Chợ", slug: "cho" },
    { name: "Cây xăng", slug: "cay-xang" },
    { name: "Nhà chờ xe buýt", slug: "nha-cho-xe-buyt" }
  ]
  try {
    // return await new addressSchema(body).save()
    for (const item of data) {
      await new locationTypeSchema(item).save()
    }
    return {
      message: 'init location types Data success'
    }
  }
  catch (error) {
    return error
  }
})