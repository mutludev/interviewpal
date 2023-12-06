<script setup>
import { onMounted } from 'vue'
import { useInterviewStore } from '@/stores/useInterviewStore'
import { useInterviewModalStore } from '@/stores/useInterviewModalStore';
import GenericTable from '@/components/GenericTable.vue';
const interviewStore = useInterviewStore()
const interviewModalStore = useInterviewModalStore()

function getURLHost(url){
  try{
    const urlObject = new URL(url)
    return urlObject.host
  } catch {
    return url
  }
}

function createNewJob(){
  interviewModalStore.openModal()
}

const headers = [
  { text: "Company", value: "company" },
  { text: "Title", value: "title" },
  { text: "Url", value: "url" },
  { text: "Salary", value: "salary" },
  { text: "Location", value: "location" },
  { text: "Deadline", value: "deadline" },
  { text: "Latest Action", value: "latest-action" }
];
onMounted(() => {
  interviewStore.fetchInterviews()
})
</script>

<template>
  <a href='#' class="action-btn" @click.prevent='createNewJob'>
    <span class="pi pi-plus" />
     <span>Create new job</span>
  </a>
  <a href='#' class="action-btn" @click.prevent='interviewStore.fetchInterviews'>
    <span :class="`pi pi-sync ${interviewStore.isLoading ? 'pi-spin' : ''}`" />
    <span>Refresh</span>
  </a>

  <div class='job-table'>
    <a-spin :spinning='interviewStore.getLoading'>
      <GenericTable
        :headers="headers"
        :items="interviewStore.getInterviews"
      />
    </a-spin>
  </div>
</template>

<style scoped>
.job-url {
    color: #fff;
    text-decoration: underline;
}

.action-btn {
    color: #818181;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border: 1px solid #818181;
    padding: 4px;
    border-radius: 4px;
    font-size: 14px;
}

.action-btn:not(:last-child) {
    margin-right: 10px;
}

.action-btn:hover {
    background-color: #1e1e1e;
}

.action-btn span:last-child {
  margin-left: 4px;
}
</style>