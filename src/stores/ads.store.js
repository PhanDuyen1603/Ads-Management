import { defineStore } from 'pinia'

export default defineStore({
  id: 'ads-store',
  state:() => ({
    locations: [],
    categories: [],
    locationTypes: [],
    billboardTypes: []
  }),
  actions: {
    // get
    async getLocations() {
      try {
        const res = await $fetch('/api/address')
        if(res.length) {
          this.locations = res
        }
      } catch (error) {
        console.log({
          error
        })
      }
    },
    async getCategories() {
      try {
        const res = await $fetch('/api/adsCategory')
        if(res.length) {
          this.categories = res
        }
      } catch (error) {
        console.log({
          error
        })
      }
    },
    async getLocationTypes() {
      try {
        const res = await $fetch('/api/locationType')
        if(res.length) {
          this.locationTypes = res
        }
      } catch (error) {
        console.log({
          error
        })
      }
    },
    async getBillboardTypes() {
      try {
        const res = await $fetch('/api/billboard')
        if(res.length) {
          this.billboardTypes = res
        }
      } catch (error) {
        console.log({
          error
        })
      }
    },

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
    adsLocations:(state) => {
      return state.locations.length ? state.locations.map(x => ({
        label: x.streetLine1,
        value: x._id
      })) : []
    },
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
  }
})
