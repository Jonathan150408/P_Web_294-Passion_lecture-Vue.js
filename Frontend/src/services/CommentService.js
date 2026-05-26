// Import de Axios
import axios from 'axios'

//get the token
const token = localStorage.getItem('token')

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/books/',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Mettre à dispo
export default {
  // Get all comments of a books
  getComments(bookId, page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return apiClient.get(`${bookId}/comments?${params}`)
  },

  // Get a singular comment
  getComment(bookId, commentId) {
    return apiClient.get(`${bookId}/comments/${commentId}`)
  },

  // Create a comment
  createComment(bookId, commentData) {
    return apiClient.post(`${bookId}/comments/`, commentData)
  },

  // Update a comment
  updateComment(bookId, commentData) {
    return apiClient.put(`${bookId}/comments/${commentData.id}`, commentData)
  },

  // Delete a comment
  deleteComment(bookId, commentId) {
    return apiClient.delete(`${bookId}/comments/${commentId}`)
  },
}
