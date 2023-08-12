import { defineStore } from 'pinia'
import axios from 'axios'
export const useInterviewStore = defineStore('interview',{
    state: () => ({
      interviews: [],
    }),
    actions: {
      async fetchInterviews() {
        try {
          const response = await axios.get('/api/job/');
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