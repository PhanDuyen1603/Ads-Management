import { ref, reactive, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia'
import { defaultLocation } from '~/constant/locations';
import useMapStore from '~/stores/map.store'

const useGmapStore = defineStore('api-store', () => {
  const mapStore = useMapStore()
  const { gMapAddress: markers } = storeToRefs(mapStore)
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
    center,
    initCenter,

    changeMapCenter,
    center
  }
})
export default useGmapStore