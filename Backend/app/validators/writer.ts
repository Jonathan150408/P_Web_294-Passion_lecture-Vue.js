import vine from '@vinejs/vine'

const WriterValidator = vine.compile(
  vine.object({
    firstname: vine.string(),
    lastname: vine.string().nullable(),
  })
)

export { WriterValidator }
