<script setup>
import InterviewModal from '@/components/InterviewModal.vue'
import interviewTable from '@/components/InterviewTable.vue'
import { useInterviewModalStore } from '@/stores/InterviewModalStore'
const interviewModalStore = useInterviewModalStore()
</script>

<template>
  <div class="dashboard">
    <div class="job-pane">
      <interview-table />
    </div>
  </div>

  <InterviewModal v-if="interviewModalStore.isOpen" @close="interviewModalStore.closeModal" />
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 200px 1fr;
  grid-template-areas:
    'interviews interviews'
    'interviews interviews';
}

.job-pane {
  grid-area: interviews;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}
</style>
