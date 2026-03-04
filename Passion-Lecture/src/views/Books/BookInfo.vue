<script setup>
import { useRoute } from 'vue-router'
import Comments from '../../components/Comments.vue'
import BookService from '../../services/BookService'
import CategoriesService from '../../services/CategoriesService'
import AuthorService from '../../services/AuthorService'
import EditorService from '../../services/EditorService'
import { ref, onMounted } from 'vue'

const route = useRoute()

//import des Catégories/auteurs
const book = ref(null)
const authors = ref(null)
const categories = ref(null)
const editors = ref(null)

onMounted(() => {
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
        <p>Noté ⭐⭐⭐⭐</p>
      </div>
      <div>
        <a href="">Supprimer le livre (non-fonctionel)</a>
        <RouterLink :to="{ name: 'update-book', params: { category_id: book.id } }">
          Modifier le livre (non-fonctionel)
        </RouterLink>
      </div>
    </section>
    <section>
      <Comments :comments="book.comments" />
    </section>
  </main>
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

/* === Liens utilitaires (modifier/supprimer) === */
main > section:first-of-type > div:last-child {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

main > section:first-of-type a {
  color: #ffbdbd;
  text-decoration: underline;
}

/* === Section des commentaires === */
main > section:last-of-type {
  background: rgba(30, 26, 23, 0.6);
  padding: 2rem;
  border-radius: 12px;
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
