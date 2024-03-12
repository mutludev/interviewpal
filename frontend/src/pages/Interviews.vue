<script setup>
import { onMounted, h } from 'vue'
import { PlusOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons-vue';
import InterviewModal from '@/components/InterviewModal.vue';
import GenericTable from '@/components/GenericTable.vue';

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { useInterviewStore } from '@/stores/InterviewStore'
import { useInterviewModalStore } from '@/stores/InterviewModalStore'
const interviewStore = useInterviewStore()
const interviewModalStore = useInterviewModalStore()

const interviewStatusToEmoji = {
    wishlist: 'Wishlist⭐️️',
    applied: 'Applied👏🏻',
    rejected: 'Rejected❌',
    accepted: 'Accepted✅'
}

const headers = [
    { text: "Company", value: "company" },
    { text: "Title", value: "title" },
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
        <a-space>
            <a-button :icon="h(PlusOutlined)" size="small" @click="interviewModalStore.openModal()">Create new job</a-button>
            <a-button :icon="h(ReloadOutlined)" size="small" @click="interviewStore.fetchInterviews" :loading="interviewStore.isLoading">Refresh</a-button>
        </a-space>
        <div class='job-table'>
            <a-spin :spinning='interviewStore.getLoading'>
                <GenericTable :headers="headers" :items="interviewStore.getInterviews">
                    <template #company="{item}">
                        <img v-if="item.url" :src="`https://www.google.com/s2/favicons?domain=${item.url}`" target="_blank">
                        <span v-else>🏢</span>
                        {{ item.company }}
                    </template>
                    <template #actions="{item}">
                        <a-button :icon="h(EditOutlined)" size="small" @click="interviewModalStore.openModal(item)">Edit</a-button>
                    </template>
                    <template #deadline="{item}">
                        {{ dayjs(item.deadline).fromNow() }}
                    </template>
                    <template #title="{item}">
                        <a v-if="item.url" :href="item.url" target="_blank">{{ item.title }} <span class="pi pi-link" /></a>
                        <span v-else>{{ item.title  }}</span>
                    </template>
                    <template #latest-action="{item}">
                        {{ interviewStatusToEmoji[item.status] }}
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

a {
    color: #fff;
}

.job-table {
    overflow: auto;
    flex-grow: 1;
}
</style>