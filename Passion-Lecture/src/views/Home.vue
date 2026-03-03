<script setup>
import Book from '../components/Book.vue'
import BookService from '../services/BookService'
import CategoriesService from '../services/CategoriesService'
import AuthorService from '../services/AuthorService'
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
  <main class="home">
    <div class="hero">
      <div><h1>Bienvenue</h1></div>
    </div>
    <div>
      <h2>Notre But</h2>
      <p>
        Notre site Bibliothèque est un espace communautaire dédié aux passionnés de lecture. À la
        fois base de données de livres et lieu d'échange, il permet de découvrir des ouvrages,
        consulter des fiches détaillées et explorer une vaste collection enrichie par la communauté.
        Les utilisateurs peuvent publier des avis, partager leurs impressions, noter les livres et
        participer à des discussions, à la manière d'un Reddit consacré à la littérature. Notre
        objectif : créer un espace vivant où chaque lecteur peut recommander, débattre et
        construire, ensemble, une bibliothèque collaborative et interactive. 📚
      </p>
      <h2>Les 5 derniers ajouts</h2>
      <!-- Lister les livres -->
      <div class="books">
        <Book
          v-for="(book, index) in books?.slice(0, 5)"
          :key="index"
          :book="book"
          :categoryLabel="getCategoryLabelFromId(book.categoryId)"
          :authorName="getAuthorNameFromId(book.writerId)"
          :appearBig="true"
          :showCategory="true"
        ></Book>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero {
  position: relative;
  left: auto;
  top: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  background: #000 url('/src/assets/MM-P_Web_294-Logo-Cropped.png') no-repeat center center;
  box-shadow: 0 4px 24px 0 rgba(30, 26, 23, 0.1);
  padding: 18rem 3rem 2.5rem;
  margin-top: -40px;
  margin-left: -48px;
  margin-right: -48px;
  margin-bottom: 2.5rem;
  min-height: 180px;
}

.hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: 0.1rem;
  padding-top: 10rem;
}
</style>
