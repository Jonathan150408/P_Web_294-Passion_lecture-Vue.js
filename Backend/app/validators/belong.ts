import vine from '@vinejs/vine'

const BelongValidator = vine.compile(
    vine.object({
        categorieId : vine.number().positive().exists(async( db, value ) => {
            //return true if found, false if not existing
            return !!await db.query().where('id', value).first()
        })
        //we don't need to validate the bookId because when created, we use the current route parametter (default 404 if not exists)
    })
)

export { BelongValidator }