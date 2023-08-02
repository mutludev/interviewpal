<script setup>
import LoginModal from '@/components/AuthModalWrapper.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
const authStore = useAuthStore()
const isCheckedAuth = ref(false)
authStore.getUser().finally(() => {
  isCheckedAuth.value = true
})
</script>

<template>
  <router-view/>
  <login-modal v-if='!authStore.isLoggedIn && isCheckedAuth'/>
</template>
