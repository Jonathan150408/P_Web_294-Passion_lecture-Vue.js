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

// Mettre à dispo
export default {
  //get tous les livres
  getBooks() {
    return apiClient.get('/books?_sort=createdAt&_order=desc')
  },
  //get un seul livre
  getBook(id) {
    return apiClient.get('/books/' + id)
  },
  //post pour ajouter un livre
  addBook(book) {
    return apiClient.post('/book', book)
  },
}
