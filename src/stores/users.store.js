import { defineStore } from "pinia";

export default defineStore({
  id: 'users-store',
  state:() => ({
    list: [],
    userRoles: [],
    profile: {},
    isLoggedIn: false,
  }),
  actions: {
    async getListUsers() {
      try {
        const res = await $fetch('/api/user')
        if(res.statusCode === 200) {
          this.list = res.data
        }
      } catch (error) {
        console.log({
          error
        })
      }
    },
    async getUserRoles() {
      try {
        const res = await $fetch('/api/userRoles')
        if(res.statusCode === 200) {
          this.userRoles = res.data
        }
      } catch (error) {
        console.log({
          error
        })
      }
    },
    setProfile(profile) {
      if (profile) this.profile = profile;
    },
    /**
     * @desc Sets whether user is logged in
     */
    setIsLoggedIn(value) {
      this.isLoggedIn = value;
    },

    /**
     * @desc Clears profile
     */
    clearProfile() {
      this.profile = null;
    }
  },
  getters: {
    roles:(state) => {
      return state.userRoles.length ? state.userRoles.map(x => ({
        label: x.name,
        value: x._id
      })) : []
    },
    userRole:(state) => state.profile?.role
  }
})