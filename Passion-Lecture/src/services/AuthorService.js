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
}
