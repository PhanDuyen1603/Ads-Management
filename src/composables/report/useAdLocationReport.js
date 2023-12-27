import getName from "~/utils/getter/getName"
export default function useAdReport() {
  const { $apiFetch } = useNuxtApp()
  const reports = ref(null)
  const { queryByPermissionData } = useAuth()
  const { getWard, getDistrict } = useLocation()

  /**
   * @desc get list ad locations reports
   */
  const getReports = async (query) => {
    try {
      const response = await $apiFetch('/reports/ads-location')
      if(response.success) {
        const { data } = response
        let res
        if(queryByPermissionData.value?.data === 'district') {
          const district = await getDistrict(queryByPermissionData.value.districts)
          res = data.filter(x => getName(x, 'adsLocation_address_district') === district.name)
          reports.value = res
        } else if (queryByPermissionData.value?.data === 'ward') {
          const district = await getDistrict(queryByPermissionData.value.districts)
          const ward = await getWard(queryByPermissionData.value.wards)
          res = data.filter(x => getName(x, 'adsLocation_address_district') === district.name
            && getName(x, 'adsLocation_address_ward') === ward.name)
          console.log({res, district, ward})
          reports.value = res
        } else {
          reports.value = response.data
        }
      }
    } catch (error) {
      console.log('GET: /reports/ads-location', error)
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
    }
  }

  const createReport = async (formdata) => {
    try {
      const response = await $apiFetch('/reports/ads-location', {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
      return response
    } catch (error) {
      console.log('POST: /reports/ads-location', error)
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