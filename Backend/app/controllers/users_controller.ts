import User from '#models/user'
import { userUpdateValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of users
   */
  async index({ response }: HttpContext) {
    // Return all users ordered by username in descending order (TODO in future: add preloads when the relations are set)
    response.ok(await User.query().orderBy('username'))
  }

  /**
   * Show individual user
   */
  async show({ params, response }: HttpContext) {
    // Try to find the user by id
    const user = await User.find(params.id)

    // Return status code 404 if the user doesn't exist
    if (!user) {
      response.notFound()
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
    const user = await User.find(params.id)

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
    const user = await User.find(params.id)

    // Return status code 404 if the user doesn't exist
    if (!user) {
      response.notFound({ message: 'User not found' })
      return
    }

    // Delete the user and return status code 204
    await user.delete()
    response.noContent()
  }
}
