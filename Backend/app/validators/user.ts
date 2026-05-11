import vine from '@vinejs/vine'

const UserLoginValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(255)
      .exists(async (db, value) => {
        const user = await db.query().from('users').where('username', value).first()
        return !!user
      }),
    password: vine.string(), // No min/max here, in case the user somehow got a password below or above the limits
  })
)

const UserRegisterValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(255)
      .unique(async (db, value) => {
        const user = await db.query().from('users').where('username', value).first()
        return !user
      }),
    password: vine
      .string()
      .minLength(8)
      .maxLength(255)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/),
  })
)

const UserUpdateValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(255)
      .unique(async (db, value, field) => {
        const user = await db
          .query()
          .from('users')
          .where('username', value)
          .whereNot('id', field.meta.id)
          .first()
        return !user
      }),
    password: vine
      .string()
      .minLength(8)
      .maxLength(255)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/),
  })
)

export { UserLoginValidator, UserRegisterValidator, UserUpdateValidator }
