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
  <p>A remplir</p>
</template>

<style scoped>
p {
  color: red;
}
</style>
