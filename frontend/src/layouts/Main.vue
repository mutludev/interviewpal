<script setup>
import SidebarSection from '@/layouts/SidebarSection.vue'

</script>

<template>
  <div id='main'>
    <sidebar-section />
    <div id="content">
      <div class='top'>
        Top Nav
      </div>
      <div class='main'>
        Main Content
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #1b1b1b;
  padding: 20px;
}

#content {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  color: #fff;

}

#content .main {
  background-color: #171717;
  border: 1px solid rgb(41, 41, 41);
  border-radius: 8px;
  padding: 16px;
  flex-grow: 1;
}

#content .top {
  padding-bottom: 16px;
}

</style>