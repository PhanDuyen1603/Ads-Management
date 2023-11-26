import { defineStore } from 'pinia'

export default defineStore({
  id: 'modal-store',
  state:() => ({
    list: []
  }),
  actions: {
    addModal(data) {
      this.list = [...this.list, data]
    },
    removeModal(id) {
      this.list = this.list.filter(x => x.id != id)
    },
    clearAll() {
      this.list = []
    }
  }
})