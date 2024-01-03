import { computed } from 'vue'
import useAdsStore from '~/stores/ads.store'
import { useToast } from "vue-toastification";
import { useCloned } from '@vueuse/core'
import { slugify } from '~/utils/string/slug';

export default function useAdvertise() {
  const { $apiFetch } = useNuxtApp()
  const $store = useAdsStore()
  const { queryByPermissionData } = useAuth()
  const toast = useToast();
  const filterAds = ref(null)

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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
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
    try {
      const response = await $apiFetch(`/edit-requests/ads`, {
        method: 'POST',
        body: data,
      })
      toast.success("Gửi yêu cầu thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('POST: /edit-requests/ads', error)
      toast.error("Gửi yêu cầu thất bại", {
        timeout: 2000
      })
    }
  }

  /**
   * @desc filter ads by title
   */
  const filterAd = async (str) => {
    const { cloned, sync } = useCloned(ads.value)
    return cloned.value?.filter(x => slugify(x.title).includes(slugify(str)))
  }

  /**
   * @desc resetData
   */
  const resetData = () => {
    filterAds.value = null;
    $store.ads = null
  }

  const ads = computed(() => filterAds.value && filterAds.value.length ? filterAds.value : $store.ads)
  const billboardTypes = computed(() => $store.adsBillboardTypes)
  const adsCategories = computed(() => $store.categories.map(x => ({
    label: x.name,
    value: x._id
  })))

  return {
    resetData,
    getAds,
    getAdById,
    getAdsCategories,
    getBillboardTypes,
    getBillboardType,
    requestUpdateAd,
    filterAd,
// no return .value in composable it will not reactive any more
    ads,
    billboardTypes,
    adsCategories
  }
}