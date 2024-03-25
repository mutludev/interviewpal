<script setup>
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import ModalWrapper from './ModalWrapper.vue'
const isLogin = ref(true)
const authStore = useAuthStore()
</script>

<template>
  <modal-wrapper>
    <a-spin :spinning="authStore.isLoading">
      <div class="modal">
        <div class="greeting">Welcome the Intervio</div>
        <login-form v-if="isLogin" />
        <register-form v-else />

        <button class="auth-switcher" @click="isLogin = !isLogin">
          {{ isLogin ? "Don't have an account" : 'Have an account' }}
        </button>
      </div>
    </a-spin>
  </modal-wrapper>
</template>

<style scoped>
.modal {
  background-color: #171717;
  min-width: 350px;
  min-height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

@media (max-width: 600px) {
  .modal {
    min-width: 100vw;
    min-height: 100vh;
    border-radius: 0;
    justify-content: space-around;
  }
}

.auth-switcher {
  background-color: transparent;
  border: none;
  color: #ebebeb;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
}
.greeting {
  color: #ebebeb;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
