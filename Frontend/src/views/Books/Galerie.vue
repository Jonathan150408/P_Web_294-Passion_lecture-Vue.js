<script setup>
import Book from '../../components/Book.vue'
import BookService from '../../services/BookService'
import CategoriesService from '../../services/CategoryService'
import AuthorService from '../../services/AuthorService'
import { ref, onMounted } from 'vue'

//import
const categories = ref(null)
const booksByCategory = ref({})
const authorNames = ref({})
const categoryLabels = ref({})

onMounted(async () => {
  const categoriesData = await CategoriesService.getCategories()
  categories.value = categoriesData.data.data
})
</script>

<template>
  <main>
    <section class="category" v-for="(category, index) in categories" :key="index">
      <!-- catégorie -->
      <div class="categoryTitles">
        <h2>{{ category.label }}</h2>
        <RouterLink :to="{ name: 'book-category', params: { category_id: category.id } }">Voir plus (redirige vers
          catégorie)</RouterLink>
      </div>

      {{ console.log(category.belong) }}
      <!-- liste des livres -->
      <div class="books">
        <Book v-for="(belong, index) in category.belong?.slice(0, 5) || []" :key="index" :book="belong.book"
          :appearBig="false" :show-category="false"></Book>
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
