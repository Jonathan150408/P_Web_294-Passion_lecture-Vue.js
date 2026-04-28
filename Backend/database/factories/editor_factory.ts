import factory from '@adonisjs/lucid/factories'
import Editor from '#models/editor'

export const EditorFactory = factory
  .define(Editor, async ({ faker }) => {
    return {
      name: faker.person.lastName(),
    }
  })
  .build()
