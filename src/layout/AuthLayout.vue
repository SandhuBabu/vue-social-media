<script setup></script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
}

form {
  width: 30em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 1em 2em;
  border-radius: 5px;
}

@media (width <= 576px) {
  form {
    width: 100%;
    box-shadow: none;
  }
}
</style>
