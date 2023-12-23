<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { message } from 'ant-design-vue';
import { ref, onMounted } from 'vue'
let email = ref('')
let emailField = ref(null)
let password = ref('')
let emailEmpty = ref(false)
let passwordEmpty = ref(false)
onMounted(() => {
  emailField.value.focus()
})
async function login(){
  const emailFilled = email.value.trim().length !== 0
  const passwordFilled = password.value.trim().length !== 0
  if(emailFilled && passwordFilled){
    emailEmpty.value = false
    passwordEmpty.value = false
  } else if (!emailFilled && !passwordFilled){
    emailEmpty.value = true
    passwordEmpty.value = true
    return message.error('Email and password are required')
  } else if (!emailFilled){
    emailEmpty.value = true
    passwordEmpty.value = false
    return message.error('Email is required')
  } else if (!passwordFilled){
    passwordEmpty.value = true
    emailEmpty.value = false
    return message.error('Password is required')
  }
  let response = await useAuthStore().login(email.value, password.value)
  if(!response){
    message.error('Invalid credentials')
  }
}
</script>

<template>
  <div class='login-wrapper'>
    <span class='login-text'>Sign in</span>
    <input id="email" :class='emailEmpty ? "error" : ""' type="email" v-model='email' ref="emailField" placeholder="Email" />
    <input :class='passwordEmpty ? "error" : ""' type="password" v-model='password' ref="passwordField" v-on:keyup.enter="login" placeholder="Password" />
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

.error {
    border: 1px solid red !important;
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