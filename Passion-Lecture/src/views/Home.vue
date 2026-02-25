<script setup>
import Book from '../components/Book.vue'
import HttpService from '../services/HttpService'
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
      <div>
        <Book
          v-for="(book, index) in books"
          :key="index"
          :book="book"
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
