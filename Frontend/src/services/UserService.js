// Import de Axios
import axios from 'axios'

//get the token
const token = localStorage.getItem('token')

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/users/',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
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
  registerUser(userData) {
    return apiClient.post('register', userData)
  },

  // Log into a user
  login(credentials) {
    return apiClient.post('login', credentials)
  },

  // Log out of a user
  logout() {
    return apiClient.post('logout')
  },

  // Get all users
  getUsers(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return apiClient.get(`?${params}`)
  },

  // Get a singular user
  getUser(id) {
    return apiClient.get(id)
  },

  // Update a user
  updateUser(userData) {
    return apiClient.put(`/${userData.id}`, userData)
  },

  // Delete a user
  deleteUser(id) {
    return apiClient.delete(`${id}`)
  },

  // Get information about the currently logged in user
  me() {
    return apiClientMe.get()
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
