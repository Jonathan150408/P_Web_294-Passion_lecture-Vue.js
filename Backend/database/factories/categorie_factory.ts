import factory from '@adonisjs/lucid/factories'
import Categorie from '#models/categorie'

export const CategorieFactory = factory
  .define(Categorie, async ({ faker }) => {
    return {
      label: faker.book.genre(),
    }
  })
  .build()
