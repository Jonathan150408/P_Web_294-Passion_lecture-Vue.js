<script setup>
import { ref } from 'vue'
import Comment from './Comment.vue'
import BookService from '@/services/BookService'
import CommentService from '@/services/CommentService'

const { book } = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const showForm = ref(false)

const form = ref({
  content: '',
  rating: 5,
})

function toggleForm() {
  showForm.value = !showForm.value
}

async function submitComment() {
  const newComment = {
    content: form.value.content,
    rating: form.value.rating,
    userId: 1,
  }

  await CommentService.createComment(book.id, newComment)

  window.location.reload()
}
</script>

<template>
  <div class="content">
    <div class="header">
      <h3>Commentaires</h3>
      <a href="" class="add-comment" @click.prevent="toggleForm"> Ajouter un commentaire </a>
    </div>

    <form v-if="showForm" class="comment-form" @submit.prevent="submitComment">
      <textarea v-model="form.content" placeholder="Votre commentaire..." required></textarea>

      <label>
        Note :
        <select v-model.number="form.rating">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
          <option :value="5">5</option>
        </select>
      </label>

      <button type="submit">Envoyer</button>
    </form>

    <Comment v-for="comment in book.comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.add-comment {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.add-comment:hover {
  background-color: #0066d6;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.comment-form textarea {
  resize: vertical;
  min-height: 80px;
  padding: 10px;
  border-radius: 8px;
  border: none;
}

.comment-form select {
  margin-left: 8px;
  padding: 5px;
  border-radius: 6px;
}

.comment-form button {
  align-self: flex-end;
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
