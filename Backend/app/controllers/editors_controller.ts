import Editor from '#models/editor'
import { editorValidator } from '#validators/editor'
import type { HttpContext } from '@adonisjs/core/http'

export default class EditorsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    response.ok(await Editor.query().orderBy('name').preload('edit').paginate(1, 20))
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(editorValidator)
    response.created(await Editor.create({ name }))
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    response.ok(await Editor.query().where('id', params.id).orderBy('name').preload('edit').firstOrFail())
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { name } = await request.validateUsing(editorValidator)
    const editor = await Editor.findOrFail(params.id)
    editor.merge({ name })
    response.ok(await editor.save())
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const editor = await Editor.findOrFail(params.id)
    await editor.delete()
    response.noContent()
  }
}
