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
    return apiClient.get('/books')
  },
  getBook(id) {
    return apiClient.get('/books' + id)
  },
  //en cours
  addBook(datas) {
    apiClient.post({
      url: '/books',
      data: datas,
    })
  },
}
