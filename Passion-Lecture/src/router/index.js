import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home?limit=5',
      component: Home,
    },
    {
      path: '/books',
      name: 'livres',
      //IA : import asynchrone
      component: () => import('../views/Books/Main.vue'),
    },
    {
      path: '/books/:book_id',
      name: 'livre',
      //IA : import asynchrone
      component: () => import('../views/Books/Book.vue'),
    },
    {
      path: '/users/:user_id/books',
      name: "livres de l'utilisateur",
      //IA : import asynchrone
      component: () => import('../views/Books/MyBooks.vue'),
    },
    {
      path: '/books/category/:category_id',
      name: 'livres par catégorie',
      //IA : import asynchrone
      component: () => import('../views/Books/Categorie.vue'),
    },
    /*
    il manque 
    - Ajouter un livre
    - ajouter un commentaire
    - modifier un livre
    - modifier un commentaire
    - supprimer un livre
    - supprimer un commentaire
     */
  ],
})

export default router
