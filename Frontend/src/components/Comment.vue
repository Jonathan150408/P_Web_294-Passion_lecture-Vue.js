<script setup>
import { ref, onMounted } from 'vue'
import UserService from '@/services/UserService'

const { comment } = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="comment-card">
    <div class="top">
      <img src="../assets/MM-logo_utilisateur.png" alt="Image de l'utilisateur" />

      <div class="content">
        <h4>{{ comment.user.username }}</h4>
        <p>{{ comment.content }}</p>
      </div>
    </div>

    <div class="rating"><span>Rating :</span> {{ comment.rating }} ⭐</div>
  </div>
</template>

<style scoped>
.comment-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  width: 100%;
  /* Important pour que padding + width:100% ne “pousse” pas hors parent */
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  gap: 10px;

  /* Évite tout débordement résiduel (arrondis, ombres, etc.) */
  overflow: hidden;
}

/* Ligne du haut (avatar + bloc texte) */
.top {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  /* Autoriser le contenu à se réduire dans un conteneur flex */
  min-width: 0;
}

/* Avatar */
.comment-card img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;

  /* Ne pas rétrécir l’avatar (sinon il écrase le texte) */
  flex-shrink: 0;
}

/* Bloc content = auteur + texte */
.content {
  display: flex;
  flex-direction: column;
  gap: 4px;

  /* Indispensable avec flex pour éviter l’overflow horizontal */
  min-width: 0;
}

/* Auteur */
.content h4 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: #222;

  /* Pas nécessaire mais utile si noms très longs */
  overflow-wrap: anywhere;
}

/* Texte du commentaire */
.content p {
  margin: 0;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;

  /* 🔑 coupe les mots/URLs très longs pour éviter l’overflow */
  overflow-wrap: anywhere; /* moderne et efficace */
  word-break: break-word; /* fallback */
  white-space: normal; /* s'assurer que ça wrappe */
}

/* Rating sous le contenu, aligné avec le texte (pas sous l’avatar) */
.rating {
  padding-left: 62px; /* aligne sous le bloc texte (48 + 14) */
  font-weight: 600;
  color: #444;
  font-size: 0.9rem;

  /* Empêche la zone note de pousser à l’horizontal si très longue */
  min-width: 0;
  overflow-wrap: anywhere;
}

/* Optionnel: si tu veux éviter que la carte grandisse trop sur grands écrans */
/*
.comment-card {
  max-width: 100%;
}
*/
</style>
