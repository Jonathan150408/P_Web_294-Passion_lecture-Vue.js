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

//mettre à dispo
export default {
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
}
