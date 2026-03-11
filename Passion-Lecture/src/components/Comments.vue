<script setup>
import { ref } from 'vue'
import Comment from './Comment.vue'

defineProps({
  comments: {
    type: Array,
    required: true,
  },
})

const showForm = ref(false)

function toggleForm() {
  showForm.value = !showForm.value
}
</script>

<template>
  <div class="content">
    <div class="header">
      <h3>Commentaires</h3>
      <a href="" class="add-comment" @click.prevent="toggleForm"> Ajouter un commentaire </a>
    </div>

    <div v-if="showForm" class="comment-form">
      <textarea placeholder="Votre commentaire..."></textarea>
      <button>Envoyer</button>
    </div>

    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
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

/* FORM STYLE */
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
