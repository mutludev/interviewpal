<script setup lang="ts">
import SidebarToggleButton from '@/components/SidebarToggleButton.vue'
import SidebarSection from '@/layouts/SidebarSection.vue';
import { useRoute } from 'vue-router'
import { ref } from "vue";

const route = useRoute()
const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div id="main">
    <sidebar-section :open="isSidebarOpen" @close="toggleSidebar" />
    <div class="content" :class="{'content-collapse': isSidebarOpen}">
      <div class="top" v-if="!isSidebarOpen">
        <sidebar-toggle-button @toggle="toggleSidebar" :open="isSidebarOpen" />
        <span>{{ route.name || 'Intervio' }}</span>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: row;
  height: 100svh;
  background-color: #1b1b1b;
  padding: 20px;
}

.content {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  color: #fff;
  overflow: auto;
}

@media screen and (max-width: 650px) {
  .content-collapse {
    display: none;
  }
}

.content .main {
  background-color: #171717;
  border: 1px solid rgb(41, 41, 41);
  border-radius: 8px;
  padding: 8px;
  flex-grow: 1;
  overflow: hidden;
}

.content .top {
  padding-bottom: 8px;
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
