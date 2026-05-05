import Book from '#models/book'
import { BookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    response.ok(
      await Book.query()
        .preload('comments')
        .preload('user')
        .preload('writer')
        .orderBy('title', 'asc')
        .exec()
    )
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { title, numberOfPages, pdfLink, abstract, editionYear, imagePath, userId, writerId } =
      await request.validateUsing(BookValidator)
    response.created(
      await Book.create({
        title,
        numberOfPages,
        pdfLink,
        abstract,
        editionYear,
        imagePath,
        userId,
        writerId,
      })
    )
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    response.ok(
      await Book.query()
        .preload('comments')
        .preload('user')
        .preload('writer')
        .where('id', params.id)
        .firstOrFail()
    )
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { title, numberOfPages, pdfLink, abstract, editionYear, imagePath, userId, writerId } =
      await request.validateUsing(BookValidator)
    const book = await Book.query()
      .preload('comments')
      .preload('user')
      .preload('writer')
      .where('id', params.id)
      .firstOrFail()
    book.merge({
      title,
      numberOfPages,
      pdfLink,
      abstract,
      editionYear,
      imagePath,
      userId,
      writerId,
    })
    response.ok(await book.save())
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const book = await Book.query()
      .preload('comments')
      .preload('user')
      .preload('writer')
      .where('id', params.id)
      .firstOrFail()
    await book.delete()
    response.noContent()
  }
}
