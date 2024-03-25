<script setup>
import { h } from 'vue'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import InterviewModal from '@/components/InterviewModal.vue';
import interviewTable from '@/components/InterviewTable.vue';
import { useInterviewModalStore } from '@/stores/InterviewModalStore'
import { useInterviewStore } from '@/stores/InterviewStore'
const interviewModalStore = useInterviewModalStore()
const interviewStore = useInterviewStore()
</script>

<template>
    <div class="dashboard">
            <div class="job-pane">
                <a-space>
                    <a-button :icon="h(PlusOutlined)" size="small" @click="interviewModalStore.openModal()">Create new job</a-button>
                    <a-button :icon="h(ReloadOutlined)" size="small" @click="interviewStore.fetchInterviews" :loading="interviewStore.isLoading">Refresh</a-button>
                </a-space>
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
        "interviews interviews"
        "interviews interviews";
}

.job-pane {
    grid-area: interviews;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
}
</style>