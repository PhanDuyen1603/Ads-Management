import { useToast } from "vue-toastification";

export default function useAdsCategories() {
  const { $apiFetch } = useNuxtApp()
  const adsCategories = ref(null)
  const toast = useToast()
  /**
   * @desc get bill board types
   */
  const getAdsCategories = async () => {
    try {
      const response = await $apiFetch(`/ads-categories`)
      if(response.success) {
        adsCategories.value = response.data
        return response.data
      }
    } catch (error) {
      console.log('GET:/ads-categories', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }
  const getAdsCategory = async (id) => {
    try {
      const response = await $apiFetch(`/ads-categories/${id}`)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET:/ads-categories', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  const updateAdsCategory = async (id, name) => {
    try {
      const response = await $apiFetch(`/ads-categories/${id}`, {
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
      console.log("PATCH: /ads-categories", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  const createAdsCategory = async (name) => {
    try {
      const response = await $apiFetch(`/ads-categories`, {
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
      console.log("POST: /ads-categories", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  const removeAdsCategory = async (id) => {
    try {
      const response = await $apiFetch(`/ads-categories/${id}`, {
        method: "DELETE",
      });
      if (response.success) {
        toast.success("Xoa thành công", {
          timeout: 2000,
        });
        return response.data;
      }
    } catch (error) {
      console.log("DELETE: /ads-categories", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  return {
    getAdsCategories,
    getAdsCategory,
    updateAdsCategory,
    createAdsCategory,
    removeAdsCategory,

    adsCategories
  }
}