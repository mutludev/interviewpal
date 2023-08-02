<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'
let email = ref('')
let password = ref('')
async function login(){
  await useAuthStore().login(email.value, password.value)
}
</script>

<template>
  <div class='login-wrapper'>
    <span class='login-text'>Sign in</span>
    <input type="email" v-model='email' placeholder="Email" />
    <input type="password" v-model='password' placeholder="Password" />
    <button @click='login' class='login-btn'>Login</button>
  </div>
</template>

<style scoped>
.login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    text-align: center;
}

.login-text {
    color: #ebebeb;
    font-size: 20px;
    font-weight: 600;
}

.login-wrapper > * {
    margin-bottom: 16px;
}

.login-wrapper input {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
}

.login-btn {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #2d2d2d;
}
</style>