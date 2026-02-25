<script setup>
import Comments from '../../components/Comments.vue'
</script>

<template>
  <main>
    <h1>Nom du livre</h1>
    <section>
      <img src="" alt="Couverture du livre" />

      <div>
        <div>
          <h2>Résumé</h2>
          <p>Résumé de livre à rendre interactif</p>
        </div>
        <div>
          <h2>Catégories</h2>
          <ul>
            <!-- liste des catégories -->
            <li>
              <RouterLink to="/books/category/1">Catégorie 1</RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <p>Nombre de pages</p>
          <p>Lien-vers-extrait</p>
          <p>Auteur</p>
          <p>Éditeur</p>
        </div>
        <p>Noté ⭐⭐⭐⭐</p>
      </div>
      <div>
        <a href="">Supprimer le livre (non-fonctionel)</a>
        <a href="">Modifier le livre (non-fonctionel)</a>
      </div>
    </section>
    <section>
      <Comments></Comments>
    </section>
  </main>
</template>

<style scoped></style>
