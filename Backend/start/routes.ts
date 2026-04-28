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

const CategoriesController = () => import('#controllers/categories_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    //hello world
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    //categories
    router.resource('categories', CategoriesController).apiOnly()

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
  })
  .prefix('/api')
