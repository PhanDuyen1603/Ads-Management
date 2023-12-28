import { useToast } from "vue-toastification";

export default function useAdReport() {
  const { $apiFetch } = useNuxtApp()
  const reports = ref(null)
  const { queryByPermissionData } = useAuth()
  const { getLocations, addresses } = useLocation()
  const toast = useToast()

  /**
   * @desc get list reports
   */
  const getReports = async (query) => {
    try {
      const response = await $apiFetch('/reports/ads')
      if(response.success) {
        const { data } = response
        let res
        if(Array.isArray(addresses.value) && !addresses.value.length) await getLocations()
        const ids = addresses.value.map(x => x._id)

        if(queryByPermissionData?.value?.data === 'district' || queryByPermissionData?.value?.data === 'ward') {
          res = data.filter(x => ids.includes(x.ads?.adsLocation))
          reports.value = res
        } else {
          reports.value = data
        }
      }
    } catch (error) {
      console.log('GET: /reports/ads', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  const getReport = async (id) => {
    try {
      const response = await $apiFetch('/reports/ads/' + id)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET: /reports/ads/:id', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  const createReport = async (formdata) => {
    try {
      const response = await $apiFetch('/reports/ads', {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
      toast.success("Gửi báo cáo thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('POST: /reports/ads', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  const getReportByIds = async (ids) => {
    let listId = null
    let res = []
    if (typeof ids === 'string') listId = ids.split(', ')
    else listId = ids
    for await (const id of listId) {
      const response = await getReport(id);
      res = [...res, response]
    }
    return res
  }

  return {
    getReports,
    getReport,
    createReport,
    getReportByIds,

    reports,
  }
}