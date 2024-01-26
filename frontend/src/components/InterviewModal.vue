<script setup>
  import { useInterviewStore } from '@/stores/useInterviewStore';
  import { useInterviewModalStore } from '@/stores/useInterviewModalStore';
  import { ref } from 'vue'
  const interviewStore = useInterviewStore()
  const interviewModalStore = useInterviewModalStore()
  const activeKey = ref('1')
  const title = ref('')
  const company = ref('')

  async function save() {
    await interviewStore.addInterview({
      title: title.value,
      company: company.value
    })
    interviewModalStore.closeModal()
  }
</script>


<template>
  <modal-wrapper>
    <div class="interview-modal">
      <div class="header">
        <a-input class="company" v-model:value="company" placeholder="Company" />
        <a-input class="title" v-model:value="title" placeholder="Job Title" />
      </div>
      <a-tabs class="tab-pane" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="General">General</a-tab-pane>
        <a-tab-pane key="2" tab="Notes">Notes</a-tab-pane>
        <a-tab-pane key="3" tab="Contacts">Contacts</a-tab-pane>
        <a-tab-pane key="4" tab="Documents">Documents</a-tab-pane>
        <a-tab-pane key="5" tab="Actions">Actions</a-tab-pane>

      </a-tabs>
      <div class="footer">
        <a-button @click="interviewModalStore.closeModal">Cancel</a-button>
        <a-button type="primary" @click="save">Save</a-button>
      </div>
    </div>
  </modal-wrapper>
</template>

<style scoped> 
  .interview-modal {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
</style>