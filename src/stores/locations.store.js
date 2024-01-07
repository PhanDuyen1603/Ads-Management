import { defineStore } from 'pinia'

export default defineStore({
  id: 'location-store',
  state:() => ({
    locations: [],
    locationsFilters: [],
    locationsTypes: [],

    target: {},
    targetAds: [],
  }),
  actions: {
    setDetailTarget(target) {
      this.target = target
    },
    getAdInfo(id, field) {
      const ad = this.locations.filter(x => x.id === id)
      return ad.length ? ad[0][field] : ''
    }
  },
  getters: {
    gMapAddress:(state) => state.locations.map(x => ({
      ...x,
      id: x._id,
      position: {
        lat: x.lat,
        lng: x.lng
      }
    })),
    mapMarkers:(state) => {
      const list = state.locationsFilters.length ? state.locationsFilters : state.locations
      return list
    }
  }
})