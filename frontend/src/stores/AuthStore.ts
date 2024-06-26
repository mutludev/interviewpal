import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { useInterviewStore } from '@/stores/InterviewStore'
import getEndpoint from '@/config/endpoints'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),
  actions: {
    async login(email: string, password: string) {
      const interviewStore = useInterviewStore()
      this.loading = true
      try {
        const res = await axios.post(getEndpoint('login'), {
          email,
          password
        })
        this.user = res.data.user
        interviewStore.fetchInterviews()
        return this.user
      } catch (err) {
        return false
      } finally {
        this.loading = false
      }
    },
    async logout() {
      const interviewStore = useInterviewStore()
      this.user = null
      try {
        await axios.post(getEndpoint('logout'))
        interviewStore.clearInterviews()
        await router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async register(username: string, email: string, password: string) {
      this.loading = true
      try {
        const res = await axios.post(getEndpoint('register'), {
          username,
          email,
          password
        })
        this.user = res.data.user
        return this.user
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async getUser() {
      this.loading = true
      try {
        const res = await axios.get(getEndpoint('user'))
        this.user = res.data
        return this.user
      } catch (err) {
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
