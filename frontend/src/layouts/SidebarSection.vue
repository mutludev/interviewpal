<script setup>

import { useSidebarStore } from '@/stores/useSidebarStore'
import SidebarToggleButton from '@/components/SidebarToggleButton.vue'

let sidebar = useSidebarStore()
</script>

<template>
  <div id='sidebar' :hidden='!sidebar.isOpen'>
    <div class='header'>
      SideBar
      <sidebar-toggle-button/>
    </div>

  </div>
</template>

<style scoped>

#sidebar {
    width: 200px;
    background-color: #1b1b1b;
    color: #fff;
}

#sidebar .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 8px;
}

</style>