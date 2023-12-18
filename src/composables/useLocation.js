export default function useLocation() {
  /**
   * @desc create location
   */
  const createLocation = async (data) => {
    console.log(data)
    const response = await $fetch('/api/address/create', {
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  /**
   * @desc update location
   */
  const updateLocation = async (id, data) => {
    const response = await $fetch(`/api/address/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  /**
   * @desc send update request
   */
  const requestUpadte = async (id, data) => {
    const response = await $fetch(`/api/address/request/${id}`, {
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  return {
    createLocation,
    updateLocation
  }
}