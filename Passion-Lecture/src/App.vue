<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import CategorieService from './services/CategoriesService.js'

const categories = ref(null)
onMounted(() => {
  CategorieService.getCategories()
    .then((response) => {
      categories.value = response.data
      console.log(categories.value)
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <header>
    <RouterLink to="/">
      <img src="./assets/MM-P_Web_294-Logo-Cropped.png" alt="Logo du site" />
    </RouterLink>
    <RouterLink to="/my-books">
      <img src="./assets/MM-logo_utilisateur.png" alt="Logo d'un utilisateur" />
    </RouterLink>
  </header>

  <aside>
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/books">Livres</RouterLink>
      <!-- il faudra remplacer les valeurs 1 par un id interactif -->
      <RouterLink
        v-for="categorie in categories"
        :key="categorie.id"
        :to="`/books/category/${categorie.id}`"
        class="indented"
        >{{ categorie.label }}</RouterLink
      >
    </nav>
    <div class="aside-bottom-link">
      <RouterLink to="/books/create">+ Ajouter un livre</RouterLink>
    </div>
  </aside>
  <RouterView />

  <footer>
    Tous droits réservés © 2026 <a href="mailto:jonathan.junod@eduvaud.ch">Jonathan</a> et
    <a href="mailto:neo.darbellay@eduvaud.ch">Néo</a>
  </footer>
</template>

<style scoped></style>
