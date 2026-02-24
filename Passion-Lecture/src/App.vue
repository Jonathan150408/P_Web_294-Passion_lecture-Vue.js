<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    Header
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView />

  <footer>Footer</footer>
</template>

<style scoped></style>
