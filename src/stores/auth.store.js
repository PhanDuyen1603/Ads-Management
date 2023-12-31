import { defineStore } from "pinia";
import setCookie from "~/utils/cookie/setCookie"
import deleteCookie from "~/utils/cookie/deleteCookie";

export default defineStore({
  id: 'auth-store',
  state:() => ({
    accessToken: null,
    refreshToken: null,
    profile: {},
    isLoggedIn: false,
    clientId: null,
  }),
  actions: {
    /**
     * @desc Sets profile
     * @param profile
     */
    setProfile(profile) {
      if (profile) {
        this.profile = profile;
        // TODO: remove late
        setCookie('user',JSON.stringify(profile))
      }
    },

    /**
     * @desc Clears profile
    */
    clearProfile() {
      this.profile = null;
      // TODO: remove late
      deleteCookie('user')
    },

    /**
     * @desc Sets access token
     * @param token
     */
    setAccessToken(token){
      if (token) {
        this.accessToken = token
        setCookie('token', token)
      }
    },

    clearAccessToken() {
      this.accessToken = null
      deleteCookie('token')
    },

    setIsLogin(value) {
      this.isLoggedIn = value
    }
  }
})