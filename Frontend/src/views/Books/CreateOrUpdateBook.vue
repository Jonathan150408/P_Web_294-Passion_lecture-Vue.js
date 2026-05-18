<script setup>
import AuthorService from '@/services/AuthorService'
import EditorService from '@/services/EditorService'
import CategoriesService from '@/services/CategoryService'
import { onMounted, ref, watch } from 'vue'
import BookService from '@/services/BookService'
import { useRoute } from 'vue-router'
import router from '@/router'
import * as yup from 'yup'

//import
const authors = ref(null)
const editors = ref(null)
const categories = ref(null)
const books = ref(null)

const isEditMode = ref(false)

const route = useRoute()

const book = ref({
  id: null,
  title: '',
  numberOfPages: 0,
  pdfLink: '',
  abstract: '',
  categoryId: null,
  writerId: null,
  userId: '1',
  editorId: [],
  comments: [],
})

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

//objet de critères non-respectés
const errors = ref({})

async function loadData() {
  //savoir si on update ou create
  isEditMode.value = !!route.params.book_id

  // Reset
  book.value = {
    id: null,
    title: '',
    numberOfPages: 0,
    pdfLink: '',
    abstract: '',
    categoryId: null,
    writerId: null,
    userId: '1',
    editorId: [],
    comments: [],
  }

  //auteurs
  const authorData = await AuthorService.getAuthors()
  authors.value = authorData.data

  //éditeurs
  const editorsData = await EditorService.getEditors()
  editors.value = editorsData.data

  //catégories
  const categoriesData = await CategoriesService.getCategories()
  categories.value = categoriesData.data

  //livres
  const booksData = await BookService.getBooks()
  books.value = booksData.data

  //si on edit, on récupère d'abords les valeurs actuelles pour book
  if (isEditMode.value) {
    const bookData = await BookService.getBook(route.params.book_id)
    book.value = bookData.data
  }
}

// Faire en sorte que la page refresh si l'url change
watch(route, () => {
  loadData()
})

onMounted(loadData)

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
      //vérification d'un potentiel duplicat seulement si on ajoute, pas si on modifie
      //si titre + auteur + éditeur(s) sont les mêmes, on considère que le livre est un doublon
      const isAlreadyInDb = checkDuplicateEntry()

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
        alert('Le livre figure déjà sur le site') //alerter l'utilisateur que le livre est déjà enregistré
      }
    }
  } catch (e) {
    console.error('Erreur lors de la validation du livre' + e)
    //update le tableau de critères non-respectés
    errors.value = {}
    e.inner.forEach((err) => {
      errors.value[err.path] = err.message
    })
  }
}

function checkDuplicateEntry() {
  return books.value.some(
    (currentBook) =>
      currentBook.title.trim().toLowerCase() === book.value.title.trim().toLowerCase() &&
      Number(currentBook.writerId) === Number(book.value.writerId) &&
      Number(currentBook.editorId) === Number(book.value.editorId),
  )
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
          v-model="book.numberOfPages"
          :style="{ width: String(book.numberOfPages || ' ').length + 2 + 'ch' }"
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

      <div class="form-buttons">
        <RouterLink
          class="btn-base btn-cancel"
          :to="isEditMode ? { name: 'book', params: { book_id: book.id } } : { name: 'books' }"
        >
          Annuler
        </RouterLink>

        <button class="btn-base btn-submit" type="submit">
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

textarea,
select,
input:not([type='number']) {
  width: calc(100% - 20px);
  padding: 10px;
}
textarea {
  resize: vertical;
  min-height: 40px;
}

input[type='number'] {
  margin-left: 8px;
  padding: 5px;
  border-radius: 6px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
}

/* ----- BASE COMMUNE ----- */
.btn-base {
  display: inline-flex; /* même comportement pour a et button */
  align-items: center;
  justify-content: center;

  padding: 10px 16px;
  font-size: 1rem;
  font-weight: normal;

  border-radius: 8px;
  border: none;
  outline: none;

  color: black;
  background-color: #555; /* remplacé ensuite */
  cursor: pointer;

  text-decoration: none !important;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  transition: 0.2s ease;
}

/* ----- STYLE ANNULER ----- */
.btn-cancel {
  background-color: #ffc965;
}
.btn-cancel:hover {
  background-color: #aa8644;
}

/* ----- STYLE CRÉER / VALIDER ----- */
.btn-submit {
  background-color: #007bff;
}
.btn-submit:hover {
  background-color: #0066d6;
}
</style>
