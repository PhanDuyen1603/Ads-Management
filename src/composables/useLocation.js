import { computed } from 'vue'
import useLocationStore from '~/stores/locations.store'
import { mapAdsLocation } from '~/utils/mapData'
import filterData from '~/utils/array/filterData'
import { useToast } from "vue-toastification";
import { useCloned } from '@vueuse/core'
import { slugify } from '~/utils/string/slug';
import getName from '~/utils/getter/getName';

export default function useLocation() {
  const { $apiFetch } = useNuxtApp()
  const $store = useLocationStore()
  const { queryByPermissionData } = useAuth()
  const toast = useToast()
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
      return null
    }
  }

  /**
   * @desc create location
   */
  const createLocation = async (data) => {
    try {
      const response = await $apiFetch('/ads-locations', {
        method: 'POST',
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success("Tạo địa điểm thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('POST: /ads-locations', error)
      toast.error("Tạo địa điểm thất bại", {
        timeout: 2000
      })
      return null
    }
  }

  /**
   * @desc update location
   */
  const updateLocation = async (id, data) => {
    try {
      const response = await $apiFetch(`/ads-locations/${id}`, {
        method: 'PATCH',
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success("Cập nhập điểm thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('PATCH: /ads-locations', error)
      toast.error("Cập nhập điểm thất bại", {
        timeout: 2000
      })
      return null
    }
  }

  /**
   * @desc send update request ads-location
   * @param {*} data
   * @returns
   */
  const requestUpdateLocation = async (data) => {
    try {
      const response = await $apiFetch(`/edit-requests/ads-location`, {
        method: 'POST',
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success("Tạo yêu cầu chỉnh sửa thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('POST: edit-requests/ads-location', error)
      toast.error("Tạo yêu cầu chỉnh sửa thất bại", {
        timeout: 2000
      })
      return null
    }
  }

  /**
   * @desc send update request
   */
  const requestUpadte = async (id, data) => {
    try {
      const response = await $fetch(`/api/address/request/${id}`, {
        method: 'POST',
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success("Tạo yêu cầu chỉnh sửa thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('POST: /api/address/request/', error)
      toast.error("Tạo yêu cầu chỉnh sửa thất bại", {
        timeout: 2000
      })
      return null
    }
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  /**
   * @desc resetData
   */
  const resetData = () => {
    $store.locations = []
    $store.target = {}
    $store.targetAds = []
  }

  /**
   * @desc filter location by address (streetline1 + streetline2)
   */
  const filterLocations = async (str) => {
    const { cloned, sync } = useCloned(addresses.value)
    return cloned.value?.filter(x => {
      const address = `${getName(x, 'address_streetLine1')} ${getName(x, 'address_streetLine2')}`
      return slugify(address).includes(slugify(str))
    })
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
    filterLocations,
    resetData,

    addresses,
    locationsTypes,
    target,
    targetAds,
    markers
  }
}