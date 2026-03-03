<script setup>
import Book from '../../components/Book.vue'
</script>

<template>
  <main>
    <div>
      <h1>Mes livres</h1>
    </div>

    <div class="books">
      <Book
        v-for="(book, index) in books"
        :key="index"
        :book="book"
        :appearBig="false"
        :showCategory="true"
      ></Book>
    </div>
  </main>
</template>

<style scoped></style>
