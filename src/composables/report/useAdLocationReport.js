import { useToast } from "vue-toastification";
export default function useAdReport() {
  const { $apiFetch, $clientId } = useNuxtApp()
  const { queryByPermissionData } = useAuth()
  const toast = useToast()
  const reports = ref(null)
  /**
   * @desc get list ad locations reports
   */
  const getReports = async (useQuerry = true, query) => {
    try {
      const response = await $apiFetch('/reports/location', {
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
      const response = await $apiFetch('/reports/location/' + id)
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
      const response = await $apiFetch('/reports/location', {
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
      const response = await $apiFetch('/reports/location', {
        params: {
          guestId: $clientId
        }
      })
      if(response.success) {
        if(process.client) {
          const { data } = response
          const reportsLs = localStorage.getItem('reports')
          if(data && data.length) {
            localStorage.setItem("reports", JSON.stringify(data));
            reports.value = data
            return data
          }
          if(!data?.length && reportsLs && reportsLs.length) {
            reports.value = JSON.parse(reportsLs)
            return JSON.parse(reportsLs)
          } 
          reports.value = null
          return null
        } else {
          const { data } = response
          reports.value = data
          return data
        }
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
        // const response = await $apiFetch(`/reports/location/${id}`, {
        //   method: 'PATCH',
        //   body: {
        //     status
        //   },
        //   redirect: 'follow',
        // })
        toast.info("Đang phát triển", {
          timeout: 2000
        })
        // return response
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