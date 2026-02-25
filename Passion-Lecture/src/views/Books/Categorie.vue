<script setup></script>

<template>
  <main>
    <div>
      <h1>Nom de la catégorie</h1>
      <div class="recherche">
        <p>Rechercher</p>
        <img src="" alt="image de loupe" />
      </div>
    </div>
    <!-- Lister les livres -->
    <div>
      <RouterLink to="/books/1">
        <div>
          <p>Auteur du livre</p>
          <h3>Titre du livre</h3>
        </div>
        <img src="" alt="Background : couverture du livre" />
      </RouterLink>
      <RouterLink to="/books/1">
        <div>
          <p>Auteur du livre</p>
          <h3>Titre du livre</h3>
        </div>
        <img src="" alt="Background : couverture du livre" />
      </RouterLink>
      <RouterLink to="/books/1">
        <div>
          <p>Auteur du livre</p>
          <h3>Titre du livre</h3>
        </div>
        <img src="" alt="Background : couverture du livre" />
      </RouterLink>
      <RouterLink to="/books/1">
        <div>
          <p>Auteur du livre</p>
          <h3>Titre du livre</h3>
        </div>
        <img src="" alt="Background : couverture du livre" />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped></style>
