<script setup>
import AuthorService from '@/services/AuthorService'
import EditorService from '@/services/EditorService'
import CategoriesService from '@/services/CategoryService'
import BookService from '@/services/BookService'

import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import * as yup from 'yup'

const authors = ref([])
const editors = ref([])
const categories = ref([])
const books = ref([])

const isEditMode = ref(false)

const route = useRoute()

const defaultBook = () => ({
  id: null,
  title: '',
  numberOfPages: 0,
  pdfLink: '',
  abstract: '',

  editionYear: null,
  imagePath: '',


  writerId: null,
  userId: 1,

  // relational
  categoriesIds: [],
  editorsIds: [],
})

const book = ref(defaultBook())

const schema = yup.object({
  title: yup
    .string()
    .required('Le titre ne peut pas être vide')
    .min(3, 'Le titre doit contenir au moins 3 caractères'),

  numberOfPages: yup
    .number()
    .required('Le nombre de pages ne peut pas être vide')
    .positive('Le nombre de pages ne peut pas être négatif'),

  pdfLink: yup.string().required('Le lien ne peut pas être vide').url("L'url doit être valide"),

  abstract: yup
    .string()
    .required('Le résumé ne peut pas être vide')
    .min(10, 'Le résumé est trop court'),

  writerId: yup.number().required('Le livre doit avoir un auteur'),

  categoriesIds: yup.array().min(1, 'Le livre doit appartenir à une catégorie'),

  editorsIds: yup.array().min(1, 'Le livre doit avoir au moins 1 éditeur'),
})

const errors = ref({})

async function loadData() {
  isEditMode.value = !!route.params.book_id

  book.value = defaultBook()

  const [authorData, editorsData, categoriesData, booksData] = await Promise.all([
    AuthorService.getAuthors(),
    EditorService.getEditors(),
    CategoriesService.getCategories(),
    BookService.getBooks(),
  ])

  authors.value = authorData.data.data || authorData.data
  editors.value = editorsData.data.data || editorsData.data
  categories.value = categoriesData.data.data || categoriesData.data
  books.value = booksData.data.data || booksData.data

  if (isEditMode.value) {
    const response = await BookService.getBook(route.params.book_id)

    const apiBook = response.data.data || response.data

    book.value = {
      id: apiBook.id,
      title: apiBook.title,
      numberOfPages: apiBook.numberOfPages,
      pdfLink: apiBook.pdfLink,
      abstract: apiBook.abstract,
      writerId: apiBook.writerId,
      userId: apiBook.userId,

      editionYear: apiBook.editionYear,
      imagePath: apiBook.imagePath,

      categoriesIds: apiBook.belong?.map((b) => b.categorieId) || [],

      editorsIds: apiBook.edit?.map((e) => e.editorId) || [],
    }
  }
}

watch(
  () => route.params.book_id,
  () => {
    loadData()
  },
)

onMounted(loadData)

async function submitBook() {
  try {
    await schema.validate(book.value, { abortEarly: false })

    errors.value = {}

    console.log('Book payload:', JSON.parse(JSON.stringify(book.value)))

    if (isEditMode.value) {
      await BookService.updateBook(book.value)

      router.push({
        name: 'book',
        params: {
          book_id: book.value.id,
        },
      })
    } else {
      const isAlreadyInDb = checkDuplicateEntry()

      if (isAlreadyInDb) {
        alert('Le livre figure déjà sur le site')
        return
      }

      await BookService.createBook(book.value)

      router.push({
        name: 'books',
      })
    }
  } catch (e) {
    errors.value = {}

    if (e.inner) {
      e.inner.forEach((err) => {
        errors.value[err.path] = err.message
      })
    }

    console.error(e)
  }
}

function checkDuplicateEntry() {
  return books.value.some((currentBook) => {
    return (
      currentBook.title?.trim().toLowerCase() === book.value.title.trim().toLowerCase() &&
      Number(currentBook.writerId) === Number(book.value.writerId)
    )
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
      <!-- editionYear - pas de validation -->
      <fieldset>
        <legend>Année d'édition</legend>
        <input
        type="number"
          name="editionYear"
          id="editionYear"
          placeholder="Année d'édition"
          v-model="book.editionYear"
        ></input>
        <p v-if="!!errors.editionYear" class="error">{{ errors.editionYear }}</p>
      </fieldset>
      <!-- image = pas de validation -->
       <fieldset>
        <legend>Image de couverture</legend>
        <input
          type="url"
          name="image"
          id="image"
          placeholder="Un lien vers un une image de couverture"
          v-model="book.imagePath"
        />
        <p v-if="!!errors.pdfLink" class="error">{{ errors.pdfLink }}</p>
      </fieldset>
      <!-- catégorie -->
      <fieldset>
        <legend>Catégorie(s)</legend>
        <div class="checkbox-group">
          <label v-for="(categorie, index) in categories" :key="index" class="checkbox-item">
            <input type="checkbox" :value="categorie.id" v-model="book.categoriesIds" />
            {{ categorie.label }}
          </label>
        </div>
        <p v-if="!!errors.categoriesIds" class="error">{{ errors.categoriesIds }}</p>
      </fieldset>
      <!-- auteur -->
      <fieldset>
        <legend>Auteur</legend>
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
        <div class="checkbox-group">
          <label v-for="(editor, index) in editors" :key="index" class="checkbox-item">
            <input type="checkbox" :value="editor.id" v-model="book.editorsIds" />
            {{ editor.name }}
          </label>
        </div>
        <p v-if="!!errors.editorsIds" class="error">{{ errors.editorsIds }}</p>
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

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
}

/* ----- BASE COMMUNE ----- */
.btn-base {
  display: inline-flex;
  /* même comportement pour a et button */
  align-items: center;
  justify-content: center;

  padding: 10px 16px;
  font-size: 1rem;
  font-weight: normal;

  border-radius: 8px;
  border: none;
  outline: none;

  color: black;
  background-color: #555;
  /* remplacé ensuite */
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
