<script setup>
import Book from '../../components/Book.vue'
</script>

<template>
  <main>
    <div>
      <h1>Nom de la catégorie</h1>
      <div class="recherche">
        <p>Rechercher</p>
        <img src="" alt="image de loupe" />
      </div>
    </div>
    <!-- Lister les livres -->
    <div>
      <Book></Book>
      <Book></Book>
      <Book></Book>
      <Book></Book>
    </div>
  </main>
</template>

<style scoped></style>
