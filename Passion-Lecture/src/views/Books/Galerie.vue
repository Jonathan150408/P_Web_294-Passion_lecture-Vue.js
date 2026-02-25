<script setup>
import Book from '../../components/Book.vue'
</script>

<template>
  <main>
    <section>
      <!-- catégorie 1 -->
      <div>
        <h2>Titre de la catégorie</h2>
        <RouterLink to="/books/category/1">Voir plus (redirige vers catégorie)</RouterLink>
      </div>
      <!-- liste des livres -->
      <div>
        <Book></Book>
        <Book></Book>
        <Book></Book>
      </div>
    </section>
    <section>
      <!-- catégorie 2 -->
      <div>
        <h2>Titre de la catégorie</h2>
        <RouterLink to="/books/category/1">Voir plus (redirige vers catégorie)</RouterLink>
      </div>
      <!-- liste des livres -->
      <div>
        <Book></Book>
        <Book></Book>
        <Book></Book>
      </div>
    </section>
    <section>
      <!-- catégorie 3 -->
      <div>
        <h2>Titre de la catégorie</h2>
        <RouterLink to="/books/category/1">Voir plus (redirige vers catégorie)</RouterLink>
      </div>
      <!-- liste des livres -->
      <div>
        <Book></Book>
        <Book></Book>
        <Book></Book>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
