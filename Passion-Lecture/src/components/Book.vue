<script setup>
import { useRouter } from 'vue-router'
import BookService from '../services/BookService'
import { ref } from 'vue'

const props = defineProps({
  appearBig: {
    type: Boolean,
    required: true,
  },
  showCategory: {
    type: Boolean,
    required: true,
  },
  book: {
    type: Object,
    required: true,
  },
  categoryLabel: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  hasButtons: {
    type: Boolean,
    required: false,
  },
})

const router = useRouter()
const showDeleteModal = ref(false)

function handleDelete() {
  router.push({ name: 'book', params: { book_id: props.book.id }, query: { openDelete: '1' } })
}

function handleEdit() {
  router.push({ name: 'update-book', params: { book_id: props.book.id } })
}
</script>

<template>
  <div
    class="book"
    :class="appearBig ? 'big' : 'normal'"
    :style="{ backgroundImage: book.imagePath ? `url('${book.imagePath}')` : '' }"
  >
    <div v-if="hasButtons" class="book-buttons">
      <span @click.stop.prevent="handleEdit" class="edit-btn" title="Modifier">✏️</span>
      <span @click.stop.prevent="handleDelete" class="delete-btn" title="Supprimer">🗑️</span>
    </div>

    <RouterLink :to="{ name: 'book', params: { book_id: book.id } }" class="book-link"></RouterLink>

    <div class="info">
      <div class="info-bar">
        <span class="author">{{ authorName }}</span>
        <span class="category" v-if="showCategory">{{ categoryLabel }}</span>
      </div>
      <div class="title-bar">
        <span class="title">{{ book.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book {
  width: 200px;
  height: 340px;
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #fff;
  position: relative;
  display: block;
  cursor: pointer;
}

.book-link {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.book-buttons {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  display: flex;
  gap: 0.5em;
  z-index: 2;
}

.book-buttons span {
  cursor: pointer;
  font-size: 1.2em;
}

a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
  text-decoration: none;
}

.info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  background-color: #585553;
}

.info-bar {
  color: #fff;
  padding: 1em 1em 0.5em 1em;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1em;
}
.info-bar .author {
  font-size: 1em;
  font-weight: normal;
  margin: 0;
}
.info-bar .category {
  font-size: 0.95em;
  font-style: italic;
  margin: 0;
}
.title-bar {
  color: #fff;
  padding: 0.5em 1em 1em 1em;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: flex-end;
}
.title-bar .title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
}
</style>
