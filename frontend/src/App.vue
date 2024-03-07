<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import AuthModal from './components/AuthModal.vue'
import { theme } from './config/theme'
const authStore = useAuthStore()
const isCheckedAuth = ref(false)
authStore.getUser().finally(() => {
  isCheckedAuth.value = true
})
</script>

<template>
  <a-config-provider :theme="theme">
  <router-view/>
  <AuthModal v-if='!authStore.isLoggedIn && isCheckedAuth'/>
  </a-config-provider>
</template>
