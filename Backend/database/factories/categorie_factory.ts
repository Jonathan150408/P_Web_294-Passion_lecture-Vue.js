import factory from '@adonisjs/lucid/factories'
import Categorie from '#models/categorie'
//all the labels
const labels: string[] = []

export const CategorieFactory = factory
  .define(Categorie, async ({ faker }) => {
    //pick a new genre if not unique
    let label = ''
    let isUnique

    do {
      isUnique = true
      //pick a new random label
      label = faker.book.genre()
      //check if the label already exists
      labels.forEach((lab) => {
        if (lab === label) {
          isUnique = false
          return
        }
      })
    } while (!isUnique)
    labels.push(label)

    //validate and create the new category
    return {
      label: label,
    }
  })
  .build()
