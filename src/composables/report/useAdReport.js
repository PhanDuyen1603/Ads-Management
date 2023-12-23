export default function useAdReport() {
  const { $apiFetch } = useNuxtApp()
  const reports = ref(null)

  /**
   * @desc get list reports
   */
  const getReports = async (query) => {
    try {
      const response = await $apiFetch('/reports/ads')
      if(response.success) {
        reports.value = response.data
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
      const data = response.data
      res = [...res, data]
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