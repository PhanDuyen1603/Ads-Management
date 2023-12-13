import { generateLocations } from '~/utils/generateLocation'
import { generateReportList } from '~/utils/generateAdReports'
import { defaultLocation } from '~/constant/locations'
import random_coordinates_district_1 from '~/constant/random_coordinates_district_1.json'
import { defineStore } from 'pinia'
import { addressesApi } from '~/services/api'

const getIds = (arr) => arr.map(x => x.id)

export default defineStore({
  id: 'map-store',
  state:() => ({
    adLocations: [],
    adReports: [],
    addresses: [],
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