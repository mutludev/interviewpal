import type { Interview } from '@/types/Interview.type'
import { defineStore } from 'pinia'

export const useInterviewModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpen: false as boolean,
    content: null as Interview | null
  }),
  actions: {
    openModal(content: Interview) {
      this.isOpen = true
      this.content = JSON.parse(JSON.stringify(content))
    },
    closeModal() {
      this.isOpen = false
      this.content = null
    }
  },
  getters: {
    getIsOpen: (state) => state.isOpen
  }
})
