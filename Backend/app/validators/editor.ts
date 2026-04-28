import vine from '@vinejs/vine'

const editorValidator = vine.compile(
  vine.object({
    name: vine.string().unique(async (db, value) => {
      const user = await db.query().from('users').where('username', value).first()
      return !user
    }),
  })
)

export { editorValidator }
