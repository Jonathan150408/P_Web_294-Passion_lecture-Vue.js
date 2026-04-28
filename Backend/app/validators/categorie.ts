import vine from '@vinejs/vine'

const categorieValidator = vine.compile(
  vine.object({
    label: vine.string(),
  })
)

export { categorieValidator }
