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
      component: () => import('../views/Books/Galerie.vue'),
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
    {
      path: '/books/:book_id',
      name: 'modifier un livre',
      //IA : import asynchrone
      component: () => import('../views/Books/CreateOrUpdateBook.vue'),
    },
    {
      // à modifier
      path: '/books/create',
      name: 'Ajouter un livre',
      component: () => import('../views/Books/CreateOrUpdateBook.vue'),
    },
    /*
    il manque 
    - ajouter un commentaire
    - modifier un commentaire
    - supprimer un livre
    - supprimer un commentaire
     */
  ],
})

export default router
