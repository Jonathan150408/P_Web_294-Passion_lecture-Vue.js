// Import de Axios
import axios from 'axios'

// Création de l'instance de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/editors/',
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

//mettre à dispo
export default {
  //NEW
  // Get all editors
  async getEditors(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit })

    return await apiClient.get(`?${params}`)
  },

  // Get a singular editor
  async getEditor(id) {
    return await apiClient.get(id)
  },

  // Create an editor
  async createEditor(editorData) {
    return await apiClient.post('', editorData)
  },

  // Update an editor
  async updateEditor(editorData) {
    return await apiClient.put(`/${editorData.id}`, editorData)
  },

  // Delete a editor
  async deleteEditor(id) {
    return await apiClient.delete(id)
  },

  /*OLD
  // The old functions that are indented more than the rest are not gonna be in the new BookService, as it'll be easier to access through another method

  //get toutes les éditeurs
  getEditors() {
    return apiClient.get('/editors')
  },

                    async getEditorNameFromId(id) {
                      const editorsData = await this.getEditors()
                      const editors = editorsData.data

                      if (!editors) return '...'

                      const editor = editors.find((a) => a.id == id)
                      return editor ? editor.name : 'Editeur inconnu'
                    },
  */
}
