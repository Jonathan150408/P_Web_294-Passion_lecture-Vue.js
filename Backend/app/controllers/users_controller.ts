import User from '#models/user'
import { userUpdateValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of users
   */
  async index({ auth, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can see other users.' })
      return
    }

    // Return all users ordered by username in descending order
    response.ok(
      await User.query().orderBy('username').preload('books').preload('comments').paginate(1, 20)
    )
  }

  /**
   *  Show own user info
   */
  async me({ auth, response }: HttpContext) {
    // Return the authenticated user with status code 200
    const user = auth.user!

    await user.load('books')
    await user.load('comments')

    return response.ok(user)
  }

  /**
   * Show individual user
   */
  async show({ auth, params, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: "Only admins can see other user's info." })
      return
    }

    // Try to find the user by id
    const user = await User.query()
      .where('id', params.id)
      .preload('books')
      .preload('comments')
      .firstOrFail()

    // Return status code 404 if the user doesn't exist
    if (!user) {
      response.notFound({ message: 'User not found' })
      return
    }

    // Return the user with status code 200
    response.ok(user)
  }

  /**
   * Handle form submission for the edit action of a user
   */
  async update({ params, response, request, auth }: HttpContext) {
    // Try to find the user by id
    const user = await User.query()
      .where('id', params.id)
      .preload('books')
      .preload('comments')
      .firstOrFail()

    // Return status code 404 if the user doesn't exist
    if (!user) {
      response.notFound()
      return
    }

    // Validate the request and pass the user id as meta to the validator to check for unique username
    const { username, password } = await request.validateUsing(userUpdateValidator, {
      meta: { id: auth.user?.id },
    })

    // Update the user and return it with a 200 status code
    user.merge({ username, password })
    response.ok(await user.save())
  }

  /**
   * Delete a user
   */
  async destroy({ auth, response, params }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can delete users.' })
      return
    }

    // Try to find the user by id
    const user = await User.findOrFail(params.id)

    // Delete the user and return status code 204
    await user.delete()
    response.noContent()
  }
}
