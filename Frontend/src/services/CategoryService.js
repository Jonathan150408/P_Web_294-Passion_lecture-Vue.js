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
  getCategories(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return apiClient.get(`?${params}`)
  },

  // Get a singular category
  getCategory(id) {
    return apiClient.get(`/${id}`)
  },

  // Create a category
  createCategory(categoryData) {
    return apiClient.post('', categoryData)
  },

  // Update a category
  updateCategory(categoryData) {
    return apiClient.put(`/${categoryData.id}`, categoryData)
  },

  // Delete a category
  deleteCategory(id) {
    return apiClient.delete(id)
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
