<script setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
defineProps(['value', 'check'])
</script>

<template>
  <div class="editable-checkbox">
    <input
      type="checkbox"
      class="checkbox"
      :checked="check"
      @click="$emit('update:check', $event.target.checked)"
    />
    <input
      type="text"
      class="input"
      :value="value"
      placeholder="Todo"
      @input="$emit('update:value', $event.target.value)"
    />
    <button class="delete" @click="$emit('delete')">
      <delete-outlined />
    </button>
  </div>
</template>

<style scoped>
.editable-checkbox {
  display: flex;
  align-items: center;
  border: 1px solid #303030;
  border-radius: 5px;
}

.checkbox {
  margin: 5px;
  height: 20px;
  aspect-ratio: 1;
  accent-color: #1b1b1b;
}

.input {
  width: 100%;
  padding: 5px;
  border: none;
  background-color: inherit;
  color: #fff;
}

.delete {
  cursor: pointer;
  background-color: inherit;
  border: none;
  color: #fff;
  padding: 5px;
  margin: 5px;
}

.delete:active {
  background-color: #303030;
}

.delete span {
  color: red;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
