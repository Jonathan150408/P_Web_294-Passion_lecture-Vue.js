<script setup></script>

<template>
  <main>
    <h1>Créer/Modifier un livre</h1>
    <hr />
    <form action="">
      <fieldset>
        <legend>Titre</legend>
        <input type="text" name="title" id="title" placeholder="Titre du livre" />
      </fieldset>
      <fieldset>
        <legend>Auteur(s)</legend>
        <div>
          <select name="authors" id="authors">
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option value="Victor Hugo">Victor Hugo</option>
            <option value="Alexandre Dumas">Alexandre Dumas</option>
            <option value="Gustave Flaubert">Gustave Flaubert</option>
            <option value="Émile Zola">Émile Zola</option>
            <option value="Honoré de Balzac">Honoré de Balzac</option>
          </select>
        </div>
      </fieldset>
      <fieldset>
        <legend>Editeur(s)</legend>
        <div>
          <select name="editors" id="editors">
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option value="Gallimard">Gallimard</option>
            <option value="Hachette">Hachette</option>
            <option value="Le Livre de Poche">Le Livre de Poche</option>
            <option value="Penguin">Penguin</option>
            <option value="Éditions de Minuit">Éditions de Minuit</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>Résumé</legend>
        <textarea name="summary" id="summary" placeholder="Résumé du livre"></textarea>
      </fieldset>

      <fieldset>
        <legend>Nombre de pages</legend>
        <input type="number" name="pages" id="pages" min="1" value="1" />
      </fieldset>

      <fieldset>
        <legend>Extrait</legend>
        <input
          type="url"
          name="excerpt"
          id="excerpt"
          placeholder="Un lien vers un extrait du livre"
        />
      </fieldset>

      <fieldset>
        <legend>Catégorie</legend>
        <div>
          <select name="categories" id="categories">
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option value="Autobiographie">Autobiographie</option>
            <option value="Bande Dessinées">Bande Dessinées</option>
            <option value="Enquête">Enquête</option>
            <option value="Fantaisie">Fantaisie</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>
      </fieldset>

      <div>
        <RouterLink to="/books">Annuler</RouterLink>
        <button type="submit">Sauvegarder les changements</button>
      </div>
    </form>
  </main>
</template>

<style scoped></style>
