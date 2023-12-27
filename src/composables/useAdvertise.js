import { computed } from 'vue'
import useAdsStore from '~/stores/ads.store'

export default function useAdvertise() {
  const { $apiFetch } = useNuxtApp()
  const $store = useAdsStore()
  const { queryByPermissionData } = useAuth()

  /**
   * @desc get ads addresses
   */
  const getAdsLocations = async (query = {}) => {
    try {
      const response = await $apiFetch('/ads-locations', {
        params: {...queryByPermissionData.value, ...query}
      })
      if(response.success) {
        $store.ads_locations = response.data
      }
    } catch (error) {
      console.log('GET: /ads-locations', error)
    }
  }
  const getAdsLocation = async (id) => {
    try {
      const response = await $apiFetch(`/ads-locations/${id}`)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET: /ads-locations', error)
    }
  }

  /**
   * @desc get all ads
   */
  const getAds = async (query = {}) => {
    try {
      const response = await $apiFetch('/ads', {
        params: {...queryByPermissionData.value, ...query}
      })
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
        return response.data
      }
    } catch (error) {
      console.log('GET: /ads', error)
    }
  }
  const getBillboardType = async (id) => {
    try {
      const response = await $apiFetch(`/billboard-types/${id}`)
      if(response.success) {
        return response.data
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

  /**
   *
   */
  const requestUpdateAd = async (data) => {
    if(!data.ads) return
    const response = await $apiFetch(`edit-requests/ads`, {
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
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
    getAdsLocation,
    getAds,
    getAdById,
    getAdsCategories,
    getBillboardTypes,
    getBillboardType,
    requestUpdateAd,
// no return .value in composable it will not reactive any more
    adsLocations,
    ads,
    billboardTypes,
    adsCategories
  }
}