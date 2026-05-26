// Import de Axios
import axios from 'axios'

// get the token
const token = localStorage.getItem('token')

// Création de l'instance Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Mettre à dispo
export default {
  // Auth
  registerUser(userData) {
    return apiClient.post('users/register', userData)
  },

  login(credentials) {
    return apiClient.post('users/login', credentials)
  },

  logout() {
    return apiClient.post('users/logout')
  },

  // Users
  getUsers(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return apiClient.get(`users?${params}`)
  },

  getUser(id) {
    return apiClient.get(`users/${id}`)
  },

  updateUser(userData) {
    return apiClient.put(`users/${userData.id}`, userData)
  },

  deleteUser(id) {
    return apiClient.delete(`users/${id}`)
  },

  // Current user
  me() {
    return apiClient.get('me')
  },
}