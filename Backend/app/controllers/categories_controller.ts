import Categorie from '#models/categorie'
import { categorieValidator } from '#validators/categorie'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    //no preloads
    response.ok(await Categorie.all())
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { label } = await request.validateUsing(categorieValidator)
    response.created(await Categorie.create({ label }))
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    response.ok(await Categorie.findOrFail(params.id))
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { label } = await request.validateUsing(categorieValidator)
    const categorie = await Categorie.findOrFail(params.id)
    categorie.merge({ label })
    response.ok(await categorie.save())
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const categorie = await Categorie.findOrFail(params.id)
    await categorie.delete()
    response.noContent()
  }
}
