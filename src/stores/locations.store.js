import { defineStore } from 'pinia'

export default defineStore({
  id: 'location-store',
  state:() => ({
    locations: [],
    locationsTypes: [],

    target: {},
    targetAds: [],
  }),
  actions: {
    async setDetailTarget(target) {
      try {
        this.target = target
        const ids = target.ads
        const res = ids && ids.length ? await $fetch('/api/advertise', {
          params: {
            ids: target.ads?.join(', '),
          }
        }) : {}
        this.targetAds = res
      } catch (error) {
        console.log(error)
      }
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
    }))
  }
})