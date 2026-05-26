<script setup>
import Book from '../../components/Book.vue'
import CategoriesService from '@/services/CategoryService'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const category = ref(null)

const searchQuery = ref('')
const route = useRoute()

async function loadData() {
  const categoryData = await CategoriesService.getCategory(route.params.category_id)

  // depending on API structure
  category.value = categoryData.data.data || categoryData.data
}

watch(
  () => route.params.category_id,
  () => {
    loadData()
  }
)

onMounted(loadData)

// Extract books from category.belong
const books = computed(() => {
  return category.value?.belong?.map((b) => b.book) || []
})

// Filter books
const filteredBooks = computed(() => {
  const q = searchQuery.value.toLowerCase()

  return books.value.filter((book) => {
    const authorName = book.writer
      ? `${book.writer.firstname} ${book.writer.lastname}`.toLowerCase()
      : ''

    return (
      book.title.toLowerCase().includes(q) ||
      authorName.includes(q)
    )
  })
})
</script>

<template>
  <main>
    <div class="header-categorie">
      <h1>{{ category?.label }}</h1>

      <div class="recherche">
        <input v-model="searchQuery" type="text" placeholder="Rechercher un livre/auteur…" />
      </div>
    </div>

    <div class="books">
      <Book v-for="(book, index) in filteredBooks" :key="index" :book="book" :appearBig="false"
        :show-category="false" />
    </div>
  </main>
</template>

<style scoped>
/* STRUCTURE GÉNÉRALE */
main {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: white;
}

/* ----- Premier DIV (header visuel) ----- */
.header-categorie {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  gap: 1rem;
}

/* Titre de catégorie */
.header-categorie h1 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.3px;
}

/* ----- Barre de recherche style maquette ----- */
.recherche {
  position: relative;
  display: flex;
  align-items: center;
  width: 260px;
}

.recherche {
  position: relative;
  display: flex;
  align-items: center;
  width: 260px;
  /* ou 100% en mobile */
}

.recherche input {
  width: 100%;
  /* on laisse de la place à droite pour la loupe */
  padding: 0.6rem 2.2rem 0.6rem 0.9rem;
  border-radius: 40px;
  border: none;
  background: #fff;
  font-size: 0.95rem;
  color: #222;

  /* icône de loupe EN FOND, alignée à DROITE */
  background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 18px;
  background-position: right 0.7rem center;
  /* <-- droite */
}

.recherche input::placeholder {
  color: #777;
}

/* Bouton clear */
.clear {
  position: absolute;
  right: 0.6rem;
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
}

.clear:hover {
  color: #000;
}

/* ----- Responsive ----- */
@media (max-width: 768px) {
  .header-categorie {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }

  .recherche {
    width: 100%;
  }
}
</style>
