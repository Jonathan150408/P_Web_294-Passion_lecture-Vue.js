import Categorie from '#models/categorie'
import { categorieValidator } from '#validators/categorie'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * @index
   * @operationId getCategories
   * @summary List categories
   * @description Returns a paginated list of categories with their relations
   * @tag Categories
   *
   * @responseBody 200 - <Categorie[]>.with(relations).paginated()
   */
  async index({ response }: HttpContext) {
    response.ok(await Categorie.query().orderBy('label').preload('belong').paginate(1, 20))
  }

  /**
   * @store
   * @operationId createCategory
   * @summary Create a category
   * @description Creates a new category (admin only)
   * @tag Categories
   *
   * @requestBody <categorieValidator>
   *
   * @responseBody 201 - <Categorie>
   * @responseBody 403 - {"message": "Only admins can create categories."}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async store({ auth, request, response }: HttpContext) {
    // Check to see if the user is an admin, otherwise return the 403 status code
    if (auth.user?.role !== 'admin') {
      response.forbidden({ message: 'Only admins can update category information.' })
      return
    }

    const { label } = await request.validateUsing(categorieValidator)
    response.created(await Categorie.create({ label }))
  }

  /**
   * @show
   * @operationId getCategory
   * @summary Get category by ID
   * @description Returns a single category with its relations
   * @tag Categories
   *
   * @paramPath id - The ID of the category - @type(number)
   *
   * @responseBody 200 - <Categorie>.with(relations)
   * @responseBody 404 - {"message": "Category not found"}
   */
  async show({ params, response }: HttpContext) {
    response.ok(
      await Categorie.query()
        .where('id', params.id)
        .orderBy('label')
        .preload('belong')
        .firstOrFail()
    )
  }

  /**
   * @update
   * @operationId updateCategory
   * @summary Update a category
   * @description Updates an existing category (admin only)
   * @tag Categories
   *
   * @paramPath id - The ID of the category - @type(number)
   *
   * @requestBody <categorieValidator>
   *
   * @responseBody 200 - <Categorie>
   * @responseBody 403 - {"message": "Only admins can update categories."}
   * @responseBody 404 - {"message": "Category not found"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
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
   * @destroy
   * @operationId deleteCategory
   * @summary Delete a category
   * @description Deletes a category (admin only)
   * @tag Categories
   *
   * @paramPath id - The ID of the category - @type(number)
   *
   * @responseBody 204 - Category deleted successfully
   * @responseBody 403 - {"message": "Only admins can delete categories."}
   * @responseBody 404 - {"message": "Category not found"}
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
