import Categorie from '#models/categorie'
import { categorieValidator } from '#validators/categorie'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    //no preloads as we need the t_appartenir table, which will then make us have to loop through all t_appartenit entries
    const categories = await Categorie.query().orderBy('label').paginate(1, 20)
    response.ok(categories)
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
    //no preloads as we need the t_appartenir table, which will then make us have to loop through all t_appartenit entries
    const category = await Categorie.query().where('id', params.id).orderBy('label').firstOrFail()
    response.ok(category)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, params, request, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can update category information.' })
      return
    }

    const { label } = await request.validateUsing(categorieValidator)
    const categorie = await Categorie.findOrFail(params.id)
    categorie.merge({ label })
    response.ok(await categorie.save())
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

    const categorie = await Categorie.findOrFail(params.id)
    await categorie.delete()
    response.noContent()
  }
}
