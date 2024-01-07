import { useToast } from "vue-toastification";

export default function useBillboardTypes() {
  const { $apiFetch } = useNuxtApp()
  const billboardTypes = ref(null)
  const toast = useToast()
  /**
   * @desc get bill board types
   */
  const getBillboardTypes = async () => {
    try {
      const response = await $apiFetch(`/billboard-types`)
      if(response.success) {
        billboardTypes.value = response.data
        // $store.billboardTypes = response.data
        return response.data
      }
    } catch (error) {
      console.log('GET: /ads', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }
  const getBillboardType = async (id) => {
    try {
      const response = await $apiFetch(`/billboard-types/${id}`)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET: /ads', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  const updateBillboardType = async (id, name) => {
    try {
      const response = await $apiFetch(`/billboard-types/${id}`, {
        method: "PATCH",
        body: { name },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.success) {
        toast.success("Cập nhập thành công", {
          timeout: 2000,
        });
        return response.data;
      }
    } catch (error) {
      console.log("PATCH: /billboard-types", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  const createBillboardType = async (name) => {
    try {
      const response = await $apiFetch(`/billboard-types`, {
        method: "POST",
        body: { name },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.success) {
        toast.success("Tạo mới thành công", {
          timeout: 2000,
        });
        return response.data;
      }
    } catch (error) {
      console.log("POST: /billboard-types", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  return {
    getBillboardTypes,
    getBillboardType,
    createBillboardType,
    updateBillboardType,

    billboardTypes
  }
}