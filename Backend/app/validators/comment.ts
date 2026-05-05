import Book from '#models/book'
import vine from '@vinejs/vine'

const commentValidator = vine.compile(
  vine.object({
    content: vine.string(),
    //The rating must be between 1 and 5
    rating: vine.number().min(1).max(5),
  })
)

export { commentValidator }
