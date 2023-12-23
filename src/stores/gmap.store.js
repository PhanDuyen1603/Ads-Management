import { ref, reactive, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia'
import { defaultLocation } from '~/constant/location';
import useLocationsStore from '~/stores/locations.store'

const useGmapStore = defineStore('api-store', () => {
  const locationStore = useLocationsStore()
  const { gMapAddress: markers } = storeToRefs(locationStore)
  const initCenter = reactive({})

  const changeMapCenter = (location = {}) => {
    if (location && location.lat) initCenter.lat = location.lat;
    if (location && location.lng) initCenter.lng = location.lng;
  }

  const center = computed(() => {
    if(initCenter && initCenter.lat && initCenter.lng) return initCenter
    // if(center && center.lat && center.lng) return center
    return defaultLocation.position
  })

  return {
    markers,
    // center,
    initCenter,

    changeMapCenter,
    center
  }
})
export default useGmapStore