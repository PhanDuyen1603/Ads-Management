import get from "~/utils/getter/getName"

export default function useAdReport() {
  const { $apiFetch } = useNuxtApp()
  const reports = ref(null)
  const { queryByPermissionData } = useAuth()
  const { getLocations, addresses } = useLocation()

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
    }
  }

  const createReport = async (formdata) => {
    try {
      const response = await $apiFetch('/reports/ads', {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
      return response
    } catch (error) {
      console.log('POST: /reports/ads', error)
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