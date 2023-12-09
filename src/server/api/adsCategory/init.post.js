export default defineEventHandler(async (event) => {
  const data = [
    { name: "Cổ động chính trị", slug: "co-dong-chinh-tri" },
    { name: "Quảng cáo thương mại", slug: "quang-cao-thuong-mai" },
    { name: "Xã hội hoá", slug: "xa-hoi-hoa" }
  ]
  try {
    for (const item of data) {
      await new adsCategorySchema(item).save()
    }
    return {
      message: 'init ads types Data success'
    }
  }
  catch (error) {
    return error
  }
})