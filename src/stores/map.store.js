import { generateLocations } from '~/utils/generateLocation'
import { generateReportList } from '~/utils/generateAdReports'
import { defaultLocation } from '~/constant/location'
import random_coordinates_district_1 from '~/constant/location/random_coordinates_district_1.json'
import { defineStore } from 'pinia'

const getIds = (arr) => arr.map(x => x.id)

export default defineStore({
  id: 'map-store',
  state:() => ({
    adLocations: [],
    adReports: [],
    addresses: [],

    // target show on detail right menu
    target: {},
    targetAds: [],
  }),
  actions: {
    async getAddressesList() {
      try {
        const res = await $fetch('/api/address')
        this.addresses = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async setDetailTarget(target, ids) {
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
    // TODO: remove
    initLocations() {
      this.adLocations = generateLocations([defaultLocation, ...random_coordinates_district_1])
    },
    initAdReports() {
      const listLocationIds = getIds(this.adLocations)
      this.adReports = generateReportList(listLocationIds)
    },
    getAdInfo(id, field) {
      const ad = this.adLocations.filter(x => x.id === id)
      return ad.length ? ad[0][field] : ''
    }
  },
  getters: {
    gMapAddress:(state) => state.addresses.map(x => ({
      ...x,
      id: x._id,
      position: {
        lat: x.lat,
        lng: x.lng
      }
    }))
  }
})