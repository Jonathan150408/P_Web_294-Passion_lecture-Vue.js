import Editor from '#models/editor'
import vine from '@vinejs/vine'

const EditValidator = vine.compile(
    vine.object({
        editorId : vine.number().positive().exists(async( db, value ) => {
            //return true if found, false if not existing
            return !!await Editor.query().where('id', value).first()
        })
        //we don't need to validate the bookId because when created, we use the new id
    })
)

export { EditValidator }