<script setup lang="ts">
import { Icon } from '@iconify/vue'
defineProps(['open'])
defineEmits(['toggle'])
</script>

<template>
  <button @click="$emit('toggle')">
    <icon v-if="open" icon="mingcute:arrow-left-fill"/>
    <icon v-else icon="mingcute:arrow-right-fill" />
  </button>
</template>

<style scoped>
button {
  border: none;
  border-radius: 4px;
  background: inherit;
  cursor: pointer;
  color: #666666;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
button:hover {
  background-color: #222222;
}

svg {
  font-size: 1.2rem;
}
</style>
