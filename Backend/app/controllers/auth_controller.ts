import type { HttpContext } from '@adonisjs/core/http'
import { userRegisterValidator, userLoginValidator } from '#validators/user'
import User from '#models/user'

export default class AuthController {
  /**
   * Register a new user
   */
  async register({ auth, request, response }: HttpContext) {
    // Check to see if the user is already logged in, if so return a 400 status code
    if (await auth.check()) {
      response.badRequest({ message: 'Already logged in' })
      return
    }

    // Validate the request
    const { username, password } = await request.validateUsing(userRegisterValidator)

    // Create the user
    const user = await User.create({ username, password })

    // Create an AOT token
    const token = await User.accessTokens.create(user)

    // If everything works, create the user and return it with a 201 status code
    response.created({ token: token, ...user.serialize() })
  }

  /**
   * Log into a user account
   */
  async login({ auth, request, response }: HttpContext) {
    // Check to see if the user is already logged in, if so return a 400 status code
    if (await auth.check()) {
      response.badRequest({ message: 'Already logged in' })
      return
    }

    // Validate the request
    const { username, password } = await request.validateUsing(userLoginValidator)

    // Validate the credientials
    const user = await User.verifyCredentials(username, password)

    // If the credentials are invalid, return a 400 status code
    if (!user) {
      response.unauthorized({ message: 'Invalid credentials' })
      return
    }

    // Create an AOT token
    const token = await User.accessTokens.create(user)

    // If the credentials are valid, return the user with a 200 status code
    response.ok({ token: token, ...user.serialize() })
  }

  /**
   * Log out of a user account
   */
  async logout({ auth, response }: HttpContext) {
    // Get the authenticated user
    const user = auth.getUserOrFail()

    // Get the user's token
    const token = auth.user?.currentAccessToken.identifier

    // If the token doesn't exist, return a 400 status code
    if (!token) {
      response.badRequest({ message: 'No token found' })
      return
    }

    // Delete the token
    await User.accessTokens.delete(user, token)

    // Confirm to the user that they have been logged out with a 200 status code
    response.ok({ message: 'Logged out successfully' })
  }
}
