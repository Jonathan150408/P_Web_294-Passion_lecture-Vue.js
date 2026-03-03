<script setup>
import Book from '../../components/Book.vue'
import HttpService from '@/services/HttpService'
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

//import des catégories
const categories = ref(null)
onMounted(() => {
  HttpService.getCategories()
    .then((response) => {
      categories.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <main>
    <section class="category" v-for="(categorie, index) in categories" :key="index">
      <!-- catégorie -->
      <div class="categoryTitles">
        <h2>{{ categorie.label }}</h2>
        <RouterLink :to="`/books/category/${categorie.id}`"
          >Voir plus (redirige vers catégorie)</RouterLink
        >
      </div>
      <!-- liste des livres -->
      <div class="books">
        <Book
          v-for="(book, index) in books"
          :key="index"
          :book="book"
          v-show="book.categoryId === categorie.id"
        ></Book>
      </div>
    </section>
  </main>
</template>

<style scoped>
.category {
  background-color: white;
  border-radius: 2rem;

  margin: 2rem 0;
  padding: 0 2rem 1rem;
}

.categoryTitles {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.categoryTitles * {
  color: black;
}
</style>
