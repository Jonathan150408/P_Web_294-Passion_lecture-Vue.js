import User from '#models/user'
import { UserUpdateValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * @index
   * @operationId getUsers
   * @summary List users
   * @description Returns a paginated list of users with their books and comments. Admin access required.
   * @tag Users
   *
   * @responseBody 200 - <User[]>.with(relations).paginated()
   * @responseBody 403 - {"message": "Only admins can see other users."}
   */
  async index({ request, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can see other users.' })
      return
    }

    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const users = await User.query()
      .orderBy('username')
      .preload('books')
      .preload('comments')
      .paginate(page, limit)

    // Return all users ordered by username in descending order
    response.ok(users)
  }

  /**
   * @me
   * @operationId getCurrentUser
   * @summary Get authenticated user
   * @description Returns the authenticated user with their books and comments
   * @tag Users
   *
   * @responseBody 200 - <User>.with(relations)
   * @responseBody 401 - {"message": "Unauthorized"}
   */
  async me({ auth, response }: HttpContext) {
    // Return the authenticated user with status code 200
    const user = auth.user!

    await user.load('books')
    await user.load('comments')

    return response.ok(user)
  }

  /**
   * @show
   * @operationId getUser
   * @summary Get user by ID
   * @description Returns a specific user with their books and comments. Admin access required.
   * @tag Users
   *
   * @paramPath id - The ID of the user - @type(number)
   *
   * @responseBody 200 - <User>.with(relations)
   * @responseBody 403 - {"message": "Only admins can see other user's info."}
   * @responseBody 404 - {"message": "User not found"}
   */ async show({ auth, params, response }: HttpContext) {
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
   * @update
   * @operationId updateUser
   * @summary Update a user
   * @description Updates a user's information
   * @tag Users
   *
   * @paramPath id - The ID of the user - @type(number)
   *
   * @requestBody <UserUpdateValidator>
   *
   * @responseBody 200 - <User>
   * @responseBody 401 - {"message": "Unauthorized"}
   * @responseBody 404 - {"message": "User not found"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
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
    const { username, password } = await request.validateUsing(UserUpdateValidator, {
      meta: { id: auth.user?.id },
    })

    // Update the user and return it with a 200 status code
    user.merge({ username, password })
    response.ok(await user.save())
  }

  /**
   * @destroy
   * @operationId deleteUser
   * @summary Delete a user
   * @description Deletes a user. Admin access required.
   * @tag Users
   *
   * @paramPath id - The ID of the user - @type(number)
   *
   * @responseBody 204 - User deleted successfully
   * @responseBody 403 - {"message": "Only admins can delete users."}
   * @responseBody 404 - {"message": "User not found"}
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
