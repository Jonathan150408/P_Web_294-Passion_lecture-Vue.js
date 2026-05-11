import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
const { UserRegisterValidator, UserLoginValidator } = await import('#validators/user')

export default class AuthController {
  /**
   * @register
   * @operationId registerUser
   * @summary Register a new user
   * @description Creates a new user account and returns an access token
   * @tag Users
   *
   * @requestBody <UserRegisterValidator>
   *
   * @responseBody 201 - {"token": "string", "user": "<User>"}
   * @responseBody 400 - {"message": "Already logged in"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async register({ auth, request, response }: HttpContext) {
    // Check to see if the user is already logged in, if so return a 400 status code
    if (await auth.check()) {
      response.badRequest({ message: 'Already logged in' })
      return
    }

    // Validate the request
    const { username, password } = await request.validateUsing(UserRegisterValidator)

    // Create the user
    const user = await User.create({ username, password })

    // Create an AOT token
    const token = await User.accessTokens.create(user)

    // If everything works, create the user and return it with a 201 status code
    response.created({ token: token, ...user.serialize() })
  }

  /**
   * @login
   * @operationId loginUser
   * @summary Log into a user account
   * @description Authenticates a user and returns an access token
   * @tag Users
   *
   * @requestBody <UserLoginValidator>
   *
   * @responseBody 200 - {"token": "string", "user": "<User>"}
   * @responseBody 400 - {"message": "Already logged in"}
   * @responseBody 401 - {"message": "Invalid credentials"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async login({ auth, request, response }: HttpContext) {
    // Check to see if the user is already logged in, if so return a 400 status code
    if (await auth.check()) {
      response.badRequest({ message: 'Already logged in' })
      return
    }

    // Validate the request
    const { username, password } = await request.validateUsing(UserLoginValidator)

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
   * @logout
   * @operationId logoutUser
   * @summary Log out a user
   * @description Revokes the authenticated user's current access token
   * @tag Users
   *
   * @responseBody 200 - {"message": "Logged out successfully"}
   * @responseBody 400 - {"message": "No token found"}
   * @responseBody 401 - {"message": "Unauthorized"}
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
