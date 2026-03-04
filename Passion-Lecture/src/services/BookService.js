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
  async addBook(book) {
    console.log('addBook called')
    console.log(book)

    const response = await apiClient.get('/?_sort=id&_order=desc&_limit=1')
    const books = response.data

    const newId = books.length > 0 ? Number(books[0].id) + 1 : 1

    const now = new Date().toISOString()

    book.id = String(newId)
    book.createdAt = now
    book.updatedAt = now

    return apiClient.post('/', book)
  },
  // put pour modifier un livre
  async updateBook(book) {
    console.log('updateBook called')
    console.log(book)

    const now = new Date().toISOString()

    const updatedBook = {
      ...book,
      updatedAt: now
    }

    return apiClient.put(`/${book.id}`, updatedBook)
  }
}
