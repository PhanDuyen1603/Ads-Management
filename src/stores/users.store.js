import { defineStore } from "pinia";

export default defineStore({
  id: 'users-store',
  state:() => ({
    list: [],
    userRoles: [],
    user: {}
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
    }
  },
  getters: {
    roles:(state) => {
      return state.userRoles.length ? state.userRoles.map(x => ({
        label: x.name,
        value: x._id
      })) : []
    },
  }
})