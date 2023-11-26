import { generateLocations } from '~/utils/generateLocation'
import { defaultLocation } from '~/constant/locations'
import random_coordinates_district_1 from '~/constant/random_coordinates_district_1.json'
import { defineStore } from 'pinia'

export default defineStore({
  id: 'map-store',
  state:() => ({
    adLocations: []
  }),
  actions: {
    initLocations() {
      this.adLocations = generateLocations([defaultLocation, ...random_coordinates_district_1])
    },
  }
})