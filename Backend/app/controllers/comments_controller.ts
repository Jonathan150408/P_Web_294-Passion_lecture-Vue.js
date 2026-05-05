import Book from '#models/book'
import Comment from '#models/comment'
import User from '#models/user'
import { commentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  /**
   * Display a list of resource
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
   * Handle form submission for the create action
   */
  async store({ auth, params, request, response }: HttpContext) {
    // Try to find the user by id
    const user = await User.findOrFail(auth.user?.id)

    //make sure the book exists
    await Book.findOrFail(params.bookId)

    const { content, rating } = await request.validateUsing(commentValidator)
    response.created(
      await Comment.create({ content, rating, bookId: params.bookId, userId: user.id })
    )
  }

  /**
   * Show individual record
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
   * Handle form submission for the edit action
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
    const { content, rating } = await request.validateUsing(commentValidator)

    comment.merge({ content, rating })

    response.ok(await comment.save())
  }

  /**
   * Delete record
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
