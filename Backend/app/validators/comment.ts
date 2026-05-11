import vine from '@vinejs/vine'

const CommentValidator = vine.compile(
  vine.object({
    content: vine.string(),
    //The rating must be between 1 and 5
    rating: vine.number().min(1).max(5),
  })
)

export { CommentValidator }
