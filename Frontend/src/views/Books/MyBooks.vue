<script setup>
import Book from '../../components/Book.vue'
import UserService from '../../services/UserService'
import { ref, onMounted } from 'vue'

//import
const books = ref(null)
const authorNames = ref({})
const categoryLabels = ref({})

onMounted(async () => {
  const response = await UserService.me()

  const user = response.data

  books.value = user.books

  // catégories et auteurs
  for (const book of books.value) {
    if (book.belong?.length > 0) {
      categoryLabels.value[book.id] = book.belong.map((b) => b.categorie.label).join(', ')
    }

    if (book.writer) {
      authorNames.value[book.id] = `${book.writer.firstname} ${book.writer.lastname}`
    }
  }
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
        :hasButtons="true"
        :appearBig="false"
        :showCategory="true"
      ></Book>
    </div>
  </main>
</template>

<style scoped></style>
