<script setup>
import AuthorService from '@/services/AuthorService'
import EditorService from '@/services/EditorService'
import CategoriesService from '@/services/CategoriesService'
import { onMounted, ref } from 'vue'
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
  title: '',
  numberOfPages: null,
  pdfLink: '',
  abstract: '',
  categoryId: null,
  writerId: null,
  userId: '1',
  editorId: [],
  comments: [],
})
const authors = ref(null)
const editors = ref(null)
const categories = ref(null)
const books = ref(null)

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
  //livres
  BookService.getBooks()
    .then((response) => {
      books.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })

  //si on edit, on récupère d'abords les valeurs actuelles pour book
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

import * as yup from 'yup'
// critères de validation du form
const schema = yup.object({
  title: yup
    .string()
    .required('Le titre ne peut pas être vide')
    .min(3, 'Le titre doit contenir au moins 3 caractères'),
  numberOfPages: yup
    .number('Le nombre de pages doit être un nombre entier')
    .required('Le nombre de pages ne peut pas être vide')
    .positive('Le nombre de pages ne peut pas être négatif'),
  pdfLink: yup
    .string()
    .required('Le lien ne peut pas être vide')
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, //regex pour url
      "l'url doit être valide",
    ),
  abstract: yup
    .string()
    .required('Le résumé ne peut pas être vide')
    .min(10, 'Le résumé est trop court'),
  categoryId: yup.number().required('Le livre doit appartenir à une catégorie'),
  writerId: yup.number().required('Le livre doit avoir un auteur'),
  editorId: yup.array().required().min(1, 'Le livre doit avoir au moins 1 éditeur'),
})

//tableau des critères non-respectés
const errors = ref({})

//ajouter un livre
function submitBook() {
  try {
    schema.validateSync(book.value, { abortEarly: false }) // valider les champs du form

    // envoi de la requête
    if (isEditMode) {
      BookService.updateBook(book.value)
        .then(() => {
          //ramène vers la page du livre
          router.push({
            name: 'book',
            params: { book_id: book.id },
          })
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      //vérification d'un potentiel duplicat
      let isAlreadyInDb = false

      for (let currentBook of books.value) {
        if (currentBook.title == book.value.title && currentBook.title == book.value.title) {
          isAlreadyInDb = true
        } else {
          continue
        }
      }
      console.log('tout est bon')

      // ajout du livre en db
      if (!isAlreadyInDb) {
        BookService.addBook(book.value)
          .then(() => {
            //ramène vers la galerie
            router.push({
              name: 'books',
            })
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        console.log('livre dupliqué non ajoutable')
      }
    }
  } catch (e) {
    console.log('Erreur lors de la validation du livre' + e)
    //update le tableau de critères non-respectés
    errors.value = {}
    e.inner.forEach((err) => {
      errors.value[err.path] = err.message
    })
  }
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
        <p v-if="!!errors.title" class="error">{{ errors.title }}</p>
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
        <p v-if="!!errors.numberOfPages" class="error">{{ errors.numberOfPages }}</p>
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
        <p v-if="!!errors.pdfLink" class="error">{{ errors.pdfLink }}</p>
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
        <p v-if="!!errors.abstract" class="error">{{ errors.abstract }}</p>
      </fieldset>
      <!-- editionYear = null -->
      <!-- image = null -->
      <!-- catégorie -->
      <fieldset>
        <legend>Catégorie</legend>
        <div>
          <select name="categories" id="categories" v-model="book.categoryId">
            <option value="null" disabled selected hidden>-- Sélectionnez --</option>
            <option v-for="(categorie, index) in categories" :key="index" :value="categorie.id">
              {{ categorie.label }}
            </option>
          </select>
        </div>
        <p v-if="!!errors.categoryId" class="error">{{ errors.categoryId }}</p>
      </fieldset>
      <!-- auteur -->
      <fieldset>
        <legend>Auteur(s)</legend>
        <div>
          <select name="authors" id="authors" v-model="book.writerId">
            <option value="null" disabled selected hidden>-- Sélectionnez --</option>
            <option v-for="(author, index) in authors" :key="index" :value="author.id">
              {{ author.firstname }} {{ author.lastname }}
            </option>
          </select>
        </div>
        <p v-if="!!errors.writerId" class="error">{{ errors.writerId }}</p>
      </fieldset>
      <!-- userId = null -->
      <!-- editeur -->
      <fieldset>
        <legend>Editeur(s)</legend>
        <div>
          <!-- ALERTE, ne fonctionne que pour 1 éditeur -->
          <select name="editors" id="editors" v-model="book.editorId[0]">
            <option value="undefined" disabled selected hidden>-- Sélectionnez --</option>
            <option v-for="(editor, index) in editors" :key="index" :value="editor.id">
              {{ editor.name }}
            </option>
          </select>
        </div>
        <p v-if="!!errors.editorId" class="error">{{ errors.editorId }}</p>
      </fieldset>
      <!-- comments = [] -->

      <div>
        <RouterLink :to="{ name: 'books' }">Annuler</RouterLink>
        <button type="submit" value="Submit">
          {{ isEditMode ? 'Valider les changements' : 'Créer le livre' }}
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.error {
  color: red;
}
</style>
