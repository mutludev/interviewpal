import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    open: false
  }),
  actions: {
    toggle() {
      this.open = !this.open
    },
    close() {
      this.open = false
    }
  },
  getters: {
    isOpen: (state) => state.open
  }
})
