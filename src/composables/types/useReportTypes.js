import { useToast } from "vue-toastification";

export default function useReportTypes() {
  const { $apiFetch } = useNuxtApp()
  const ReportTypes = ref(null)
  const toast = useToast()
  /**
   * @desc get bill board types
   */
  const getReportTypes = async () => {
    try {
      const response = await $apiFetch(`/report-types`)
      if(response.success) {
        ReportTypes.value = response.data
        return response.data
      }
    } catch (error) {
      console.log('GET:/report-types', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }
  const getReportType = async (id) => {
    try {
      const response = await $apiFetch(`/report-types/${id}`)
      if(response.success) {
        return response.data
      }
    } catch (error) {
      console.log('GET:/report-types', error)
      toast.error("có lỗi xảy ra", {
        timeout: 2000
      })
    }
  }

  const updateReportType = async (id, name) => {
    try {
      const response = await $apiFetch(`/report-types/${id}`, {
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
      console.log("PATCH: /report-types", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  const createReportType = async (name) => {
    try {
      const response = await $apiFetch(`/report-types`, {
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
      console.log("POST: /report-types", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  const removeReportType = async (id) => {
    try {
      const response = await $apiFetch(`/report-types/${id}`, {
        method: "DELETE",
      });
      if (response.success) {
        toast.success("Xoa thành công", {
          timeout: 2000,
        });
        return response.data;
      }
    } catch (error) {
      console.log("DELETE: /report-types", error);
      toast.error("có lỗi xảy ra", {
        timeout: 2000,
      });
    }
  }

  return {
    getReportTypes,
    getReportType,
    createReportType,
    updateReportType,
    removeReportType,

    ReportTypes
  }
}