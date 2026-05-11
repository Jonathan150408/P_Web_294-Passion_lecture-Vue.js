import Editor from '#models/editor'
import { EditorValidator } from '#validators/editor'
import type { HttpContext } from '@adonisjs/core/http'

export default class EditorsController {
  /**
   * @index
   * @operationId getEditors
   * @summary List editors
   * @description Returns a paginated list of editors with their books
   * @tag Editors
   *
   * @responseBody 200 - <Editor[]>.with(relations).paginated()
   */
  async index({ response }: HttpContext) {
    response.ok(await Editor.query().orderBy('name').preload('edit').paginate(1, 20))
  }

  /**
   * @store
   * @operationId createEditor
   * @summary Create an editor
   * @description Creates a new editor
   * @tag Editors
   *
   * @requestBody <EditorValidator>
   *
   * @responseBody 201 - <Editor>
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(EditorValidator)
    response.created(await Editor.create({ name }))
  }

  /**
   * @show
   * @operationId getEditor
   * @summary Get editor by ID
   * @description Returns a single editor with related books
   * @tag Editors
   *
   * @paramPath id - The ID of the editor - @type(number)
   *
   * @responseBody 200 - <Editor>.with(relations)
   * @responseBody 404 - {"message": "Editor not found"}
   */ async show({ params, response }: HttpContext) {
    response.ok(
      await Editor.query().where('id', params.id).orderBy('name').preload('edit').firstOrFail()
    )
  }

  /**
   * @update
   * @operationId updateEditor
   * @summary Update an editor
   * @description Updates an existing editor
   * @tag Editors
   *
   * @paramPath id - The ID of the editor - @type(number)
   *
   * @requestBody <EditorValidator>
   *
   * @responseBody 200 - <Editor>
   * @responseBody 404 - {"message": "Editor not found"}
   * @responseBody 422 - {"errors": [{"message": "Validation failed"}]}
   */
  async update({ params, request, response }: HttpContext) {
    const { name } = await request.validateUsing(EditorValidator)
    const editor = await Editor.findOrFail(params.id)
    editor.merge({ name })
    response.ok(await editor.save())
  }

  /**
   * @destroy
   * @operationId deleteEditor
   * @summary Delete an editor
   * @description Deletes an editor
   * @tag Editors
   *
   * @paramPath id - The ID of the editor - @type(number)
   *
   * @responseBody 204 - Editor deleted successfully
   * @responseBody 404 - {"message": "Editor not found"}
   */
  async destroy({ params, response }: HttpContext) {
    const editor = await Editor.findOrFail(params.id)
    await editor.delete()
    response.noContent()
  }
}
