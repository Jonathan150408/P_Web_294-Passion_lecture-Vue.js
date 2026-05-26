import Book from '#models/book'
import User from '#models/user'
import Writer from '#models/writer'
import vine from '@vinejs/vine'

const BookValidator = vine.compile(
  vine.object({
    title: vine.string().unique(async (db, value) => {
      //only 1 ! because false if it exists and true if unique (book doesn't exists)
      return !(await Book.query().where('title', value).first())
    }),
    numberOfPages: vine.number().positive(),
    //null ok, undefined not ok
    pdfLink: vine.string().nullable(),
    abstract: vine.string().nullable(),
    editionYear: vine.number().positive().max(2026).min(1600).nullable(),
    imagePath: vine.string().nullable(),
    //check if user/writer exist in db
    userId: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        return !!(await User.query().where('id', value).first())
      }),
    writerId: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        return !!(await Writer.query().where('id', value).first())
      }),
  })
)

const UpdateBookValidator = vine.compile(
  vine.object({
    title: vine.string(),

    numberOfPages: vine.number().positive(),

    pdfLink: vine.string().nullable(),

    abstract: vine.string().nullable(),

    editionYear: vine.number().positive().max(2026).min(1600).nullable(),

    imagePath: vine.string().nullable(),

    userId: vine.number().positive(),

    writerId: vine.number().positive(),
  })
)

export { BookValidator, UpdateBookValidator }
