import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import User from '#models/user'
import Writer from '#models/writer'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    //select a random user/writer
    const user = await User.query().orderByRaw('RAND()').firstOrFail()
    const writer = await Writer.query().orderByRaw('RAND()').firstOrFail()
    console.log('UserId : ', user.id)
    console.log('WriterId : ', writer.id)

    return {
      title: faker.book.title(),
      //arbitrary values for numberOfPages
      numberOfPages: faker.number.int({ min: 100, max: 800 }),
      pdfLink: faker.internet.url(),
      //arbitrary values for the number of sentences in abstract
      abstract: faker.lorem.paragraph({ min: 2, max: 16 }),
      //semi-arbitrary values for the year
      editionYear: faker.number.int({ min: 1600, max: 2026 }),
      imagePath: faker.image.url(),
      //uses the random selection
      userId: user.id,
      writerId: writer.id,
    }
  })
  .build()
