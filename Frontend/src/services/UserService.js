// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/users',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Mettre à dispo
export default {
  //get tous les auteurs
  getUsers() {
    return apiClient.get('/')
  },
  getUser(id) {
    return apiClient.get('/' + id)
  },
}
