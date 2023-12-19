import { computed } from 'vue'
import useMapStore from '~/stores/map.store'

export default function useLocation() {
  const { $apiFetch } = useNuxtApp()
  const $store = useMapStore()

  /**
   * @desc get ads addresses
   */
  const getAddresses = async (query) => {
    try {
      const response = await $apiFetch('/addresses')
      if(response.success) {
        $store.addresses = response.data
      }
    } catch (error) {
      console.log('GET: /addresses', error)
    }
  }

  /**
   * @desc create location
   */
  const createLocation = async (data) => {
    const response = await $fetch('/api/address/create', {
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
    const response = await $fetch(`/api/address/${id}`, {
      method: 'PUT',
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

  const addresses = computed(() => $store.addresses)

  return {
    getAddresses,
    createLocation,
    updateLocation,
    requestUpadte,

    addresses: addresses.value
  }
}