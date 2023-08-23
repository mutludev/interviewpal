import { defineStore } from 'pinia'
import axios from 'axios'
import { useInterviewStore } from '@/stores/useInterviewStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),
  actions: {
    async login(email, password) {
      const interviewStore = useInterviewStore()
      this.loading = true
      try{
        const res = await axios.post('/api/user/login', {
          email,
          password
        })
        this.user = res.data.user
        interviewStore.fetchInterviews()
        return this.user
      } catch(err) {
        return false
      } finally {
        this.loading = false
      }
    },
    async logout() {
      const interviewStore = useInterviewStore()
      this.user = null
      try {
        await axios.post('/api/user/logout')
        interviewStore.clearInterviews()
      } catch(err) {
        console.log(err)
      }
    },
    async register(username, email, password) {
      this.loading = true
      try {
        const res = await axios.post('/api/user/', {
          username,
          email,
          password
        })
        this.user = res.data.user
        return this.user
      } catch(err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async getUser() {
      this.loading = true
      try {
        const res = await axios.get('/api/user/')
        this.user = res.data
        return this.user
      } catch(err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  },
  getters: {
    isLoggedIn: (state) => state.user,
    isLoading: (state) => state.loading
  }
})