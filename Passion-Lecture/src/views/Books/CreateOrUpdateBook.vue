<script setup>
import AuthorService from '@/services/AuthorService'
import EditorService from '@/services/EditorService'
import CategoriesService from '@/services/CategoriesService'
import { onMounted, onScopeDispose, ref } from 'vue'
import BookService from '@/services/BookService'
import { useRoute } from 'vue-router'
import router from '@/router'

//url actuelle (/books/:book_id/update ou juste /books/create)
const route = useRoute()
//savoir si on update ou create
const isEditMode = !!route.params.book_id

//variables utilisées dans le html
let book = ref({
  id: null,
  title: null,
  numberOfPages: null,
  pdfLink: null,
  abstract: null,
  //editionYear:,
  //imagePath:,
  //createdAt:,
  //updatedAt:,
  categoryId: null,
  writerId: null,
  userId: '1',
  editorId: [],
  comments: [],
})
const authors = ref(null)
const editors = ref(null)
const categories = ref(null)

onMounted(async () => {
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

  //si on edit, on récupère d'abords les valeurs actuelles pour book
  console.log('Mode edit : ' + isEditMode)
  if (isEditMode) {
    const id = route.params.book_id
    await BookService.getBook(route.params.book_id)
      .then((response) => {
        book.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
})

//ajouter un livre
function submitBook() {
  BookService.addBook(book)
    .then(() => {
      //ramène vers home
      router.push('/')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <main>
    <h1>{{ isEditMode ? 'Modifier un livre' : 'Créer un livre' }}</h1>
    <form @submit.prevent="submitBook">
      <!-- titre -->
      <fieldset>
        <legend>Titre</legend>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Titre du livre"
          v-model="book.title"
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
          v-model="book.numberOfPages"
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
          v-model="book.pdfLink"
        />
      </fieldset>
      <!-- résumé -->
      <fieldset>
        <legend>Résumé</legend>
        <textarea
          name="summary"
          id="summary"
          placeholder="Résumé du livre"
          v-model="book.abstract"
        ></textarea>
      </fieldset>
      <!-- editionYear = null -->
      <!-- image = null -->
      <!-- catégorie -->
      <fieldset>
        <legend>Catégorie</legend>
        <div>
          <select name="categories" id="categories" v-model="book.categoryId">
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
          <select name="authors" id="authors" v-model="book.writerId">
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
          <select name="editors" id="editors" v-model="book.editorId">
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option v-for="(editor, index) in editors" :key="index" :value="editor.id">
              {{ editor.name }}
            </option>
          </select>
        </div>
      </fieldset>
      <!-- comments = [] -->

      <div>
        <button type="submit" value="Submit">
          {{ isEditMode ? 'Valider les changements' : 'Créer le livre' }}
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped></style>
