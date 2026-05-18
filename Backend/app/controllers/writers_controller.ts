import Writer from '#models/writer'
import { WriterValidator } from '#validators/writer'
import type { HttpContext } from '@adonisjs/core/http'

export default class WritersController {
  /**
   * @index
   * @operationId getWriters
   * @summary List writers
   * @description Returns a paginated list of writers with their books
   * @tag Writers
   *
   * @responseBody 200 - <Writer[]>.with(relations).paginated()
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const writers = await Writer.query()
      .orderBy('lastname')
      .orderBy('firstname')
      .preload('books')
      .paginate(page, limit)

    response.ok(writers)
  }

  /**
   * @store
   * @operationId createWriter
   * @summary Create a writer
   * @description Creates a new writer
   * @tag Writers
   *
   * @requestBody <WriterValidator>
   *
   * @responseBody 201 - <Writer>
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async store({ request, response }: HttpContext) {
    const { firstname, lastname } = await request.validateUsing(WriterValidator)
    response.created(await Writer.create({ firstname, lastname }))
  }

  /**
   * @show
   * @operationId getWriter
   * @summary Get writer by ID
   * @description Returns a single writer with their books
   * @tag Writers
   *
   * @paramPath id - The ID of the writer - @type(number)
   *
   * @responseBody 200 - <Writer>.with(relations)
   * @responseBody 404 - {"message": "Writer not found"}
   */
  async show({ params, response }: HttpContext) {
    response.ok(
      await Writer.query()
        .where('id', params.id)
        .orderBy('lastname')
        .orderBy('firstname')
        .preload('books')
        .firstOrFail()
    )
  }

  /**
   * @update
   * @operationId updateWriter
   * @summary Update a writer
   * @description Updates a writer. Admin access required.
   * @tag Writers
   *
   * @paramPath id - The ID of the writer - @type(number)
   *
   * @requestBody <WriterValidator>
   *
   * @responseBody 200 - <Writer>
   * @responseBody 403 - {"message": "Only admins can update writer information."}
   * @responseBody 404 - {"message": "Writer not found"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async update({ auth, params, request, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can update writer information.' })
      return
    }

    const { firstname, lastname } = await request.validateUsing(WriterValidator)
    const writer = await Writer.findOrFail(params.id)
    writer.merge({ firstname, lastname })
    response.ok(await writer.save())
  }

  /**
   * @destroy
   * @operationId deleteWriter
   * @summary Delete a writer
   * @description Deletes a writer. Admin access required.
   * @tag Writers
   *
   * @paramPath id - The ID of the writer - @type(number)
   *
   * @responseBody 204 - Writer deleted successfully
   * @responseBody 403 - {"message": "Only admins can delete writers."}
   * @responseBody 404 - {"message": "Writer not found"}
   */
  async destroy({ auth, params, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can delete writers.' })
      return
    }
    const writer = await Writer.findOrFail(params.id)
    await writer.delete()
    response.noContent()
  }
}
