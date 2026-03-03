<script setup>
import Book from '../../components/Book.vue'
import HttpService from '../../services/HttpService'
import { ref, onMounted } from 'vue'

//import des livres
const books = ref(null)
onMounted(() => {
  HttpService.getBooks()
    .then((response) => {
      books.value = response.data
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
