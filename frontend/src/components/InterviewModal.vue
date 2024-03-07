<script setup>
  import ModalWrapper from './ModalWrapper.vue';
  import { ref, defineEmits } from 'vue'
  import { DatePicker } from 'ant-design-vue';
  import dayjs from 'dayjs'
  const interviewStatusOptions = [
    { label: 'Wishlist⭐️', value: 'wishlist' },
    { label: 'Applied👏🏻', value: 'applied' },
    { label: 'Rejected❌', value: 'rejected' },
    { label: 'Accepted✅', value: 'accepted' }
  ]
  
  import { useInterviewStore } from '@/stores/InterviewStore';
  import { useInterviewModalStore } from '@/stores/InterviewModalStore';
  const interviewModalStore = useInterviewModalStore()
  const interviewStore = useInterviewStore()

  const emit = defineEmits(['close'])

  const data = ref(interviewModalStore.content ? interviewModalStore.content : {})  

  const activeKey = ref('1')
  let deadline = ref(dayjs(data.value.deadline))

  async function save() {
    data.value.deadline = dayjs(deadline.value).format('YYYY-MM-DD')
    if (!Object.hasOwn(data.value, '_id')) {
      await interviewStore.addInterview(data.value)
    } else {
      await interviewStore.updateInterview({
        id: data.value._id,
        ...data.value
      })
    }
    interviewModalStore.closeModal()
  }

  async function deleteInterview(id) {
    await interviewStore.deleteInterview(id)
    interviewModalStore.closeModal()
  }
</script>


<template>
  <modal-wrapper>
    <div class="interview-modal">
      <div class="header">
        <a-select v-model:value="data.status" style="width: 120px" :options="interviewStatusOptions" placeholder="Status"></a-select>
        <a-input class="company" v-model:value="data.company" placeholder="Company" />
        <a-input class="title" v-model:value="data.title" placeholder="Job Title" />
      </div>
      <a-tabs class="tab-pane" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="General">
          <a-space direction="vertical" style="width: 100%;">
            <div class="first-input-stack">
              <a-input v-model:value="data.url" placeholder="Url" />
              <date-picker class="date-picker" v-model:value="deadline" format="DD/MM/YYYY"/>
            </div>
            <a-textarea rows=2 v-model:value="data.description" placeholder="Description" />
          </a-space>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Notes">
          <a-textarea rows=4 v-model:value="data.notes" placeholder="Notes" />
        </a-tab-pane>
      </a-tabs>
      <div class="footer">
        <a-popconfirm v-if="interviewModalStore.content != undefined" title="Delete?" @confirm="deleteInterview(data._id)">
          <a-button danger>Delete</a-button>
        </a-popconfirm>
        <a-button @click="emit('close')">Cancel</a-button>
        <a-button type="primary" @click="save">Save</a-button>
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

</style>