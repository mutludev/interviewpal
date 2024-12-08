<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import SidebarToggleButton from '@/components/SidebarToggleButton.vue'
import { sidebarLinks } from '@/config/sidebarLinks'

defineProps(['open'])
const emit = defineEmits(['close'])

let auth = useAuthStore()

function handleButtonClick() {
  if(window.innerWidth <= 650) {
    emit('close')
  }
}
</script>

<template>
  <div id="sidebar" v-if="open">
    <div class="header">
      <router-link @click="handleButtonClick" class="company-text" to="/">Interview Tracker</router-link>
      <sidebar-toggle-button :open="open" @toggle="$emit('close')" />
    </div>

    <ul class="links">
      <li v-for="(link, i) in sidebarLinks" :key="i">
        <router-link @click="handleButtonClick" :to="link.to">{{ link.label }}</router-link>
      </li>
    </ul>

    <div class="spacer" />
    <ul class="links">
      <li><router-link @click="handleButtonClick" to="/me">My Account</router-link></li>
      <li><a href="#" @click.prevent="auth.logout">Logout</a></li>
    </ul>
  </div>
</template>

<style scoped>
.company-text {
  color: white;
  text-decoration: none;
}

#sidebar {
  min-width: 200px;
  background-color: #1b1b1b;
  color: #fff;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 650px) {
  #sidebar {
    min-width: auto;
    width: 100%;
  }
}

#sidebar .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
}

.links {
  list-style: none;
  padding-top: 50px;
}

.links li {
  margin-right: 20px;
  border-radius: 5px;
}

.links li a {
  display: inline-block;
  width: 100%;
  height: 25px;
  padding: 3px 2px;
}

.links li:hover {
  background-color: #2b2b2b;
}

.links li a {
  text-decoration: none;
  color: #b3b3b3;
}

.spacer {
  flex-grow: 1;
}
</style>
