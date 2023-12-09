export default defineEventHandler(async (event) => {
  const data = [
    { name: "Trụ bảng hiflex", slug: "tru-bang-hiflex" },
    { name: "Trụ màn hình điện tử LED", slug: "tru-man-hinh-dien-tu-led" },
    { name: "Trụ hộp đèn", slug: "tru-hop-den" },
    { name: "Bảng hiflex ốp tường", slug: "bang-hiflex-op-tuong" },
    { name: "Màn hình điện tử ốp tường", slug: "man-hinh-dien-tu-op-tuong" },
    { name: "Trụ treo băng rôn dọc", slug: "tru-treo-bang-ron-doc" },
    { name: "Trụ treo băng rôn ngang", slug: "tru-treo-bang-ron-ngang" },
    { name: "Trụ/Cụm pano", slug: "tru-cum-pano" },
    { name: "Cổng chào", slug: "cong-chao" },
    { name: "Trung tâm thương mại", slug: "trung-tam-thuong-mai" }
  ]
  try {
    // return await new addressSchema(body).save()
    for (const item of data) {
      await new billboardTypeSchema(item).save()
    }
    return {
      message: 'init billboard types Data success'
    }
  }
  catch (error) {
    return error
  }
})