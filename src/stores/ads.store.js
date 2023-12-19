import { defineStore } from 'pinia'

export default defineStore({
  id: 'ads-store',
  state:() => ({
    ads: [],
    ads_locations: [],
    target: {},

    categories: [],
    locationTypes: [],
    billboardTypes: [],
  }),
  actions: {
    // create
    async createLocation(data) {
      try {
        const res = await $fetch('/api/address/create', {
          method: 'POST',
          body: data,
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json"
          }
        })
        console.log(res)
      } catch (error) {
        console.log({error})
      }
    },
    async createAds(data) {
      try {
        const res = await $fetch('/api/advertise/create', {
          method: 'POST',
          body: data,
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json"
          }
        })
        console.log(res)
      } catch (error) {
        console.log({error})
      }
    },
  },
  getters: {
    adsCategories:(state) => {
      return state.categories.length ? state.categories.map(x => ({
        label: x.name,
        value: x._id
      })) : []
    },
    adsLocationTypes:(state) => {
      return state.locationTypes.length ? state.locationTypes.map(x => ({
        label: x.name,
        value: x._id
      })) : []
    },
    adsBillboardTypes:(state) => {
      return state.billboardTypes.length ? state.billboardTypes.map(x => ({
        label: x.name,
        value: x._id
      })) : []
    },
    adsLocations:(state) => {
      return state.ads_locations.map(x => ({
        ...x.address,
        position: {
          lat: x.address.lat,
          lng: x.address.long
        },
        ...x,
      }))
    }
  }
})
