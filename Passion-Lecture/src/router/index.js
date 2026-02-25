import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Page principal',
      component: Home,
    },
    {
      path: '/books',
      name: 'Tout les livres',
      //IA : import asynchrone
      component: () => import('../views/Books/Galerie.vue'),
    },
    {
      // à modifier
      path: '/books/create',
      name: 'Ajouter un livre',
      component: () => import('../views/Books/CreateOrUpdateBook.vue'),
    },
    {
      // à modifier
      path: '/books/:book_id/update',
      name: 'Modifier un livre',
      component: () => import('../views/Books/CreateOrUpdateBook.vue'),
    },
    {
      path: '/books/:book_id',
      name: 'Voir les détails d\'un livre',
      //IA : import asynchrone
      component: () => import('../views/Books/Book.vue'),
    },
    {
      path: '/my-books',
      name: "Livres de l'utilisateur",
      //IA : import asynchrone
      component: () => import('../views/Books/MyBooks.vue'),
    },
    {
      path: '/books/category/:category_id',
      name: 'Livres par catégorie',
      //IA : import asynchrone
      component: () => import('../views/Books/Categorie.vue'),
    },
  ],
})

export default router
