import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.withCredentials = true
let host = import.meta.env.prod ? 'http://159.65.223.82:3000/' : 'http://localhost:3000'
axios.defaults.baseURL = host + '/api/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),
  actions: {
    async login(email, password) {
      this.loading = true
      try{
        const res = await axios.post('/login', {
          email,
          password
        })
        this.user = res.data.user
        return this.user
      } catch(err) {
        return false
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.user = null
      try {
        await axios.post('/logout')
      } catch(err) {
        console.log(err)
      }
    },
    async register(username, email, password) {
      this.loading = true
      try {
        const res = await axios.post('/', {
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
        const res = await axios.get('/')
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