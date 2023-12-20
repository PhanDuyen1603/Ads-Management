export const mapAdsLocation = (value) => ({
  ...value.address,
  addressId: value.address._id,
  position: {
    lat: value.address.lat,
    lng: value.address.long
  },
  ...value,
})

export const mapAdsLocationDetail = (value) => ({
  ...value.address,
  position: {
    lat: value.address.lat,
    lng: value.address.long
  },
  ...value,
  address: value.address._id,
  locationType: value.locationType._id,
  adsCategory: value.adsCategory._id,
})