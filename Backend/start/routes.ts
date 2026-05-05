/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const BooksController = () => import('#controllers/books_controller')
const WritersController = () => import('#controllers/writers_controller')
const EditorsController = () => import('#controllers/editors_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const CommentsController = () => import('#controllers/comments_controller')

router
  .group(() => {
    //hello world
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    //categories
    router
      .group(() => {
        //Access for all
        router.get('/', [CategoriesController, 'index'])
        router.get('/:id', [CategoriesController, 'show'])

        //Authenticated only
        router.post('/', [CategoriesController, 'store']).use(middleware.auth())
        router.put('/:id', [CategoriesController, 'update']).use(middleware.auth())
        router.delete('/:id', [CategoriesController, 'destroy']).use(middleware.auth())
      })
      .prefix('/categories')

    //editors
    router
      .group(() => {
        //Access for all
        router.get('/', [EditorsController, 'index'])
        router.get('/:id', [EditorsController, 'show'])

        //Authenticated only
        router.post('/', [EditorsController, 'store']).use(middleware.auth())
        router.put('/:id', [EditorsController, 'update']).use(middleware.auth())
        router.delete('/:id', [EditorsController, 'destroy']).use(middleware.auth())
      })
      .prefix('/editors')

    //books
    router
      .group(() => {
        //Access for all
        router.get('/', [BooksController, 'index'])
        router.get('/:id', [BooksController, 'show'])

        //Authenticated only
        router.post('/', [BooksController, 'store']).use(middleware.auth())
        router.put('/:id', [BooksController, 'update']).use(middleware.auth())
        router.delete('/:id', [BooksController, 'destroy']).use(middleware.auth())
      })
      .prefix('/books')

    //writers
    router
      .group(() => {
        //Access for all
        router.get('/', [WritersController, 'index'])
        router.get('/:id', [WritersController, 'show'])

        //Authenticated only
        router.post('/', [WritersController, 'store']).use(middleware.auth())
        router.put('/:id', [WritersController, 'update']).use(middleware.auth())
        router.delete('/:id', [WritersController, 'destroy']).use(middleware.auth())
      })
      .prefix('/writers')

    //comments
    router
      .group(() => {
        //Access for all
        router.get('/', [CommentsController, 'index'])
        router.get('/:commentId', [CommentsController, 'show'])

        //Authenticated only
        router.post('/', [CommentsController, 'store']).use(middleware.auth())
        router.put('/:commentId', [CommentsController, 'update']).use(middleware.auth())
        router.delete('/:commentId', [CommentsController, 'destroy']).use(middleware.auth())
      })
      .prefix('/books/:bookId/comments')

    //auth/users
    router
      .group(() => {
        //auth
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
        router.post('/logout', [AuthController, 'logout']).use(middleware.auth())

        //users
        router
          .group(() => {
            router.get('/', [UsersController, 'index'])
            router.get('/:id', [UsersController, 'show'])
            router.put('/:id', [UsersController, 'update'])
            router.delete('/:id', [UsersController, 'destroy'])
          })
          .use(middleware.auth())
      })
      .prefix('/users')

    // User
    router.get('/me', [UsersController, 'me']).use(middleware.auth())
  })
  .prefix('/api')
