import { computed } from 'vue'
import useAdsStore from '~/stores/ads.store'

export default function useAdvertise() {
  const { $apiFetch } = useNuxtApp()
  const $store = useAdsStore()

  /**
   * @desc get ads addresses
   */
  const getAdsLocations = async (query) => {
    try {
      const response = await $apiFetch('/ads-locations')
      if(response.success) {
        $store.ads_locations = response.data
      }
    } catch (error) {
      console.log('GET: /ads-locations', error)
    }
  }

  /**
   * @desc get all ads
   */
  const getAds = async () => {
    try {
      const response = await $apiFetch('/ads')
      if(response.success) {
        $store.ads = response.data
      }
    } catch (error) {
      console.log('GET: /ads', error)
    }
  }

  /**
   * @desc get specific ad
   */
  const getAdById = async (id) => {
    try {
      const response = await $apiFetch(`/ads/${id}`)
      if(response.success) {
        // $store.ads = response.data
        return response.data
      }
    } catch (error) {
      console.log('GET: /ads', error)
    }
  }

  /**
   * @desc get ad categories
   */
  const getAdsCategories = async () => {
    try {
      const response = await $apiFetch(`/ads-categories`)
      if(response.success) {
        $store.categories = response.data
        return
      }
    } catch (error) {
      console.log('GET: /ads', error)
    }
  }

  /**
   * @desc get bill board types
   */
  const getBillboardTypes = async () => {
    try {
      const response = await $apiFetch(`/billboard-types`)
      if(response.success) {
        $store.billboardTypes = response.data
        return
      }
    } catch (error) {
      console.log('GET: /ads', error)
    }
  }

  /**
   * @desc create ad
   */
  const createAd = async () => {

  }

  const adsLocations = computed(() => $store.adsLocations)
  const ads = computed(() => $store.ads)
  const billboardTypes = computed(() => $store.adsBillboardTypes)
  const adsCategories = computed(() => $store.categories.map(x => ({
    label: x.name,
    value: x._id
  })))

  return {
    getAdsLocations,
    getAds,
    getAdById,
    getAdsCategories,
    getBillboardTypes,
// no return .value in composable it will not reactive any more
    adsLocations,
    ads,
    billboardTypes,
    adsCategories
  }
}