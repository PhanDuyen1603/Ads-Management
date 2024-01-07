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
  }
})
