import { defineStore } from "pinia";

const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref(null)
  const refreshToken = ref(null)
  const profile = ref(null)
  const isLoggedIn = ref(false)

  /**
   * @desc Sets profile
   * @param profile
   */
  const setProfile = (profile) => {
    if (profile) profile.value = profile;
  }

  /**
   * @desc Clears profile
  */
  const clearProfile = () => {
    profile.value = null;
  }

  /**
   * @desc Sets access token
   * @param token
   */
  const setAccessToken = (token) => {
    if (token) {
      accessToken.value = profile
      window.localStorage.setItem('access-token', token)
    }
  }

  const clearAccessToken = () => {
    accessToken.value = null
    window.localStorage.removeItem('access-token')
  }


  return {
    refreshToken,
    accessToken,
    profile,
    isLoggedIn,
    setProfile,
    clearProfile,
    setAccessToken,
    clearAccessToken
  }
})

export default useAuthStore