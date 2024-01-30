<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import AuthModal from './components/AuthModal.vue'
const authStore = useAuthStore()
const isCheckedAuth = ref(false)
authStore.getUser().finally(() => {
  isCheckedAuth.value = true
})

const theme = {
    token: {
      colorPrimary: "#fff",
      colorBgBase: "#1b1b1b",
      colorTextBase: "#fff",
      colorBorder: "#303030", 
      colorPrimaryText: "#000",
      colorTextLightSolid: "#000",
    }
  }


</script>

<template>
  <a-config-provider
    :theme="theme"
  >
  <router-view/>
  <AuthModal v-if='!authStore.isLoggedIn && isCheckedAuth'/>

  </a-config-provider>
</template>
