import vine from '@vinejs/vine'

const editorValidator = vine.compile(
  vine.object({
    name: vine.string().unique(async (db, value) => {
      const editor = await db.query().from('editors').where('name', value).first()
      return !editor
    }),
  })
)

export { editorValidator }
