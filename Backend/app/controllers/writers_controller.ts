import Writer from '#models/writer'
import { WriterValidator } from '#validators/writer'
import type { HttpContext } from '@adonisjs/core/http'

export default class WritersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    response.ok(
      await Writer.query().orderBy('lastname').orderBy('firstname').preload('books').paginate(1, 20)
    )
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { firstname, lastname } = await request.validateUsing(WriterValidator)
    response.created(await Writer.create({ firstname, lastname }))
  }

  /**
   * Show individual record
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
   * Handle form submission for the edit action
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
   * Delete record
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
