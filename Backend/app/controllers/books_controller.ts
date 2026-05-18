//models
import Belong from '#models/belong'
import Book from '#models/book'
import Edit from '#models/edit'
//validators
import { BelongValidator } from '#validators/belong'
import { BookValidator } from '#validators/book'
import { EditValidator } from '#validators/edit'
//others
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    response.ok(
      await Book.query()
        .preload('belong')
        .preload('comments')
        .preload('edit')
        .preload('user')
        .preload('writer')
        .orderBy('title', 'asc')
        .paginate(page, limit)
    )
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    //try is usefull for customs errors and status code handling
    try {
      const book = await db.transaction(async (trx) => {
        /**
         * PART 1 : create the book
         */
        const {
          title,
          numberOfPages,
          pdfLink,
          abstract,
          editionYear,
          imagePath,
          userId,
          writerId,
        } = await request.validateUsing(BookValidator).catch(() => {
          throw new Error('BOOK_VALIDATION_ERROR')
        })
        //create and set the values
        const book = new Book()
        book.title = title
        book.numberOfPages = numberOfPages
        book.pdfLink = pdfLink
        book.abstract = abstract
        book.editionYear = editionYear
        book.imagePath = imagePath
        book.userId = userId
        book.writerId = writerId
        //link to transaction
        book.useTransaction(trx)
        //save
        await book.save()

        /**
         * PART 2 : create the edits records
         */
        const categoriesIds = request.input('categoriesIds')
        try {
          for (const currentCategorieId of categoriesIds) {
            let categorie = await BelongValidator.validate({
              categorieId: currentCategorieId,
            }).catch(() => {
              throw new Error('CATEGORY_VALIDATION_ERROR')
            })
            //create the belong
            const belong = new Belong()
            belong.categorieId = categorie.categorieId
            belong.bookId = book.id
            //link to transaction
            belong.useTransaction(trx)
            //save the belong
            await belong.save()
          }
        } catch (error) {
          console.log('BOOK CREATE - Categories error')
          await trx.rollback()
          throw new Error('CATEGORY_NOT_FOUND')
        }

        /**
         * PART 3 : create the belongs records
         */
        try {
          const editorsIds = request.input('editorsIds')
          for (const currentEditorId of editorsIds) {
            let editor = await EditValidator.validate({ editorId: currentEditorId }).catch(() => {
              throw new Error('EDITOR_VALIDATION_ERROR')
            })
            //create the edit
            const edit = new Edit()
            edit.editorId = editor.editorId
            edit.bookId = book.id
            //link to transaction
            edit.useTransaction(trx)
            //save the edit
            await edit.save()
          }
        } catch (error) {
          console.log('BOOK CREATE - Editors error')
          await trx.rollback()
          throw new Error('EDITOR_NOT_FOUND')
        }

        return { book: book }
      })

      //finish with 201
      response.created({ book })
    } catch (error: Error | any) {
      console.log('ERREUR GÉRÉE : ', error.message)
      switch (error.message) {
        case 'EDITOR_NOT_FOUND':
          response.badRequest({ error: 'Editeur inexistant' })
          break
        case 'CATEGORY_NOT_FOUND':
          response.badRequest({ error: 'Catégorie inexistant' })
          break
        case 'BOOK_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins une valeurs de book',
          })
          break
        case 'CATEGORY_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins une catégories',
          })
          break
        case 'EDITOR_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins une catégories',
          })
          break
        default:
          response.internalServerError({ error: 'Erreur inattendue' })
      }
    }
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
