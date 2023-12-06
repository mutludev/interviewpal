<script setup>
  defineProps(['headers', 'items'])
</script>

<template>
  <table>
    <tr>
      <th v-for="header in headers" :key="header.value">
        {{ header.text }}
      </th>
    </tr>
    <tr v-for="item in items" :key="item.id">
      <td v-for="header in headers" :key="header.value">
        {{ item[header.value] }}
      </td>
    </tr>
  </table>
</template>

<style scoped>  
table {
  width: 100%;
  text-align: left;
  margin: 10px 10px;
}

th {
  font-weight: bold;
  padding: 10px 0px;
  border-bottom: 1px solid #ddd;
  min-width: 100px;
}

td {
  padding: 10px 0px;
  border-bottom: 1px solid #787878;
}
</style>