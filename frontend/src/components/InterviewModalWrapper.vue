<script setup>
import InterviewModal from '@/components/InterviewModal.vue'
</script>

<template>
    <div class='modal-bg'>
        <interview-modal/>
    </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 27, 27, 0.8);
}
</style>