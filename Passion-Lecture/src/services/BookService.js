// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/books',
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
    return apiClient.get('?_sort=createdAt&_order=desc')
  },
  //get un seul livre
  getBook(id) {
    return apiClient.get('/' + id)
  },
  //post pour ajouter un livre
  addBook(book) {
    console.log('addbook called')
    console.log(book)
    return apiClient.post('/', book)
  },
}
