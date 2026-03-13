<script setup>
import Book from '../../components/Book.vue'
import BookService from '../../services/BookService'
import CategoriesService from '../../services/CategoriesService'
import AuthorService from '../../services/AuthorService'
import { ref, onMounted } from 'vue'

//import des livres
const categories = ref(null)

const booksByCategory = ref({})
const authorNames = ref({})
const categoryLabels = ref({})

onMounted(async () => {
  const categoriesData = await CategoriesService.getCategories()
  categories.value = categoriesData.data

  // Fetch books for each category
  categories.value.forEach(async (categorie) => {
    const booksData = await BookService.getBooksFromCategory(categorie.id)

    booksByCategory.value[categorie.id] = booksData.data

    // Récupère aussi les noms d'auteur et les nom de catégories des livres
    categoryLabels.value[categorie.id] = await CategoriesService.getCategoryLabelFromId(
      categorie.id,
    )

    for (const book of booksData.data) {
      if (!authorNames.value[book.writerId]) {
        authorNames.value[book.writerId] = await AuthorService.getAuthorNameFromId(book.writerId)
      }
    }
  })
})
</script>

<template>
  <main>
    <section class="category" v-for="(categorie, index) in categories" :key="index">
      <!-- catégorie -->
      <div class="categoryTitles">
        <h2>{{ categorie.label }}</h2>
        <RouterLink :to="{ name: 'book-category', params: { category_id: categorie.id } }"
          >Voir plus (redirige vers catégorie)</RouterLink
        >
      </div>
      <!-- liste des livres -->
      <div class="books">
        <Book
          v-for="(book, index) in booksByCategory[categorie.id]?.slice(0, 5) || []"
          :key="index"
          :book="book"
          :appearBig="false"
          :show-category="false"
          :category-label="categoryLabels[categorie.id] || '...'"
          :authorName="authorNames[book.writerId] || '...'"
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
