// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Mettre la méthode getBooks() à disposition
export default {
  getBooks() {
    return apiClient.get('/books')
  },
}
