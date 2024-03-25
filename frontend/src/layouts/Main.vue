<script setup>
import SidebarToggleButton from '@/components/SidebarToggleButton.vue'
import { useSidebarStore } from '@/stores/SidebarStore'
import SidebarSection from '@/layouts/SidebarSection.vue'
import { useRoute } from 'vue-router'

const sidebar = useSidebarStore()
const route = useRoute()
</script>

<template>
  <div id="main">
    <sidebar-section />
    <div :class="`content ${sidebar.isOpen ? 'content-collapse' : ''}`">
      <div class="top" v-if="!sidebar.isOpen">
        <sidebar-toggle-button />
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
  align-items: center;
}
</style>
