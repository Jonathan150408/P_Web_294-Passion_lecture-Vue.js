// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/writers/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/*OLD
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
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
  // Get all authors
  getAuthors(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return apiClient.get(`?${params}`)
  },

  // Get a singular author
  getAuthor(id) {
    return apiClient.get(`${id}`)
  },

  // Create an author
  createAuthor(authorData) {
    return apiClient.post('', authorData)
  },

  // Update an author
  updateAuthor(authorData) {
    return apiClient.put(`/${authorData.id}`, authorData)
  },

  // Delete an author
  deleteAuthor(id) {
    return apiClient.delete(id)
  },

  /*OLD
  // The old functions that are indented more than the rest are not gonna be in the new BookService, as it'll be easier to access through another method

  //get tous les auteurs
  getAuthors() {
    return apiClient.get('/writers')
  },

                    async getAuthorNameFromId(id) {
                      const authorsData = await this.getAuthors()
                      const authors = authorsData.data

                      if (!authors) return '...'

                      const author = authors.find((a) => a.id == id)
                      return author ? `${author.firstname} ${author.lastname}` : 'Auteur inconnu'
                    },
  */
}
