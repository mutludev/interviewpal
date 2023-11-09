<script setup>
import LoginModal from '@/components/AuthModalWrapper.vue'
import InterviewModal from '@/components/InterviewModalWrapper.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useInterviewModalStore } from './stores/useInterviewModalStore'
const interviewModalStore = useInterviewModalStore()
const authStore = useAuthStore()
const isCheckedAuth = ref(false)
authStore.getUser().finally(() => {
  isCheckedAuth.value = true
})
</script>

<template>
  <router-view/>
  <login-modal v-if='!authStore.isLoggedIn && isCheckedAuth'/>
  <interview-modal v-if="interviewModalStore.getIsOpen" />
</template>
