import factory from '@adonisjs/lucid/factories'
import Categorie from '#models/categorie'

const usedLabels = new Set<string>()

export const CategorieFactory = factory
  .define(Categorie, async ({ faker }) => {
    let label: string

    do {
      label = faker.book.genre()
    } while (usedLabels.has(label))

    usedLabels.add(label)

    return {
      label,
    }
  })
  .build()
