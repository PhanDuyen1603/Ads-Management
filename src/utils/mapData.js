import getName from "./getter/getName"
export const mapAdsLocation = (value, reportList = []) => {
  const adLocationReport = reportList.length
    ? reportList.filter(x => { return x.adsLocation?._id === value._id && (!x.report.status || x.report.status === 0)})
    : []
  return {
    ...value.address,
    addressId: value.address._id,
    position: {
      lat: value.address.lat,
      lng: value.address.long
    },
    adLocationReport,
    id: value._id,
    ...value,
  }
}

export const mapAdsLocationDetail = (value) => ({
  ...value.address,
  position: {
    lat: value.address.lat,
    lng: value.address.long
  },
  ...value,
  ward: getName(value, 'address_ward'),
  district: getName(value, 'address_district'),
  address: value.address._id,
  locationType: value.locationType._id,
  adsCategory: value.adsCategory._id,
})

export const dataMapAdsWithLocation = (adsLocations, ads = [], reports = []) => {
  const reportIds = reports.map(x => x.ads?._id) || []
  ads = reportIds.length && ads.length ? ads.map(x => ({ ...x, reportsCount: reportIds.includes(x._id) ? 1 : 0 })) : ads
  return adsLocations.map(x => {
   return {
     ...x,
     ads: ads.filter(i => i.adsLocation?._id === x._id)
   }
  })
 }