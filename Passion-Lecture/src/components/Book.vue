<script setup>
/*defineProps({
  appearBig: {
    type: boolean,
    required: true,
  },

  showCategory: {
    type: boolean,
    required: true,
  },

  book: {
    type: Object,
    required: true,
  },
})*/
</script>

<template>
  <RouterLink to="/books/1">
    <div>
      <div>
        <p>Éditeur</p>
        <p>Type (BD)</p>
      </div>
      <p>Titre du livre</p>
    </div>
    <img src="" alt="En background : couverture du livre" />
  </RouterLink>
</template>

<style scoped></style>
