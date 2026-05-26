import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/Books/Galerie.vue'),
    },
    {
      path: '/books/create',
      name: 'create-book',
      component: () => import('../views/Books/CreateOrUpdateBook.vue'),
    },
    {
      path: '/books/:book_id/update',
      name: 'update-book',
      component: () => import('../views/Books/CreateOrUpdateBook.vue'),
    },
    {
      path: '/books/:book_id',
      name: 'book',
      component: () => import('../views/Books/BookInfo.vue'),
    },
    {
      path: '/my-books',
      name: 'my-books',
      component: () => import('../views/Books/MyBooks.vue'),
    },
    {
      path: '/books/category/:category_id',
      name: 'book-category',
      component: () => import('../views/Books/Categorie.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/Login.vue'),
    },
  ],
})

export default router
