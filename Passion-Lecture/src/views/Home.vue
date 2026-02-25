<script setup></script>

<template>
  <main>
    <div>
      <div><h1>Bienvenue</h1></div>
      <img src="../assets/MM-P_Web_294-Logo-Cropped.png" alt="Bannière du site / hero" />
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
        <RouterLink to="/books/1">
          <div>
            <div>
              <p>Éditeur</p>
              <p>Type (BD)</p>
            </div>
            <p>Titre du livre</p>
          </div>
          <img src="" alt="En background : couverture du livre" />
        </RouterLink>
        <RouterLink to="/books/1">
          <div>
            <div>
              <p>Éditeur</p>
              <p>Type (BD)</p>
            </div>
            <p>Titre du livre</p>
          </div>
          <img src="" alt="En background : couverture du livre" />
        </RouterLink>
        <RouterLink to="/books/1">
          <div>
            <div>
              <p>Éditeur</p>
              <p>Type (BD)</p>
            </div>
            <p>Titre du livre</p>
          </div>
          <img src="" alt="En background : couverture du livre" />
        </RouterLink>
        <RouterLink to="/books/1">
          <div>
            <div>
              <p>Éditeur</p>
              <p>Type (BD)</p>
            </div>
            <p>Titre du livre</p>
          </div>
          <img src="" alt="En background : couverture du livre" />
        </RouterLink>
        <RouterLink to="/books/1">
          <div>
            <div>
              <p>Éditeur</p>
              <p>Type (BD)</p>
            </div>
            <p>Titre du livre</p>
          </div>
          <img src="" alt="En background : couverture du livre" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
