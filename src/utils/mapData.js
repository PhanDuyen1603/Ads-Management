export const mapAdsLocation = (value) => ({
  ...value.address,
  position: {
    lat: value.address.lat,
    lng: value.address.long
  },
  ...value,
})