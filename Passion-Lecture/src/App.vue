<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import CategoriesService from './services/CategoriesService.js'

const categories = ref(null)
onMounted(async () => {
  const categoriesData = await CategoriesService.getCategories()
  categories.value = categoriesData.data
})
</script>

<template>
  <header>
    <RouterLink :to="{ name: 'home' }">
      <img src="./assets/MM-P_Web_294-Logo-Cropped.png" alt="Logo du site" />
    </RouterLink>
    <RouterLink :to="{ name: 'my-books' }">
      <img src="./assets/MM-P_Web_294-Logo-Utilisateur.png" alt="Logo d'un utilisateur" />
    </RouterLink>
  </header>

  <aside>
    <nav>
      <RouterLink :to="{ name: 'home' }">Accueil</RouterLink>
      <RouterLink :to="{ name: 'books' }">Livres</RouterLink>
      <RouterLink
        v-for="category in categories"
        :key="category.id"
        :to="{ name: 'book-category', params: { category_id: category.id } }"
        class="indented"
        >{{ category.label }}</RouterLink
      >
    </nav>
    <div class="aside-bottom-link">
      <RouterLink :to="{ name: 'create-book' }">+ Ajouter un livre</RouterLink>
    </div>
  </aside>
  <RouterView />

  <footer>
    Tous droits réservés © 2026 <a href="mailto:jonathan.junod@eduvaud.ch">Jonathan</a> et
    <a href="mailto:neo.darbellay@eduvaud.ch">Néo</a>
  </footer>
</template>

<style scoped></style>
