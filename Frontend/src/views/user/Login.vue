<script setup>
//imports
import { ref } from 'vue'
import UserService from '@/services/UserService'

//variables de la page
const credentials = ref({})
const error = ref()

//login avec les infos courrantes
async function connect() {
  //envoyer la request
  const cred = {
    username: credentials.value.username,
    password: credentials.value.password,
  }

  //stocker la réponse
  const response = await UserService.login(cred)

  //DETTE TECHNIQUE - utilisation du localstorage pour le moment
  if (response.status == 200) {
    localStorage.setItem('token', response.data.token.token)
    window.location.replace('http://localhost:5173')
  }
}
</script>

<template>
  <main>
    <section>
      <h1>Connexion</h1>
      <form @submit.prevent="connect">
        <!-- username -->
        <label for="username">Nom d'utilisateur</label>
        <input
          type="string"
          id="username"
          name="username"
          required
          v-model="credentials.username"
        />

        <!-- password -->
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          v-model="credentials.password"
        />

        <!-- bouton 'se connecter' -->
        <button type="submit">Se connecter</button>
      </form>
    </section>
    <p v-if="!!error">{{ error }}</p>
  </main>
</template>

<style scoped>
label,
input,
button {
  display: block;
}
input {
  margin: 20px;
}
</style>
