import { computed } from 'vue'
import useLocationStore from '~/stores/locations.store'
import { mapAdsLocation } from '~/utils/mapData'

export default function useLocation() {
  const { $apiFetch } = useNuxtApp()
  const $store = useLocationStore()

  /**
   * @desc get ads addresses
   */
  const getLocations = async (query) => {
    try {
      const response = await $apiFetch('/ads-locations/')
      if(response.success) {
        $store.locations = response.data
      }
    } catch (error) {
      console.log('GET: /addresses', error)
    }
  }

  /**
   * @desc get ads addresses
   */
  const getLocation = async (id) => {
    try {
      const response = await $apiFetch(`/ads-locations/${id}`)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET: /ads-locations/', error)
      return null
    }
  }

  /**
   * @desc create location
   */
  const createLocation = async (data) => {
    const response = await $apiFetch('/ads-locations', {
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  /**
   * @desc update location
   */
  const updateLocation = async (id, data) => {
    const response = await $apiFetch(`/ads-locations/${id}`, {
      method: 'PATCH',
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  /**
   * @desc send update request
   */
  const requestUpadte = async (id, data) => {
    const response = await $fetch(`/api/address/request/${id}`, {
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  /**
   * @desc get location types
   */
  const getLocationTypes = async () => {
    try {
      const response = await $apiFetch('/location-types')
      if(response.success) {
        $store.locationsTypes = response.data
      }
    } catch (error) {
      console.log('GET: /location-types', error)
    }
  }

  const addresses = computed(() => $store.locations)
  const locationsTypes = computed(() => $store.locationsTypes.map(x => ({
    label: x.name,
    value: x._id
  })))
  const target = computed(() => $store.target)
  const targetAds = computed(() => $store.targetAds)
  const markers = computed(() => $store.locations.map(x => mapAdsLocation(x)))

  return {
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    requestUpadte,
    getLocationTypes,

    addresses: addresses.value,
    locationsTypes,
    target,
    targetAds,
    markers
  }
}