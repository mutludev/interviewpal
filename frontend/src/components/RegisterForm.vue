<script setup>

</script>

<template>
  <div class='register-wrapper'>
    <span class='register-text'>Create an account</span>
    <input type="text" placeholder="Username" />
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <button class='register-btn'>Register</button>
  </div>
</template>

<style scoped>
.register-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    text-align: center;
}

.register-text {
    color: #ebebeb;
    font-size: 20px;
    font-weight: 600;
}

.register-wrapper > * {
    margin-bottom: 16px;
}

.register-wrapper input {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
}

.register-btn {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
    cursor: pointer;
}

.register-btn:hover {
    background-color: #2d2d2d;
}
</style>