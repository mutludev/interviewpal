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
      },
      clearInterviews() {
        this.interviews = []
      },
      async addInterview(interview) {
        try {
          const response = await axios.post('/api/job/', interview);
          this.fetchInterviews();
        } catch (error) {
          console.log(error);
        }
      }
    },
    getters: {
      getInterviews: (state) => state.interviews,
      getLoading: (state) => state.isLoading
    }
})