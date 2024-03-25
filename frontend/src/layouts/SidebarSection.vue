<script setup>
import { useSidebarStore } from '@/stores/SidebarStore'
import { useAuthStore } from '@/stores/AuthStore'
import SidebarToggleButton from '@/components/SidebarToggleButton.vue'

let sidebar = useSidebarStore()
let auth = useAuthStore()

sidebar.$subscribe((modify, state) => {
  if (state.open && window.innerWidth <= 650) {
    const aTags = document.querySelectorAll('#sidebar a')
    aTags.forEach((a) => {
      a.addEventListener('click', () => {
        sidebar.close()
      })
    })
  }
})
</script>

<template>
  <div id="sidebar" v-if="sidebar.isOpen">
    <div class="header">
      <router-link class="company-text" to="/">Interview Tracker</router-link>
      <sidebar-toggle-button />
    </div>

    <ul class="links">
      <li><router-link to="/">Interviews</router-link></li>
      <li><router-link to="/documents">Documents</router-link></li>
    </ul>

    <div class="spacer" />
    <ul class="links">
      <li><router-link to="/me">My Account</router-link></li>
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
    min-width: none;
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
