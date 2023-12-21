import useStaffStore from '~/stores/staff.store'
export default function useStaff() {
  const $store = useStaffStore()
  const { $apiFetch } = useNuxtApp()

  /**
   * @desc get staffs
   */
  const getStaffs = async () => {
    try {
      const response = await $apiFetch('/staff')
      if(response.success) {
        $store.staffList = response.data
      }
    } catch (error) {
      console.log('GET: /staff', error)
    }
  }

  /**
   * @desc update staffs
   */
  const getStaff = async (id) => {
    try {
      const response = await $apiFetch(`/staff/${id}`)
      if(response.success) {
        $store.target = response.data
      }
    } catch (error) {
      console.log('GET: /staff/:id', error)
    }
  }

  /**
   * @desc create new staff for super admin staff
   */
  const createStaff = async (data) => {
    try {
      const response = await $apiFetch('/auth/create', {
        method: 'POST',
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response
    } catch (error) {
      console.log('POST: /auth/create', error)
    }
  }

  const staffs = computed(() => $store.staffList)

  return {
    getStaffs,
    getStaff,
    createStaff,

    staffs
  }
}