import Belong from '#models/belong'
import Book from '#models/book'
import Edit from '#models/edit'
import { BelongValidator } from '#validators/belong'
import { BookValidator } from '#validators/book'
import { EditValidator } from '#validators/edit'
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
    let everythingIsFine = true

    //create the book
    const { title, numberOfPages, pdfLink, abstract, editionYear, imagePath, userId, writerId } =
      await request.validateUsing(BookValidator)
    const newBook =  await Book.create({
      title,
      numberOfPages,
      pdfLink,
      abstract,
      editionYear,
      imagePath,
      userId,
      writerId,
    })

    //create the record(s) for the relation : book -> belongs -> categorie
    const categoriesIds = request.input('categoriesIds')
    //check if not null
    if (categoriesIds === null || categoriesIds === undefined){
      response.unprocessableEntity({ "Error" : "A book needs at least one category" })
      everythingIsFine = false
    } else if (everythingIsFine) {
      //create a record for each id
      categoriesIds.forEach(async (currentCategorieId:number) => {
        try {
          let categorie = await BelongValidator.validate({categorieId : currentCategorieId})
          await Belong.create({ categorieId : categorie.categorieId, bookId : newBook.id })
        } catch (error) {
          everythingIsFine = false
          console.error("Error while creating a new record in belong table (book -> belong <- category)\n", error)
          response.expectationFailed({ "Error" : "The specified category(ies) must exist" })
        }
      });
    }

    //create the record(s) for the relation : book <- edit <- editor
    const editorsIds = request.input('editorsIds')
    //check if not null
    if (editorsIds === null || editorsIds === undefined){
      response.unprocessableEntity({ "Error" : "A book needs at least one editor" })
      everythingIsFine = false
    } else if (everythingIsFine) {
      //create a record for each id
      editorsIds.forEach(async (currentEditorId:number) => {
        let editorId = (await EditValidator.validate({editorId : currentEditorId})).editorId
        await Edit.create({ editorId : editorId, bookId : newBook.id }).catch(() => {
          everythingIsFine = false
          response.expectationFailed({ "Error" : "The specified editor(s) must exist" })
        })
      });
    }

    if (everythingIsFine){
      response.created(newBook)
    } else {
      //if something went wrong we delete the book
      //(we need the book's id to create the realations, so we can't create the book at the end)
      await newBook.delete()
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
