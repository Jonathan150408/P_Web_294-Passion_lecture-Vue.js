<script setup>
import AuthorService from '@/services/AuthorService'
import EditorService from '@/services/EditorService'
import CategoriesService from '@/services/CategoriesService'
import { onMounted, onScopeDispose, ref } from 'vue'
import BookService from '@/services/BookService'

const authors = ref(null)
const editors = ref(null)
const categories = ref(null)

onMounted(() => {
  //auteurs
  AuthorService.getAuthors()
    .then((response) => {
      authors.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  //éditeurs
  EditorService.getEditors()
    .then((response) => {
      editors.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  //categories
  CategoriesService.getCategories()
    .then((response) => {
      categories.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})

let new_book = {
  id: null,
  title: null,
  numberOfPages: null,
  pdfLink: null,
  abstract: null,
  //editionYear: 1885,
  //imagePath: 'https://covers.openlibrary.org/b/id/0008236934-L.jpg',
  //createdAt: '2026-02-22T07:48:00.000+00:00',
  //updatedAt: '2026-02-22T07:48:00.000+00:00',
  categoryId: null,
  writerId: null,
  //userId: '1',
  editorId: [],
  //comments: [],
}

//ajouter un livre
function submitBook() {
  BookService.addBook(new_book)
    .then((response) => {
      console.log('Réponse serveur :', response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <main>
    <h1>Créer/Modifier un livre</h1>
    <hr />
    <form @submit.prevent="submitBook">
      <!-- titre -->
      <fieldset>
        <legend>Titre</legend>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Titre du livre"
          v-model="new_book.title"
        />
      </fieldset>
      <!-- nombre de pages -->
      <fieldset>
        <legend>Nombre de pages</legend>
        <input
          type="number"
          name="pages"
          id="pages"
          min="1"
          value="1"
          v-model="new_book.numberOfPages"
        />
      </fieldset>
      <!-- lien vers extrait -->
      <fieldset>
        <legend>Extrait</legend>
        <input
          type="url"
          name="excerpt"
          id="excerpt"
          placeholder="Un lien vers un extrait du livre"
          v-model="new_book.pdfLink"
        />
      </fieldset>
      <!-- résumé -->
      <fieldset>
        <legend>Résumé</legend>
        <textarea
          name="summary"
          id="summary"
          placeholder="Résumé du livre"
          v-model="new_book.abstract"
        ></textarea>
      </fieldset>
      <!-- editionYear = null -->
      <!-- image = null -->
      <!-- catégorie -->
      <fieldset>
        <legend>Catégorie</legend>
        <div>
          <select name="categories" id="categories" v-model="new_book.categoryId">
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option v-for="(categorie, index) in categories" :key="index" :value="categorie.id">
              {{ categorie.label }}
            </option>
          </select>
        </div>
      </fieldset>
      <!-- auteur -->
      <fieldset>
        <legend>Auteur(s)</legend>
        <div>
          <select name="authors" id="authors" v-model="new_book.writerId">
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option v-for="(author, index) in authors" :key="index" :value="author.id">
              {{ author.firstname }} {{ author.lastname }}
            </option>
          </select>
        </div>
      </fieldset>
      <!-- userId = null -->
      <!-- editeur -->
      <fieldset>
        <legend>Editeur(s)</legend>
        <div>
          <select name="editors" id="editors" v-model="new_book.editorId">
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option v-for="(editor, index) in editors" :key="index" :value="editor.id">
              {{ editor.name }}
            </option>
          </select>
        </div>
      </fieldset>
      <!-- comments = [] -->

      <div>
        <RouterLink to="/books">Annuler</RouterLink>
        <button type="submit" value="Submit">Sauvegarder les changements</button>
      </div>
    </form>
  </main>
</template>

<style scoped></style>
