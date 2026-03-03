<script setup>
import Book from '../../components/Book.vue'
import BookService from '../../services/BookService'
import CategoriesService from '../../services/CategoriesService'
import AuthorService from '../../services/AuthorService'
import { ref, onMounted } from 'vue'

//import des livres
const books = ref(null)
const categories = ref(null)
const authors = ref(null)

onMounted(() => {
  BookService.getBooks()
    .then((response) => {
      books.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  CategoriesService.getCategories()
    .then((response) => {
      categories.value = response.data
      console.log(categories.value)
    })
    .catch((error) => {
      console.log(error)
    })
  AuthorService.getAuthors()
    .then((response) => {
      authors.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
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
