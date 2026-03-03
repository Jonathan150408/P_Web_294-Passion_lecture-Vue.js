<script setup>
import Comment from './Comment.vue'

defineProps({
  comments: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <h3>Commentaires</h3>
  <Comment v-for="comment in comments" :key="comment.id" :content="comment" />

  <a href="">Scroll down pour voir la suite des commentaires</a>
  <a href="">Ajouter un commentaire</a>
</template>

<style scoped></style>
