import { computed } from 'vue'
import useLocationStore from '~/stores/locations.store'
import { mapAdsLocation } from '~/utils/mapData'
import filterData from '~/utils/array/filterData'

export default function useLocation() {
  const { $apiFetch } = useNuxtApp()
  const $store = useLocationStore()
  const { queryByPermissionData } = useAuth()
  /**
   * @desc get ads addresses
   */
  const getLocations = async (query = {}) => {
    try {
      const response = await $apiFetch('/ads-locations/', {
        params: {...query, ...queryByPermissionData.value}
      })
      if(response.success) {
        $store.locations = response.data
      }
    } catch (error) {
      console.log('GET: /addresses', error)
    }
  }

  /**
   * @desc filter location
   * @param {Object} filters
   */
  const filterAdLocation = async (filters) => {
    let res = null
    const { isPlanned = null, conditions = {} } = filters
    res = filterData($store.locations, conditions)
    $store.locationsFilters = res
    return res
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

  const requestUpdateLocation = async (data) => {
    const response = await $apiFetch(`edit-requests/ads-location`, {
      method: 'POST',
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

  /**
   * @desc get wards list
   */
  const getWards = async (isTransform = false) => {
    try {
      const response = await $apiFetch('/wards')
      if(response.success) {
        return isTransform
          ? response.data?.map(x => ({ label: x.name, value: x._id }))
          : response.data || []
      }
    } catch (error) {
      console.log('GET: /wards', error)
    }
  }
  const getWard = async (id) => {
    try {
      const response = await $apiFetch(`/wards/${id}`)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET: /ward', error)
    }
  }

  /**
   * @desc get district list
   */
  const getDistricts = async (isTransform = false) => {
    try {
      const response = await $apiFetch('/districts')
      if(response.success) {
        return isTransform
        ? response.data?.map(x => ({ label: x.name, value: x._id }))
        : response.data || []
      }
    } catch (error) {
      console.log('GET: /districts', error)
    }
  }
  const getDistrict = async (id) => {
    try {
      const response = await $apiFetch(`/districts/${id}`)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET: /district', error)
    }
  }

  const addresses = computed(() => $store.locations)
  const locationsTypes = computed(() => $store.locationsTypes.map(x => ({
    label: x.name,
    value: x._id
  })))
  const target = computed(() => $store.target)
  const targetAds = computed(() => $store.targetAds)
  const markers = computed(() => $store.mapMarkers.map(x => mapAdsLocation(x)))

  return {
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    requestUpadte,
    getLocationTypes,
    getWards,
    getWard,
    getDistricts,
    getDistrict,
    filterAdLocation,
    requestUpdateLocation,

    addresses,
    locationsTypes,
    target,
    targetAds,
    markers
  }
}