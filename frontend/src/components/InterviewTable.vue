<script setup>
import { onMounted, h, ref } from 'vue'
import GenericTable from '@/components/GenericTable.vue'
import { EditOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons-vue'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { useInterviewStore } from '@/stores/InterviewStore'
import { useInterviewModalStore } from '@/stores/InterviewModalStore'
const interviewStore = useInterviewStore()
const interviewModalStore = useInterviewModalStore()

const headers = [
  { text: 'Company', value: 'company' },
  { text: 'Title', value: 'title' },
  { text: 'Deadline', value: 'deadline' },
  { text: 'Status', value: 'latest-action' },
  { text: 'Actions', value: 'actions' }
]

const statusOptions = [
  {
    name: 'wishlist',
    text: 'Wishlist⭐️️',
    baseColor: '#ffeed6',
    activeColor: '#ff981c'
  },
  {
    name: 'applied',
    text: 'Applied👏🏻',
    baseColor: '#f2e3fa',
    activeColor: '#b764e1'
  },
  {
    name: 'accepted',
    text: 'Accepted✅',
    baseColor: '#dff6e4',
    activeColor: '#48c866'
  },
  {
    name: 'rejected',
    text: 'Rejected❌',
    baseColor: '#ffe0de',
    activeColor: '#ff5047'
  }
]

function statusToStyleAdapter(status) {
  return { '--base-color': status.baseColor, '--active-color': status.activeColor }
}

const statusFilter = ref(new Set())
const archivedFilter = ref(false)

function changeStatus(name) {
  console.log(name)
  if (statusFilter.value.has(name)) {
    statusFilter.value.delete(name)
  } else {
    statusFilter.value.add(name)
  }
}

function filterItems(items) {
  if (!archivedFilter.value) {
    items = items.filter((item) => !item.archived)
  }
  if (statusFilter.value.size == 0) {
    return items
  }
  return items.filter((item) => {
    return statusFilter.value.has(item.status)
  })
}

function toggleArchived() {
  archivedFilter.value = !archivedFilter.value
}

onMounted(() => {
  interviewStore.fetchInterviews()
})
</script>

<template>
  <div class="toolbar">
    <a-button :icon="h(PlusOutlined)" size="small" @click="interviewModalStore.openModal()"
      >Create new job</a-button
    >
    <a-button
      :icon="h(ReloadOutlined)"
      size="small"
      @click="interviewStore.fetchInterviews"
      :loading="interviewStore.isLoading"
      >Refresh</a-button
    >
    <a-button class="archive" size="small" @click="toggleArchived">
      {{ archivedFilter ? 'Hide archived' : 'Show Archived' }}
    </a-button>
    <div class="chips">
      <div
        class="chip"
        :class="{ active: statusFilter.has(status.name) }"
        :style="statusToStyleAdapter(status)"
        @click="changeStatus(status.name)"
        v-for="status in statusOptions"
        :key="status.name"
      >
        {{ status.text }}
      </div>
    </div>
  </div>
  <div class="job-table">
    <a-spin :spinning="interviewStore.getLoading">
      <generic-table :headers="headers" :items="filterItems(interviewStore.getInterviews)">
        <template #company="{ item }">
          <img
            v-if="item.url"
            :src="`https://www.google.com/s2/favicons?domain=${item.url}`"
            target="_blank"
          />
          <span v-else>🏢</span>
          {{ item.company }}
        </template>
        <template #actions="{ item }">
          <a-button
            :icon="h(EditOutlined)"
            size="small"
            @click="interviewModalStore.openModal(item)"
            >Edit</a-button
          >
        </template>
        <template #deadline="{ item }">
          {{ dayjs(item.deadline).fromNow() }}
        </template>
        <template #title="{ item }">
          <a v-if="item.url" :href="item.url" target="_blank"
            >{{ item.title }} <span class="pi pi-link"
          /></a>
          <span v-else>{{ item.title }}</span>
        </template>
        <template #latest-action="{ item }">
          {{
            item.archived ? 'Archived📦' : statusOptions.find((i) => i.name === item.status)?.text
          }}
        </template>
      </generic-table>
    </a-spin>
  </div>
</template>

<style scoped>
a {
  color: #fff;
}

.job-table {
  overflow: auto;
  flex-grow: 1;
}

.toolbar {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  overflow: auto;
}

.chip {
  border: 1px solid var(--active-color);
  color: var(--active-color);
  background-color: var(--base-color);
  border-radius: 40px;
  text-align: center;
  font-size: 14px;
  padding: 4px 10px;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
}

.chip.active {
  background-color: var(--active-color);
  color: white;
}

button.archive {
  width: 120px;
}
</style>
