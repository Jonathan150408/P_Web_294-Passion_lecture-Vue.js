<script setup>
//imports
import { ref } from 'vue'
import UserService from '@/services/UserService'

const credentials = ref({})

async function connect() {
  const cred = {
    username: credentials.value.username,
    password: credentials.value.password,
  }
  await UserService.login(cred)
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
