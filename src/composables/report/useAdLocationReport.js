import { useToast } from "vue-toastification";
export default function useAdReport() {
  const { $apiFetch } = useNuxtApp()
  const reports = ref(null)
  const { queryByPermissionData } = useAuth()
  const toast = useToast()
  const { $clientId } = useNuxtApp()
  /**
   * @desc get list ad locations reports
   */
  const getReports = async (useQuerry = true, query) => {
    try {
      const response = await $apiFetch('/reports/ads-location', {
        params: useQuerry ? {...queryByPermissionData?.value || {}, ...query} : {}
      })
      if(response.success) {
        const { data } = response
        reports.value = data
        return data
      }
    } catch (error) {
      console.log('GET: /reports/ads-location', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
      return null
    }
  }

  const getReport = async (id) => {
    try {
      const response = await $apiFetch('/reports/ads-location/' + id)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET: /reports/ads-location/:id', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  const createReport = async (formdata) => {
    try {
      const response = await $apiFetch('/reports/ads-location', {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
      toast.success("Gửi báo cáo thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('POST: /reports/ads-location', error)
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

  const getReportByGuest = async () => {
    try {
      const response = await $apiFetch('/reports/ads-location', {
        params: {
          guestId: $clientId
        }
      })
      if(response.success) {
        const { data } = response
        console.log({ data, $clientId})
        return data
      }
    } catch (error) {
      console.log('GET: /reports/ads', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
      return null
    }
  }

    /**
   * @desc update status
   */
    const changeStatus = async (id, { status }) => {
      try {
        const response = await $apiFetch(`/reports/ads-location/${id}`, {
          method: 'PATCH',
          body: {
            status
          },
          redirect: 'follow',
        })
        toast.success("Cập nhập trạng thái thành công", {
          timeout: 2000
        })
        return response
      } catch (error) {
        console.log('PATCH: /reports/ads/', error)
        toast.error("có lỗi xảy ra", {
          timeout: 2000
        })
      }
    }

  return {
    getReports,
    getReport,
    createReport,
    getReportByIds,
    getReportByGuest,
    changeStatus,

    reports,
  }
}