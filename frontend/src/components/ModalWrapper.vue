<template>
  <Teleport to='body'>
  <div class='modal-bg'>
    <slot></slot>
  </div>
  </Teleport>
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