import factory from '@adonisjs/lucid/factories'
import Writer from '#models/writer'

export const WriterFactory = factory
  .define(Writer, async ({ faker }) => {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    }
  })
  .build()
