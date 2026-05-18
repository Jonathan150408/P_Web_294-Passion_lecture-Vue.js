import factory from '@adonisjs/lucid/factories'
import Editor from '#models/editor'

const usedNames = new Set<string>()

export const EditorFactory = factory
  .define(Editor, async ({ faker }) => {
    let name: string

    do {
      name = faker.person.lastName()
    } while (usedNames.has(name))

    usedNames.add(name)

    return {
      name,
    }
  })
  .build()
