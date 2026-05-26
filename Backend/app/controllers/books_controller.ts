//models
import Belong from '#models/belong'
import Book from '#models/book'
import Comment from '#models/comment'
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
        .preload('belong', (query) => {
          query.preload('categorie')
        })
        .preload('comments')
        .preload('edit', (query) => {
          query.preload('editor')
        })
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
      console.log('ERREUR CATCHÉÉ : ', error.message)
      switch (error.message) {
        case 'EDITOR_NOT_FOUND':
          response.badRequest({ error: 'Editeur inexistant' })
          break
        case 'CATEGORY_NOT_FOUND':
          response.badRequest({ error: 'Catégorie inexistante' })
          break
        case 'BOOK_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins une valeur de book',
          })
          break
        case 'CATEGORY_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins une catégories',
          })
          break
        case 'EDITOR_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins un éditeur',
          })
          break
        default:
          response.internalServerError({ error: 'Erreur inattendue' })
          break
      }
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    response.ok(
      await Book.query()
        .preload('belong', (query) => {
          query.preload('categorie')
        })
        .preload('comments')
        .preload('edit', (query) => {
          query.preload('editor')
        })
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
    //start transaction
    try {
      /**
       * PART 1 : Book
       */
      const book = await db.transaction(async (trx) => {
        // Get the old book early
        const book = await Book.query()
          .preload('comments')
          .preload('user')
          .preload('writer')
          .where('id', params.id)
          .firstOrFail()

        //link to the transaction
        book.useTransaction(trx)

        // Check to see if the user has the authorization to do so, otherwise return the 403 status code
        if (book.userId !== auth.user?.id && auth.user?.role !== 'admin') {
          throw new Error('NO_PERMISSION')
        }

        //valiate the fields
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

        //merge the data
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

        //save the book
        await book.save()

        /**
         * PART 2 : Edits (book - to edit - editor)
         */
        //delete the olds edits
        const edits = await Edit.query().where('bookId', book.id).exec()
        for (const currentEdit of edits) {
          currentEdit.useTransaction(trx)
          currentEdit.delete()
        }
        //create new ones
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
         * PART 3 : Belongs (book - to belongs to - category)
         */
        //delete the olds belongs
        const belongs = await Belong.query().where('bookId', book.id).exec()
        for (const currentBelong of belongs) {
          currentBelong.useTransaction(trx)
          currentBelong.delete()
        }
        //create new ones
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

        return book
      })
      response.ok(book)
    } catch (error: Error | any) {
      console.log('ERREUR CATCHÉÉ : ', error.message)
      switch (error.message) {
        case 'NO_PERMISSION':
          response.forbidden({
            error: "Impossible de modifier le livre, vous n'avez pas les permissions nécéssaires.",
          })
          break
        case 'EDITOR_NOT_FOUND':
          response.badRequest({ error: 'Editeur inexistant' })
          break
        case 'CATEGORY_NOT_FOUND':
          response.badRequest({ error: 'Catégorie inexistante' })
          break
        case 'BOOK_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins une valeur de book',
          })
          break
        case 'CATEGORY_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins une catégories',
          })
          break
        case 'EDITOR_VALIDATION_ERROR':
          response.unprocessableEntity({
            error: 'La validation a échoué pour au moins un éditeur',
          })
          break
        default:
          response.internalServerError({ error: 'Erreur inattendue' })
          break
      }
    }
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    //start transaction
    try {
      await db.transaction(async (trx) => {
        /**
         * PART 1 : Edits (book - to edit - editor)
         */
        //delete the olds edits
        const edits = await Edit.query().where('bookId', params.id).exec()
        for (const currentEdit of edits) {
          currentEdit.useTransaction(trx)
          await currentEdit.delete()
        }

        /**
         * PART 2 : Belongs (book - to belongs to - category)
         */
        //delete the olds belongs
        const belongs = await Belong.query().where('bookId', params.id).exec()
        for (const currentBelong of belongs) {
          currentBelong.useTransaction(trx)
          await currentBelong.delete()
        }

        /**
         * PART 3 : Comments (Book - Comments)
         */
        const comments = await Comment.query().where('bookId', params.id).exec()
        for (const currentComment of comments) {
          currentComment.useTransaction(trx)
          await currentComment.delete()
        }

        /**
         * PART 4 : Book (at the end because of fk contraints)
         */
        // Get the old book
        const book = await Book.query()
          .where('id', params.id)
          .firstOrFail()
          .catch(() => {
            throw new Error('NO_BOOK_FOUND')
          })

        // Check to see if the user has the authorization to do so, otherwise return the 403 status code
        if (book.userId !== auth.user?.id && auth.user?.role !== 'admin') {
          throw new Error('NO_PERMISSION')
        }

        //link to the transaction
        book.useTransaction(trx)

        //delete the book
        await book.delete()
      })

      //response if everything goes well
      response.noContent()
    } catch (error: Error | any) {
      console.log('ERREUR CATCHÉÉ : ', error)
      switch (error.message) {
        case 'NO_PERMISSION':
          response.forbidden({
            error: "Impossible de modifier le livre, vous n'avez pas les permissions nécéssaires.",
          })
          break
        case 'NO_BOOK_FOUND':
          response.notFound({ error: 'No book found.' })
          break
        default:
          response.internalServerError({ error: 'Erreur inattendue' })
          break
      }
    }
  }
}
