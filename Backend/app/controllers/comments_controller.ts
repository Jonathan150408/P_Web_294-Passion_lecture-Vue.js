import Book from '#models/book'
import Comment from '#models/comment'
import User from '#models/user'
import { CommentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  /**
   * @index
   * @operationId getBookComments
   * @summary List comments for a book
   * @description Returns a paginated list of comments for a specific book
   * @tag Comments
   *
   * @paramPath bookId - The ID of the book - @type(number)
   *
   * @responseBody 200 - <Comment[]>.with(relations).paginated()
   * @responseBody 404 - {"message": "Book not found"}
   */
  async index({ params, response }: HttpContext) {
    //make sure the book exists
    await Book.findOrFail(params.bookId)

    //return every comment on a singular book, instead of every comments ever
    response.ok(
      await Comment.query().where('bookId', params.bookId).preload('user').paginate(1, 20)
    )
  }

  /**
   * @store
   * @operationId createBookComment
   * @summary Create a comment for a book
   * @description Creates a new comment associated with a specific book
   * @tag Comments
   *
   * @paramPath bookId - The ID of the book - @type(number)
   *
   * @requestBody <CommentValidator>
   *
   * @responseBody 201 - <Comment>
   * @responseBody 401 - {"message": "Unauthorized"}
   * @responseBody 404 - {"message": "Book not found"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async store({ auth, params, request, response }: HttpContext) {
    // Try to find the user by id
    const user = await User.findOrFail(auth.user?.id)

    //make sure the book exists
    await Book.findOrFail(params.bookId)

    const { content, rating } = await request.validateUsing(CommentValidator)
    response.created(
      await Comment.create({ content, rating, bookId: params.bookId, userId: user.id })
    )
  }

  /**
   * @show
   * @operationId getBookComment
   * @summary Get a single comment for a book
   * @description Returns a single comment belonging to a specific book
   * @tag Comments
   *
   * @paramPath bookId - The ID of the book - @type(number)
   * @paramPath commentId - The ID of the comment - @type(number)
   *
   * @responseBody 200 - <Comment>.with(relations)
   * @responseBody 404 - {"message": "Book or comment not found"}
   */
  async show({ params, response }: HttpContext) {
    //make sure the book exists
    await Book.findOrFail(params.bookId)

    response.ok(
      await Comment.query()
        .where('bookId', params.bookId)
        .andWhere('id', params.commentId)
        .preload('user')
        .firstOrFail()
    )
  }

  /**
   * @update
   * @operationId updateBookComment
   * @summary Update a comment
   * @description Updates a comment if the authenticated user is the author or an admin
   * @tag Comments
   *
   * @paramPath bookId - The ID of the book - @type(number)
   * @paramPath commentId - The ID of the comment - @type(number)
   *
   * @requestBody <CommentValidator>
   *
   * @responseBody 200 - <Comment>
   * @responseBody 401 - {"message": "Unauthorized"}
   * @responseBody 403 - {"message": "You cannot update this comment, as you are not the author."}
   * @responseBody 404 - {"message": "Book or comment not found"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async update({ auth, params, request, response }: HttpContext) {
    // Try to find the user by id
    const user = await User.findOrFail(auth.user?.id)

    //make sure the book exists
    await Book.findOrFail(params.bookId)

    //try to find the comment by its id
    const comment = await Comment.query()
      .where('bookId', params.bookId)
      .andWhere('id', params.commentId)
      .firstOrFail()

    //verify that the comment belongs to the user, unless they're an admin
    if (comment.userId !== user.id && user.role !== 'admin')
      return response.forbidden({
        message: 'You cannot update this comment, as you are not the author.',
      })

    //validate the updated values and assign them
    const { content, rating } = await request.validateUsing(CommentValidator)

    comment.merge({ content, rating })

    response.ok(await comment.save())
  }

  /**
   * @destroy
   * @operationId deleteBookComment
   * @summary Delete a comment
   * @description Deletes a comment if the authenticated user is the author or an admin
   * @tag Comments
   *
   * @paramPath bookId - The ID of the book - @type(number)
   * @paramPath commentId - The ID of the comment - @type(number)
   *
   * @responseBody 204 - Comment deleted successfully
   * @responseBody 401 - {"message": "Unauthorized"}
   * @responseBody 403 - {"message": "You cannot delete this comment, as you are not the author."}
   * @responseBody 404 - {"message": "Book or comment not found"}
   */
  async destroy({ auth, params, response }: HttpContext) {
    // Try to find the user by id
    const user = await User.findOrFail(auth.user?.id)

    //make sure the book exists
    await Book.findOrFail(params.bookId)

    //try to find the comment by its id
    const comment = await Comment.query()
      .where('bookId', params.bookId)
      .andWhere('id', params.commentId)
      .firstOrFail()

    //verify that the comment belongs to the user, unless they're an admin
    if (comment.userId !== user.id && user.role !== 'admin')
      return response.forbidden({
        message: 'You cannot delete this comment, as you are not the author.',
      })

    //delete the comment and then send an empty response
    await comment.delete()
    response.noContent()
  }
}
