import { generateLocations } from '~/utils/generateLocation'
import { generateReportList } from '~/utils/generateAdReports'
import { defaultLocation } from '~/constant/locations'
import random_coordinates_district_1 from '~/constant/random_coordinates_district_1.json'
import { defineStore } from 'pinia'

const getIds = (arr) => arr.map(x => x.id)

export default defineStore({
  id: 'map-store',
  state:() => ({
    adLocations: [],
    adReports: []
  }),
  actions: {
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
  }
})