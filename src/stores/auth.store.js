import { defineStore } from "pinia";

export default defineStore({
  id: 'auth-store',
  state:() => ({
    accessToken: null,
    refreshToken: null,
    profile: {
      "_id": "658127a76eada69253daf3ef",
      "username": "nguyenvana",
      "role": "canbo_phuong"
    },
    isLoggedIn: true
  }),
  actions: {
    /**
     * @desc Sets profile
     * @param profile
     */
    setProfile(profile) {
      if (profile) this.profile = profile;
    },

    /**
     * @desc Clears profile
    */
    clearProfile() {
      this.profile = null;
    },

    /**
     * @desc Sets access token
     * @param token
     */
    setAccessToken(token){
      if (token) {
        this.accessToken = token
        window.localStorage.setItem('access-token', token)
      }
    },

    clearAccessToken() {
      this.accessToken = null
      window.localStorage.removeItem('access-token')
    }
  }
})