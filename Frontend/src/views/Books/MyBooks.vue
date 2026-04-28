<script setup>
import Book from '../../components/Book.vue'
import BookService from '../../services/BookService'
import CategoriesService from '../../services/CategoriesService'
import AuthorService from '../../services/AuthorService'
import { ref, onMounted } from 'vue'

//import
const books = ref(null)
const authorNames = ref({})
const categoryLabels = ref({})

onMounted(async () => {
  // livres
  const booksData = await BookService.getBooksFromUser(1)
  books.value = booksData.data

  // catégories et auteurs
  for (const book of books.value) {
    if (!categoryLabels.value[book.categoryId]) {
      categoryLabels.value[book.categoryId] = await CategoriesService.getCategoryLabelFromId(
        book.categoryId,
      )
    }

    if (!authorNames.value[book.writerId]) {
      authorNames.value[book.writerId] = await AuthorService.getAuthorNameFromId(book.writerId)
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
        :categoryLabel="categoryLabels[book.categoryId] || '...'"
        :authorName="authorNames[book.writerId] || '...'"
        :appearBig="false"
        :showCategory="true"
      ></Book>
    </div>
  </main>
</template>

<style scoped></style>
