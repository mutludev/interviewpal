import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.withCredentials = true;
export const useInterviewStore = defineStore('interview',{
    state: () => ({
      interviews: [],
    }),
    actions: {
      async fetchInterviews() {
        try {
          const response = await axios.get('http://localhost:3000/api/job');
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