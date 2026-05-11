import Editor from '#models/editor'
import { editorValidator } from '#validators/editor'
import type { HttpContext } from '@adonisjs/core/http'

export default class EditorsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    //no preloads as we need the t_edit table, which will then make us have to loop through all t_edit entries
    const editors = await Editor.query().orderBy('name').paginate(1, 20)
    response.ok(editors)
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
    //no preloads as we need the t_edit table, which will then make us have to loop through all t_edit entries
    const editor = await Editor.query().where('id', params.id).orderBy('name').firstOrFail()
    response.ok(editor)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, params, request, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can update editor information.' })
      return
    }

    const { name } = await request.validateUsing(editorValidator)
    const editor = await Editor.findOrFail(params.id)
    editor.merge({ name })
    response.ok(await editor.save())
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can delete editors.' })
      return
    }

    const editor = await Editor.findOrFail(params.id)
    await editor.delete()
    response.noContent()
  }
}
