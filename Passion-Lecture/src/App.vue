<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    Header
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/books">Livres</RouterLink>
      <!-- il faudra remplacer les valeurs 1 par un id interactif -->
      <RouterLink to="/books/1">Un livre spécifique (!changer!)</RouterLink>
      <RouterLink to="/users/1">Un utilisateur spécifique (!changer!)</RouterLink>
      <RouterLink to="/books/category/1">Une catégorie spécifique (!changer!)</RouterLink>
    </nav>
  </header>

  <RouterView />

  <footer>Footer</footer>
</template>

<style scoped></style>
