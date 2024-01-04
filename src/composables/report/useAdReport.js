import { useToast } from "vue-toastification";

export default function useAdReport() {
  const { $apiFetch } = useNuxtApp()
  const reports = ref(null)
  const { queryByPermissionData } = useAuth()
  const { $clientId } = useNuxtApp()
  const toast = useToast()

  /**
   * @desc get list reports
   */
  const getReports = async (useQuerry = true, query) => {
    try {
      const response = await $apiFetch('/reports/ads', {
        params: useQuerry ? {...queryByPermissionData?.value || {}, ...query} : {}
      })
      if(response.success) {
        const { data } = response
        reports.value = data
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

  const getReportByGuest = async () => {
    try {
      const response = await $apiFetch('/reports/ads', {
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

  /**
   * @desc send request update
   */
  const requestUpate = async (id, data) => {

  }

  /**
   * @desc update status
   */
  const changeStatus = async (id, { status }) => {
    try {
      const response = await $apiFetch(`/reports/ads/${id}`, {
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
    getReportByGuest,
    getReportByIds,
    requestUpate,
    changeStatus,

    reports,
  }
}