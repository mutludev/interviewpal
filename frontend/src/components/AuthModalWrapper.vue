<script setup>
import AuthModal from '@/components/AuthModal.vue'
import { useAuthStore } from '@/stores/useAuthStore'
const authStore = useAuthStore()
</script>

<template>
<div class='modal-bg'>
  <a-spin :spinning='authStore.isLoading'>
    <auth-modal/>
  </a-spin>
</div>
</template>

<style scoped>
.modal-bg {
  position: fixed;;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 27, 27, 0.8);
}
</style>