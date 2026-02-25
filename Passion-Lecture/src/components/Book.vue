<script setup>
defineProps({
  appearBig: {
    type: boolean,
    required: true,
  },

  book: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink to="/books/1">
    <div>
      <p>Auteur du livre</p>
      <h3>Titre du livre</h3>
    </div>
    <img src="" alt="Background : couverture du livre" />
  </RouterLink>
</template>

<style scoped></style>
