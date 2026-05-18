// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/users/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const apiClientMe = axios.create({
  baseURL: 'http://localhost:3333/api/me/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/*OLD
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/users',
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
  // Register a user
  async registerUser(userData) {
    return await apiClient.post('register', userData)
  },

  // Log into a user
  async Login(credentials) {
    return await apiClient.post('login', credentials)
  },

  // Log out of a user
  async Logout() {
    return await apiClient.post('logout')
  },

  // Get all users
  async getUsers(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return await apiClient.get(`?${params}`)
  },

  // Get a singular user
  async getUser(id) {
    return await apiClient.get(id)
  },

  // Update a user
  async updateUser(userData) {
    return await apiClient.put(`/${userData.id}`, userData)
  },

  // Delete a user
  async deleteUser(id) {
    return await apiClient.delete(id)
  },

  // Get information about the currently logged in user
  async Me() {
    return await apiClientMe.get()
  },

  /*OLD
  //get tous les auteurs
  getUsers() {
    return apiClient.get('/')
  },

  getUser(id) {
    return apiClient.get('/' + id)
  },
  */
}
