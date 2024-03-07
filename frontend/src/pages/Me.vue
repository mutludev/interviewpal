<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'

const authStore = useAuthStore()
let user = ref(null)
authStore.getUser().then((res) => {
  console.log(res)
  user.value = res
})
</script>

<template>
  Me
  {{ user }}
</template>

<style scoped>

</style>