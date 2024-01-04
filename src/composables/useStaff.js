import useStaffStore from '~/stores/staff.store'
import { useToast } from "vue-toastification";
export default function useStaff() {
  const $store = useStaffStore()
  const { $apiFetch } = useNuxtApp()
  const toast = useToast()

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
        return response.data
      }
    } catch (error) {
      console.log('GET: /staff/:id', error)
      return null
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
      toast.success("Tạo cán bộ thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('POST: /auth/create', error)
      toast.error("Tạo cán bộ thất bại", {
        timeout: 2000
      })
    }
  }

  /**
   * @desc update staff
   */
  const updateStaff = async (data) => {
    try {
      const response = await $apiFetch('/staff/update-info', {
        method: 'PATCH',
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success("Sửa thông tin thành công", {
        timeout: 2000
      })
      return response
    } catch (error) {
      console.log('PATCH: /staff/update-info', error)
      toast.error("Sửa thông tin thất bại", {
        timeout: 2000
      })
    }
  }

  const staffs = computed(() => $store.staffList)

  return {
    getStaffs,
    getStaff,
    createStaff,
    updateStaff,

    staffs
  }
}