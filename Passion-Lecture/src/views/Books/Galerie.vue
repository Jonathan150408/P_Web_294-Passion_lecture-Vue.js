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

function getCategoryLabelFromId(id) {
  if (!categories.value) return '...'

  const category = categories.value.find((c) => c.id == id)
  return category ? category.label : 'Catégorie inconnue'
}

function getAuthorNameFromId(id) {
  if (!authors.value) return '...'

  const author = authors.value.find((a) => a.id == id)
  return author ? `${author.firstname} ${author.lastname}` : 'Auteur inconnu'
}
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
          :authorName="getAuthorNameFromId(book.writerId)"
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
