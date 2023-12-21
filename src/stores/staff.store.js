import { defineStore } from "pinia";

export default defineStore({
  id: 'staff-store',
  state:() => {
    return {
      staffList: [],
      target: {}
    }
  }
})