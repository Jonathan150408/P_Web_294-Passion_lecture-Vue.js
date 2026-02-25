<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <a href=""><img src="../../assets/MM-logo_utilisateur.webp" alt="Image de l'utilisateur" /></a>
    <p>Commentaire laissé</p>
  </div>
  <div>Rating : <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span></div>
</template>

<style scoped></style>
