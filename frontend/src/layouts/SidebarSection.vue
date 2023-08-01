<script setup>
import { useSidebarStore } from '@/stores/useSidebarStore'
import SidebarToggleButton from '@/components/SidebarToggleButton.vue'

let sidebar = useSidebarStore()
</script>

<template>
  <div id='sidebar' :hidden='!sidebar.isOpen'>
    <div class='header'>
      <span>Interview Tracker</span>
      <sidebar-toggle-button/>
    </div>

    <ul class='links'>
      <li><router-link to='/'>Interviews</router-link></li>
      <li><router-link to='/documents'>Documents</router-link></li>
    </ul>

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

.links {
    list-style: none;
    padding-top: 50px;
}

.links li a {
    text-decoration: none;
    color: #b3b3b3;

}

</style>