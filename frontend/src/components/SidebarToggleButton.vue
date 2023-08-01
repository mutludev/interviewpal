<script setup>
import { useSidebarStore } from '@/stores/useSidebarStore'
let sidebar = useSidebarStore()
</script>

<template>
  <button class="sidebar-toggle-button" @click='sidebar.toggle'>
    <span v-if='sidebar.isOpen' class="pi pi-arrow-circle-left sidebar-icon" />
    <span v-else class="pi pi-arrow-circle-right sidebar-icon" />
  </button>
</template>

<style scoped>
.sidebar-toggle-button {
    border: none;
    background: inherit;
    cursor: pointer;
    color: #666666;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar-icon {
    font-size: 1rem;
}
</style>