import factory from '@adonisjs/lucid/factories'
import Comment from '#models/comment'
import Book from '#models/book'
import User from '#models/user'

export const CommentFactory = factory
  .define(Comment, async ({ faker }) => {
    //select a random book/user
    const book = await Book.query().orderByRaw('RAND()').firstOrFail()
    const user = await User.query().orderByRaw('RAND()').firstOrFail()

    return {
      //arbitrary value for the comment's content
      content: faker.company.catchPhrase(),
      //random rating
      rating: faker.number.int({ min: 1, max: 5 }),
      //uses the random book/user
      bookId: book.id,
      userId: user.id,
    }
  })
  .build()
