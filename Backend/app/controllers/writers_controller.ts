import Writer from '#models/writer'
import { WriterValidator } from '#validators/writer'
import type { HttpContext } from '@adonisjs/core/http'

export default class WritersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    response.ok(await Writer.all())
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
    response.ok(await Writer.findOrFail(params.id))
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { firstname, lastname } = await request.validateUsing(WriterValidator)
    const writer = await Writer.findOrFail(params.id)
    writer.merge({ firstname, lastname })
    response.ok(await writer.save())
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const writer = await Writer.findOrFail(params.id)
    await writer.delete()
    response.noContent()
  }
}
