<script setup>
import { useRoute, useRouter } from 'vue-router'
import Comments from '../../components/Comments.vue'
import BookService from '../../services/BookService'
import CategoriesService from '../../services/CategoriesService'
import AuthorService from '../../services/AuthorService'
import EditorService from '../../services/EditorService'
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const showDeleteModal = ref(false)

//import des Catégories/auteurs
const book = ref(null)
const authors = ref(null)
const categories = ref(null)
const editors = ref(null)

onMounted(() => {
  if (route.query.openDelete) {
    showDeleteModal.value = true
  }
  BookService.getBook(route.params.book_id).then((res) => {
    book.value = res.data
  })
  CategoriesService.getCategories()
    .then((response) => {
      categories.value = response.data
      console.log(categories.value)
    })
    .catch((error) => {
      console.log(error)
    })
  AuthorService.getAuthors()
    .then((response) => {
      authors.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  EditorService.getEditors()
    .then((response) => {
      editors.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})

function getCategoryLabelFromId(id) {
  if (!categories.value) return '...'

  const category = categories.value.find((c) => c.id == id)
  return category ? category.label : 'Catégorie inconnue'
}

function getAuthorNameFromId(id) {
  if (!authors.value) return '...'

  const author = authors.value.find((a) => a.id == id)
  return author ? `${author.firstname} ${author.lastname}` : 'Auteur inconnu'
}

function getEditorNameFromId(id) {
  if (!editors.value) return '...'

  const editor = editors.value.find((a) => a.id == id)
  return editor ? editor.name : 'Editeur inconnu'
}

function confirmDelete() {
  const id = Number(book.value.id)
  BookService.deleteBook(id)
    .then(() => {
      showDeleteModal.value = false
      router.push({ name: 'books' })
    })
    .catch(console.error)
}

const getRating = computed(() => {
  let total = 0

  console.log(book)

  if (
    book.value.comments == undefined ||
    book.value.comments == null ||
    book.value.comments.length === 0
  ) {
    return "Ce livre n'a pas été évalué."
  }

  book.value.comments.forEach((comment) => {
    total += comment.rating
  })

  const average = total / book.value.comments.length

  return 'Note : ' + average + '⭐'
})
</script>

<template>
  <main v-if="book">
    <h1>{{ book.title }}</h1>
    <section>
      <img :src="book.imagePath" alt="Couverture du livre" />

      <div>
        <div>
          <h2>Résumé</h2>
          <p>{{ book.abstract }}</p>
        </div>
        <div>
          <h2>Catégories</h2>
          <ul>
            <li>
              <RouterLink :to="{ name: 'book-category', params: { category_id: book.categoryId } }">
                {{ getCategoryLabelFromId(book.categoryId) }}</RouterLink
              >
            </li>
          </ul>
        </div>
        <div>
          <h3>Infos divers</h3>
          <p>{{ book.numberOfPages }} pages</p>
          <p><a :href="book.pdfLink">Lien vers un extrait</a></p>
          <p>{{ getAuthorNameFromId(book.writerId) }}</p>
          <h3>Editeurs</h3>
          <p v-for="editorId in book.editorId" :key="editorId">
            {{ getEditorNameFromId(editorId) }}
          </p>
        </div>
        <p>{{ getRating }}</p>
      </div>
      <div>
        <button class="book-action delete" @click="showDeleteModal = true">
          Supprimer le livre
        </button>

        <RouterLink
          class="book-action edit"
          :to="{ name: 'update-book', params: { book_id: book.id } }"
        >
          Modifier le livre
        </RouterLink>
      </div>
    </section>
    <section>
      <Comments :comments="book.comments" />
    </section>
  </main>

  <!-- Modale de confirmation -->
  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal">
      <p>Êtes-vous certain de vouloir supprimer cet ouvrage ?</p>

      <div class="modal-actions">
        <button @click="confirmDelete">Supprimer</button>
        <button @click="showDeleteModal = false">Annuler</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === Mise en page générale === */
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: #fff;
}

/* === Section principale (image + infos) === */
main > section:first-of-type {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  background: rgba(30, 26, 23, 0.6);
  padding: 2rem;
  border-radius: 12px;
}

/* === Image du livre === */
main img {
  width: 260px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
}

/* === Contenu à droite de l'image === */
main > section:first-of-type > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Titres internes */
h1 {
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 0.5rem;
  color: #aaccff;
}

/* === Boutons Modifier / Supprimer === */
main > section:first-of-type > div:last-child {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

/* === Boutons Modifier / Supprimer === */
main > section:first-of-type > div:last-child {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

/* Style IDENTIQUE pour les deux boutons */
.book-action {
  display: inline-flex; /* Même comportement pour <a> et <button> */
  align-items: center;
  justify-content: center;

  padding: 10px 16px;
  font-size: 1rem; /* fixe la taille */
  font-weight: normal;

  border-radius: 8px;
  border: none;
  outline: none;

  color: black;
  background-color: #555; /* remplacée ensuite par delete / edit */
  cursor: pointer;

  text-decoration: none !important; /* enlève souligné */

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  transition: 0.2s ease;
}

/* Hover commun */
.book-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Variantes */
.book-action.delete {
  background-color: #e0865b;
}
.book-action.delete:hover {
  background-color: #a05f41;
}

.book-action.edit {
  background-color: #ffc965;
}
.book-action.edit:hover {
  background-color: #aa8644;
}

/* === Section des commentaires === */
main > section:last-of-type {
  background: rgba(30, 26, 23, 0.6);
  padding: 2rem;
  border-radius: 12px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: #2a2522;
  padding: 2rem;
  border-radius: 12px;
  width: 300px;
  text-align: center;
}

.modal-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}

/* === Responsive === */
@media (max-width: 900px) {
  main > section:first-of-type {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  main img {
    width: 200px;
  }

  main > section:first-of-type > div:last-child {
    justify-content: center;
  }
}
</style>
