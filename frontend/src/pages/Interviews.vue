<script setup>
import interviewTable from '@/components/InterviewTable.vue'
</script>

<template>
  <div class="dashboard">
    <div class="job-pane">
      <interview-table />
    </div>
  </div>
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
