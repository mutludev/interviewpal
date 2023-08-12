import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.withCredentials = true;
let host = import.meta.env.prod ? 'http://159.65.223.82:3000/' : 'http://localhost:3000'
axios.defaults.baseURL = host + '/api/job'
export const useInterviewStore = defineStore('interview',{
    state: () => ({
      interviews: [],
    }),
    actions: {
      async fetchInterviews() {
        try {
          const response = await axios.get('/');
          this.interviews = response.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    getters: {
      getInterviews: (state) => state.interviews
    }
})