<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'
import { message } from 'ant-design-vue';
let name = ref('')
let email = ref('')
let password = ref('')
async function register(){
  let response = await useAuthStore().register(name.value, email.value, password.value)
  if(response == undefined) {
    message.error("Unexpected error occured")
  }
}
</script>

<template>
  <div class='register-wrapper'>
    <span class='register-text'>Create an account</span>
    <input type="text" v-model='name' placeholder="Username" />
    <input type="email" v-model='email' placeholder="Email" />
    <input type="password" v-model='password' placeholder="Password" />
    <button class='register-btn' @click='register'>Register</button>
  </div>
</template>

<style scoped>
.register-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    text-align: center;
}

.register-text {
    color: #ebebeb;
    font-size: 20px;
    font-weight: 600;
}

.register-wrapper > * {
    margin-bottom: 16px;
}

.register-wrapper input {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
}

.register-btn {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
    cursor: pointer;
}

.register-btn:hover {
    background-color: #2d2d2d;
}
</style>