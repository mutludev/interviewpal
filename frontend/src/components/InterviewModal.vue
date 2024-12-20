<script setup lang="ts">
import ModalWrapper from './ModalWrapper.vue'
import EditableCheckbox from './EditableCheckbox.vue'
import { ref, defineEmits } from 'vue'
import { DatePicker } from 'ant-design-vue'
import dayjs from 'dayjs'
import { Icon } from '@iconify/vue'

const interviewStatusOptions = [
  { label: 'Wishlist⭐️', value: 'wishlist' },
  { label: 'Applied👏🏻', value: 'applied' },
  { label: 'Rejected❌', value: 'rejected' },
  { label: 'Accepted✅', value: 'accepted' }
]

import { useInterviewStore } from '@/stores/InterviewStore'
const interviewStore = useInterviewStore()

const emit = defineEmits(['close'])
const props = defineProps(['content'])

const data = ref(props.content || {})
const saving = ref(false)
const activeKey = ref('1')
let deadline = ref(dayjs(data.value.deadline))

async function save() {
  try {
    saving.value = true
    data.value.deadline = dayjs(deadline.value).format('YYYY-MM-DD')
    if (!Object.hasOwn(data.value, '_id')) {
      await interviewStore.addInterview(data.value)
    } else {
      await interviewStore.updateInterview({
        id: data.value._id,
        ...data.value
      })
    }
    emit('close')
  } finally {
    saving.value = false
  }
}

async function deleteInterview(id: string) {
  await interviewStore.deleteInterview(id)
  emit('close')
}

function addNewTodo() {
  if (data.value.todos) {
    data.value.todos.push({ value: '', check: false })
  } else {
    data.value.todos = [{ value: '', check: false }]
  }
}

function toggleArchive() {
  data.value.archived = !data.value.archived
}
</script>

<template>
  <modal-wrapper>
    <div class="interview-modal">
      <div class="header">
        <div class="section">
          <a-select
            v-model:value="data.status"
            style="width: 120px"
            :options="interviewStatusOptions"
            placeholder="Status"
          />
          <a-button @click="toggleArchive">
            <icon
              :icon="data.archived ? 'solar:archive-check-linear' : 'solar:archive-outline'"
              height="24"
            />
          </a-button>
        </div>
        <a-input class="company" v-model:value="data.company" placeholder="Company" />
        <a-input class="title" v-model:value="data.title" placeholder="Job Title" />
      </div>
      <a-tabs class="tab-pane" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="General">
          <a-space direction="vertical" style="width: 100%">
            <div class="first-input-stack">
              <a-input v-model:value="data.url" placeholder="Url" />
              <date-picker class="date-picker" v-model:value="deadline" format="DD/MM/YYYY" />
            </div>
            <a-textarea rows="2" v-model:value="data.description" placeholder="Description" />
          </a-space>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Notes">
          <a-textarea rows="4" v-model:value="data.notes" placeholder="Notes" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Todos">
          <a-space direction="vertical" style="width: 100%">
            <editable-checkbox
              v-for="(todo, index) in data.todos"
              v-bind:key="index"
              v-model:value="todo.value"
              v-model:check="todo.check"
              @delete="() => data.todos.splice(index, 1)"
            />
            <a-button style="width: 100%" @click="addNewTodo">New Todo</a-button>
          </a-space>
        </a-tab-pane>
      </a-tabs>
      <div class="footer">
        <a-popconfirm
          v-if="content != undefined"
          title="Delete?"
          @confirm="deleteInterview(data._id)"
        >
          <a-button danger>Delete</a-button>
        </a-popconfirm>
        <a-button @click="emit('close')">Cancel</a-button>
        <a-button type="primary" @click="save" :loading="saving" :disabled="saving">Save</a-button>
      </div>
    </div>
  </modal-wrapper>
</template>

<style scoped>
.interview-modal {
  background-color: #171717;
  border: 1px solid #303030;
  border-radius: 4px;
  padding: 20px;
  width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 700px) {
  .interview-modal {
    width: 100%;
    border-radius: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
  }

  .interview-modal .header input {
    width: 100% !important;
  }

  .interview-modal .footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}

.interview-modal .header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.interview-modal .header input {
  margin-block: 10px;
  width: 300px;
}

.tab-pane {
  height: 300px;
}

.interview-modal .footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.interview-modal .footer button {
  margin-inline-start: 10px;
}

.first-input-stack {
  display: flex;
  gap: 10px;
}

.date-picker {
  min-width: 200px;
}

.header > .section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header > .section > button {
  line-height: 0;
  aspect-ratio: 1;
  height: 40px;
  padding: 0;
}
</style>
