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
        .preload('belong')
        .preload('comments')
        .preload('edit')
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
    //get the categories
    const categoriesIds = request.input('categoriesIds')

    ///HERE !!!
    /// validateur categories
    // throw new NotImplementedError("someFunction must be implemented.");

    //create the book
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
  async update({ auth, params, request, response }: HttpContext) {
    // Get the book early
    const book = await Book.query()
      .preload('comments')
      .preload('user')
      .preload('writer')
      .where('id', params.id)
      .firstOrFail()

    // Check to see if the user has the authorization to do so, otherwise return the 403 status code
    if (book.userId !== auth.user?.id && auth.user?.role !== 'admin') {
      response.forbidden({ message: "You cannot update this book, as you aren't its uploader." })
      return
    }

    const { title, numberOfPages, pdfLink, abstract, editionYear, imagePath, userId, writerId } =
      await request.validateUsing(BookValidator)

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
  async destroy({ auth, params, response }: HttpContext) {
    // Get the book early
    const book = await Book.query()
      .preload('comments')
      .preload('user')
      .preload('writer')
      .where('id', params.id)
      .firstOrFail()

    // Check to see if the user has the authorization to do so, otherwise return the 403 status code
    if (book.userId !== auth.user?.id && auth.user?.role !== 'admin') {
      response.forbidden({ message: "You cannot delete this book, as you aren't its uploader." })
      return
    }

    await book.delete()

    response.noContent()
  }
}
