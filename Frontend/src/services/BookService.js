// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/books/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/*OLD
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/books',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
*/

// Mettre à dispo
export default {
  //NEW
  // Get all books
  getBooks(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return apiClient.get(`?${params}`)
  },

  // Get a singular book
  getBook(id) {
    return apiClient.get(id)
  },

  // Create a book
  createBook(bookData) {
    return apiClient.post('', bookData)
  },

  // Update a book
  updateBook(bookData) {
    return apiClient.put(`/${bookData.id}`, bookData)
  },

  // Delete a book
  deleteBook(id) {
    return apiClient.delete(id)
  },

  /*OLD
  // The old functions that are indented more than the rest are not gonna be in the new BookService, as it'll be easier to access through another method

  //get tous les livres
  getBooks() {
    return apiClient.get('?_sort=createdAt&_order=desc')
  },
              //get les livres de l'utilisateur
              getBooksFromUser(id) {
                return apiClient.get('?userId=' + id)
              },

              //get les livres d'une catégorie
              getBooksFromCategory(id) {
                return apiClient.get('?categoryId=' + id)
              },

  //get un seul livre
  getBook(id) {
    return apiClient.get('/' + id)
  },
              //post pour créer un commentaire
              async addComment(bookId, comment) {
                console.log('addComment called')
                console.log(bookId, comment)

                const response = this.getBook(bookId)
                const book = (await response).data

                // Créer l'array s'il n'existe pas
                if (!book.comments) {
                  book.comments = []
                }

                comment.createdAt = new Date().toISOString()

                book.comments.unshift(comment)

                return apiClient.put('/' + bookId, book)
              },

  //post pour ajouter un livre
  async addBook(book) {
    console.log('addBook called')
    console.log(book)

    const response = await apiClient.get('/?_sort=id&_order=desc&_limit=1')
    const books = response.data

    // Prendre l'ID la plus grande (Number(b.id) afin de s'assurer que l'ID soit un chiffre)
    const maxId = books.length ? Math.max(...books.map((b) => Number(b.id))) : 0

    const newId = maxId + 1

    const now = new Date().toISOString()

    book.id = newId
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
      updatedAt: now,
    }

    return apiClient.put(`/${book.id}`, updatedBook)
  },

  deleteBook(id) {
    return apiClient.delete('/' + id)
  },
  */
}
