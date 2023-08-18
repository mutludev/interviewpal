import { defineStore } from 'pinia'
import axios from 'axios'
export const useInterviewStore = defineStore('interview',{
    state: () => ({
      interviews: [],
      isLoading: false,
    }),
    actions: {
      async fetchInterviews() {
        this.isLoading = true;
        try {
          const response = await axios.get('/api/job/');
          this.interviews = response.data;
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    getters: {
      getInterviews: (state) => state.interviews,
      getLoading: (state) => state.isLoading
    }
})