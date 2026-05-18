// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/categories/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/*OLD
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/categories',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
*/

//mettre à dispo
export default {
  //NEW
  // Get all categories
  async getCategories() {
    return await apiClient.get('')
  },

  // Get a singular category
  async getCategory(id) {
    return await apiClient.get(id)
  },

  // Create a category
  async createCategory(category) {
    return await apiClient.post('', category)
  },

  // Update a category
  async updateCategory(category) {
    return await apiClient.put(`/${category.id}`, category)
  },

  // Delete a category
  async deleteCategory(id) {
    return await apiClient.delete(id)
  },

  /*OLD
  // The old functions that are indented more than the rest are not gonna be in the new BookService, as it'll be easier to access through another method

  //get toutes les catégories
  getCategories() {
    return apiClient.get('/')
  },

  getCategory(id) {
    return apiClient.get('/' + id)
  },

                        async getCategoryLabelFromId(id) {
                          const categoriesData = await this.getCategories()
                          const categories = categoriesData.data

                          if (!categories) return '...'

                          const category = categories.find((c) => c.id == id)
                          return category ? category.label : 'Catégorie inconnue'
                        },
  */
}
