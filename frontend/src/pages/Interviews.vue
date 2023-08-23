<script setup>
import { onMounted } from 'vue'
import { useInterviewStore } from '@/stores/useInterviewStore'
const interviewStore = useInterviewStore()

function getURLHost(url){
  try{
    const urlObject = new URL(url)
    return urlObject.host
  } catch {
    return url
  }
}

function createNewJob(){
  interviewStore.createInterview()
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
    <EasyDataTable
      buttons-pagination
      hide-footer
      table-class-name="interviews-table"
      :headers="headers"
      :items="interviewStore.getInterviews"
    >
      <template #item-url="{url}">
        <a class='job-url' :href='url' target='_blank'>{{getURLHost(url)}}</a>
      </template>

      <template #empty-message>
        <div class='empty-message'>
          <p>No interviews found</p>
        </div>
      </template>
    </EasyDataTable>
    </a-spin>
  </div>
</template>

<style scoped>
.job-url {
    color: #fff;
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

.interviews-table {
    --easy-table-border: none;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 13px;
    --easy-table-header-height: 25px;
    --easy-table-header-font-color: rgb(129, 129, 129);
    --easy-table-header-background-color: #171717;

    --easy-table-header-item-padding: 5px 10px;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: #c0c7d2;
    --easy-table-body-row-background-color: #171717;
    --easy-table-body-row-height: 25px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #c0c7d2;
    --easy-table-body-row-hover-background-color: #171717;

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #2d3a4f;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;


    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}

</style>