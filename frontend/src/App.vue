<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import AuthModal from './components/AuthModal.vue'
const authStore = useAuthStore()
const isCheckedAuth = ref(false)
authStore.getUser().finally(() => {
  isCheckedAuth.value = true
})
</script>

<template>
  <router-view/>
  <AuthModal v-if='!authStore.isLoggedIn && isCheckedAuth'/>
</template>
