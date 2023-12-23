export default function useReport() {
  const { $apiFetch } = useNuxtApp()

  const reportTypes = ref(null)

  /**
   * @desc get report types
   */
  const getReportTypes = async () => {
    try {
      const response = await $apiFetch('/report-types')
      if(response.success) {
        return response.data?.map(x => ({
          label: x.name,
          value: x._id
        }))
      }
    } catch (error) {
      console.log('GET: /report-types', error)
      return null
    }
  }

  return {
    getReportTypes
  }
}