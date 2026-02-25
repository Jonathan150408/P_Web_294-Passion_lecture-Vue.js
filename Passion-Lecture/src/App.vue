<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">
      <img src="./assets/MM-P_Web_294-Logo-Cropped.png" alt="Logo du site" />
    </RouterLink>
    <img src="./assets/MM-logo_utilisateur.webp" alt="Logo d'un utilisateur" />
  </header>

  <aside>
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/books">Livres</RouterLink>
      <!-- il faudra remplacer les valeurs 1 par un id interactif -->
      <RouterLink to="/users/1/books">Un utilisateur spécifique (!changer!)</RouterLink>
      <RouterLink to="/books/category/1">La liste des catégories</RouterLink>
    </nav>
  </aside>
  <RouterView />

  <footer>
    Tous droits réservés © 2026 <a href="mailto:jonathan.junod@eduvaud.ch">Jonathan</a> et
    <a href="mailto:neo.darbellay@eduvaud.ch">Néo</a>
  </footer>
</template>

<style scoped></style>
