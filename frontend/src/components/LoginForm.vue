<script setup>

</script>

<template>
  <div class='login-wrapper'>
    <span class='login-text'>Sign in</span>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <button class='login-btn'>Login</button>
  </div>
</template>

<style scoped>
.login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    text-align: center;
}

.login-text {
    color: #ebebeb;
    font-size: 20px;
    font-weight: 600;
}

.login-wrapper > * {
    margin-bottom: 16px;
}

.login-wrapper input {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
}

.login-btn {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 8px;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #2d2d2d;
}
</style>