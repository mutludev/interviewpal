<script setup>
import { onMounted } from 'vue'
import InterviewModal from '@/components/InterviewModal.vue';
import GenericTable from '@/components/GenericTable.vue';

import { useInterviewStore } from '@/stores/useInterviewStore'
import { useInterviewModalStore } from '@/stores/useInterviewModalStore'
const interviewStore = useInterviewStore()
const interviewModalStore = useInterviewModalStore()

const headers = [
    { text: "Company", value: "company" },
    { text: "Title", value: "title" },
    { text: "Url", value: "url" },
    { text: "Salary", value: "salary" },
    { text: "Location", value: "location" },
    { text: "Deadline", value: "deadline" },
    { text: "Latest Action", value: "latest-action" },
    { text: "Actions", value: "actions" }
];

onMounted(() => {
    interviewStore.fetchInterviews()
})
</script>

<template>
    <div class="job-pane">
    <div>
        <a href='#' class="action-btn" @click.prevent='interviewModalStore.openModal()'>
            <span class="pi pi-plus" />
            <span>Create new job</span>
        </a>
        <a href='#' class="action-btn" @click.prevent='interviewStore.fetchInterviews'>
            <span :class="`pi pi-sync ${interviewStore.isLoading ? 'pi-spin' : ''}`" />
            <span>Refresh</span>
        </a>
    </div>
    <div class='job-table'>
        <a-spin :spinning='interviewStore.getLoading'>
            <GenericTable :headers="headers" :items="interviewStore.getInterviews">
                <template #body="{ column, item }">
                    <template v-if="column == 'actions'">
                        <a href='#' class="action-btn" @click="interviewModalStore.openModal(item)">
                            <span class="pi pi-pencil" />
                            <span>Edit</span>
                        </a>
                        <a-popconfirm title="Delete?" @confirm="interviewStore.deleteInterview(item._id)">
                        <a href='#' class="action-btn">
                            <span class="pi pi-trash" />
                            <span>Delete</span>
                        </a>
                        </a-popconfirm>
                    </template>
                </template>
            </GenericTable>
        </a-spin>
    </div>
    </div>
    <InterviewModal v-if="interviewModalStore.isOpen" @close="interviewModalStore.closeModal" />
</template>

<style scoped>

.job-pane {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.job-url {
    color: #fff;
    text-decoration: underline;
}

.job-table {
    overflow: auto;
    flex-grow: 1;
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
