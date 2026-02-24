<script setup></script>

<template>
  <main>
    <!-- lister les catégories -->
    <ul>
      <li class="categorie">
        <h2>Nom de la catégorie</h2>
        <!-- lister les livres -->
        <ul>
          <li class="livre">
            <!-- ! CHANGER - routerlink statique pour le moment -->
            <RouterLink to="/books/1">
              <img src="" alt="Couverture du livre" />
              <p>Auteur</p>
              <strong>Titre du livre</strong>
            </RouterLink>
          </li>
        </ul>
        <!-- lien vers la page de la catégorie -->
        <RouterLink to="/books/category/1">La liste des catégories</RouterLink>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
