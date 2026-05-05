import factory from '@adonisjs/lucid/factories'
import Editor from '#models/editor'

let names: string[] = []

export const EditorFactory = factory
  .define(Editor, async ({ faker }) => {
    //pick a new genre if not unique
    let name = ''
    let isUnique

    do {
      isUnique = true
      //pick a new random name
      name = faker.person.lastName()
      //check if the name already exists
      names.forEach((nme) => {
        if (nme === name) {
          isUnique = false
          return
        }
      })
    } while (!isUnique)
    names.push(name)

    //validate and create the new category
    return {
      name: faker.person.lastName(),
    }
  })
  .build()
