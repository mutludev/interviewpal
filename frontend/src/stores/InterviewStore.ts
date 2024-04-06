import { defineStore } from 'pinia'
import axios from 'axios'
import { type Interview } from '@/types/Interview.type'
import getEndpoint from '@/config/endpoints'

export const useInterviewStore = defineStore('interview', {
  state: () => ({
    interviews: [] as Interview[],
    isLoading: false
  }),
  actions: {
    async fetchInterviews() {
      this.isLoading = true
      try {
        const response = await axios.get(getEndpoint('getInterviews'))
        this.interviews = response.data
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    clearInterviews() {
      this.interviews = []
    },
    async addInterview(interview: Interview) {
      try {
        const response = (await axios.post(getEndpoint('addInterview'), interview)) as {
          data: Interview
        }
        this.interviews.push(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateInterview(interview: Interview) {
      try {
        await axios.put(getEndpoint('updateInterview', { id: interview._id }), interview)
        const interviewIndex = this.interviews.findIndex((i) => i._id === interview._id)
        this.interviews[interviewIndex] = interview
      } catch (error) {
        console.log(error)
      }
    },
    async deleteInterview(id: string) {
      try {
        await axios.delete(getEndpoint('deleteInterview', { id }))
        this.interviews = this.interviews.filter((i) => i._id !== id)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    getInterviews: (state) => state.interviews,
    getLoading: (state) => state.isLoading
  }
})
